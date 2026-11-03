import { spawnSync } from 'node:child_process'

const pubkey =
  'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDz2w6DMHuz605SyLcsD7bJbGnIioq19OW+tthI590b9Jd/s2F1QKQ+jRoSL8O+VI4jwP3lt7pog49FIBJU4WfPjlm1SnrhKB0nsC93poIFDopdCGI26W1JQv00uAy0B37TOpUT/Bnk1uOT394RGE6hj1eqDlYJnDkGpL4RTmRbkXKaYRoSAvAUl9KpaOmAwFSb7WsTmuXRyhbFMUHlfTfAf3YQerJRMsFrL6ftlfhwMfXUgnCjrKB7+Mcz6gJ3SeQ9ktIMku8KisiUXJbYofY+dMV7e7K+nqp09KHvrpTX+TYC+0VEBIe1xvgY6u5L1phA3U1LEg4GEv5Tl38pJ2nmXTecsFlj+0XD+PMMq6Khjmpt7v8EzDJ6y3mWp/1c8O+nBI7pkhoH89B+bgFrOUd5HYCRr6B1974o4xyT1XZ+7W5EsftqZ2zx5fPCPCq7ZTlgrr8dnL+tJbYWc8r280oI7pEypU35jnTZid/w//ZSB0BKtxnA8JGTTybDOJNt0RuGg4mMyLt5kTb6h9wjjbLGd/LXNDyT8auMrrQ/aQqbhh7r4DstHvU3MBDcU25ZbFneIfo5GcgDjNOOGCks5mn4iZcAseq8wKAJKnXNitbnskgYoPiYKoDwpj8vMu1FyjumfZO6cGeowGQAvnWXOBeALzwcSEbvngQi5fqWcEDYtQ=='

function gh(args, input) {
  const r = spawnSync('gh', args, {
    encoding: 'utf8',
    input,
    shell: false,
  })
  if (r.status !== 0) {
    throw new Error((r.stderr || r.stdout || 'gh failed').trim())
  }
  return r.stdout
}

const existingRaw = gh(['api', 'repos/diditobias/DJDovi/keys'])
const existing = JSON.parse(existingRaw)
for (const key of existing) {
  if (key.title === 'Netlify' || key.title?.includes('Netlify')) {
    console.log('deleting old key', key.id, key.title)
    gh(['api', '-X', 'DELETE', `repos/diditobias/DJDovi/keys/${key.id}`])
  }
}

const created = gh([
  'api',
  '-X',
  'POST',
  'repos/diditobias/DJDovi/keys',
  '-f',
  'title=Netlify',
  '-f',
  `key=${pubkey}`,
  '-F',
  'read_only=true',
])
console.log(created)
