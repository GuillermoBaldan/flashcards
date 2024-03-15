function queueSortingAlgorithm(array) {
    // Obtenemos la fecha actual en milisegundos
    const currentDate = Date.now();
    
    // Filtramos las tarjetas con lastTime menor que la fecha actual
    const pastCards = array.filter(card => card.lastTime !== null && card.lastTime < currentDate);
    
    // Ordenamos las tarjetas pasadas en función de la diferencia entre currentDate y lastTime
    pastCards.sort((a, b) => a.lastTime - b.lastTime);
    
    // Filtramos las tarjetas vírgenes (lastTime y nextTime son nulos)
    const virginCards = array.filter(card => card.lastTime === null && card.nextTime === null);
    
    // Concatenamos las tarjetas pasadas ordenadas y las tarjetas vírgenes
    const sortedArray = pastCards.concat(virginCards);
    
    return sortedArray;
}


/**
 * Returns the text of the "pregunta" field of the first element in the queue.
 * @param {Array} queue The array representing the queue.
 * @returns {string} The text of the "pregunta" field of the first element in the queue.
 */
function getQuestionFromFirst(queue) {
    // Check if the queue is not empty
    if (queue.length > 0) {
        // Return the text of the "pregunta" field of the first element in the queue
        return queue[0].pregunta;
    } else {
        return "You have finished for a while";
    }
}