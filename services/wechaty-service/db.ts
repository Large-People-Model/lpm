import { MongoClient } from 'mongodb'

import { MONGO_URI } from './config.js'
import type {
  messageJson,
  memberJson
}                       from './schema.js'

// The MongoClient is the object that references the connection to our
// datastore (Atlas, for example)
const client = new MongoClient(MONGO_URI)

// The connect() method does not attempt a connection; instead it instructs
// the driver to connect using the settings provided when a connection
// is required.
export async function mongoDbConnect () {
  await client.connect()
}

// // Make sure to call close() on your client to perform cleanup operations
export async function mongoDbClose () {
  await client.close()
}

const database = client.db('LPM');
const messageCollection = database.collection('messages');
const memberCollection = database.collection('members');

export async function insertMessage (json: ReturnType<typeof messageJson>) {
  const messages = [
    json,
  ]

  try {
    const insertManyResult = await messageCollection.insertMany(messages);
    console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
  }
}

export async function upsertContact (json: ReturnType<typeof memberJson>) {
  const query = { id: json.id };
  const update = { $set: json };
  const options = { upsert: true };

  try {
    const updateResult = await memberCollection.updateOne(query, update, options);
    console.log(`Here is the upsert document count:\n${JSON.stringify(updateResult.upsertedCount)}\n`);
  } catch (err) {
    console.error(`Something went wrong trying to update one document: ${err}\n`);
  }
}
