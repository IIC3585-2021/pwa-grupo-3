const staticTwitterDev = "dev-coffee-site-v1"
const assets = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/app.js",
]

// importScripts('https://www.gstatic.com/firebasejs/8.4.3/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.4.3/firebase-messaging.js');

// const messaging = firebase.messaging();



self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticTwitterDev).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})

// messaging.onBackgroundMessage((payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//         body: 'Background Message body.',
//     };

//     self.registration.showNotification(notificationTitle,
//         notificationOptions);
// });

importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');


firebase.initializeApp({
    apiKey: "AIzaSyBp6WrT7tko_hLEY8MaGudwQtAVTQa-i3A",
    projectId: "prueba-pwa-d3365",
    messagingSenderId: "238323276508",
    appId: "1:238323276508:web:e82da11ddc9ff3dd6d3219"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// console.log(messaging);

messaging.getToken({ vapidKey: "BEUKuGmy_NWpt1GXmKqOByhDt6XFTK4EQwzjd3AXBw5AHbx2eC_AbwStERS11ZPBb4crk-pqn7DyC9v0mv5KCPo" }).then((token) => console.log(token));


messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});

// messaging.onMessage((payload) => {
//     console.log('Message received. ', payload);
//     // ...
// });