const bCrypyt = require("bcrypt");
const UserLogin = require("../models/userSchema");

//creating users API
async function createUser(req, res) {
  try {
    const { password } = req.body;
    const hashPassword = await bCrypyt.hash(password, 8);
    let data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashPassword,
      role: req.body.role,
      DoB: req.body.DoB,
    };
    // console.log('This is client request' + req.body);
    const user = await UserLogin.create(data);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//getting all users API
async function getUsers(req, res) {
  try {
    const getAllUsers = await UserLogin.find();
    res.json(getAllUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//updating  API
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const hashPassword = await bCrypyt.hash(password, 8);
    let updatedData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashPassword,
      DoB: req.body.DoB,
    };
    const updateUser = await UserLogin.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.json(updateUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//deleting user API
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const deleteaUser = await UserLogin.findByIdAndDelete(id);
    res.json(deleteaUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//Authenticating user login
async function userLoginAuthentication(req, res) {
  try {
    const { email, password } = req.body;
    console.log(password);
    const user = await UserLogin.findOne({ email });
    if (user) {
      const matchPassword = await bCrypyt.compare(password, user.password);
      console.log(matchPassword);
      

      if (matchPassword) {
        res.status(200).json("User Found");
      } else {
        res.status(302).json("Password does not match");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//Authenticating user login
async function userLoginJsonWebToken(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await UserLogin.findOne({ email });
      console.log(user.password);
    if (!user) return res.status(404).json({ error: "User not found" });
    const matchPassword = await bCrypyt.compare(password, user.password);
    
    // console.log(matchPassword);
    if (matchPassword) {
      var token = generateToken(user);
      return res.status(200).json({
        message: "Logged in Successfully",
        email: email,
        name: user.firstName,
        userId: user.id,
        token: token,
      });
    } else {
      return res.status(401).json({ error: "password does not match" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// yr server again run kr
//Authenticating user login
async function adminDashboard(req, res) {
  try {
    res.json({ message: "Welcome Admin" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//Authenticating super Admin login
async function superAdminDashboard(req, res) {
  try {
    res.json({ message: "Welcome Super Admin" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//Authenticating admin and super Admin login
async function AdminDashboard(req, res) {
  try {
    res.json({ message: "Welcome Admin" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//Authenticating admin and super Admin login
async function AdminSuperAdminDashboard(req, res) {
  try {
    res.json({ message: "Welcome Admin / Super Admin" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//Authenticating public login
async function userDashboard(req, res) {
  try {
    res.json({ message: "Welcome User" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//helping functions
const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payLoad = {
    role: user.role,
    id: user.id,
  };
  console.log(user);
  console.log(payLoad);
  const secretKey = "secret-key";

  const token = jwt.sign(payLoad, secretKey);
  return token;
}

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  userLoginAuthentication,
  userLoginJsonWebToken,
  adminDashboard,
  superAdminDashboard,
  adminDashboard,
  AdminSuperAdminDashboard,
  userDashboard,
};
