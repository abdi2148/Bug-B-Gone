const admin = require('firebase-admin');

const db = admin.firestore();

async function createBug(data){
    const dataRef = db.collection('bugs');
    
}

async function getAllBugs(){
    const dataRef = db.collection('bugs');
    const snapshot = await dataRef.get();
    const bugdata = [];
if (snapshot.empty) {
    console.log('No data found');
    return null;
}  
    await snapshot.forEach(doc => {
        bugdata.push(doc.data());
    console.log(doc.id, '=>', doc.data());
});
    return bugdata;
}

async function getBugWithID(ID){
    const dataRef = db.collection('bugs').doc(`${ID}`);
    const doc = await dataRef.get();
    if (!doc.exists) {
      console.log('No data found');
      return null;
    } else {
      console.log(doc.id, '=>', doc.data());
      return doc.data();
    }
}

module.exports = {
    getAllBugs: getAllBugs,
    getBugWithID: getBugWithID
}