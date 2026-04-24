require('dotenv').config();
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store); // If storing in DB
const cors = require('cors');
const sequelize = require('./src/config/db');
const swaggerSetup = require('./swagger');
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/user');
const roleRoutes = require('./src/routes/role');
const productRoutes = require('./src/routes/product');
const purchaseRoutes = require('./src/routes/purchase');
const dashboardRoutes = require('./src/routes/dashboard');
const welcomeRoutes = require('./src/routes/welcomeRoutes');
const Models = require('./src/models/index');
const app = express();
const path = require('path');

// Session store using Sequelize
const sessionStore = new SequelizeStore({
    db: sequelize,
});

// Session middleware (must come before routes)
app.use(session({
    secret: process.env.JWT_SECRET,  // Use a strong secret
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true in production with HTTPS
}));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'src/views'));

app.use(express.static(path.join(process.cwd(), 'public')));

// Sync the session store
sessionStore.sync();
swaggerSetup(app);

// Rutas
app.use('/', welcomeRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/roles', roleRoutes);
app.use('/purchases', purchaseRoutes);
app.use('/dashboard', dashboardRoutes);

// sequelize.sync().then(() => console.log('DB sincronizada'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    // console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
});

module.exports = app;