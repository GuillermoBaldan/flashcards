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

/**
 * Retrieves all cards whose nextTime is in the past compared to the current date.
 * @param {Object} dataDecks The data containing all decks and cards.
 * @param {string} deck The name of the deck to filter cards from.
 * @returns {Array} An array containing cards whose nextTime is in the past.
 */
function getPastCards(dataDecks, deck) {
    let pastCards = [];
  
    // Find the specified deck
    const specifiedDeck = dataDecks.mazos.find(mazo => mazo.titulo === deck);
  
    // If the specified deck is not found, return an empty array
    if (!specifiedDeck) {
      return pastCards;
    }
  
    // Iterate over all cards in the specified deck
    specifiedDeck.flashcards.forEach(flashcard => {
      // Check if nextTime of the flashcard is in the past
      if (isPastDate(flashcard.nextTime) && flashcard.nextTime!=null) {
        // If so, add the flashcard to the array of past cards
        pastCards.push(flashcard);
      }
    });
  
    // Return the array of past cards
    return pastCards;
  }

  function getCardsFromDeck(dataDecks, deckName) {
    // Busca el mazo especificado por 'deckName'
    const specifiedDeck = dataDecks.mazos.find(mazo => mazo.titulo === deckName);
  
    // Si el mazo especificado no se encuentra, devuelve un array vacío
    if (!specifiedDeck) {
      return [];
    }
  
    // Retorna el array de flashcards del mazo especificado
    return specifiedDeck.flashcards;
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
    let selectedDeck = getCookie("deck");
    dataDecks = cookieToObject("dataDecks");
    console.log(dataDecks);
    writeFlashcardsNumber(dataDecks);

    let virginCards = getVirginCardsFromDeck(dataDecks, selectedDeck);
    let pastCards = getPastCards(dataDecks, selectedDeck);
    let selectedCards = getCardsFromDeck(dataDecks, selectedDeck);
    let reviewedNumber = selectedCards.length - virginCards.length - pastCards.length;
    
    // Actualiza el elemento HTML con el número de tarjetas pendientes
    let pendingNumberElement = document.getElementById("pending-number");
    pendingNumberElement.textContent = virginCards.length + pastCards.length;

    // Actualiza el elemento HTML con el número de tarjetas revisadas
    let reviewedNumberElement = document.getElementById("reviewed-number");
    reviewedNumberElement.textContent = reviewedNumber;
});

document.addEventListener("DOMContentLoaded", function() {
    // Define el evento clic en el botón study-button
    document.getElementById("study-button").addEventListener("click", function() {
        // Redirige a la página study-cards.html
        window.location.href = "study-cards.html";
    });

    let selectedDeck = getCookie("deck");
    dataDecks = cookieToObject("dataDecks");
    console.log(dataDecks);
    writeFlashcardsNumber(dataDecks);

    let virginCards = getVirginCardsFromDeck(dataDecks, selectedDeck);
    let pastCards = getPastCards(dataDecks, selectedDeck);
    let selectedCards = getCardsFromDeck(dataDecks, selectedDeck);
    let reviewedNumber = selectedCards.length - virginCards.length - pastCards.length;
    
    // Actualiza el elemento HTML con el número de tarjetas pendientes
    let pendingNumberElement = document.getElementById("pending-number");
    pendingNumberElement.textContent = virginCards.length + pastCards.length;

    // Actualiza el elemento HTML con el número de tarjetas revisadas
    let reviewedNumberElement = document.getElementById("reviewed-number");
    reviewedNumberElement.textContent = reviewedNumber;

    // Habilita el botón solo si hay tarjetas pendientes
    if (virginCards.length + pastCards.length > 0) {
        document.getElementById("study-button").disabled = false;
    }
});
