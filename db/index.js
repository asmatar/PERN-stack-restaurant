// importing pb librairie
const { Pool } = require('pg')
// create new poool to connect with the database
const pool = new Pool(
  {
    user:'postgres',
    // host:'localhost',
    host:'art-drl-back-rest.netlify.app',
    database:'yelp',
    password:'vanillaninja',
    port: 5432
  }
)
// export it
module.exports = {
  query: (text, params) => pool.query(text, params),
}