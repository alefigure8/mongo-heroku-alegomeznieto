const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');


if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
    console.log(process.env.NODE_ENV)
}

//initializations
const app = express()
require('./database')


//Setting
app.set('port', process.env.PORT || 3000)


//Middlewares
app.use(morgan('dev')); // Devuelve info por consola
const storage = multer.diskStorage({ //Guardar imagenes
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, callback) {
        callback(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({ storage }).single('image'));
app.use(express.urlencoded({ extended: false })); //Interpreta la información como JSON
app.use(express.json()); //Interpreta los JSON
app.use(cors());

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/api/books/', require('../backend/routes/books')); //API REST

//Start the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});