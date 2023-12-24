import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use Routes
app.use('/', routes);

const port = process.env.PORT || 42069;

app.listen(port, () => console.log(`Server started on port ${port}`));
