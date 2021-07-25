// Main variables
let landingPage = document.querySelector(".landing-page"),
  settingBox = document.querySelector(".setting-box"),
  toggleIcon = document.querySelector(".setting-box .toggle-icon i");

// Local storage
let mainColors = localStorage.getItem("color-option");

// check color option in local storage
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove class active from all li elements
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    if (element.dataset.color === mainColors) {
      // add active class to li
      element.classList.add("active");
    }
  });
}
// create background option function
let backgroundOptions = true,
  // Set variable to control background interval
  backgroundInterval;

// get background option value from LS
let backgroundLocalItem = localStorage.getItem("background-option");

// check if backgroundLocalItem is empty or not
if (backgroundLocalItem !== null) {
  // Remove class active from all span
  document.querySelectorAll(".random-btn span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    backgroundOptions = true;
    document.querySelector(".random-btn .yes").classList.add("active");
  } else {
    backgroundOptions = false;
    document.querySelector(".random-btn .no").classList.add("active");
  }
}
// Toggle open class
toggleIcon.onclick = function () {
  // toggle fa-spin on i for rotate it
  this.classList.toggle("fa-spin");
  // toggle class open on setting box
  settingBox.classList.toggle("open");
};

// Switching colors in the option box
let colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((colorLi) => {
  colorLi.addEventListener("click", (e) => {
    // Set colors in root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // set item in LS setItem(key, value)
    localStorage.setItem("color-option", e.target.dataset.color);

    // Handle active function
    handleActive(e);
  });
});

// Switching Random backgrounds in the option box
let randomBackgroundEl = document.querySelectorAll(".random-btn span");
// loop all spans
randomBackgroundEl.forEach((span) => {
  span.addEventListener("click", (e) => {

    // Handle active function
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOptions = true;

      randomizeImg();

      // Set background random items in LS as true
      localStorage.setItem("background-option", true);
    } else {
      backgroundOptions = false;

      clearInterval(backgroundInterval);

      // Set background random items in LS as false
      localStorage.setItem("background-option", false);
    }
  });
});

// Get array of images
let imgArray = [
  "web-1.jpg",
  "web-2.jpg",
  "web-3.jpg",
  "web-4.jpg",
  "web-5.jpg",
];

// Random background function
function randomizeImg() {
  if (backgroundOptions === true) {
    // Change background url
    backgroundInterval = setInterval(() => {
      // Get random number
      let randomNumber = Math.floor(Math.random() * imgArray.length);
      landingPage.style.backgroundImage =
        'url("img/slider/' + imgArray[randomNumber] + '")';
      landingPage.style.transition = "all linear";
    }, 1000);
  }
}
randomizeImg();

//
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;

  // skills outer height
  let skillsOffsetHeight = ourSkills.offsetHeight;

  // window height
  let windowHeight = this.innerHeight;

  // window page offset
  let windowScrollTop = this.pageYOffset;

  // check
  if (windowScrollTop > skillsOffsetTop + skillsOffsetHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create popup using images
let ourGallery = document.querySelectorAll(".gallery .img-box img");

// Loop our gallery
ourGallery.forEach((img) => {
  // Add click on img
  img.addEventListener("click", (e) => {
    //create overlay element
    let popupOverlay = document.createElement("div");

    // Add class to overlay element
    popupOverlay.className = "popup-overlay";

    // Append pop up overlay to the body
    document.body.appendChild(popupOverlay);

    // create pop up box element
    let popupBox = document.createElement("div");

    // Add class to popup box element
    popupBox.className = "popup-box";

    // Check
    if (img.alt !== null) {
      // create heading
      let imgHead = document.createElement("h3");

      // Add text to the heading
      let textHead = document.createTextNode(img.alt);

      // Append head text to the heading

      imgHead.appendChild(textHead);

      // Append imgHead to the popup box
      popupBox.appendChild(imgHead);
    }

    // create img element
    let popupImg = document.createElement("img");

    // Set image src
    popupImg.src = img.src;

    // Append img to the popup box
    popupBox.appendChild(popupImg);

    //Append pop up box element to body
    document.body.appendChild(popupBox);

    // create close button
    let closeBtn = document.createElement("span");

    // create text to the close button
    let textBtn = document.createTextNode("X");

    // Add class to the class button
    closeBtn.className = "close-btn";

    // Append text to the close button
    closeBtn.appendChild(textBtn);

    // Append close button to the popup box
    popupBox.appendChild(closeBtn);
  });
});

// Close the pop up
document.addEventListener("click", (e) => {
  if (e.target.className == "close-btn") {
    // Remove the pop up box
    e.target.parentNode.remove();
    // Remove the overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select all links
const allLinks = document.querySelectorAll(".links li a");
// Select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Scrolling function
function scrollToSections(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();

      // Handle active function
      handleActive(e);

      // scroll smoothly to the target section
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSections(allBullets);
scrollToSections(allLinks);

// Display Bullets Nav
let bulletsSpan = document.querySelectorAll('.bullet-option span'),
    bulletsContainer = document.querySelector('.nav-bullets'),
    bulletLocalItem = localStorage.getItem('bullets-option');

    if (bulletLocalItem !== null){

      bulletsSpan.forEach(span => {
        span.classList.remove('active')
      });

      if(bulletLocalItem === 'block'){
        bulletsContainer.style.display = 'block';
        document.querySelector('.bullet-option .yes').classList.add('active');

      }else{
        bulletsContainer.style.display = 'none';
        document.querySelector('.bullet-option .no').classList.add('active');
      }
    }

    bulletsSpan.forEach( span =>{
      span.addEventListener('click', (e) =>{

        if(span.dataset.display === 'show'){

          bulletsContainer.style.display = 'block';

          localStorage.setItem('bullets-option', 'block');

        }else{

          bulletsContainer.style.display = 'none';

          localStorage.setItem('bullets-option', 'none')
        }
        handleActive(e);
      })
    })

// Handle active
function handleActive(event) {
  // Remove class active from all li elements
  event.target.parentElement.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
  // Add class active to e.target element
  event.target.classList.add("active");
}

// Reset button 
document.querySelector('.reset-btn').onclick = function (){

  // localStorage.clear();
  // or 
  localStorage.removeItem('color-option');
  localStorage.removeItem('background-option');
  localStorage.removeItem('bullets-option');

  // Loading the window
  window.location.reload()
}

// Toggle menu
let toggleBtn = document.querySelector('.toggle-btn'),
     tLinks = document.querySelector(".links");

     toggleBtn.onclick = function (e){

      e.stopPropagation();

       this.classList.toggle('menu-active');

       tLinks.classList.toggle('open');
     };


// Click outside menu and toggle button
document.addEventListener("click", (e) => {

  if (e.target !== toggleBtn && e.target !== tLinks) {

    // Check if menu has open class
    if (tLinks.classList.contains("open")) {

      // Toggle menu-active class on button
      toggleBtn.classList.toggle("menu-active");

      // Toggle open class onn links
      tLinks.classList.toggle("open");

    }

  }

});

// Stop propagation on menu 
tLinks.onclick = function (e) {
  e.stopPropagation();
};