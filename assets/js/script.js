const draggables = document.querySelectorAll('.draggable');
const dropzone = document.getElementById('drop-zone');
const deleteButtons = document.querySelectorAll('.fa-trash-alt');

draggables.forEach((element)=>{
    element.addEventListener('dragstart', (e)=>{
        element.classList.add('dragging');
    })
    element.addEventListener('dragend', (e)=>{
        element.classList.remove('dragging');
    })
});

dropzone.addEventListener('dragover', (e)=>{
    e.preventDefault();
    if(e.target.classList.contains('draggable')) e.target.classList.add('draggingover');
    if(e.target.parentElement.classList.contains('draggable')) e.target.parentElement.classList.add('draggingover'); //Check if we drag over any child node
    if(e.target.parentElement.parentElement.classList.contains('draggable')) e.target.parentElement.parentElement.classList.add('draggingover'); //Check if we drag over any child node
});

dropzone.addEventListener('dragleave', (e)=>{
    if(e.target.classList!= undefined) e.target.classList.remove('draggingover');
    if(e.target.parentElement.classList!= undefined) e.target.parentElement.classList.remove('draggingover');
    if(e.target.parentElement.parentElement.classList!= undefined) e.target.parentElement.parentElement.classList.remove('draggingover');
});

dropzone.addEventListener('drop', (e) => {
    let target = document.querySelector('.draggingover');
    let dragged = document.querySelector('.dragging');
    swapNodes(dragged, target);
    if(e.target.classList!= undefined) e.target.classList.remove('draggingover');
    if(e.target.parentElement.classList!= undefined) e.target.parentElement.classList.remove('draggingover');
    if(e.target.parentElement.parentElement.classList!= undefined) e.target.parentElement.parentElement.classList.remove('draggingover');
});

function swapNodes (a, b) {
    const allItems = [...document.querySelectorAll('.draggable')];
    const positionDragged = allItems.indexOf(a)+1;
    const positionTarget = allItems.indexOf(b)+1;
    dropzone.insertBefore(a, allItems[positionTarget])
    dropzone.insertBefore(b, allItems[positionDragged])
}

deleteButtons.forEach((element) => {
    element.addEventListener('click', () => {
        const parent = element.parentElement.parentElement
        parent.remove();
    });
});