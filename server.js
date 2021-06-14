// import package and server creation
const express = require ('express');
require('dotenv').config();
const app = express();
const db = require('./db')
const cors = require('cors');
const { response } = require('express');

app.use(cors());
// when we'll send a request, it will take the information of the body resquest an attached it to the body request
app.use(express.json())

// get all restaurants
app.get('/api/v1/restaurants', async (request,response) => {
    try {
        // const results = await db.query('SELECT * FROM restaurants')
        const restaurantRatingsData = await db.query(
        "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from review group by restaurant_id) review on restaurants.id = review.restaurant_id;"
        );
    response.status(200).json({
        status: 'success',
        results: restaurantRatingsData.rows.length,
        data:{
            restaurants: restaurantRatingsData.rows,
        }
    });
    } catch (error) {
        console.log(error)
    } 
});
// get one restaurant
app.get('/api/v1/restaurants/:id', async (request,response) => {
    try {
        // const restaurant = await db.query('SELECT * FROM restaurants WHERE id = $1', [request.params.id])

        // const reviews = await db.query('SELECT * FROM review WHERE restaurant_id = $1', [request.params.id])
        const restaurant = await db.query(
            "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from review group by restaurant_id) review on restaurants.id = review.restaurant_id where id = $1",
            [request.params.id]
          );
          // select * from restaurants wehre id = req.params.id
      
          const reviews = await db.query(
            "select * from review where restaurant_id = $1",
            [request.params.id]
          );
        response.status(200).json({
        status: 'succes',
        data:{
            restaurants: restaurant.rows[0],
            reviews: reviews.rows
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
app.delete('/api/v1/restaurants/:id', async(request,response) => {
    try {
        const results = await db.query('DELETE FROM restaurants WHERE id = $1',[request.params.id]);
        response.status(204).json({
        status: 'succes',
    });
    } catch (error) {
        console.log(error)
    }
});


app.post('/api/v1/restaurants/:id/addReview', async(request, response) => {
    try {
       const newRating = await db.query(
           'INSERT INTO review (restaurant_id, name, review, rating) values ($1, $2, $3, $4) RETURNING *;', [request.params.id, request.body.name,request.body.review, request.body.rating]);
       response.status(201).json({
           status: 'success',
           data : {
               review: newRating.rows[0]
           }
       })
    } catch (error) {
        console.log(error)
    }
})

// set up the port
const port = process.env.PORT || 3001;
// start server on port
app.listen(port, () => {
   console.log(`server is up and listening on port ${3000}`)
})