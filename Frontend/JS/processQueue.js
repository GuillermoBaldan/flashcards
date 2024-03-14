function queueSortingAlgorithm(array) {
    // Obtenemos la fecha actual en milisegundos
    const currentDate = Date.now();
    
    // Ordenamos el array en función de la diferencia entre nextTime y la fecha actual
    array.sort((a, b) => {
        if (a.nextTime !== null && b.nextTime !== null) {
            return a.nextTime - currentDate - (b.nextTime - currentDate);
        } else if (a.nextTime !== null) {
            return -1;
        } else if (b.nextTime !== null) {
            return 1;
        } else {
            return 0;
        }
    });
    
    return array;
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
        return "The question is empty.";
    }
}