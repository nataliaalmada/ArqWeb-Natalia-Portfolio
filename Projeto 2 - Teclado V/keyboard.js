const Keyboard = {
    elements: {
        main: null, //Divisão principal
        keysContainer: null, //Divisão das teclas
        keys: [] //Coteúdo de cada tecla
    },
    //Gerenciadores de eventos
    eventHandlers: {
        // Quando houver gatilho no botão de espaço, capslock, enter etc etc ocorrera o evento
        oninput: null,
        // Quando a tecla finalzar o evento (done)
        onclose: null
    },
    properties: {
        value: "",
        // Caixa alta começa inativa
        capsLock: false
    },
    init() {
        // Criando as divisões principais
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        // Configuração dos elementos principais
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
        // Uso do teclado para elementos com o .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },
    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            // Linha dos numerais
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            // Primeira linha de letras(teclado tipo qwerty)
                    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            // Segunda linha de letras
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            // Trceira linha de letras
             "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            // Ultima linha da tecla espaço
                                        "space"
        ];

        // Utilizando os icones do googlegfonts
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };
        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            keyElement.textContent = key;
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");
            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");
                    keyElement.addEventListener("mousedown", () => {
                        // Quando tiver gatinho no botão de espaço, o cursor apaga 
                        //o ultimo caracter  com a propriedade ---->(0, this.properties.value.length - 1)"
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });
                    break;
                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");
                    // A partir do clique, o botão de caixa alta/caps lock é ativado/ desatiado
                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });
                    break;
                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");
                    //  A partir do clique, o botão de enter é acionado e o valor vai ser 
                    //igual o de um \n, ou seja, quebra de linha
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });
                    break;
                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");
                    // A partir do gatilho do botão de espaço, adiciona um " " na frente
                    // frente , isso significa um espaço vazio
                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");
                    // Caso o Done seja acionado, 
                    //o teclado entende que cumpriu sua missão na terra e vai simbora
                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });
                    break;
                default:
                    keyElement.textContent = key.toLowerCase();
                    // Faz a verificação da aticação do botão de caixa alta
                    // e deixa de acordo com a ativação(Uppercase) opu desativação(lowercase)
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }
            fragment.appendChild(keyElement);
            //Aparencia do layout do teclado com a quebra de linha
            if ( key == "backspace" || key == "p" || key == "enter" || key == "?" ){
                fragment.appendChild(document.createElement("br"))
            }
        });
        return fragment;
    },
    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        //verifica se o caps ta ativo, se for o caso,
        // bota as teclas em maisculo (UpperCase), se nõ, em minuisculo (LowerCase)
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },
    //Starta o teclado
    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },
    //Dá um fecho no teclado
    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});