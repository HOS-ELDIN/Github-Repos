let getRepo = document.querySelector(".get-repos")
let userName = document.querySelector(".user-name")
let showData =document.querySelector(".show-data")
//HOS-ELDIN
// userName.defaultValue = "HOS-ELDIN"

getRepo.addEventListener("click", () => {
  if (userName.value == ""){
    userName.defaultValue = "HOS-ELDIN"
  }
  fetch(`https://api.github.com/users/${userName.value}/repos`).then((response) => {
    let data = response.json()
    return data
  }).then((repos) => {

    for (let i = 0; i < repos.length; i++) {
      if (repos[i].fork == false) {
        createRepo(repos,i)
      }
    }
  })
})


function createRepo(repos,i) {
let repo = document.createElement("div")
repo.className = "repo"

let left = document.createElement("div")
left.className = "left"

let deployment = document.createElement("a")
deployment.href = `https://hos-eldin.github.io/${repos[i].name}`
deployment.target = "_blank"
deployment.appendChild(document.createTextNode("open"))

let title = document.createElement("span")
title.innerHTML = "title: "

let tilteSpan = document.createElement("span")
tilteSpan.className = "title"
tilteSpan.innerHTML = `${repos[i].name}`

let link = document.createElement("span")
link.innerHTML = "gethub link: "

let hubLink = document.createElement("a")
hubLink.className = "hub-link"
hubLink.href = `${repos[i].html_url}`
hubLink.target = "_blank"
hubLink.innerHTML = `${repos[i].html_url}`

left.appendChild(title)
left.appendChild(link)

title.appendChild(tilteSpan)
link.appendChild(hubLink)

repo.appendChild(left)
repo.appendChild(deployment)

showData.appendChild(repo)
}

