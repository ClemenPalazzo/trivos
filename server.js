const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname)));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para el formulario
app.get('/formulario', (req, res) => {
    res.sendFile(path.join(__dirname, 'formulario.html'));
});

// Ruta de prueba
app.get('/test', (req, res) => {
    res.send('El servidor está funcionando correctamente.');
});

// Ruta para enviar emails
app.post('/send', async (req, res) => {
    const { nombre, email, mensaje } = req.body;

    const mailOptions = {
        from: 'palazzocle@gmail.com',
        to: 'palazzocle@gmail.com',
        subject: 'Nueva inscripción a la lista de espera',
        text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('Email enviado correctamente');
    } catch (error) {
        console.error('Error al enviar el email:', error);
        res.status(500).send('Error al enviar el email');
    }
});

// Configuración del transporter de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'palazzocle@gmail.com',
        pass: 'yqbw fihb jjdr tipu'
    }
});

// Para desarrollo local
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

// Para Vercel
module.exports = app;