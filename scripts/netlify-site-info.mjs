import { readFileSync } from 'node:fs'
import { join } from 'node:path'

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

const siteId = 'd2965e75-ccae-4eaa-b80a-c57161129d32'
const res = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}`, {
  headers: { Authorization: `Bearer ${getAuthToken()}` },
})
if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)
const site = await res.json()
console.log(
  JSON.stringify(
    {
      name: site.name,
      url: site.url,
      ssl_url: site.ssl_url,
      build_settings: site.build_settings,
      repo_url: site.build_settings?.repo_url,
      repo_branch: site.build_settings?.repo_branch,
      cmd: site.build_settings?.cmd,
      dir: site.build_settings?.dir,
      public_repo: site.build_settings?.public_repo,
      provider: site.build_settings?.provider,
      repo_path: site.build_settings?.repo_path,
      installation_id: site.build_settings?.installation_id,
      deploy_hook: site.build_settings?.deploy_hook,
    },
    null,
    2,
  ),
)
