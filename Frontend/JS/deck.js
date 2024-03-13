//Declaración de variables

let dataDecks;


function writeFlashcardsNumber(dataDecks){
    // Obtener el valor de la cookie "deck"
    let valorDeck = getCookie("deck");
    
    //Obtener el mazo de las cookies
    /* let dataDecks = cookieToObject("dataDecks") */

    // Encontrar el mazo correspondiente al valor de la cookie "deck"
   console.log(dataDecks)
    let mazoSeleccionado = dataDecks.mazos.find(function(mazo) {
        if(mazo.titulo === valorDeck){
            return mazo;
        }else{
            return null;
        }
        
    });
    console.log(mazoSeleccionado)
    // Verificar si se encontró el mazo
    if (mazoSeleccionado) {
        // Obtener la longitud del array "flashcards"
        let numFlashcards = mazoSeleccionado.flashcards.length;
  
        // Actualizar el contenido del elemento <a> con el id "collection-number"
        let collectionNumberElement = document.getElementById("collection-number");
        if (collectionNumberElement) {
            collectionNumberElement.textContent = "Número de Flashcards: " + numFlashcards;
        }
    }
  }

  function getVirginCardsFromDeck(dataDecks, deck) {
    let flashcardsSeleccionadas = [];
  
    // Busca el mazo especificado por 'deck'
    const mazoEspecificado = dataDecks.mazos.find(mazo => mazo.titulo === deck);
  
    // Si el mazo especificado no se encuentra, devuelve un array vacío
    if (!mazoEspecificado) {
      return flashcardsSeleccionadas;
    }
  
    // Recorre todas las flashcards del mazo especificado
    mazoEspecificado.flashcards.forEach(flashcard => {
      // Verifica si la flashcard cumple con las condiciones
      if (flashcard.AT === 0 && flashcard.lastTime === null && flashcard.nextTime === null) {
        // Agrega la flashcard al array de flashcards seleccionadas
        flashcardsSeleccionadas.push(flashcard);
      }
    });
  
    // Devuelve el array con las flashcards seleccionadas
    return flashcardsSeleccionadas;
  }






document.addEventListener("DOMContentLoaded", function() {
    // Función para obtener el valor de una cookie por su nombre
    function getCookie(nombre) {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nombre + '=') === 0) {
                return cookie.substring(nombre.length + 1, cookie.length);
            }
        }
        return "";
    }

   
    // Opcionalmente, puedes imprimir el valor de una cookie específica
    let deck = getCookie("deck");
    console.log("El valor de la cookie 'deck' es:", deck);
});

document.addEventListener("DOMContentLoaded", function() {
    // Función para obtener el valor de una cookie por su nombre
  

    // Obtener el valor de la cookie "deck"
    let valorDeck = getCookie("deck");

    // Actualizar el contenido del elemento <a> con el id "collection-name"
    let collectionNameElement = document.getElementById("collection-name");
    if (collectionNameElement) {
        collectionNameElement.textContent = valorDeck;
    }
});

document.addEventListener("DOMContentLoaded", function() {
    dataDecks= cookieToObject("dataDecks");
    console.log(dataDecks);
    writeFlashcardsNumber(dataDecks);
    let virginCars = getVirginCardsFromDeck(dataDecks,getCookie("deck"))
    console.log(virginCars)
});

