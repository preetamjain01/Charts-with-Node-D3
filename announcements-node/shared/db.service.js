//Connection to mongodb server
const MongoClient = require('mongodb').MongoClient
    , assert = require('assert')
    , Promise = require('bluebird');

const {MONGOURL} = require('./app-constants');

// Function to connect to the server
exports.connect = async function () {
    return MongoClient.connect(MONGOURL)
        .then(function (client) {
            return client;
        })
        .catch(function (err) {
            console.log(err);
            throw Error('Unable to connect to mongoDB');
        })
};

// Function to add new user to the database
exports.insertOne = async function (data, dbName, collectionName) {
    try {
        console.log("insert called");
        const client = await this.connect();
        const db = client.db(dbName);
        return new Promise((resolve, reject) => {
            db.collection(collectionName).insertOne(data, function (err, r) {
                assert.equal(null, err);
                console.log("Status", r.insertedCount);
                assert.equal(1, r.insertedCount);
                resolve(r.insertedCount);
            })
        });
    } catch (e) {
        console.log(e);
        throw Error('Error adding entry to the database');
    }
};

//Function to find the user in the database
exports.findOne = async function (query, dbName, collectionName) {
    try {
        const client = await this.connect();
        const db = client.db(dbName);
        return new Promise((resolve, reject)=> {
            db.collection(collectionName).findOne(query, function (err, r) {
                assert.equal(null, err);
                console.log(`Result for query`, r);
                resolve(r);
            });
        })

    } catch (e) {
        console.log(e);
        throw Error('No results in the database');
    }
};

exports.findOneAndUpdate = async function (query, dbName, collectionName, data) {
    try {
        const client = await this.connect();
        const db = client.db(dbName);
        return new Promise((resolve, reject)=> {
            db.collection(collectionName).findOneAndUpdate(query, data, function (err, r) {
                assert.equal(null, err);
                console.log(`Result for query`, r);
                resolve(r);
            });
        })
    } catch (e) {
        console.log(e);
        throw Error('No results in the database');
    }
};

exports.find = async function (query, dbName, collectionName) {
    try {
        const client = await this.connect();
        const db = client.db(dbName);
        return new Promise((resolve, reject)=> {
            db.collection(collectionName).find(query).toArray(function (err, r) {
                assert.equal(null, err);
                console.log(`Result for query`, r);
                resolve(r);
            });
        })

    } catch (e) {
        console.log(e);
        throw Error('No records in the database');
    }
};

exports.replaceOne = async function (query, dbName, collectionName, data) {
    try {
        const client = await this.connect();
        const db = client.db(dbName);
        return new Promise((resolve, reject)=> {
            db.collection(collectionName).replaceOne(query, data, function (err, r) {
                assert.equal(null, err);
                console.log(`Result for query`, r.result);
                resolve(r.result);
            });
        })
    } catch (e) {
        console.log(e);
        throw Error('No results in the database');
    }
};

exports.deleteOne = async function (query, dbName, collectionName) {
    try {
        const client = await this.connect();
        const db = client.db(dbName);
        return new Promise((resolve, reject)=> {
            db.collection(collectionName).deleteOne(query, function (err, r) {
                assert.equal(null, err);
                console.log(`Result for query`, r);
                resolve(r);
            });
        })

    } catch (e) {
        console.log(e);
        throw Error('No results in the database');
    }
};

exports.updateOne = async function (data, dbName) {
    try {
        const client = await this.connect();
        const db = client.db(dbName);
        db.collection('users').updateOne(data, function (err, r) {
            assert.equal(null, err);
            console.log("Status", r);
            assert.equal(0, r.matchedCount);
            assert.equal(1, r.upsertedCount);
            return;
        })
    } catch (e) {
        console.log(e);
        throw Error('Error updating the database');
    }
};
