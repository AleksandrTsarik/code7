"use strict";

const tl = gsap.timeline();
// //----GSAP
tl
  .fromTo(
    ".loader__part2", 
    {
      x: "-200px",
      opacity: 0
    },
    {
      x: "0",
      opacity: 1
    },
    0.8
  )
  .fromTo(
    ".loader__part3", 
    {
      x: "200px",
      opacity: 0
    },
    {
      x: "0",
      opacity: 1
    },
    0.8
  )
  .fromTo(
    ".loader__part5", 
    {
      opacity: 0
    },
    {
      opacity: 1
    },
    1.2
  )
  .fromTo(
    ".loader__part1", 
    {
      x: "150px",
      opacity: 0
    },
    {
      x: "0",
      opacity: 1
    },
    1.5
  )
  .fromTo(
    ".loader__part4", 
    {
      x: "-250px",
      opacity: 0,
      visibility: "hidden",
      width: 0,
    },
    {
      x: "0",
      opacity: 1,
      visibility: "visible",
      width: "auto"
    },
    2
  )  
  .fromTo(
    ".loader__part5--mobile", 
    {
      opacity: 0
    },
    {
      opacity: 1
    },
    2.5
  )
  .fromTo(
    ".loader__part6", 
    {
      y: "15px",
      opacity: 0
    },
    {
      y: 0,
      opacity: 1
    },
    2.5
  )
  .fromTo(
    ".loader__part7", 
    {
      y: "15px",
      opacity: 0
    },
    {
      y: 0,
      opacity: 1
    },
    2.7
  )  
  .fromTo(
    ".anim-title",
    {
      y: "50%",
      opacity: 0,
    },
    {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1,
    },
    3.5
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
    },
    3.5
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
    3.5
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
    4
  )  

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

// LOCAL LOADER

function startPreloader(parentSelector) {
  const parent = document.querySelector(parentSelector);

  parent.classList.add('is-show');
  parent.innerHTML = '<div class="pre-loader"></div>';
}

function stopPreloader(parentSelector, innerContentHtml) {
  const parent = document.querySelector(parentSelector);

  parent.classList.add('is-show');
  parent.innerHTML = innerContentHtml;
}

// Находим параметры в УРЛЕ
let params = (new URL(document.location)).searchParams;
let paramsPaymentStatusSuccess = params.get('paysuccess');
let paramsPaymentOrderNum = params.get('ordernum');

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

document.querySelector(".modal-send__input .phone-input").addEventListener("input", function() {
  console.log(document.querySelector(".modal-send__input .phone-input").value.length)
})

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
const modalTitle = modalForm.querySelector('.modal__text-title');
const modalInfo = modalForm.querySelector('.modal__text-info');

modalFormOverlay.addEventListener("click", function () {
  modalForm.classList.remove("modal-open");
  bodyLock.classList.remove("modal-open");
  modalForm.classList.remove("modal-open--error");
  modalTitle.innerHTML = '';
  modalInfo.innerHTML = '';

  if(params.size !== 0) window.location.href = '/'
});
modalFormClose.addEventListener("click", function () {
  modalForm.classList.remove("modal-open");
  modalForm.classList.remove("modal-open--error");
  bodyLock.classList.remove("modal-open");
  modalTitle.innerHTML = '';
  modalInfo.innerHTML = '';

  if(params.size !== 0) window.location.href = '/'
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
        modalTitle.innerHTML = 'Данные отправлены!';
        modalInfo.innerHTML = 'Мы свяжемся с Вами в ближайшее время.';
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

  // const modal = document.querySelector('.modal-send')
  const form = this.closest("form");
  const formWrap = form.closest('.modal-send__form');
  const formTitle = document.querySelector('.modal-send__title');
  const formSubTitle = document.querySelector('.modal-send__subtitle');

  if (!form) {
    // console.error("Form not found");
    return;
  }  
  
  const formData = new FormData(form);
  const packageInput = form.querySelector('input[name="package"]');
  const priceInput = form.querySelector('input[name="price"]');

  const bodyWidth = document.body.getBoundingClientRect().width;
  const mobileDevice = bodyWidth < 1024 ? true : false;

  if (packageInput) {
    formData.append("package", packageInput.value);
  }
  if (priceInput) {
    formData.append("price", priceInput.value);
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
        formWrap.classList.add('hide');

        formTitle.innerHTML = mobileDevice ? 'Для оплаты<br>перейдите по ссылке' : 'Отсканируйте QR-код' 
        formSubTitle.innerHTML = '' 

        startPreloader('.modal-send__pay-qr');
                
        generateQR(formData);
      } else {
        console.error("Form submission error:", data.message);        
      }
    })
    .catch((error) => {
      console.error('Error:', error);      
    });
});

// Элементы об ошибках в форме заказа тарифы
const trfErrorBlock = document.querySelector('.modal-send__pay-error');
const trfErrorText = trfErrorBlock.querySelector('div');
const formWrap = document.querySelector('.modal-send__form');

// Запускаем таймер для запроса статуса платежа
let timerGetStatusPayment = 1500;

// Забираем переменную из localStorage
// const localOrderID = JSON.parse(localStorage.getItem('orderNumber'));

function generateQR(formData) {
  if(!formData) return false;
  const bodyWidth = document.body.getBoundingClientRect().width;
  const mobileDevice = bodyWidth < 1024 ? true : false;
  formData.append("mobileDevice", mobileDevice);

  let QRHtml = '';

  fetch("../api/payment.php", {
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
      if(data.status === 'success') { 
        QRHtml = mobileDevice ? '<a class="btn btn-dark" href="'+data.data+'">Перейти к оплате</a>' : data.data; 

        setTimeout(function() {
          stopPreloader('.modal-send__pay-qr', QRHtml)
        }, 5000);

        // Устанавливаем переменную в локалсторадж с номером текущего платежа от эквайринга и внутренний номер
        let orderObj = {
          paymentId: data.paymentId,
          orderId: data.orderId
        }
        localStorage.setItem('orderNumber', JSON.stringify(orderObj));
        
        if(localStorage.getItem('orderNumber') !== null) {
          let timerId = setTimeout(function locGetST() {
            getStatusPayment(JSON.parse(localStorage.getItem('orderNumber')).paymentId)
            if(timerGetStatusPayment != 0) { 
              timerId = setTimeout(locGetST, timerGetStatusPayment)
            }
          }, timerGetStatusPayment)
        }   

        //getStatusPayment(data.paymentId);
      }else if(data.status === 'error') {
        console.log(data)
        trfErrorBlock.classList.add('show');
        trfErrorText.innerHTML = data.msg;
      }
    })
    .catch((error) => {
      console.error('Error:', error);       
    });
}

//getStatusPayment('6273128173');

function getStatusPayment(paymentId) {
  if(!paymentId) return false;

  fetch("../api/payment.php?paymentId="+paymentId)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.data);
      if(data.data.Status === "CONFIRMED") {
        timerGetStatusPayment = 0;
        setTimeout(function() {
          window.location.href = "/?paysuccess=true&ordernum="+data.data.PaymentId;
        }, 1500)
      }else if(data.data.Status === "REJECTED") {
        timerGetStatusPayment = 0;
        setTimeout(function() {
          window.location.href = "/?paysuccess=false"
        },1500);
      }
    })
    .catch((error) => {
      console.error('Error:', error);       
    });
}

// Запускаем модалку с инфой о статусе платежа
if(paramsPaymentStatusSuccess === 'true') {
  const orderNum = paramsPaymentOrderNum !== null ? '<b>№'+paramsPaymentOrderNum+'</b> ': '';
  if (modalForm) {
    modalTitle.innerHTML = 'Ваш заказ успешно оплачен'
    modalInfo.innerHTML = 'Ваш заказ '+orderNum+'успешно оплачен. Наш специалист свяжется в ближайшее время. Для более подробной информации, о статусе заявки можно, узнать по телефону:<br> <a href="tel:+79090058585">+7 (909) 005-85-85</a>.<br><br>Чек об оплате отправлен на адрес почты, которую вы указали при оформлении заказа.<br><br><b>CodeSeven</b>'
    modalForm.classList.add("modal-open");
  }
  if (bodyLock) {
    bodyLock.classList.add("modal-open");
  }
} else if (paramsPaymentStatusSuccess === 'false') {
  if (modalForm) {
    modalTitle.innerHTML = 'Ваш платеж не прошел'
    modalInfo.innerHTML = 'Ваш платеж был откланен банком. Для более подробной информации, можно позвонить по телефону:<br> <a href="tel:+79090058585">+7 (909) 005-85-85</a>.<br><br> С уважением, ваш <b>CodeSeven</b>'
    modalForm.classList.add("modal-open");
    modalForm.classList.add("modal-open--error");
  }
  if (bodyLock) {
    bodyLock.classList.add("modal-open");
  }
}

// Кнопка возврата на форму тарифа
const returnForm = document.querySelector('.js-reset-form');

returnForm.addEventListener('click', function() {
  trfErrorBlock.classList.remove('show');
  trfErrorText.innerHTML = '';
  formWrap.classList.remove('hide');
  formWrap.querySelector('[name="name"]').value = '';
  formWrap.querySelector('[name="phone"]').value = '';
  formWrap.querySelector('[name="email"]').value = '';
});

//-----form Tariff
document.addEventListener("DOMContentLoaded", function () {

  const mainLoader = document.querySelector('.main-loader');

  setTimeout(function() {
    mainLoader.classList.add('is-hide');
    document.body.classList.remove('lock');
  }, 3500);

  const btnTariff = document.querySelectorAll(".modal-smm-item__btn");
  const modalTariffsSend = document.querySelector(".modal-send");
  const closeBtnModalTariff = document.querySelector('.modal-send__close');
  const closeOverlayModalTariff = document.querySelector('.modal-send__overlay');
  const modalSmmClose = document.querySelector('.modal-smm');

  // Элементы об ошибках в форме заказа тарифы
  const trfErrorBlock = document.querySelector('.modal-send__pay-error');
  const trfErrorText = trfErrorBlock.querySelector('div');
  const formWrap = document.querySelector('.modal-send__form');

  modalSmmClose.classList.remove("modal-open");
      
  closeBtnModalTariff.addEventListener('click', function() {
    modalTariffsSend.classList.remove("modal-open");
    trfErrorBlock.classList.remove('show');
    trfErrorText.innerHTML = '';
    formWrap.classList.remove('hide');
    formWrap.querySelector('[name="name"]').value = '';
    formWrap.querySelector('[name="phone"]').value = '';
    formWrap.querySelector('[name="email"]').value = '';
    document.querySelector('.modal-send__title').innerHTML = 'Оформить пакет' 
    document.querySelector('.modal-send__subtitle').innerHTML = 'Заполните данные, и мы свяжемся с Вами в ближайшее время для уточнения деталей и подтверждения оплаты.';
    document.querySelector('.modal-send__pay-qr').innerHTML = '';
    document.querySelector('.modal-send__pay-qr').classList.remove('is-show');
  })
  closeOverlayModalTariff.addEventListener('click', function() {
    modalTariffsSend.classList.remove("modal-open");
    trfErrorBlock.classList.remove('show');
    trfErrorText.innerHTML = '';
    formWrap.classList.remove('hide');
    formWrap.querySelector('[name="name"]').value = '';
    formWrap.querySelector('[name="phone"]').value = '';
    formWrap.querySelector('[name="email"]').value = '';
    document.querySelector('.modal-send__title').innerHTML = 'Оформить пакет' 
    document.querySelector('.modal-send__subtitle').innerHTML = 'Заполните данные, и мы свяжемся с Вами в ближайшее время для уточнения деталей и подтверждения оплаты.';
    document.querySelector('.modal-send__pay-qr').innerHTML = '';
    document.querySelector('.modal-send__pay-qr').classList.remove('is-show');
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
    const hiddenPackage = customSelect.querySelector('input[name="package"]');
    const hiddenPrice = customSelect.querySelector('input[name="price"]');

    const defaultSelected = customSelect.querySelector(".modal-send-option.selected");
    if (defaultSelected) {
      trigger.querySelector("span").textContent = defaultSelected.textContent;

      if (hiddenPackage) {
        hiddenPackage.value = defaultSelected.getAttribute("data-value");
      }

      if (hiddenPrice) {
        hiddenPrice.value = defaultSelected.getAttribute("data-price");
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
        if (hiddenPackage) {
          hiddenPackage.value = option.getAttribute("data-value");
          const event = new Event("change");
          hiddenPackage.dispatchEvent(event);
        }
        if (hiddenPrice) {
          hiddenPrice.value = option.getAttribute("data-price");
          const event = new Event("change");
          hiddenPrice.dispatchEvent(event);
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

