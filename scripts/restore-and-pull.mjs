import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const siteId = 'd2965e75-ccae-4eaa-b80a-c57161129d32'
const deployId = process.argv[2] || '6aa97a42f7d18c0a68c94f25'
const assets = [
  'gallery1.jpg',
  'gallery2.png',
  'gallery3.png',
  'logo-nav.png',
  'logo.png',
  'photo2.jpg',
  'photo3.jpg',
  'photo4.jpg',
  'setup-main.png',
  'index.html',
]

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
  if (!res.ok) throw new Error(`${res.status} ${method} ${path}: ${text.slice(0, 300)}`)
  return text ? JSON.parse(text) : null
}

console.log('Restoring deploy', deployId)
await api('POST', `/sites/${siteId}/deploys/${deployId}/restore`)
console.log('Restored. Waiting for CDN…')
await new Promise((r) => setTimeout(r, 4000))

mkdirSync('original-site', { recursive: true })
mkdirSync('public/images', { recursive: true })

for (const name of assets) {
  const url = `https://djdovitob.netlify.app/${name}`
  const res = await fetch(url)
  if (!res.ok) {
    console.error('fail', name, res.status)
    continue
  }
  const buf = Buffer.from(await res.arrayBuffer())
  writeFileSync(join('original-site', name), buf)
  if (name !== 'index.html') {
    writeFileSync(join('public/images', name), buf)
  }
  console.log('saved', name, buf.length)
}
