import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const siteId = 'd2965e75-ccae-4eaa-b80a-c57161129d32'

function getAuthToken() {
  if (process.env.NETLIFY_AUTH_TOKEN) return process.env.NETLIFY_AUTH_TOKEN
  const home = process.env.USERPROFILE || process.env.HOME
  const paths = [
    join(home, '.netlify', 'config.json'),
    join(process.env.APPDATA || '', 'netlify', 'Config', 'config.json'),
  ]
  for (const p of paths) {
    try {
      const cfg = JSON.parse(readFileSync(p, 'utf8'))
      const users = cfg.users || {}
      const uid = cfg.userId || Object.keys(users)[0]
      const token = users[uid]?.auth?.token || cfg.access_token || cfg.token
      if (token) return token
    } catch {}
  }
  throw new Error('No Netlify auth token found')
}

async function api(method, path, body) {
  const res = await fetch(`https://api.netlify.com/api/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  let json
  try {
    json = text ? JSON.parse(text) : null
  } catch {
    json = text
  }
  if (!res.ok) {
    throw new Error(`${res.status} ${method} ${path}: ${typeof json === 'string' ? json : JSON.stringify(json).slice(0, 500)}`)
  }
  return json
}

const before = await api('GET', `/sites/${siteId}`)
console.log('before:', {
  installation_id: before.build_settings?.installation_id,
  deploy_key_id: before.build_settings?.deploy_key_id,
  repo_url: before.build_settings?.repo_url,
  provider: before.build_settings?.provider,
})

// Clear broken continuous-deploy link so Netlify stops retrying SSH clone
console.log('Clearing broken repo link…')
const cleared = await api('PUT', `/sites/${siteId}`, {
  build_settings: {
    provider: null,
    repo_path: null,
    repo_url: null,
    repo_branch: null,
    cmd: 'npm run build',
    dir: 'dist',
  },
})
console.log('cleared provider:', cleared.build_settings?.provider)

// Create a deploy key for GitHub linking fallback
console.log('Creating deploy key…')
let deployKey
try {
  deployKey = await api('POST', '/deploy_keys')
  console.log('deploy_key id:', deployKey.id)
  console.log('deploy_key public_key:\n' + deployKey.public_key)
} catch (e) {
  console.error('deploy key create failed:', e.message)
}

if (deployKey?.public_key) {
  // Try attaching repo with deploy key (public repos still benefit)
  try {
    console.log('Re-attaching GitHub repo with deploy key…')
    const updated = await api('PUT', `/sites/${siteId}`, {
      repo: {
        provider: 'github',
        repo: 'diditobias/DJDovi',
        private: false,
        branch: 'main',
        cmd: 'npm run build',
        dir: 'dist',
        deploy_key_id: deployKey.id,
      },
    })
    console.log('after attach:', {
      installation_id: updated.build_settings?.installation_id,
      deploy_key_id: updated.build_settings?.deploy_key_id,
      repo_url: updated.build_settings?.repo_url,
      provider: updated.build_settings?.provider,
    })
  } catch (e) {
    console.error('repo attach failed:', e.message)
    console.log('PUBLIC_KEY_FOR_GITHUB=')
    console.log(deployKey.public_key)
  }
}
