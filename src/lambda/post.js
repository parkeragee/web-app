const mongoose = require('mongoose');

let conn = null;

// mongodb://username:password@host:port/db_name
const uri = process.env.DB_URL || 'mongodb://127.0.0.1:27017/jobby';

exports.handler = async function(event, context, callback) {
    const documentObj = JSON.parse(event.body);
    // Make sure to add this so you can re-use `conn` between function calls.
    // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
    context.callbackWaitsForEmptyEventLoop = false;

    // Because `conn` is in the global scope, Lambda may retain it between
    // function calls thanks to `callbackWaitsForEmptyEventLoop`.
    // This means your Lambda function doesn't have to go through the
    // potentially expensive process of connecting to MongoDB every time.
    if (conn == null) {
        try {
            conn = await mongoose.connect(uri, {
                // Buffering means mongoose will queue up operations if it gets
                // disconnected from MongoDB and send them when it reconnects.
                // With serverless, better to fail fast if not connected.
                bufferCommands: false, // Disable mongoose buffering
                bufferMaxEntries: 0, // and MongoDB driver buffering
                useNewUrlParser: true,
            });
            conn.model('Test', new mongoose.Schema({ name: String }));
        } catch(err) {
            callback(err);
        }
    }

    const db = conn.model('Test');

    try {
        const doc = await db.create(documentObj);
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(doc),
        });
    } catch(err) {
        callback(err);
    }
};
