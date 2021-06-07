// import package and server creation
const express = require ('express');
require('dotenv').config();
const app = express();
const db = require('./db')

// when we'll send a request, it will take the information of the body resquest an attached it to the body request
app.use(express.json())

// get all restaurants
app.get('/api/v1/restaurants', async (request,response) => {
    try {
        const results = await db.query('SELECT * FROM restaurants')
    console.log(results)
    response.status(200).json({
        status: 'success',
        results: results.rows.length,
        data:{
            restaurants: results.rows,
        }
    });
    } catch (error) {
        console.log(error)
    } 
});
// get one restaurant
app.get('/api/v1/restaurants/:id', async (request,response) => {
    try {
        const results = await db.query('SELECT * FROM restaurants WHERE id = $1', [request.params.id])
        console.log(results.rows[0])
        response.status(200).json({
        status: 'succes',
        data:{
            restaurants: results.rows[0]
        }
    })
    } catch (error) {
        console.log(error)
    }
});

// create a restaurant
app.post('/api/v1/restaurants', async (request,response) => {
    try {
        const results = await db.query('INSERT INTO restaurants (name, location, price) values ($1, $2, $3) RETURNING *', [request.body.name,request.body.location, request.body.price ])
        console.log(results)
        response.status(201).json({
        status: 'succes',
        data:{
            restaurants: results.rows[0]
        }
    })
    } catch (error) {
        console.log(error)
    } 
});
// update a restaurant
app.put('/api/v1/restaurants/:id', async (request,response) => {
    try {
        const results = await db.query('UPDATE restaurants SET name = $1, location = $2, price = $3 WHERE id = $4 RETURNING *', [request.body.name, request.body.location, request.body.price, request.params.id]);
        console.log(results.rows[0])
        response.status(200).json({
        status: 'succes',
        data: {
            restaurant : results.rows[0]
        }
    })
    } catch (error) {
        console.log(error)
    }
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