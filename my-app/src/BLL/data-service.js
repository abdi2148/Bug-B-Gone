
const admin = require('firebase-admin');
const ServiceAccount = require('../../config/ServiceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount)
});

const bugrepo = require('../DAL/bugController');
const userepo = require('../DAL/userController');
const projectrepo = require('../DAL/projectController');

function createBug(data){
    return bugrepo.createBug(data);
}


function getAllBugs(){
    return bugrepo.getAllBugs();
}

function getBugWithID(ID){
    return bugrepo.getBugWithID(ID);
}

module.exports = {
    getAllBugs: getAllBugs,
    getBugWithID: getBugWithID
}