let dataDecks;

async function getData() {
    try {
        const response = await fetch('./JS/data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al cargar el archivo data.json:', error);
        throw error;
    }
}



       
       // Cargar el archivo data.js
       fetch('./JS/data.json')
       .then(response => response.json())
       .then(data => {
           // Obtener la lista de mazos
           const mazos = data.mazos;
           const deckList = document.getElementById('deck-list');

           // Recorrer cada mazo y agregarlo a la lista
           mazos.forEach(mazo => {
               const listItem = document.createElement('li');
               const anchor = document.createElement('a');
               anchor.textContent = mazo.titulo;
               anchor.href = '#';
               listItem.appendChild(anchor);
               deckList.appendChild(listItem); // Agregar listItem como hijo de deckList
           });
       })
       .catch(error => console.error('Error al cargar el archivo data.js:', error));

       getData()
        .then(data => {dataDecks = data})
        .catch(error => {
            // Manejar el error si ocurre
            console.error('Error al obtener los datos:', error);
        });

       