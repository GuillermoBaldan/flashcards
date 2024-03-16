document.getElementById('json-to-server').addEventListener('click', async () => {
    
    // Enviar el JSON al servidor
    try {
        const response = await fetch('http://localhost:3000/receiveData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataDecks)
        });
        if (response.ok) {
            console.log('JSON enviado al servidor correctamente.');
        } else {
            console.error('Error al enviar el JSON al servidor:', response.status);
        }
    } catch (error) {
        console.error('Error al enviar el JSON al servidor:', error);
    }
});