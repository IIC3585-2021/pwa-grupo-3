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

// messaging.getToken({ vapidKey: "BEUKuGmy_NWpt1GXmKqOByhDt6XFTK4EQwzjd3AXBw5AHbx2eC_AbwStERS11ZPBb4crk-pqn7DyC9v0mv5KCPo" });

// messaging.onMessage((payload) => {
//     console.log('Message received. ', payload);
//     // ...
// });

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

importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js"
);

firebase.initializeApp({
    messagingSenderId: "243459482774",
    apiKey: "AIzaSyAtjnNNaxMd6Ga8k990SAFcj5vIH_aEnME",
    projectId: "dahl-985a9",
    appId: "1:243459482774:web:d24ff58d9fbdaf13314eb7",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        // icon: "/itwonders-web-logo.png",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});