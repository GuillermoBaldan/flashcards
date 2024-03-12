function programmingDeckCookies(){
    // Obtener la lista de mazos
    const deckList = document.getElementById("deck-list");

    // Obtener todos los elementos li dentro de la lista de mazos
    const deckItems = deckList.getElementsByTagName("li");

    // Adjuntar evento de clic a cada elemento li
    for (let i = 0; i < deckItems.length; i++) {
        deckItems[i].addEventListener("click", function() {
            // Obtener el valor del anchor dentro del li
            let deckName = this.querySelector("a").innerText;
            // Almacenar el valor en una cookie
            document.cookie = "deck=" + deckName + "; path=/";
        });
    }
}