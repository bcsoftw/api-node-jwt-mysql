const express = require('express');
const app = express();
// Copia toda la lógica de server.js aquí, pero exporta app para Vercel

// CORS para Vercel
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

// // Para Vercel: manejar 404
// app.use('*', (req, res) => {
//   res.status(404).json({ error: 'Ruta no encontrada' });
// });


module.exports = app;