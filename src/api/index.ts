import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.listen(1234, () => {
    console.log('Server started on port 1234');
});
