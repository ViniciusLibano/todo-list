const fazer = document.getElementById('fazer');
const feito = document.getElementById('feito');

const btnSalvarToDo = document.getElementById('btnSalvarToDo');
const inpNewToDoItem = document.getElementById('inpNewToDoItem');


let todoList = [];
let doneList = [];


function clearList() {
    let elements = fazer.querySelectorAll('ul li > div');
    if (elements.length > 0) {
        elements.forEach(el => {
            el.parentElement.remove();
        });
    }

    let doneElements = feito.querySelectorAll('ul li > div');
    if (doneElements.length > 0) {
        doneElements.forEach(el => {
            el.parentElement.remove();
        });
    }
}

function renderList() {
    clearList();
    for(let i = todoList.length - 1; i > -1; i--) {
        let item = todoList[i];
        let element = `<li><div class="item" id="item_${i}"><input type="checkbox" id="ckbFinalizar" /><label>${item}</label><button id="btnExcluir">Excluir</button></div></li>`;
        fazer.querySelector('ul').insertAdjacentHTML('afterbegin', element);
    };

    for(let i = doneList.length - 1; i > -1; i--) {
        let item = doneList[i];
        let element = `<li><div class="item" id="item_${i}"><input type="checkbox" id="ckbFinalizar" checked /><label>${item}</label></div></li>`;
        feito.querySelector('ul').insertAdjacentHTML('afterbegin', element);
    };

    let todoListItems = fazer.querySelectorAll('ul li div.item');
    todoListItems.forEach(item => {
        item.parentElement.querySelector('#btnExcluir').addEventListener('click', (e) => {
            e.preventDefault;
            let itemPos = String(e.target.parentElement.getAttribute('id')).split('_')[1];
            removeToDoItem(itemPos);
        });

        item.parentElement.querySelector('#ckbFinalizar').addEventListener('click', (e) => {
            let itemPos = String(e.target.parentElement.getAttribute('id')).split('_')[1];
            addDoneItem(itemPos);
        });
    });

    let doneListItems = feito.querySelectorAll('ul li div.item');
    doneListItems.forEach(item => {
        item.parentElement.querySelector('#ckbFinalizar').addEventListener('click', (e) => {
            if (!e.target.checked) {
                let itemPos = String(e.target.parentElement.getAttribute('id')).split('_')[1];
                removeDoneItem(itemPos);
            }
        });
    });
}

function removeToDoItem(itemPos) {
    todoList.splice(itemPos, 1);
    renderList();
}

function addToDoItem(item) {
    if (item.length > 0) {
        todoList.push(item);
    }
    renderList();
}

function addDoneItem(itemPos) {
    doneList.push(todoList[itemPos]);
    removeToDoItem(itemPos);

    renderList();
}

function removeDoneItem(itemPos) {
    todoList.push(doneList[itemPos]);
    doneList.splice(itemPos, 1);

    renderList();
}

btnSalvarToDo.addEventListener('click', (e) => {
    e.preventDefault;
    
    let newItem = inpNewToDoItem.value;
    addToDoItem(newItem);
    inpNewToDoItem.value = "";
});

inpNewToDoItem.addEventListener('keypress', (e) => {
    e.preventDefault;
    if (e.key === 'Enter') {
        let newItem = inpNewToDoItem.value;
        addToDoItem(newItem);
        inpNewToDoItem.value = "";
    }
})

renderList();