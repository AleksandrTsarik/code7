const buttonSelect = document.querySelector(".js-menu");
const menuSelect = document.querySelector(".js-menu-drop");
const bodyLock = document.querySelector("body");

//---toggle burger
buttonSelect.addEventListener("click", function () {
  buttonSelect.classList.toggle("active");
  menuSelect.classList.toggle("active");
  bodyLock.classList.toggle("lock");
});

//---click outside
document.addEventListener("click", function (event) {
  const clickInside = event.composedPath().includes(buttonSelect);
  if (!clickInside && !buttonSelect.contains(event.target)) {
    buttonSelect.classList.remove("active");
    menuSelect.classList.remove("active");
    bodyLock.classList.remove("lock");
  }
});


//---accordion

const accordion = document.querySelectorAll('.accordion-modern');

accordion.forEach(element => {
	element.addEventListener('click', function() {
		if(element.classList.contains('open')) {
			element.classList.remove('open');
		} else {
			accordion.forEach(elem => elem.classList.remove('open'))
			element.classList.add('open');
		}
	})
})


// const accordions = document.querySelectorAll(".accordion");

// const openAccordion = (accordion) => {
// 	const content = accordion.querySelector(".accordion__content");
// 	accordion.classList.add("accordion__active");
// 	content.style.maxHeight = content.scrollHeight + "px";
// };

// const closeAccordion = (accordion) => {
// 	const content = accordion.querySelector(".accordion__content");
// 	accordion.classList.remove("accordion__active");
// 	content.style.maxHeight = null;
// };

// accordions.forEach((accordion) => {
// 	const intro = accordion.querySelector(".accordion__intro");
// 	const content = accordion.querySelector(".accordion__content");

// 	intro.onclick = () => {
// 		if (content.style.maxHeight) {
// 			closeAccordion(accordion);
// 		} else {
// 			accordions.forEach((accordion) => closeAccordion(accordion));
// 			openAccordion(accordion);
// 		}
// 	};
// });
