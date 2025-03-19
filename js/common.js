"use strict";

const tl = gsap.timeline();
// //----GSAP
// const tl = gsap.timeline();
// tl.fromTo(
//   ".mix-item--second",
//   { x: "-100%", y: "100%", force3D: true },
//   { y: 0, force3D: true,  }
// );
// tl.fromTo(
//   ".mix-item--third",
//   {
//     x: "-100%",
//   },
//   {
//     x: "-200%",
//   },

// );
// tl.fromTo(
//   ".mix-item--fourth",
//   {
//     opacity: 0,
//     x: "-400%",
//   },
//   {
//     opacity: 1,
//     x: "-300%",
//     y: 0,
//   },

// );
// tl.fromTo(
//   ".mix-item--fifth",
//   {
//     x: "-400%",
//     y: "-100%",
//   },
//   {
//     y: 0,
//     x: '-400%'
//   }
// );
// tl.fromTo(
//   ".mix-item--sixth",
//   {
//     x: "-500%",
//     y: "100%",
//   },
//   {
//     y: 0,
//     x: '-500%'
//   }
// );

// const main = document.querySelector(".mix__list");

// ScrollTrigger.create({
//   animation: tl,
//   trigger: ".mix__list-wrap",
//   start: "center center",
//   //end: () => `+=${main.offsetWidth}`,
//   end: () => main.offsetWidth / 2,
//   //end: "bottom top+=100",
//   markers: true,
//   scrub: 1,
//   duration: 1,
//   pin: true,
//   pinSpacing: false, // Отключаем автоматическое добавление паддинга
//   pinReparent: true, // Reparents the pinned element to the body
//   stagger: 1,
//   anticipatePin: 1, // Prepares the pin earlier for smoother pinning

//   preventOverlaps: true,
//   fastScrollEnd: true,
// });

// function handleMixScroll() {
//   const main = document.querySelector(".mix__list");

//   if (!main) return;
//   const triggerOptions = {
//     animation: tl,
//     trigger: ".mix__list-wrap",
//     start: "center center",
//     // Используем динамический end с функцией
//     end: () => main.offsetWidth / 2,
//     markers: true,
//     scrub: 1,
//     pin: true,
//     pinSpacing: false, // Отключаем автоматическое добавление паддинга
//   };

//   const st = ScrollTrigger.create(triggerOptions);

//   window.addEventListener('resize', () => {
//     st.refresh();
//   });
// }

// function handleDomContentLoaded() {
//   handleMixScroll();
// }
tl.fromTo(
  ".anim-title",
  {
    y: "50%",
    opacity: 0,

    //scale: 0.5
  },
  {
    y: 0,
    scale: 1,
    opacity: 1,
    duration: 1,
  },
  0.5
)
  .fromTo(
    ".banner__text",
    {
      y: "50%",
      opacity: 0,
    },
    {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1,
    }
  )
  .fromTo(
    ".anim-img",
    {
      x: "50%",
      opacity: 0,
    },
    {
      x: 0,
      scale: 1,
      opacity: 1,
      duration: 1,
    }
  )
  .fromTo(
    ".banner__btns",
    {
      scale: 0.2,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
    }
  );

//anim banner bg
gsap.to(".banner__bg img", {
  scrollTrigger: {
    trigger: ".banner",
    markers: false,
    start: "top top",
    scrub: 1,
  },
  scale: 1.2,
});
gsap.to(".banner__info", {
  scrollTrigger: {
    trigger: ".banner",
    markers: false,
    start: "90% 50%",
    scrub: 1,
    duration: 2,
  },
  y: "50%",
  opacity: 0.5,
});

// animation cards
gsap.from(".service-item", {
  scrollTrigger: {
    trigger: ".service__body",
    start: "-30% center",
    end: "60% bottom",
    markers: false,
    scrub: 2,
    duration: 10,
  },
  scale: 0.5,
  opacity: 0.1,
  transformOrign: "top center",
  ease: "none",
  stagger: 1,
});

// animation cards offer
gsap.from(".offer-item", {
  scrollTrigger: {
    trigger: ".offer__body",
    start: "-50% center",
    end: "70% bottom",
    markers: false,
    scrub: 3,
    duration: 9,
  },
  scale: 0.6,
  opacity: 0.15,
  ease: "none",
  stagger: 1,
});


//btn animation
let btnAnimation = () => {
  const tlMessageBtn = gsap.timeline({defaults: {duration: .3}, repeat: -1, repeatDelay: 3});
  tlMessageBtn.to('.service-item__more button',{rotate: -5, scale: 1.1})
  .to('.service-item__more button',{rotate: 5, scale: 1})
  .to('.service-item__more button',{rotate: 0,scale: 1.1})
  return tlMessageBtn;
}

btnAnimation();




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


//---accordions
const accordion = document.querySelectorAll(".accordion-modern");
const accordion2 = document.querySelectorAll(".accordion-work");
const accordion3 = document.querySelectorAll(".accordion-faq");

//---временно не нужно
// accordion.forEach((element) => {
//   element.addEventListener("click", function () {
//     if (element.classList.contains("open")) {
//       element.classList.remove("open");
//     } else {
//       accordion.forEach((elem) => elem.classList.remove("open"));
//       element.classList.add("open");
//     }
//   });
// });
// accordion2.forEach((element) => {
//   element.addEventListener("click", function () {
//     if (element.classList.contains("open")) {
//       element.classList.remove("open");
//     } else {
//       accordion2.forEach((elem) => elem.classList.remove("open"));
//       element.classList.add("open");
//     }
//   });
// });
// accordion3.forEach((element) => {
//   element.addEventListener("click", function () {
//     if (element.classList.contains("open")) {
//       element.classList.remove("open");
//     } else {
//       accordion3.forEach((elem) => elem.classList.remove("open"));
//       element.classList.add("open");
//     }
//   });
// });

window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll(".phone-input"), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i);
      }
      var reg = matrix
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return "\\d{1," + a.length + "}";
        })
        .replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      )
        this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = "";
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });
});

document.addEventListener("scroll", handleScroll);
// get a reference to our predefined button
let scrollToTopBtn = document.querySelector(".scrollToTopBtn");

function handleScroll() {
  let scrollableHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let srollRatio = 0.2;

  if (document.documentElement.scrollTop / scrollableHeight > srollRatio) {
    //show button
    scrollToTopBtn.style.display = "flex";
  } else {
    //hide button
    scrollToTopBtn.style.display = "none";
  }
}

scrollToTopBtn.addEventListener("click", scrollToTop);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

//-----модалка по отправке
const sendForm = document.querySelector(".js-send");
const modalForm = document.querySelector(".js-modal");
const modalFormClose = document.querySelector(".js-modal-close");

sendForm.addEventListener("click", function (e) {
  e.preventDefault();
  modalForm.classList.add("modal-open");
  bodyLock.classList.add("modal-open");
});

document.addEventListener("click", function (event) {
  const clickInside = event.composedPath().includes(sendForm);
  if (!clickInside && !sendForm.contains(event.target)) {
    modalForm.classList.remove("modal-open");
    bodyLock.classList.remove("modal-open");
  }
});

//-----modal smm

const btnSmm = document.querySelector('.js-smm');
const modalSmm = document.querySelector('.modal-smm');
const modalSmmClose = document.querySelector('.modal-smm__close');
const lock = document.body; // Assuming you want to lock the body

function openModal() {
  modalSmm.classList.add('modal-open');
  lock.classList.add("modal-open");
}
function closeModal() {
  modalSmm.classList.remove("modal-open");
  lock.classList.remove("modal-open");
}
btnSmm.addEventListener('click', openModal);
modalSmmClose.addEventListener('click', closeModal);
document.addEventListener("click", function(event) {
  if (!modalSmm.classList.contains('modal-open')) return;
  const isClickInsideModal = modalSmm.contains(event.target);
  const isClickOnButton = btnSmm.contains(event.target);
  
  if (!isClickInsideModal && !isClickOnButton) {
    closeModal();
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && modalSmm.classList.contains('modal-open')) {
    closeModal();
  }
});


//----animation
const animItems = document.querySelectorAll(".anim");

if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("anim-active");
      } else {
        if (!animItem.classList.contains("anim_stop")) {
          animItem.classList.remove("anim-active");
        }
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  setTimeout(() => {
    animOnScroll();
  }, 300);
}




document.querySelector('.js-send').addEventListener('click', function(e) {
  e.preventDefault();
  
  const form = this.closest('form');
  const formData = new FormData(form);
  
  // Get form values
  formData.append('name', form.querySelector('input[type="text"]').value);
  formData.append('phone', form.querySelector('input[type="tel"]').value);
  formData.append('message', form.querySelector('textarea').value);

  fetch('../mailer.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert('Спасибо! Ваше сообщение отправлено.');
          form.reset();
      } else {
          alert('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.');
      }
  })
  .catch(error => {
      console.error('Error:', error);
      console.error('testeteteste');

      alert('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.');
  });
});
