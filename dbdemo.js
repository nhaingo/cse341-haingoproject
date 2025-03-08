/*const {MongoClient} = require('mongodb');
const env =  require('dotenv');
env.config();

async function main() {
    const uri = 'mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.9faie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    const client = new MongoClient(uri);
    try {
        await client.connect();
    } catch (e) { console.error(e) } finally {await client.close()};
}

main().catch(console.error); */

const { MongoClient } = require('mongodb');
const dotenv = require('dotenv'); // Note: 'env' is fine, but 'dotenv' is more conventional

// Load environment variables from .env file
dotenv.config();

async function main() {
    // Use backticks for template literals to correctly interpolate environment variables
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.9faie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Successfully connected to MongoDB Atlas");
        //Call the function createListing to create a single new document in the 'sample_airbnb' database
        /*await createListing(client, {
            name: "Lovely Loft",
            summary: "A charming loft in Paris",
            bedrooms: 1,
            bathrooms: 1
        });*/
        //Call the function createMultipleListings to create multiple documents in the 'sample_airbnb' database
        /*await createMultipleListings(client, [
            {
            name: "infinite Views",
            summary: "Modern ome with inifinite views from the infinity pool",
            property_type: "House",
            bedrooms: 5,
            bathrooms: 4.5,
            beds: 5
            },
            {
            name: "Private room in London",
            property_type: "Apartment",
            bedrooms: 1,
            bathrooms: 1,
            },
            {
            name: "Beautiful Beach House",
            summary: "Enjoy relaxed living in this house with a private beach",
            bedrooms: 4,
            bathrooms: 2.5,
            beds: 7,
            last_review: new Date()
            }
        ]);*/


        //call the function listDatabases
        await listDatabases(client);
    } catch (e) {
        console.error("Error connecting to MongoDB:", e);
    } finally {
        await client.close();
        console.log("Connection closed");
    }
}

main().catch(console.error);


//Build the function listDatabases() to print the name of the databases in the cluster.
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log('Databases: ');
    databasesList.databases.forEach(db => {
        console.log(`${db.name}`);
    });
}

//Create a new listing in the 'sample_airbnb' database 
/*async function createListing(client, newListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}*/

//Create multiple listings in the 'sample_airbnb' database 
/*async function createMultipleListings(client, newListings) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);
    console.log(`${result.insertedCount} New listings crceated with the following Ids: `);
    console.log(result.insertedIds);
    }
*/
