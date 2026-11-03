import { spawnSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const siteId = 'd2965e75-ccae-4eaa-b80a-c57161129d32'
const data = JSON.stringify({ site_id: siteId })

const r = spawnSync(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['netlify', 'api', 'listSiteDeploys', '--data', data],
  { encoding: 'utf8', shell: false },
)

if (r.status !== 0) {
  console.error(r.stderr || r.stdout || 'failed')
  process.exit(r.status || 1)
}

const deploys = JSON.parse(r.stdout)
const summary = deploys.slice(0, 20).map((d) => ({
  id: d.id,
  created: d.created_at,
  state: d.state,
  context: d.context,
  url: d.deploy_ssl_url || d.ssl_url || d.url,
  published: d.published_at,
  framework: d.framework,
}))
writeFileSync('deploy-list.json', JSON.stringify(summary, null, 2))
console.log(JSON.stringify(summary, null, 2))
