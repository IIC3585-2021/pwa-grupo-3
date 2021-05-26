function writeTweet(user, content) {
    console.log("writing data...")
    firebase.database().ref('tweets').push({
        user: user,
        content: content,
        likes: 0
    });
}

const dbRef = firebase.database().ref();

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
            let outputfinal = '';
            dataKeys.forEach((id) => { outputfinal = `
                    <div class="card">
                      <h3 class="card-user">${data[id].user}</h3>
                      <p class="card-content">${data[id].content}</h1>
                      <!-- 
                      <hr>
                      <button id= "likesBtn" class="likes">
                        <svg class="feather feather-heart sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        <div class="likes-count">
                        ${data[id].likes}
                        </div>
                        <input id="name" type="hidden" value="${id}"/>
                    </button> -->
                    </div>
                    ` + outputfinal })
            container.innerHTML = outputfinal
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
    <h3 class="card-user">${user}</h3>
    <p class="card-content">${content}</h1>
    <!--
    <hr>
    <div class="likes">
      <svg class="feather feather-heart sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      <div class="likes-count">
      0
      </div>
      </div> -->
    </div>
                    `
    container.innerHTML = output + container.innerHTML
}

// const likesBtn = document.getElementById('likesBtn')
// likesBtn.onclick = () => {
//     let id_like = id.id;
//     dbRef.child("tweets").get().then((snapshot) => {
//         if (snapshot.exists()) {
//             let data = snapshot.val();
//             const dataKeys = Object.keys(data)
//             dataKeys.forEach((id) => {
//                 if (id_like = id) {
//                     let doc = `tweets/${id}`
//                     firebase.database().ref().update({ doc: { user: data[id].user, content: data[id].content, likes: data[id].likes + 1 } })
//                 }
//             })
//         } else {
//             console.log("No data available");
//         }
//     }).catch((error) => {
//         console.error(error);
//     });
//     writeTweet(user, content);
// }