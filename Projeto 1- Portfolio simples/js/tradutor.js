const logo = document.querySelector("#logo");
const smallDescription = document.querySelector(".smalldescription");
const greeting = document.querySelector(".greeting");
const tituloAbout = document.querySelector(".titulo-about");
const tituloSkills = document.querySelector(".titulo-skills");
const tituloWorks = document.querySelector(".titulo-works");
const tituloContact = document.querySelector(".titulo-contact");
const information = document.querySelector(".information");
const teclado = document.querySelector(".teclado");
const editor = document.querySelector(".editor");
const enviar = document.querySelector(".enviar");
const leilao = document.querySelector(".leilao");
const tituloForm = document.querySelector(".titulo-contact_form");
const submit = document.querySelector(".submit");
const nav_ul = document.querySelector(".nav_ul");
const flag_pt = document.querySelector("#flag-pt");
const flag_en = document.querySelector("#flag-en");

var url = "../content/pt-br.json";

flag_pt.addEventListener("click", () => {
    url = "../content/pt-br.json";
    load();
});

flag_en.addEventListener("click", () => {
    url = "../content/en-us.json";
    load();
});

function load() {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
    // ----- Header --------
        logo.innerHTML = data.header.logo;
        nav_ul.innerHTML = "";
        for(var i = 0; i < data.header.menu.length; i++) {
            nav_ul.innerHTML += `<li><a class="nav_ul_li_a" href="#logo">${data.header.menu[i]}</a></li>`;
        }
    // ----- Description -----
        greeting.innerHTML = data.description.greeting;
        smallDescription.innerHTML = data.description.smallDescription;

    // ------ About -----------
        tituloAbout.innerHTML = data.about.tituloAbout;
        information.innerHTML = data.about.information;

    // ------ Skills ----------
        tituloSkills.innerHTML = data.skills.tituloSkills

    // ------ Projects -------
        tituloWorks.innerHTML = data.projects.tituloWorks
        teclado.innerHTML = data.projects.teclado
        editor.innerHTML = data.projects.editor
        leilao.innerHTML = data.projects.leilao

    // ------ Contact ---------
        tituloContact.innerHTML = data.contact.tituloContact
        enviar.innerHTML = data.contact.enviar
        tituloForm.innerHTML = data.contact.tituloForm
        submit.innerHTML = data.contact.submit

    });
}

load();
