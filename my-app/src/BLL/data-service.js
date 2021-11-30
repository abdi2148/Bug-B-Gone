const bugrepo = require('../DAL/bug-repo.js');

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