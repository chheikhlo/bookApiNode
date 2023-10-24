const express = require('express');
const bodyParser = require('body-parser');
const port = 9000;
const app = express();

// Middleware
app.use(bodyParser.json());

// Importation de mes routes
const routes = require('./endpoints/routes');

// Utilisez les routes
app.use('/', routes);

app.listen(port, () => {
    console.log(`Serveur à l'écoute sur le port ${port}`);
});
