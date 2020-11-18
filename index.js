import express from 'express';

import players from './routes/players';
import mongoose from 'mongoose';
import cors from 'cors';


const app = express();
app.use('/players', cors());

const port = 3000;


// Define the database connecton and connect to it.
// Errors awill be logged to the console.
// this would normally come from a config file

const connectionString = 'mongodb://127.0.0.1:27017/epl'

mongoose.connect(connectionString, {
    "useNewUrlParser": true,
    "useUnifiedTopology": true,
    'useCreateIndex': true
}).
catch(error => {
    console.log('Database connection refused' + error);
    process.exit(2);
})

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log("DB connected")
});



// Configuring the built-in express body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/players', players);


app.get('/', (req, res) =>
    res.send('Sever Working'));


// app.get('/', (req, res) =>
//     res.send('Sever working, Port number);

app.get('/bananas', (req, res) =>
    res.send('hello world, this is bananas'));

app.all('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

app.listen(port, () => console.log(`Example app listening on 
  ${port}!`))