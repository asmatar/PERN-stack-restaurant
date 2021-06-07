// import package and server creation
const express = require ('express');
require('dotenv').config();
const app = express();
const db = require('./db')

// when we'll send a request, it will take the information of the body resquest an attached it to the body request
app.use(express.json())

// get all restaurants
app.get('/api/v1/restaurants', (request,response) => {

    const result = await db.query('SELECT * FROM restaurants')
    console.log(result)

    response.status(200).json({
        status: 'success',
        data:{
            restaurants: ['macdo', 'wendys']      
        }
    });
});
// get one restaurant
app.get('/api/v1/restaurants/:id', (request,response) => {
    response.status(200).json({
        status: 'succes',
        data:{
            restaurants: 'macdo' 
        }
    })
});

// create a restaurant
app.post('/api/v1/restaurants', (request,response) => {
    response.status(201).json({
        status: 'succes',
        data:{
            restaurants: 'macdo'
        }
    })
});
// update a restaurant
app.put('/api/v1/restaurants/:id', (request,response) => {
    response.status(200).json({
        status: 'succes',
    })
});
//delete a restaurant
app.delete('/api/v1/restaurants', (request,response) => {
    response.status(204).json({
        status: 'succes',
        data:{
            restaurants: 'macdo'
        }
    })
});


// set up the port
const port = process.env.PORT || 3001;
// start server on port
app.listen(port, () => {
   console.log(`server is up and listening on port ${3000}`)
})