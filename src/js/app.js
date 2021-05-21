const container = document.querySelector(".container")
const tweets = [
  { user: "", content: "", likes: 0 },
]

/** Función que muestra los tweets  */
const showTweets = () => {
    let output = ""
    tweets.forEach(
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
  
  document.addEventListener("DOMContentLoaded", showCoffees)

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
  }