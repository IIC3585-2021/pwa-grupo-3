/* Notificaciones push */

function writeTweet(user, content) {
    console.log("writing data...")
    firebase.database().ref('tweets').push({
        user: user,
        content: content,
        likes: 0
    });
}

const dbRef = firebase.database().ref();

// dbRef.child("tweets").get().then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });

//writeTweet("Maca", "Hola denisse, como estás? ")

const container = document.querySelector(".container")
const newTweets = document.querySelector(".newTweets")
const addTweetBtn = document.getElementById('addTweetBtn')
let username = document.getElementById('name')
let text = document.getElementById('text')
    /** Función que muestra los tweets  */
const showTweets = async() => {
    let output = ""
    dbRef.child("tweets").get().then((snapshot) => {
        if (snapshot.exists()) {
            let data = snapshot.val();
            console.log(data);
            const dataKeys = Object.keys(data)
            dataKeys.forEach((id) =>
                (output += `
                    <div class="card">
                      <h2 class="card-user">${data[id].user}</h3>
                      <p class="card-content">${data[id].content}</h1>
                      <a class="card-likes" href="#">${data[id].likes}</a>
                    </div>
                    `)
            )
            container.innerHTML = output
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

document.addEventListener("DOMContentLoaded", showTweets)

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("./serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}

addTweetBtn.onclick = () => {
    let user = username.value;
    let content = text.value;
    console.log(user);
    console.log(content);
    writeTweet(user, content);
    let output = `
                    <div class="card">
                      <h2 class="card-user">${user}</h3>
                      <p class="card-content">${content}</h1>
                      <a class="card-likes" href="#">0</a>
                    </div>
                    `
    container.innerHTML = output + container.innerHTML
}