// import package and server creation
const express = require ('express');
require('dotenv').config();
const app = express();

// when we'll send a request, it will take the information of the body resquest an attached it to the body request
app.use(express.json())

// get all restaurants
app.get('/api/v1/restaurants', (request,response) => {
    response.status(200).json({
        status: 'success',
        data:{
            restaurants: ['macdo', 'wendys']      
        }
    });
});
// get one restaurant
app.get('/api/v1/restaurants/:id', (request,response) => {
  console.log(request)
});

// create a restaurant
app.post('/api/v1/restaurants', (request,response) => {
    console.log(request.body)
});
// update a restaurant
app.put('/api/v1/restaurants/:id', (request,response) => {
    console.log(request.params.id)
    console.log(request.body)
});
//deleet a restaurant

// set up the port
const port = process.env.PORT || 3001;
// start server on port
app.listen(port, () => {
   console.log(`server is up and listening on port ${3000}`)
})