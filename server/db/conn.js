const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);
const dbo = client.db("cat_data");

if (dbo) {
  console.log('Connected to MongoDB');
}
/* A small example of querying data from the database
async function run() {
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
*/

module.exports = dbo;