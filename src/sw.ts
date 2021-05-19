import cacheManifest from 'cacheManifest';
//
// Service worker registration events
//
self.addEventListener('install', (event: ExtendableEvent) => {
	console.log(cacheManifest);
	console.log('sw install', event)
})

self.addEventListener('activate', (event: ExtendableEvent) => {
	console.log('sw activate', event)
})

//
// Functional events
//
self.addEventListener('fetch', (event: FetchEvent) => {
	console.log('user agent fetch', event.request, event)
})

self.addEventListener('sync', (event: SyncEvent) => {
	console.log('user agent sync', event)
})

self.addEventListener('push', (event: PushEvent) => {
	console.log('user agent push', event)
})
