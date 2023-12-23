import express from 'express';
import connect from './db/setup-database.js';

import mongoSingleton from './db/mongo-singleton.js';
import api from './routes/api/index.js';

// Connect to MongoDB
// await mongoSingleton.getInstance();
await connect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Use Routes
app.use('/api', api);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = process.env.PORT || 42069;

app.listen(port, () => console.log(`Server started on port ${port}`));
