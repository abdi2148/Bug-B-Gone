'use strict';

const admin = require('firebase-admin');
const db = admin.firestore();

const Bug = require('../models/bug.js');

const createBug = async(data) => {
    try {
        const dataref = await db.collection('bugs').doc(data);
        const snapshot = await dataref.create();
  
        if(!snapshot.exists){
            console.log('Doesnt exist');
        }else{
            const bug =  new Bug(
                snapshot.id,
                snapshot.data().name,
                snapshot.data().desc,
                snapshot.data().shortdesc,
                snapshot.data().type,
                snapshot.data().priority,
                snapshot.data().status,          
                );
           return bug;
        }
    } catch (error) {
        console.log(error);
    }
}

const getAllBugs = async(req, res, next) =>{
    try {
        const dataRef = db.collection('bugs');
        const snapshot = await dataRef.get();
        const bugArray = [];
        if(snapshot.empty){
            res.status(404).send('No bugs found');
        }else{
            await snapshot.forEach(doc => {
                const bug = new Bug(
                    doc.id,
                    doc.data().name,
                    doc.data().desc,
                    doc.data().shortdesc,
                    doc.data().type,
                    doc.data().priority,
                    doc.data().status
                );
                bugArray.push(bug);
            });
           return bugArray;
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getBugWithID = async(data) => {
    try {
        const dataref = await db.collection('bugs').doc(data);
        const snapshot = await dataref.get();
  
        if(!snapshot.exists){
            console.log('Doesnt exist');
        }else{
            const bug =  new Bug(
                snapshot.id,
                snapshot.data().name,
                snapshot.data().desc,
                snapshot.data().shortdesc,
                snapshot.data().type,
                snapshot.data().priority,
                snapshot.data().status
                );
           return bug;
        }
    } catch (error) {
        console.log(error);
    }
}

const updateBug = async(req, res, next) =>{
    try {
        const id = req.param.id;
        const data = req.body;
        const bug = await db.collection('bugs').doc(id);
        await bug.update(data);
        res.send('Bug updated successfully')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteBug = async(req, res, next) =>{
    try {
        const id = req.params.id;
        await db.collection('bugs').doc(id).delete();
        res.send('Bug deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    createBug,
    getAllBugs,
    getBugWithID,
    updateBug,
    deleteBug
}