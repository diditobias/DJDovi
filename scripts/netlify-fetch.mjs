import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const siteId = 'd2965e75-ccae-4eaa-b80a-c57161129d32'
const deployId = process.argv[2] || '6aa97a42f7d18c0a68c94f25'

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

async function apiJson(path) {
  const res = await fetch(`https://api.netlify.com/api/v1${path}`, {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  })
  if (!res.ok) throw new Error(`${res.status} ${path}: ${(await res.text()).slice(0, 200)}`)
  return res.json()
}

async function downloadBySha(sha) {
  const res = await fetch(`https://api.netlify.com/api/v1/files/${sha}`, {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  })
  if (!res.ok) throw new Error(`sha ${sha} -> ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

const files = await apiJson(`/deploys/${deployId}/files`)
mkdirSync('original-site', { recursive: true })

for (const f of files) {
  const pathName = String(f.id || f.path || '').replace(/^\//, '')
  if (!pathName || !f.sha) continue
  try {
    const buf = await downloadBySha(f.sha)
    // Guard against accidentally writing JSON metadata
    if (buf.length < 500 && buf.toString('utf8').startsWith('{')) {
      throw new Error(`got metadata JSON (${buf.length}b)`)
    }
    const out = join('original-site', pathName)
    mkdirSync(join(out, '..'), { recursive: true })
    writeFileSync(out, buf)
    console.log('wrote', pathName, buf.length, '(expected', f.size + ')')
  } catch (e) {
    console.error('skip', pathName, e.message)
  }
}
