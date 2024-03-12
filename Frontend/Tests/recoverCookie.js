let data = {
    "mazos": [
      {
        "titulo": "Mazo de Matemáticas",
        "flashcards": [
          {
            "id": 1,
            "pregunta": "¿Cuál es el resultado de 2 + 2?",
            "respuesta": "4",
            "AT": 0,
            "lastTime": "2024-03-05T12:30:45",
            "nextTime": "2024-03-05T12:30:45"
          },
          {
            "id": 2,
            "pregunta": "¿Cuál es la fórmula del área de un círculo?",
            "respuesta": "πr^2",
            "AT": 0,
            "lastTime": "2024-03-05T15:20:10",
            "nextTime": "2024-03-05T15:20:10"
          },
          {
            "id": 3,
            "pregunta": "¿Cuál es el resultado de 5 * 5?",
            "respuesta": "25",
            "AT": 172800, 
            "lastTime": "2024-03-04T18:45:00",
            "nextTime": "2024-03-06T18:45:00"
          }
        ]
      },
      {
        "titulo": "Mazo de Historia",
        "flashcards": [
          {
            "id": 4,
            "pregunta": "¿Quién descubrió América?",
            "respuesta": "Cristóbal Colón",
            "AT": 0,
            "lastTime": "2024-03-05T09:45:00",
            "nextTime": "2024-03-05T09:45:00"
          },
          {
            "id": 5,
            "pregunta": "¿Cuál fue la primera guerra mundial?",
            "respuesta": "La Primera Guerra Mundial",
            "AT": 172800, 
            "lastTime": "2024-03-03T08:10:20",
            "nextTime": "2024-03-05T08:10:20"
          }
        ]
      }
    ]
  }
  
  function setObjectToCookie(object, cookieName) {
    // Convertir el objeto a una cadena JSON
    var jsonString = JSON.stringify(object);
    
    // Establecer la cookie con la cadena JSON
    document.cookie = cookieName + "=" + jsonString + "; path=/";
}

function cookieToObject(cookieName) {
    // Obtener todas las cookies
    let cookies = document.cookie.split(';');
    console.log(cookies);
    // Buscar la cookie con el nombre dado
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName + '=') === 0) {
            console.log("cookie encontrada")
            // Obtener el valor de la cookie y convertirlo de JSON a objeto
            let jsonString = cookie.substring(cookieName.length + 1);
            return JSON.parse(jsonString);
        }
    }

    // Si no se encontró la cookie, devolver null
    return null;
}


setObjectToCookie(data, "data");
console.log(cookieToObject("data"));