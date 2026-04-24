const WelcomeController = {
  // Ruta para renderizar la vista de bienvenida
  getWelcome: async (req, res) => {
    try {
      const welcomeData = {
        title: '¡Bienvenido a mi API!',
        message: 'Esta es tu aplicación construida con Node.js, Express y Sequelize',
        apiLinks: [
          {
            name: 'Documentación Swagger',
            url: 'https://api-node-jwt-mysql.vercel.app/api-docs',
            description: 'Documentación interactiva de la API'
          },
          {
            name: 'API Base',
            url: 'https://api-node-jwt-mysql.vercel.app/api',
            description: 'Endpoint base de la API'
          }
        ],
        features: [
          '✅ Express.js Framework',
          '✅ Sequelize ORM',
          '✅ Swagger Documentation',
          '✅ EJS Templates',
          '✅ Responsive Design'
        ]
      };
      
      res.render('welcome', welcomeData);
    } catch (error) {
      console.error('Error en welcome:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

module.exports = WelcomeController;