const addButton = document.querySelector('#add');

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    console.log(textAreaData);

    textAreaData.forEach((note) => {
        return notes.push(note.value);
    });

    console.log(notes);

    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = '') => {

    // Creating div element using JS

    const note = document.createElement('div');

    // Assigning class value
    note.classList.add('note');

    const htmlData = `<div class="operation">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main" ${text ? "" : "hidden"}></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>`;

    // Adding HTML content inside the created div

    note.insertAdjacentHTML('afterbegin', htmlData);
    // console.log(note);

    // appendChild() It appends a node as the last child of a node

    document.body.appendChild(note);


    // Getting The References:

    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    // Deleting The Node

    delButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
    });

    // Toggle Using Edit Button

    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        // console.log(value);
        mainDiv.innerHTML = value;

        updateLSData();
    });
}

// Getting Data Back From localStorage

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) { notes.forEach((note) => addNewNote(note)) };

addButton.addEventListener('click', () => addNewNote());