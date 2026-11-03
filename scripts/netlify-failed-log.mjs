import { readFileSync, writeFileSync } from 'node:fs'
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
const headers = { Authorization: `Bearer ${getAuthToken()}` }

const deploysRes = await fetch(
  `https://api.netlify.com/api/v1/sites/${siteId}/deploys?per_page=10`,
  { headers },
)
const deploys = await deploysRes.json()
const failed = deploys.find((d) => d.state === 'error' || d.error_message)
console.log(
  'recent:',
  deploys.map((d) => ({
    id: d.id,
    state: d.state,
    error: d.error_message,
    created: d.created_at,
    branch: d.branch,
    context: d.context,
  })),
)

if (failed) {
  const logRes = await fetch(`https://api.netlify.com/api/v1/deploys/${failed.id}/log`, {
    headers,
  })
  const logText = await logRes.text()
  writeFileSync('failed-deploy-log.txt', logText)
  console.log('wrote failed-deploy-log.txt', logText.length)
  console.log(logText.slice(0, 2500))
}
