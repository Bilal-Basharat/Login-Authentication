const UserLogin = require('../models/userSchema');

//creating users 
async function createUser(req, res){
    try{
        console.log('This is client request' + req.body);
        const user = await UserLogin.create(req.body);
        res.status(201).json(user);
    }catch(error){
        res.status(500).json({error: error.message})
    }
};

//getting all users
async function getUsers(req, res){
    try{
        const getAllUsers = await UserLogin.find();
        res.json(getAllUsers);
    }catch(error){
        res.status(500).json({error: error.message})
    }
};

async function updateUser(req, res){
    try{
        const {id} = req.params;
        const updateUser = await UserLogin.findByIdAndUpdate(id, req.body, {new: true});
        res.json(updateUser)
    }catch(error){
        res.status(500).json({error: error.message})
    }
};

async function deleteUser(req, res){
    try{
        const {id} = req.params;
        const deleteaUser = await UserLogin.findByIdAndRemove(id);
        res.json(deleteaUser)
        res.sendStatus(204)
    }catch(error){
        res.status(500).json({error: error.message})
    }
};

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
};