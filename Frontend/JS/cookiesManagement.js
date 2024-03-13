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


function setObjectToCookie(object, cookieName) {
    // Convertir el objeto a una cadena JSON
    var jsonString = JSON.stringify(object);
    
    // Establecer la cookie con la cadena JSON
    document.cookie = cookieName + "=" + jsonString + "; path=/";
}



function cookieToObject(cookieName) {
    // Obtener todas las cookies
    let cookies = document.cookie.split(';');
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
