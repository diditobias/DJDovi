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

const token = getAuthToken()
const res = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/builds`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ clear_cache: true }),
})
const text = await res.text()
console.log(res.status, text.slice(0, 1500))
