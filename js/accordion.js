class Accordion {
    constructor(element) {
        this.element = element;
        this.head = element.querySelector('.accordion__head');
        this.body = element.querySelector('.accordion__body');
        this.isOpen = false;
        
        // Initialize
        this.init();
    }

    init() {
        this.head.addEventListener('click', () => this.toggle());
        this.isOpen = this.head.classList.contains('open');
        this.updateState();
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.updateState();
    }

    updateState() {
        if (this.isOpen) {
            this.head.classList.add('open');
            this.body.style.height = this.body.scrollHeight + 'px';
        } else {
            this.head.classList.remove('open');
            this.body.style.height = '0';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => new Accordion(accordion));
}); 