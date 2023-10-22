const bCrypyt = require('bcrypt')
const UserLogin = require('../models/userSchema');

//creating users 
async function createUser(req, res){
    try{
        const {password} = req.body;
        const hashPassword = await bCrypyt.hash(password,8);
        let data=
            {
                "firstName":req.body.firstName,
                "lastName": req.body.lastName,
                "email": req.body.email,
                "password": hashPassword,
                "DoB": req.body.DoB
        };
        // console.log('This is client request' + req.body);
        const user = await UserLogin.create(data);
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
        const {password} = req.body;
        const hashPassword = await bCrypyt.hash(password,8);
        let updatedData =
            {
                "firstName":req.body.firstName,
                "lastName": req.body.lastName,
                "email": req.body.email,
                "password": hashPassword,
                "DoB": req.body.DoB
        };
        const updateUser = await UserLogin.findByIdAndUpdate(id, updatedData, {new: true});
        res.json(updateUser)
    }catch(error){
        res.status(500).json({error: error.message})
    }
};

async function deleteUser(req, res){
    try{
        const {id} = req.params;
        const deleteaUser = await UserLogin.findByIdAndDelete(id);
        res.json(deleteaUser)
    }catch(error){
        res.status(500).json({error: error.message})
    }
};

async function userLoginAuthentication(req, res){
    try{
        const {email, password} = req.body
        const user = await UserLogin.findOne({email})
        if(user){
            const matchPassword = await bCrypyt.compare(password, user.password);

            if(matchPassword){
                res.status(200).json('User Found');
            }
            else{
                res.status(302).json('Password is incorrect');
            }
        }else{
            res.status(404).json('User not found');
        }
    }catch(error){
        res.status(500).json({error: error.message})
    }
};

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    userLoginAuthentication
};