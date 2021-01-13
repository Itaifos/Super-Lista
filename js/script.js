// essa addEventListener serve espetar a DOM carregar p depois fazer as execução, dessa forma reduz os bugs.
window.addEventListener('load', start);

var globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
var inputName = null;

function start() {
    inputName = document.querySelector('#inputName');
    
    preventFormSubmit();
    activateInput();
    render();
}

//é para evitar que o form seja recarregado
function preventFormSubmit() {
    function handleFormSubmit(event) {
        event.preventDefault();
    }
    
    var form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
    function insertName(newName) {
        globalNames.push(newName);
        render();
    }

    function handleTyping(event) {
        if (event.key === 'Enter'){
            insertName(event.target.value);
        }
    }
    
    inputName.focus();
    inputName.addEventListener('keyup', handleTyping);
}

function render() {
    var divNames = document.querySelector('#names');
    divNames.innerHTML = '';
    
    var ul = document.createElement('ul');

    for(var i = 0; i < globalNames.length; i++) {
        var currentName = globalNames[i];

        var li = document.createElement('li');
        li.textContent = currentName;
        ul.appendChild(li);
    }
    
    divNames.appendChild(ul);
    clearInput();
}

function clearInput() {
    inputName.value = '';
    inputName.focus();
}