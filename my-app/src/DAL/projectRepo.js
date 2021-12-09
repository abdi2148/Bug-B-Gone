'use strict';

const admin = require('firebase-admin');

const db = admin.firestore();
const Project = require('../models/project');

const createProject = async(data) => {
    try{
        await db.collection('projects').doc().set(data);
        console.log('Project saved successfully')
    }catch(error){
        console.log(error);
    }
}

const getAllProjects = async() =>{
    try {
        const dataRef = await db.collection('projects');
        const snapshot = await dataRef.get();
        const projectArray = [];
        if(snapshot.empty){
            console.log('No projects found');
        }else{
            await snapshot.forEach(doc => {
                const bug = new Project(
                    doc.id,
                    doc.data().name
                );
                bugArray.push(bug);
            });
            return projectArray;
        }
    } catch (error) {
        console.log(error.message);
    }
}

const getProjectWithID = async(data) =>{
    try {
        const dataref = await db.collection('projects').doc(data);
        const snapshot = await dataref.get();

        if(!data.exists){
            console.log('Project with the given id not found');
        }else{
            const project = new Project(
                snapshot.id,
                snapshot.data().name
            );
            return project;
        }
    } catch (error) {
        console.log(error.message);
    }
}

const updateProject = async(data) =>{
    try {
        const project = await db.collection('projects').doc(data.id);
        await project.update(data);
        console.log('Project updated successfully')
    } catch (error) {
        console.log(error.message);
    }
}

const deleteProject = async(data) =>{
    try {
        await db.collection('projects').doc(data).delete();
        console.log('Project deleted successfully');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    createProject,
    getAllProjects,
    getProjectWithID,
    updateProject,
    deleteProject
}