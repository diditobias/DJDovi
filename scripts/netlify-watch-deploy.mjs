import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const deployId = process.argv[2] || '6ae65fa029cf38ca343c02c1'

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
for (let i = 0; i < 30; i++) {
  const res = await fetch(`https://api.netlify.com/api/v1/deploys/${deployId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const d = await res.json()
  console.log(
    `[${i}] state=${d.state} error=${d.error_message ? JSON.stringify(d.error_message).slice(0, 300) : null}`,
  )
  if (['ready', 'error', 'failed'].includes(d.state)) {
    process.exit(d.state === 'ready' ? 0 : 1)
  }
  await new Promise((r) => setTimeout(r, 5000))
}
process.exit(2)
