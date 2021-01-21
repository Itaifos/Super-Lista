// essa addEventListener serve espetar a DOM carregar p depois fazer as execução, dessa forma reduz os bugs.
window.addEventListener('load', start);

var globalNames = [];
var inputName = null;
var currentIndex = null;
var isEditing = false;



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
        
    }

    function updateName(newName) {
        globalNames[currentIndex] = newName;
        
    }

    function handleTyping(event) {
        // para verificar e bloquear nomes em brancos
        var hasText = !!event.target.value && event.target.value.trim() !== '';

        if (!hasText) {
            clearInput();
            return;
        }
        // ^

        if (event.key === 'Enter'){
            if (isEditing){
                updateName(event.target.value);
            }
            else {
                insertName(event.target.value);
            }

            render();
            isEditing = false;
            clearInput();
        }
    }
    
    inputName.focus();
    inputName.addEventListener('keyup', handleTyping);
}

function render() {
    //criação do botão
    function createDeleteButton(index){
        function deleteName() {
            globalNames.splice(index, 1);
            render();
        }

        var button = document.createElement('button');
        button.classList.add('deleteButton');
        button.textContent = 'x';
        button.addEventListener('click', deleteName)

        return button;
    }

    //criação do span
    function createSpan(name, index){
        function editItem() {
            inputName.value = name;
            inputName.focus();
            isEditing = true;
            currentIndex = index;
        }
        var span = document.createElement('span');
        span.classList.add('clickable');
        span.textContent = name;
        span.addEventListener('click', editItem);

        return span;
    }

    //pegando o elemtento do html que vai sofrer inserção
    var divNames = document.querySelector('#names');
    divNames.innerHTML = '';
    
    //criando a lista
    var ul = document.createElement('ul');

    //percorrendo os vet de nomes e fazendo ordenação da DOM da lista e as funções
    for(var i = 0; i < globalNames.length; i++) {
        var currentName = globalNames[i];

        var li = document.createElement('li');
        var button = createDeleteButton(i);
        var span = createSpan(currentName, i);

        li.appendChild(button);
        li.appendChild(span);

        ul.appendChild(li);
    }
    
    divNames.appendChild(ul);
    clearInput();
}

function clearInput() {
    inputName.value = '';
    inputName.focus();
}