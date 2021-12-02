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

function getBugWithID(data){
    return bugrepo.getBugWithID(data);
}

function updateBug(data){
    return bugrepo.updateBug(data);
}

function deleteBug(data){
    return bugrepo.deleteBug(data);
}

function createProject(data){
    return projectrepo.createProject(data);
}

function getAllProjects(){
    return projectrepo.getAllProjects();
}

function getProjectWithID(data){
    return projectrepo.getProjectWithID(data);
}

function updateProject(data){
    return projectrepo.updateProject(data);
}

function deleteProject(data){
    return projectrepo.deleteProject(data);
}

function createUser(data){
    return userepo.createUser(data);
}

function getAllUsers(){
    return userepo.getAllUsers();
}

function getUserWithID(data){
    return userepo.getUserWithID(data);
}

function updateUser(data){
    return userepo.updateUser(data);
}

function deleteUser(data){
    return userepo.deleteUser(data);
}

module.exports = {
    createBug: createBug,
    getAllBugs: getAllBugs,
    getBugWithID: getBugWithID,
    updateBug: updateBug,
    deleteBug: deleteBug,
    createProject: createProject,
    getAllProjects: getAllProjects,
    getProjectWithID: getProjectWithID,
    updateProject: updateProject,
    deleteProject: deleteProject,
    createUser: createUser,
    getAllUsers: getAllUsers,
    getUserWithID: getUserWithID,
    updateUser: updateUser,
    deleteUser: deleteUser
}