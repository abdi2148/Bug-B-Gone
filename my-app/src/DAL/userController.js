'use strict';

const admin = require('firebase-admin');

const db = admin.firestore();
//FOR THE LOVE OF GOD FUCKING FIX THIS
const user = require('../models/user');

const createUser = async(data) => {
    try {
        const dataref = await db.collection('users').doc(data);
        const snapshot = await dataref.create();
  
        if(!snapshot.exists){
            console.log('Doesnt exist');
        }else{
            const user =  new User(
                snapshot.id,
                snapshot.data().email,
                snapshot.data().name,
                snapshot.data().password
                );
           return user;
        }
    } catch (error) {
        console.log(error);
    }
}

const getAllUsers = async(req, res, next) =>{
    try {
        const users = await db.collection('users');
        const data = await users.get();
        if(data.empty){
            res.status(404).send('No users found');
        }else{
            data.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().name,
                    doc.data().email,
                    doc.data().password
                );
                userArray.push(user);
            });
            res.send(userArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUserWithID = async(req, res, next) =>{
    try {
        const id = req.params.id;
        const user = await db.collection('users').doc(id);
        const data = await user.get();
        if(!data.exists){
            res.status(404).send('User with the given id not found');
        }else{
            res.send(data.data())
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUser = async(req, res, next) =>{
    try {
        const id = req.param.id;
        const data = req.body;
        const user = await db.collection('users').doc(id);
        await user.update(data);
        res.send('Bug updated successfully')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async(req, res, next) =>{
    try {
        const id = req.params.id;
        await db.collection('users').doc(id).delete();
        res.send('User deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserWithID,
    updateUser,
    deleteUser
}