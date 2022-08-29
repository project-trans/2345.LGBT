/*
{{- $links := slice }}
{{- range .Site.AllPages }}
  {{- $links = $links | append .RelPermalink }}
{{- end }}
*/

const cacheName = `${location.pathname}:{{ now.Format "2006-01-02" }}`
const links = JSON.parse('{{ $links | uniq | sort | jsonify }}')

addEventListener('install', async () => {
  skipWaiting()
  const cache = await caches.open(cacheName)
  cache.addAll(links)
})

addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') return
  event.respondWith(handleRequest(request))
})

async function handleRequest(request) {
  try {
    const response = await fetch(request)
    const cacheable = response.type === 'basic' && response.ok && !response.headers.has('Content-Disposition')
    if (!cacheable) return response
    const cache = await caches.open(cacheName)
    await cache.put(request, response.clone())
    return response
  } catch {
    const cache = await caches.open(cacheName)
    return cache.match(request.url)
  }
}
