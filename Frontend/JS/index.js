     // Obtener referencia al botón JSON to Cookie
     const jsonToCookieButton = document.getElementById('json-to-cookies');
        
     // Agregar event listener al botón JSON to Cookie
     jsonToCookieButton.addEventListener('click', function() {
         // Lógica para cargar JSON a Cookies
         setObjectToCookie(dataDecks, "dataDecks");
     });

     // Obtener referencia al botón car (¿se supone que es 'cargar'?)
     const cargarButton = document.getElementById('btn-open-modal');

     // Agregar event listener al botón cargar
     cargarButton.addEventListener('click', function() {
         // Lógica para cargar algo...
         // Agrega aquí la lógica para cargar lo que necesites
     });