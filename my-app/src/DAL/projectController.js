'use strict';

const admin = require('firebase-admin');

const db = admin.firestore();
const project = require('../models/project');

const addProject = async(req, res, next) => {
    try{
        const data = req.body;
        await db.collection('projects').doc().set(data);
        res.send('Project saved successfully')
    }catch(error){
        res.status(400).send(error.message);
    }
}

const getAllProjects = async(req, res, next) =>{
    try {
        const projects = await db.collection('projects');
        const data = await projects.get();
        if(data.empty){
            res.status(404).send('No projects found');
        }else{
            data.forEach(doc => {
                const project = new Project(
                    doc.id,
                    doc.data().name
                );
                projectArray.push(project);
            });
            res.send(projectArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getProject = async(req, res, next) =>{
    try {
        const id = req.params.id;
        const project = await db.collection('projects').doc(id);
        const data = await project.get();
        if(!data.exists){
            res.status(404).send('Project with the given id not found');
        }else{
            res.send(data.data())
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateProject = async(req, res, next) =>{
    try {
        const id = req.param.id;
        const data = req.body;
        const project = await db.collection('projects').doc(id);
        await project.update(data);
        res.send('Project updated successfully')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteProject = async(req, res, next) =>{
    try {
        const id = req.params.id;
        await db.collection('projects').doc(id).delete();
        res.send('Project deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addProject,
    getAllProjects,
    getProject,
    updateProject,
    deleteProject
}