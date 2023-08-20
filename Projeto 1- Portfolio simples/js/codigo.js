const navBar = document.querySelector(".nav_menu_bars");
const navUl = document.querySelector(".nav_ul");
const navLinks = document.querySelectorAll(".nav_ul li");

function add_removeClass() {
  navBar.classList.toggle("nav_menu_bars_active");
  navUl.classList.toggle("nav_ul_active");
}

navBar.addEventListener("click", () => {
  add_removeClass();
});

navLinks.forEach((e) => {
  e.addEventListener("click", () => {
    add_removeClass();
  });
});

function widthSize() {
  let ancho = window.innerWidth;
  if (ancho > 750) {
    navBar.classList.remove("nav_menu_bars_active");
    navUl.classList.remove("nav_ul_active");
  }
}

window.addEventListener("resize", widthSize);

const themeToggle = document.getElementById("theme-toggle-button");
const body = document.body;

themeToggle.addEventListener("click", () => {
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  }
});

// Recuperar a preferência do usuário do localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
} else {
  body.classList.add("light-mode");
}

// Envio do formulario com o formSubmit 
class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success;
  }

  displayError() {
    this.form.innerHTML = this.settings.error;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerText = "Enviando...";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySuccess();
    } catch (error) {
      this.displayError();
      throw new Error(error);
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1 class='success'>Mensagem enviada!</h1>",
  error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
});
formSubmit.init();

const scrollToTopButton = document.getElementById("scrollToTopBtn");

// Mostra o botão quando o scroll for maior do que 80% da altura da janela
window.onscroll = () => {
  if (document.body.scrollTop > window.innerHeight * 0.8 || document.documentElement.scrollTop > window.innerHeight * 0.8) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
};

// Faz o scroll suave até o topo da página quando o botão for clicado
scrollToTopButton.addEventListener("click", () => {
  document.body.scrollTop = 0; // Para navegadores que usam document.body
  document.documentElement.scrollTop = 0; // Para navegadores que usam document.documentElement
});