const express = require('express');
const route = express.Router();
const bookData = require('../livres.json');
const fs = require('fs');

// Affichage de tous les livres
route.get('/livres', (req, res) => {
    res.json(bookData);
});

// Affichage d'un livre par son id
route.get('/livres/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = bookData.find((livr) => livr.id === bookId);
    if (!book) {
        res.status(404).json({ message: 'Livre non trouvé' });
    } else {
        res.json(book);
    }
});

// Affichage d'un livre par son titre
route.get('/livres/titres/:titre', (req, res) => {
    const bookName = req.params.titre;
    const book = bookData.find((livr) => livr.titre === bookName);
    if (!book) {
        res.status(404).json({ message: 'Livre non trouvé' });
    } else {
        res.json(book);
    }
});

// Ajout d'un nouveau livre
route.post('/livres', (req, res) => {
    const newbook = req.body;
    newbook.id = bookData.length + 1;
    bookData.push(newbook);

    // Mise à jour de livres.json
    fs.writeFileSync('./livres.json', JSON.stringify(bookData, null, 2));

    res.json({ message: 'Livre ajouté avec succès' });
});

// Modification d'un livre par son id
route.put('/livres/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = bookData.findIndex((livr) => livr.id === bookId);
    if (bookIndex === -1) {
        res.status(404).json({ message: 'Livre non trouvé' });
    } else {
        bookData[bookIndex] = { ...bookData[bookIndex], ...req.body };

        // Mise à jour de livres.json
        fs.writeFileSync('./livres.json', JSON.stringify(bookData, null, 2));

        res.json({ message: 'Livre modifié avec succès' });
    }
});

// Suppression d'un livre par son id
route.delete('/livres/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = bookData.findIndex((l) => l.id === bookId);
    if (bookIndex === -1) {
        res.status(404).json({ message: 'Livre non trouvé' });
    } else {
        bookData.splice(bookIndex, 1);

        // Mise à jour de livres.json
        fs.writeFileSync('./livres.json', JSON.stringify(bookData, null, 2));

        res.json({ message: 'Livre supprimé avec succès' });
    }
});

module.exports = route;
