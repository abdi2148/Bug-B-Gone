'use strict';

const admin = require('firebase-admin');
const db = admin.firestore();

const Bug = require('../models/bug.js');

const createBug = async(data) => {
    try{
        await db.collection('bugs').doc().set(data);
       
    }catch(error){
        console.log(error);
    }
}

const getAllBugs = async() =>{
    try {
        const dataRef = db.collection('bugs');
        const snapshot = await dataRef.get();
        const bugArray = [];
        if(snapshot.empty){
            console.log('No bugs found');
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
        console.log(error);
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

const updateBug = async(data) =>{
    try {
        const bug = await db.collection('bugs').doc(data.id);
        await bug.update(data);
        console.log('Bug updated successfully')
    } catch (error) {
        console.log(error);
    }
}

const deleteBug = async(data) =>{
    try {
        await db.collection('bugs').doc(data).delete();
        console.log('Bug deleted successfully');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createBug,
    getAllBugs,
    getBugWithID,
    updateBug,
    deleteBug
}