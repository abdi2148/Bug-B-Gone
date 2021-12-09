'use strict';

const admin = require('firebase-admin');

const db = admin.firestore();
const User = require('../models/user');

const createUser = async(data) => {
    try{
        await db.collection('users').doc().set(data);
        console.log('User saved successfully')
    }catch(error){
        console.log(error.message);
    }
}

const getAllUsers = async() =>{
    try {
        const dataRef = await db.collection('users');
        const snapshot = await dataRef.get();
        const userArray = [];
        if(snapshot.empty){
            console.log('No users found');
        }else{
            await snapshot.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().name,
                    doc.data().email,
                    doc.data().password
                );
                userArray.push(user);
            });
            return userArray;
        }
    } catch (error) {
        console.log(error.message);
    }
}

const getUserWithID = async(data) =>{
    try {
        const dataref = await db.collection('users').doc(data);
        const snapshot = await dataref.get();
        if(!snapshot.exists){
            console.log('User with the given id not found');
        }else{
            const user = new User(
                snapshot.id,
                snapshot.data().name,
                snapshot.data().email,
                snapshot.data().password
            );
            return user;
        }
    } catch (error) {
        console.log(error.message);
    }
}

const updateUser = async(data) =>{
    try {
        const user = await db.collection('users').doc(data.id);
        await user.update(data);
        console.log('Bug updated successfully')
    } catch (error) {
        console.log(error.message);
    }
}

const deleteUser = async(data) =>{
    try {
        await db.collection('users').doc(data).delete();
        console.log('User deleted successfully');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserWithID,
    updateUser,
    deleteUser
}