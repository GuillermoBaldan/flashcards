    function updateDeckList(dataDecks) {
        console.log("Se ha llamado a la función updateDeckList")
        console.log(dataDecks)
        const deckList = document.getElementById('deck-list');
    
        // Eliminar todos los elementos existentes de la lista
        while (deckList.firstChild) {
            deckList.removeChild(deckList.firstChild);
        }
    
        // Volver a cargar los datos actualizados utilizando dataDecks
        if (dataDecks) {
            // Obtener la lista de mazos
            const mazos = dataDecks.mazos;
            console.log("Lista de mazos desde updateDeckList")
            console.log(mazos)
    
            // Recorrer cada mazo y agregarlo a la lista
            mazos.forEach(mazo => {
                const listItem = document.createElement('li');
                const anchor = document.createElement('a');
                anchor.textContent = mazo.titulo;
                anchor.href = "deck.html";
                listItem.appendChild(anchor);
                deckList.appendChild(listItem); // Agregar listItem como hijo de deckList
                //Añadimos una funcionalidad para que cada vez que se pinche un elemento a se ponga la cookie deck
                programmingDeckCookies();
            });
        } else {
            console.error('No se han cargado los datos.');
        }
    }
    