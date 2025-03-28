"use strict";

const tl = gsap.timeline();
// //----GSAP
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
    },
    0.5
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
    },
    1.5
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
  const tlMessageBtn = gsap.timeline({
    defaults: { duration: 0.3 },
    repeat: -1,
    repeatDelay: 3,
  });
  tlMessageBtn
    .to(".service-item__more button", { rotate: -5, scale: 1.1 })
    .to(".service-item__more button", { rotate: 5, scale: 1 })
    .to(".service-item__more button", { rotate: 0, scale: 1.1 });
  return tlMessageBtn;
};

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
const modalForm = document.querySelector(".js-modal");
const modalFormClose = document.querySelector(".js-modal-close");
const modalFormOverlay = document.querySelector(".js-modal-overlay");

modalFormOverlay.addEventListener("click", function () {
  modalForm.classList.remove("modal-open");
  bodyLock.classList.remove("modal-open");
});
modalFormClose.addEventListener("click", function () {
  modalForm.classList.remove("modal-open");
  bodyLock.classList.remove("modal-open");
});

//-----modal smm

const btnSmm = document.querySelector(".js-smm");
const modalSmm = document.querySelector(".modal-smm");
const modalSmmClose = document.querySelector(".modal-smm__close");
const modalSmmOverlay = document.querySelector(".modal-smm__overlay");
const lock = document.body;

function openModal() {
  modalSmm.classList.add("modal-open");
  lock.classList.add("modal-open");
}

function closeModal() {
  modalSmm.classList.remove("modal-open");
  lock.classList.remove("modal-open");
}
modalSmmOverlay.addEventListener('click', function() {
  modalSmm.classList.remove("modal-open");
});

btnSmm.addEventListener("click", openModal);
modalSmmClose.addEventListener("click", closeModal);
document.addEventListener("click", function (event) {
  if (!modalSmm.classList.contains("modal-open")) return;
  const isClickInsideModal = modalSmm.contains(event.target);
  const isClickOnButton = btnSmm.contains(event.target);

  if (!isClickInsideModal && !isClickOnButton) {
    closeModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modalSmm.classList.contains("modal-open")) {
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
//---Форма обратной связи
document.querySelector(".js-job-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this.closest("form");
  const formData = new FormData(form);

  // Get form values
  formData.append("name", form.querySelector('input[type="text"]').value);
  formData.append("phone", form.querySelector('input[type="tel"]').value);
  formData.append("message", form.querySelector("textarea").value);

  fetch("../mailer.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        modalForm.classList.add("modal-open");
        bodyLock.classList.add("modal-open");

        form.reset();
      } else {
        console.log(data.message);
      }
    })
    .catch((error) => {
      // console.error('Error:', error);
      console.log(
        "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.2"
      );
    });
});


//------форма выбора тарифа
document.querySelector(".js-form-tariff").addEventListener("submit", function (e) {
  e.preventDefault();

  const modal = document.querySelector('.modal-send')
  const form = this.closest("form");
  if (!form) {
    // console.error("Form not found");
    return;
  }
  
  const formData = new FormData(form);
  const packageInput = form.querySelector('input[name="package"]');
  if (packageInput) {
    formData.append("package", packageInput.value);
  }

  fetch("../mailerTariff.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        const modalForm = document.querySelector('.js-modal');
        const bodyLock = document.body;
        
        if (modalForm) modalForm.classList.add("modal-open");
        if (bodyLock) bodyLock.classList.add("modal-open");

        form.reset();
        modal.classList.remove('modal-open')
      } else {
        console.error("Form submission error:", data.message);
        // alert("Ошибка при отправке формы: " + data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      // alert("Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.");
    });
});



//-----form Tariff
document.addEventListener("DOMContentLoaded", function () {

  const btnTariff = document.querySelectorAll(".modal-smm-item__btn");
  const modalTariffsSend = document.querySelector(".modal-send");
  const closeBtnModalTariff = document.querySelector('.modal-send__close')
  const closeOverlayModalTariff = document.querySelector('.modal-send__overlay')
  const modalSmmClose = document.querySelector('.modal-smm')

  modalSmmClose.classList.remove("modal-open");
      
      closeBtnModalTariff.addEventListener('click', function() {
        modalTariffsSend.classList.remove("modal-open");
      })
      closeOverlayModalTariff.addEventListener('click', function() {
        modalTariffsSend.classList.remove("modal-open");
      })
  
  btnTariff.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tariff = btn.getAttribute("data-value");
      const allTariffs = document.querySelectorAll(".modal-send-option");

      allTariffs.forEach((trf) => {
        trf.classList.remove("selected");
        if (trf.getAttribute("data-value") === tariff) {
          trf.classList.add("selected");
        }
      });

      selectedTariff();
      
      modalTariffsSend.classList.add("modal-open");
      modalSmmClose.classList.remove('modal-open')
      
    });
  });

  const customSelect = document.querySelector(".modal-send-select");

  const selectedTariff = () => {

    const trigger = customSelect.querySelector(".modal-send-select__trigger");
    const options = customSelect.querySelectorAll(".modal-send-option");
    const hiddenInput = customSelect.querySelector('input[type="hidden"]');

    const defaultSelected = customSelect.querySelector(".modal-send-option.selected");
    if (defaultSelected) {
      trigger.querySelector("span").textContent = defaultSelected.textContent;
      if (hiddenInput) {
        hiddenInput.value = defaultSelected.getAttribute("data-value");
      }
      updatePriceDisplay(defaultSelected);
    }

    trigger.addEventListener("click", () => {
      customSelect.classList.toggle("open");
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        trigger.querySelector("span").textContent = option.textContent;
        options.forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");
        if (hiddenInput) {
          hiddenInput.value = option.getAttribute("data-value");
          const event = new Event("change");
          hiddenInput.dispatchEvent(event);
        }
        updatePriceDisplay(option);
        customSelect.classList.remove("open");
      });
    });

    document.addEventListener("click", (e) => {
      if (!customSelect.contains(e.target)) {
        customSelect.classList.remove("open");
      }
    });

    customSelect.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        customSelect.classList.toggle("open");
      } else if (e.key === "Escape") {
        customSelect.classList.remove("open");
      } else if (e.key === "ArrowDown" && customSelect.classList.contains("open")) {
        e.preventDefault();
        focusNextOption(customSelect);
      } else if (e.key === "ArrowUp" && customSelect.classList.contains("open")) {
        e.preventDefault();
        focusPrevOption(customSelect);
      }
    });
  };
  //selectedTariff();

  function focusNextOption(select) {
    const options = select.querySelectorAll(".modal-send-option");
    const selected =
      select.querySelector(".modal-send-option.selected") || options[0];
    const nextOption = selected.nextElementSibling;

    if (nextOption) {
      options.forEach((opt) => opt.classList.remove("selected"));
      nextOption.classList.add("selected");
      nextOption.scrollIntoView({ block: "nearest" });
    }
  }
  function focusPrevOption(select) {
    const options = select.querySelectorAll(".modal-send-option");
    const selected =
      select.querySelector(".modal-send-option.selected") || options[0];
    const prevOption = selected.previousElementSibling;

    if (prevOption) {
      options.forEach((opt) => opt.classList.remove("selected"));
      prevOption.classList.add("selected");
      prevOption.scrollIntoView({ block: "nearest" });
    }
  }

  function updatePriceDisplay(option) {
    if (!option) return;

    const priceValue = option.getAttribute("data-price");
    const packageName = option.textContent;

    if (priceValue) {
      const priceDisplay = document.querySelector(".modal-send-price__price");
      if (priceDisplay) {
        priceDisplay.querySelector("div").textContent = packageName;
        priceDisplay.querySelector("span").textContent =
          formatPrice(priceValue) + " ₽";
        const priceContainer = document.querySelector(".modal-send-price");
        if (priceContainer) {
          priceContainer.style.display = "block";
        }
        const discountDisplay = document.querySelector(
          ".modal-send-price__discount span"
        );
        if (discountDisplay) {
          let discount = "5000";
          discountDisplay.textContent = formatPrice(discount) + " ₽";
        }
      }
    }
  }

  function formatPrice(price) {
    return parseInt(price).toLocaleString("ru-RU");
  }
});
