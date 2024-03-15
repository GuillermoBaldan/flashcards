//Declaración de constantes
const buttonsResponseContainer = document.getElementById("buttonsResponseContainer");
const showAnswerButton = document.getElementById("show-answer");
const questionTextElement = document.getElementById("question");
const failureButton = document.getElementById("failure");
const successButton = document.getElementById("success");


//Declaración de variables
let collectionName = document.getElementById("collection-name");
let cardsToSee = document.getElementById("cards-for-review"); 
let reviewedNumberCards = document.getElementById("reviewed-number");
// Obtener el valor de la cookie "valorDeck"

let valorDeck = getCookie("deck");


let dataDecks = cookieToObject("dataDecks");
let answer;
let studyCardsSessionCounter;
let learnedCards = [];
let virginCards = getVirginCardsFromDeck(dataDecks, valorDeck);
let pastCards = getPastCards(dataDecks, valorDeck);
let selectedCards = getCardsFromDeck(dataDecks, valorDeck);
let reviewedNumber = selectedCards.length - virginCards.length - pastCards.length;
let cardsForReview = virginCards.concat(pastCards);
let queue = queueSortingAlgorithm(cardsForReview);
let questionText = getQuestionFromFirst(queue);


function writeCollectionName(){
    collectionName.textContent = "" + valorDeck;
}


function writeFlashcardsToSee(dataDecks,valorDeck){
    // Encontrar el mazo correspondiente al valor de la cookie "valorDeck"
    console.log(dataDecks)
    console.log(valorDeck)
    let mazoSeleccionado = dataDecks.mazos.find(function(mazo) {
        if(mazo.titulo === valorDeck){
            return mazo;
        }else{
            return null;
        }
        
    });
    console.log(mazoSeleccionado)
    cardsToSee.textContent = "" + mazoSeleccionado.flashcards.length;
  }

  function writeReviewedCards(dataDecks,valorDeck){
    let numbercards =  getPastCards(dataDecks, valorDeck).length;
    console.log(numbercards)
    reviewedNumberCards.textContent = "" + numbercards;
  }

  function getVirginCardsFromDeck(dataDecks, valorDeck) {
    let flashcardsSeleccionadas = [];
  
    // Busca el mazo especificado por 'valorDeck'
    const mazoEspecificado = dataDecks.mazos.find(mazo => mazo.titulo === valorDeck);
  
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
 * @param {string} valorDeck The name of the valorDeck to filter cards from.
 * @returns {Array} An array containing cards whose nextTime is in the past.
 */
function getPastCards(dataDecks, valorDeck) {
    let pastCards = [];
  
    // Find the specified valorDeck
    const specifiedDeck = dataDecks.mazos.find(mazo => mazo.titulo === valorDeck);
  
    // If the specified valorDeck is not found, return an empty array
    if (!specifiedDeck) {
      return pastCards;
    }
  
    // Iterate over all cards in the specified valorDeck
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

  // Función para manejar la situación en la que no hay más tarjetas en la cola
function handleNoCardsInQueue() {
  showAnswerButton.style.display = "none";
  failureButton.style.display = "none";
  successButton.style.display = "none";
  // Mostrar un botón para ir al menú principal
  const goToMainMenuButton = document.createElement("button");
  goToMainMenuButton.textContent = "Ir al menú principal";
  goToMainMenuButton.addEventListener("click", function() {
      // Redirigir al usuario a la página principal (index.html)
      window.location.href = "index.html";
  });
  buttonsResponseContainer.appendChild(goToMainMenuButton);
}

function questionScreen() {
  questionText = getQuestionFromFirst(queue);
  if (queue.length!=0){
    questionTextElement.textContent = questionText;
    showAnswerButton.style.display = "block";
    failureButton.style.display = "none"; // Desaparecer botón de fallo
    successButton.style.display = "none"; // Desaparecer botón de bien
  }else{
    console.log("sin cola")
    handleNoCardsInQueue();
  }
}


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

  function answerScreen(){
    console.log("pantalla de mostrar respuesta")
    answer = queue[0].respuesta;
    questionTextElement.textContent = answer;
    buttonsResponseContainer.style.display = "block";
    failureButton.disabled = false;
    successButton.disabled = false;
    showAnswerButton.style.display = "none"; // Haz desaparecer el botón de mostrar respuesta
   }


   function showInformationPannel(){
    //Escribir Nombre de colección
     writeCollectionName()
     writeFlashcardsNumber(dataDecks);
     //Escribir Tarjetas vistas
     //Escribir Número de flashcards
     
   }





