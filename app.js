const express = require('express');
const app = express();
const api = require('./api/v1/index');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const connection = mongoose.connection;


app.set('port', (process.env.port || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());
app.use('/api/v1', api);

mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser:true});
connection.on('error', (err) => {
	console.log(`connection to mongoDB error: ${err.message}`);
});
connection.once('open', () => console.log('connected to mongoDB'));

app.listen(app.get('port'), () => {
	console.log(` express server listening on port ${app.get('port')}`);
});