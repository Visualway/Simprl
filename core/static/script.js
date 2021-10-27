/* *****variables***** */
const mobileNavToggle = document.getElementById("icon-mobile-nav-toggle");
const mobileNav = document.getElementById("nav-links");
const formShorten = document.getElementById("shorten-form");
const urlInputField = document.getElementById("shorten");
const errorMsg = document.getElementById("error-msg");
const shortenedLinks = document.querySelector(".shortened-links");

/* *****on load***** */
shortenedLinks.innerHTML = localStorage.getItem("shortenedLinks");
/* *****functions***** */
function displayMobileNav() {
  // change icon to times
  mobileNavToggle.className = "far fa-times icon-mobile-nav-toggle";
  // show mobile nav
  mobileNav.classList.add("active");
}

function hideMobileNav() {
  // change icon to bars
  mobileNavToggle.className = "far fa-bars icon-mobile-nav-toggle";
  // hide mobile nav
  mobileNav.classList.remove("active");
}

async function shortenURL() {
  let shortLink;

  try {
    const resp = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${urlInputField.value}`,
      {
        method: "post",
        body: "JSON.stringify(opts)",
      }
    );
    const data = await resp.json();
    shortLink = data.result.short_link;
  } catch (error) {
    shortLink = "failed";
  }

  if (shortLink === "failed" && urlInputField.value.length === 0) {
    formShorten.classList.add("empty");
    errorMsg.innerText = "Please add a link";
  } else if (shortLink === "failed") {
    formShorten.classList.add("empty");
    errorMsg.innerText = "Please add a valid url";
  } else {
    formShorten.classList.remove("empty");
    createResultEl(shortLink);
    // clear input field
    urlInputField.value = "";
  }
}

function createResultEl(url) {
  // create shortened link container
  let result = document.createElement("div");
  result.classList.add("shortened-link-container");

  // add elements to the shortened link container
  result.innerHTML = `
    <p class="link-to-shorten">${urlInputField.value}</p>
    <p class="shortened-link">${url}</p>
    <a href="#" class="btn btn-shorten btn-copy" role='button'>copy</a>
  `;

  // add shortened link container to shortened Links
  shortenedLinks.appendChild(result);
  // save shortened link container to local storage
  localStorage.setItem("shortenedLinks", shortenedLinks.innerHTML);
}

/* *****event listeners***** */
// show/hide mobile navigation
mobileNavToggle.addEventListener("click", () => {
  if (mobileNavToggle.classList.contains("fa-bars")) {
    displayMobileNav();
  } else {
    hideMobileNav();
  }
});

// simulate nav link functionality
mobileNav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    hideMobileNav();
  }
});

// shorten url
formShorten.addEventListener("submit", (e) => {
  e.preventDefault();
  shortenURL();
});

// copy shortened url
shortenedLinks.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("btn-copy")) {
    //change copy button bg & inner text
    e.target.classList.add("copied");
    e.target.innerText = "Copied";

    let short_url = e.target.parentElement.children[1].innerText;

    // create temporary input element & append it to body
    let tempInputEl = document.createElement("input");
    tempInputEl.type = "text";
    tempInputEl.value = short_url;
    document.body.appendChild(tempInputEl);

    // copy tempInputEl value to clipboard
    tempInputEl.select();
    document.execCommand("Copy");

    // destroy tempInputEl
    document.body.removeChild(tempInputEl);
  }
});
