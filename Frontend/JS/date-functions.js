// Obtener referencia al botón "add-card"
const addButton = document.getElementById('add-card');

function isPastDate(timestamp) {
    // Get the current date in milliseconds
    const currentDate = Date.now();
  
    // Compare the timestamp with the current date
    return timestamp < currentDate;
  }



// Agregar event listener al botón "add-card"
addButton.addEventListener('click', function() {
    // Redirigir a la página add-card.html
    window.location.href = 'add-card.html';
});