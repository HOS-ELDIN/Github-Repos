let getRepo = document.querySelector(".get-repos");
let userName = document.querySelector(".user-name");
let showData = document.querySelector(".show-data");
//HOS-ELDIN
// userName.defaultValue = "HOS-ELDIN"
let pages;
let reposPerPage = 100;

getRepo.addEventListener("click", () => {
	showData.innerHTML = "";
	if (userName.value == "") {
		userName.defaultValue = "HOS-ELDIN";
	}

	fetch(`https://api.github.com/users/${userName.value}`)
		.then((response) => response.json())
		.then((repos) => {
			console.log(`total no of rebos is ${repos.public_repos}`);
			console.log(`rebos per page ${reposPerPage}`);
			pages = Math.ceil(repos.public_repos / reposPerPage);
			console.log(`total no of pages is ${pages}`);
			fitching();
		});
});

function createRepo(repos, i) {
	// define the main profile repo
	let repo = document.createElement("div");
	let deployment = document.createElement("a");
	let left = document.createElement("div");
	let title = document.createElement("span");
	let tilteSpan = document.createElement("span");
	let link = document.createElement("span");
	let hubLink = document.createElement("a");
	repo.className = "repo";
	left.className = "left";

	if (repos[i].name !== repos[i].owner.login) {
		repo.style.order = 1;

		deployment.href = `https://${repos[i].owner.login}.github.io/${repos[i].name}`;
		deployment.target = "_blank";
		deployment.appendChild(document.createTextNode("Preview"));

		title.innerHTML = "Title: ";

		link.innerHTML = "Gethub Link: ";
		hubLink.className = "hub-link";
		hubLink.href = `${repos[i].html_url}`;
		hubLink.target = "_blank";
		hubLink.innerHTML = `${repos[i].html_url}`;
		left.appendChild(title);
		left.appendChild(link);
	} else {
		repo.style.order = 0;
		repo.classList.add("main-profile");
		left.appendChild(title);
		deployment.style.display = "none";
	}

	tilteSpan.className = "title";
	tilteSpan.innerHTML = `${repos[i].name}`;

	title.appendChild(tilteSpan);
	link.appendChild(hubLink);

	repo.appendChild(left);
	repo.appendChild(deployment);

	showData.appendChild(repo);
}

function fitching() {
	for (let index = pages; index > 0; index--) {
		fetch(
			`https://api.github.com/users/${userName.value}/repos?per_page=${reposPerPage}&page=${index}`
		)
			.then((response) => response.json())
			.then((repos) => {
				console.log(repos);
				for (let i = 0; i < repos.length; i++) {
					if (repos[i].fork == false) {
						createRepo(repos, i);
					}
				}
			});
	}
}
