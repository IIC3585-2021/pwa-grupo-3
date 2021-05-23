const admin = require('firebase-admin');
const serviceAccount = require('../../grupo-03-b13311cf3167.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const docRef = db.collection('tweets');
const container = document.querySelector(".container")
const tweets = [
  { user: "yo", content: "Hola denisse, como estás? ", likes: 10000000000 },
]

const createTweets = async () => {
  const data = await docRef.add(tweets[0])
  console.log(data.id)
};
createTweets();

/** Función que muestra los tweets  */
const showTweets = async () => {
    let output = ""
    const data = await docRef.get()
    console.log("Acá, ", data)
    data.forEach(
      ({ user,  content, likes }) =>
        (output += `
                <div class="card">
                  <h2 class="card-user">${user}</h3>
                  <p class="card-content">${content}</h1>
                  <a class="card-likes" href="#">${likes}</a>
                </div>
                `)
    )
    container.innerHTML = output
  }
  
  document.addEventListener("DOMContentLoaded", showTweets)

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
  }

