import { openDB } from 'idb';

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

// accepts some content and adds it to the database
export const putDb = async (content) => {
  // database and version
  const jateDB = await openDB("jate", 1);

  // new transaction specifying db and priviliges
  const tx = jateDB.transaction("jate", "readwrite");

  // open desired object store
  const store = tx.objectStore("jate");

  // pass in content
  const request = store.put({ id:1, value: content});

  // confirmation
  const result = await request;
  console.log("Data saved to the database", result);
};

// gets all the content from the database
export const getDb = async () => {
  // database and version
  const jateDB = await openDB("jate", 1);

  // new transaction specifying db and privileges
  const tx = jateDB.transaction("jate", "readonly");

  // open desired object store
  const store = tx.objectStore("jate");

  // get all request
  const request = store.getAll();

  // confirmation and return
  const result = await request;
  console.log("Data read from database", result);
  return result.value;
};

initdb();
