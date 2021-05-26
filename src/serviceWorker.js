// importScripts("https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js");
const staticTwitterDev = "dev-coffee-site-v1";
const dynamicTwitterDev = "dynamic-v1";
const assets = [
    "./",
    "./index.html",
    "./css/style.css",
    "./js/app.js",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticTwitterDev).then(cache => {
            cache.addAll(assets)
        })
    )
})


self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((r) => {
            // console.log('[Servicio Worker] Obteniendo recurso: ' + e.request.url);
            return r || fetch(e.request).then((response) => {
                return caches.open(staticTwitterDev).then((cache) => {
                    // console.log('[Servicio Worker] Almacena el nuevo recurso: ' + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                return caches.delete(key);
            }));
        })
    );
});

self.addEventListener('push', e => {
    let data = { title: "New", content: "Something new happened!" };
    if (e.data) {
        data = JSON.parse(e.data.text());
    }

    const options = {
        body: data.content,
        // icon: "/src/images/android-icon-48-48.png",
    }

    e.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});