document.getElementById('btn-create-deck').addEventListener('click', function() {
    document.getElementById('create-deck-modal').style.display = 'block';
});

document.getElementById('create-deck-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe
    // Aquí puedes agregar la lógica para crear el nuevo mazo
    document.getElementById('create-deck-modal').style.display = 'none';
});

document.getElementsByClassName('close')[0].addEventListener('click', function() {
    document.getElementById('create-deck-modal').style.display = 'none';
});

document.getElementById('create-deck-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe
    
    // Obtener el nombre del mazo ingresado por el usuario
    var deckName = document.getElementById('deck-name').value;

    // Crear un nuevo elemento de lista y enlace
    var newDeckItem = document.createElement('li');
    var newDeckLink = document.createElement('a');
    newDeckLink.href = '#'; // Puedes establecer la URL adecuada si deseas
    newDeckLink.textContent = deckName;
    newDeckItem.appendChild(newDeckLink);

    // Agregar el nuevo elemento de lista al menú de flashcards
    var menuList = document.querySelector('.flashcard-menu ul');
    menuList.insertBefore(newDeckItem, menuList.lastElementChild);

    // Ocultar el modal después de agregar el mazo
    document.getElementById('create-deck-modal').style.display = 'none';
});
