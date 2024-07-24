import express from 'express';
import connection from './database/db.js';
import routes from './routes/route.js';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', routes);

// Database connection
connection();

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
