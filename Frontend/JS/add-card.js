function idGeneration(dataDecks) {
    let maxId = 0;

    // Itera sobre cada mazo
    dataDecks.mazos.forEach(mazo => {
        // Itera sobre cada flashcard dentro del mazo
        mazo.flashcards.forEach(flashcard => {
            // Comprueba si el ID de la flashcard actual es mayor que el ID máximo encontrado hasta ahora
            if (flashcard.id > maxId) {
                maxId = flashcard.id;
            }
        });
    });

    // Incrementa el ID máximo en uno para generar un nuevo ID único
    const newId = maxId + 1;

    return newId;
}

function addFlashcard(dataDecks, mazoTitulo, nuevaFlashcard) {
    // Buscar el mazo correspondiente por su título
    const mazoEncontrado = dataDecks.mazos.find(mazo => mazo.titulo === mazoTitulo);

    // Si el mazo existe, agregamos la nueva flashcard
    if (mazoEncontrado) {
        mazoEncontrado.flashcards.push(nuevaFlashcard);
        console.log(`Se ha agregado la flashcard al mazo "${mazoTitulo}".`);
    } else {
        console.log(`No se encontró el mazo "${mazoTitulo}". La flashcard no se pudo agregar.`);
    }

    return dataDecks; // Devolver la estructura de datos modificada
}


document.addEventListener('DOMContentLoaded', function() {
    let dataDecks = cookieToObject("dataDecks");
    const valorDeck = getCookie("deck");
    // Obtener referencia al elemento h2 con id "deck-name"
    const deckNameHeading = document.getElementById('deck-name');
    // Asinar el valor de valorDeck al contenido del h2
    deckNameHeading.textContent = valorDeck;
    // Obtener referencia al formulario
    const flashcardForm = document.getElementById('flashcard-form');

    // Agregar event listener al formulario para el evento de envío
    flashcardForm.addEventListener('submit', function(event) {
        // Evitar que el formulario se envíe normalmente
        event.preventDefault();

        // Obtener el valor de la pregunta y la respuesta
        const question = document.getElementById('question').value;
        const answer = document.getElementById('answer').value;
        //Generar el resto de parámetros
        const id = idGeneration(dataDecks);
        const AT = 0;
        const lastTime = null;
        const nextTime = null;
        // Crear el objeto con todas las variables
        const nuevaFlashcard = {
            id: id,
            pregunta: question,
            respuesta: answer,
            AT: AT,
            lastTime: lastTime,
            nextTime: nextTime
        };
        addFlashcard(dataDecks,valorDeck,nuevaFlashcard)
        setObjectToCookie(dataDecks,"dataDecks");
    });
});