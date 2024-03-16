const express = require('express');
const cors = require('cors'); // Importa el módulo cors
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para permitir el uso de JSON en las solicitudes
app.use(express.json());
// Middleware cors para permitir solicitudes desde cualquier origen
app.use(cors());

let dataFromFrontend = {}; 

// Ruta para recibir datos del frontend y guardarlos en un archivo datarecived.json
app.post('/receiveData', (req, res) => {
    dataFromFrontend = req.body;
    console.log('Datos recibidos del frontend:', dataFromFrontend);
    
    // Convertir el objeto JavaScript a JSON
    const jsonData = JSON.stringify(dataFromFrontend, null, 2);
    
    // Escribir el JSON en el archivo datarecived.json
    fs.writeFile(path.join(__dirname, 'data', 'datarecived.json'), jsonData, (err) => {
        if (err) {
            console.error('Error al escribir en el archivo datarecived.json:', err);
            res.status(500).send('Error interno del servidor.');
            return;
        }
        console.log('Datos guardados en datarecived.json correctamente.');
        res.send('Datos recibidos y guardados correctamente.');
    });
});

// Ruta para enviar datos al frontend
app.get('/sendData', (req, res) => {
    // Leer el archivo JSON
    fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON:', err);
            res.status(500).send('Error interno del servidor.');
            return;
        }
        // Convertir el contenido del archivo JSON en un objeto JavaScript
        const jsonData = JSON.parse(data);
        console.log('Enviando datos al frontend:', jsonData);
        res.json(jsonData);
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
