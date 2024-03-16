let dataDecks;

async function getDataFromServer() {
    try {
        const response = await fetch('http://localhost:3000/sendData', {
            method: 'GET',
            mode: 'cors', // Establecer el modo CORS
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al cargar los datos del servidor:', error);
        throw error;
    }
}

// Cargar los datos del servidor
getDataFromServer()
    .then(data => {
        dataDecks = data;
        // Obtener la lista de mazos
        const mazos = dataDecks.mazos;
        const deckList = document.getElementById('deck-list');

        // Recorrer cada mazo y agregarlo a la lista
        mazos.forEach(mazo => {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.textContent = mazo.titulo;
            anchor.href = 'deck.html';
            listItem.appendChild(anchor);
            deckList.appendChild(listItem);
        });

        // Asociamos un Event Listener a cada elemento li que creará una cookie al pinchar en él.
        programmingDeckCookies();
    })
    .catch(error => console.error('Error al cargar los datos del servidor:', error));
