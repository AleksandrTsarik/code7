"use strict";


//----GSAP
const tl = gsap.timeline();
tl.fromTo(
  ".mix-item--second",
  {
    x: "-100%",
    y: "100%",
  },
  {
    y: 0,
  });
tl.fromTo(
  ".mix-item--third",
  {
    x: "-100%",
  },
  {
    x: "-200%",
  }
);
tl.fromTo(
  ".mix-item--fourth",
  {
    opacity: 0,
    x: "-400%",
  },
  {
    opacity: 1,
    x: "-300%",
    y: 0,
  }
);
tl.fromTo(
  ".mix-item--fifth",
  {
    x: "-400%",
    y: "-100%",
  },
  {
    y: 0,
    x: '-400%'
  }
);
tl.fromTo(
  ".mix-item--sixth",
  {
    x: "-500%",
    y: "100%",
  },
  {
    y: 0,
    x: '-500%'
  }
);

const main = document.querySelector(".mix__list");

ScrollTrigger.create({
  animation: tl,
  trigger: ".mix__list-wrap",
  start: "10% 20%",
  end: () => main.offsetWidth / 2,
  //end: "top center",
  markers: false,
  scrub: 2,
  duration: 0.1,
  pin: true,
});


// animation cards

gsap.from('.service-item', {
  scrollTrigger: {
    trigger: '.service__body',
    start: '-30% center',
    end: '60% bottom',
    markers: true,
    scrub: 2,
    duration: 10
  },
  scale: 0.5,
  opacity: 0.1,
  transformOrign: 'top center',
  ease: 'none',
  stagger: 1
})







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

//----canvas
// function RandChar(prevChar) {
//   if (prevChar && prevChar.ttl) {
//     prevChar.ttl--;
//     return prevChar;
//   }
//   return {
//     char: CHARS[Math.floor(Math.random() * CHARS.length)],
//     ttl: Math.floor(Math.random() * CHAR_MAX_LIFE),
//   };
// }
// function generateDrop(prev) {
//   const chars = Array(Math.floor(Math.random() * (DROP_MAX_LENGTH - 5) + 15))
//     .fill(null)
//     .map(RandChar);
//   const fontSize = Math.floor(
//     Math.random() * (MAX_DROP_FONT_SIZE - MIN_DROP_FONT_SIZE) +
//       MIN_DROP_FONT_SIZE
//   );
//   const font = fontSize + "px monospace";
//   if (!prev) prev = {};
//   prev.x = Math.floor(Math.random() * canvas.width);
//   prev.y = Math.floor(
//     Math.random() * (canvas.height * 2) -
//       canvas.height * 2 -
//       chars.length * fontSize -
//       200
//   );
//   prev.chars = chars;
//   prev.font = font;
//   prev.timeToMove = 0;
//   return prev;
// }
// function scrambleDrop(drop) {
//   drop.chars = drop.chars.map(RandChar);
//   drop.chars.shift();
//   drop.chars.push(RandChar());
//   return drop;
// }
// const CHARS = "code7 7 code7 7".split("");
// const DROPS = 520;
// const DROP_MAX_LENGTH = 2;
// const CHAR_MAX_LIFE = 10;
// const MIN_DROP_FONT_SIZE = 10;
// const MAX_DROP_FONT_SIZE = 16;
// const DROP_SPEED = 100;
// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d", { alpha: true });
// ctx.textRendering = "optimizeSpeed";
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// const drops = [];
// for (let row = 0; row < DROPS; row++) {
//   drops.push(generateDrop());
// }
// let prevTime = 0;
// function drawText(text, x, y, fillStyle, font, shadowBlur = 7) {
//   ctx.shadowColor = fillStyle;
//   ctx.shadowOffsetX = 100;
//   ctx.shadowOffsetY = 200;
//   ctx.shadowBlur = 10;
//   ctx.fillStyle = fillStyle;
//   ctx.font = font;
//   ctx.fillText(text, x, y);
// }
// function draw(timestamp) {
//   const passedTime = timestamp - prevTime;
//   prevTime = timestamp;
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   for (let i = 0; i < drops.length; i++) {
//     const fontSize = parseInt(drops[i].font);
//     for (let k = 0; k < drops[i].chars.length; k++) {
//       let color, shadowBlur;
//       if (k === drops[i].chars.length - 1) {
//         const s = 250 * (k / DROP_MAX_LENGTH);
//         color = `rgb(${s},${s},${s})`;
//         shadowBlur = 5;
//       } else {
//         color = `rgb(12, ${2 * (k / DROP_MAX_LENGTH)}, 0)`;
//         shadowBlur = 10;
//       }
//       drawText(
//         drops[i].chars[k].char,
//         drops[i].x,
//         drops[i].y + k * fontSize,
//         color,
//         drops[i].font,
//         shadowBlur
//       );
//     }
//     drops[i].timeToMove--;
//     if (drops[i].timeToMove <= 0) {
//       scrambleDrop(drops[i]);
//       drops[i].y += fontSize;
//       drops[i].timeToMove = fontSize ** -6.5 / (DROP_SPEED * 10 ** -10);
//     }
//     if (drops[i].y >= canvas.height) drops[i] = generateDrop(drops[i]);
//   }
//   window.requestAnimationFrame(draw);
// }
// window.requestAnimationFrame(draw);
// window.addEventListener("resize", (event) => {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// });

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


