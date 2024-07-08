import { openDB } from 'idb';
// ^ import openDB from indexedDB library for promises/async/await

// function to initiate (open or create) DB
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// add to DB
export const putDb = async (content) => {
  // ^ 'content' to be added to database
  console.log('Add to database.');
  const database = await openDB('jate', 1);
  // ^ open or create jate v1 database
  const readWrite = database.transaction('jate', 'readwrite');
  // ^ read/write transaction with jate object store (table)
  const store = readWrite.objectStore('jate');
  // ^ create object store from readwrite transaction
  const request = store.put({ id: 1, value: content });
  // ^ put data in readwrite ready jate object store with a fixed id of `1`
  // ^ beacuse of id: 1, each put overwrites the last
  const result = await request;
  // ^ await completion of put
  console.log('Data saved to the database', result.value);
  // ^ log result
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get from database');
  const database = await openDB('jate', 1);
  // ^ open or create jate v1 database
  const readOnly = database.transaction('jate', 'readonly');
  // ^ read only transaction with jate object store
  const store = readOnly.objectStore('jate');
  // ^ create an object store from readonly transaction
  const request = store.get(1);
  // ^ retrieve data with id of 1
  const result = await request;
  // await completion of get
  result
    // ternary upon the condition of successful data retrieval
    ? console.log('Data retrieved.', result.value)
    : console.log('Failed to get data.');
  return result?.value;
  // return corresponding ternary option
};

initdb();
// initiate (open or create) database
