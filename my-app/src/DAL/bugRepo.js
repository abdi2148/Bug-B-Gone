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
                var bug ={
                    id: doc.id,
                    desc: doc.data().desc,
                    name: doc.data().name,
                    priority: doc.data().priority,
                    shortdesc : doc.data().shortdesc,
                    status: doc.data().status,
                    type: doc.data().type,
                        project :{
                    projid : doc.data().project.id,
                    name : doc.data().project.name,
                    desc : doc.data().project.desc,
                     },
                         user :{
                    userid : doc.data().user.id,
                    name : doc.data().user.name,
                    email : doc.data().user.email,
                     }
                }
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
            var bug ={
                id: snapshot.id,
                desc: snapshot.data().desc,
                name: snapshot.data().name,
                priority: snapshot.data().priority,
                shortdesc : snapshot.data().shortdesc,
                status: snapshot.data().status,
                type: snapshot.data().type,
                    project :{
                projid : snapshot.data().project.id,
                name : snapshot.data().project.name,
                desc : snapshot.data().project.desc,
                 },
                     user :{
                userid : snapshot.data().user.id,
                name : snapshot.data().user.name,
                email : snapshot.data().user.email,
                 }
            }
           return bug;
        }
    } catch (error) {
        console.log(error);
    }
}

const updateBug = async(data) =>{
    try {
        const bug = await db.collection('bugs').doc(data.id).update(data);
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