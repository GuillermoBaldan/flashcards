// Función para manejar el evento de envío del formulario
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el modal y el botón para abrirlo
    const modal = document.getElementById('create-deck-modal');
    const btnOpenModal = document.getElementById('btn-open-modal');

    // Función para abrir el modal al hacer clic en el botón
    btnOpenModal.addEventListener('click', () => {
        modal.style.display = 'block'; // Mostrar el modal
    });

    // Función para cerrar el modal cuando se hace clic en la "x"
    const closeModal = document.getElementsByClassName('close')[0];
    closeModal.onclick = function() {
        modal.style.display = 'none'; // Ocultar el modal
    };

    // Función para cerrar el modal cuando se hace clic fuera de él
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none'; // Ocultar el modal
        }
    };

    // Obtener el formulario
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe

        const deckNameInput = document.getElementById('deck-name');
        const deckName = deckNameInput.value; // Obtener el valor del input

        // Obtener los datos existentes
        
        // Añadir un nuevo objeto con el título proporcionado
                dataDecks.mazos.push({ titulo: deckName });
                console.log('Nuevo mazo añadido:', deckName);
                console.log('Datos actualizados:', dataDecks);

                // Aquí podrías realizar otras acciones con los datos actualizados, como guardarlos en localStorage o enviarlos al servidor

                // Cerrar el modal después de agregar el mazo
                modal.style.display = 'none';
                updateDeckList(dataDecks);
                //Almacenamos los datos en una cookie llamada dataDecks
                setObjectToCookie(dataDecks,"dataDecks")
            })
        });

