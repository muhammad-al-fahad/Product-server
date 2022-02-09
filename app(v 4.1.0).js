const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operation(v 1.0.0)');

const url = 'mongodb://localhost:27017/';
const dbname = 'product';

MongoClient.connect(url, (err, client) => {

    assert.equal(err,null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    await dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes", (result) => {
            console.log("Insert Document:\n", result.ops);

            await dboper.findDocuments(db, "dishes", (docs) => {
                console.log("Found Documents:\n", docs);

                await dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes",
                    (result) => {
                        console.log("Updated Document:\n", result.result);

                        await dboper.findDocuments(db, "dishes", (docs) => {
                            console.log("Found Updated Documents:\n", docs);

                                  await db.dropCollection("dishes", (err, result) => {
                                     assert.equal(err,null);

                                        client.close();
                                    });
                         });
                    });
            });
    });
});