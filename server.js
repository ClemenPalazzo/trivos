const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Configuración del transporter de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'palazzocle@gmail.com',
    pass: process.env.EMAIL_PASS || 'yqbw fihb jjdr tipu'
  }
});

// Ruta de prueba
app.get('/test', (req, res) => {
  res.send('El servidor está funcionando correctamente');
});

// Ruta para enviar emails
app.post('/send', async (req, res) => {
  console.log('Recibida solicitud POST a /send');
  console.log('Datos recibidos:', req.body);

  const { nombre, email, mensaje } = req.body;

  try {
    console.log('Intentando enviar email...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER || 'palazzocle@gmail.com',
      to: process.env.EMAIL_USER || 'palazzocle@gmail.com',
      subject: `Nueva inscripción de ${nombre}`,
      text: `
        Nombre: ${nombre}
        Email: ${email}
        Mensaje: ${mensaje}
      `
    });

    console.log('Email enviado:', info.response);
    res.send('Email enviado correctamente');
  } catch (error) {
    console.error('Error al enviar el email:', error);
    res.status(500).send('Error al enviar el email: ' + error.message);
  }
});

// Para desarrollo local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

// Para Vercel
module.exports = app;