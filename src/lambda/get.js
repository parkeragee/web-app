const mongoose = require('mongoose');

let conn = null;

// mongodb://username:password@host:port/db_name
const uri = process.env.DB_URL || 'mongodb://127.0.0.1:27017/jobby';

exports.handler = async (event, context, callback) => {
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
            conn.model('Accounts', new mongoose.Schema({
                accountOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true, index: true },
                users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }]
            }, {
                timestamps: true,
            }));
            conn.model('Users', new mongoose.Schema({
                email: { type: String, required: true, index: { unique: true } },
            }, {
                timestamps: true,
            }));
        } catch(err) {
            callback(err);
        }
    }

    const db = conn.model('Accounts');
    const users = conn.model('Users');

    try {
        const doc = await db.find().populate('accountOwner').populate('users');

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(doc),
        });
    } catch(err) {
        callback(err);
    }
};
