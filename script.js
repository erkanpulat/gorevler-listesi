const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const btnDelete = document.querySelector('#btnDelete');
const taskList = document.querySelector('#task-list');
const taskAlert = document.querySelector('#taskAlert');
const taskCloseBtn = document.querySelector('#alertClose');
const confirmDelAllModal = new bootstrap.Modal(document.getElementById('confirmDelAllModal'));
const confirmDelModal = new bootstrap.Modal(document.getElementById('confirmDelModal'));
let items;
let delToItem;

loadItems();
eventListeners();

function loadItems(e) {
    items = getItemsFromLS();
    items.forEach(item => createItem(item));
}

function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.splice(items.indexOf(text), 1);
    localStorage.setItem('items', JSON.stringify(items));
}

function eventListeners() {
    form.addEventListener('submit', addNewItem);
    btnDeleteAll.addEventListener('click', deleteAllItems);
    btnDelete.addEventListener('click', deleteItem);
    taskList.addEventListener('click', confirmDelMOpen);
    taskList.addEventListener('mouseover', bgColorChangeOver);
    taskList.addEventListener('mouseout', bgColorChangeOut);
    input.addEventListener('keydown', taskAlertHide);
    taskCloseBtn.addEventListener('click', taskAlertHide);
}

function addNewItem(e) {
    if (input.value === '') {
        taskAlert.classList.remove('visually-hidden');
    } else {
        createItem(input.value);
        setItemToLS(input.value);
        input.value = '';
    }
    e.preventDefault();
}

function createItem(text) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(text));

    const a = document.createElement('a');
    a.classList = 'delete-item text-danger float-end';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a);
    taskList.appendChild(li);
}

function deleteAllItems(e) {
    Array.from(taskList.children).forEach(item => item.remove());
    localStorage.clear();
    confirmDelAllModal.hide();
    e.preventDefault();
}

function confirmDelMOpen(e) {
    if (e.target.classList.contains('fa-times')) {
        delToItem = e.target.parentElement.parentElement;
        confirmDelModal.show();
    }
    e.preventDefault();
}

function deleteItem(e) {
    delToItem.remove();
    deleteItemFromLS(delToItem.textContent);
    confirmDelModal.hide();
    e.preventDefault();
}

function bgColorChangeOver(e) {
    if (e.target.nodeName === 'I') {
        e.target.parentElement.parentElement.classList.add('list-group-item-secondary');
    } else {
        e.target.classList.add('list-group-item-secondary');
    }
}

function bgColorChangeOut(e) {
    e.target.classList.remove('list-group-item-secondary');
}

function taskAlertHide() {
    taskAlert.classList.add('visually-hidden');
}


