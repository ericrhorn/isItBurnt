const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.models");
const SECRET = process.env.FIRST_SECRET_KEY;


const register = async (req, res) => {
    try {
        const user = new User(req.body)
        const newUser = await user.save();
        console.log("new user", newUser);
        const userToken = jwt.sign({
            _id: newUser._id,
            email: newUser.email,
            userName: newUser.userName,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
        }, SECRET);
        console.log('jst', userToken);
        res
        .status(201)
        .cookie('userToken', userToken, {
            httpOnly: true
        })
        .json({
            msg: "success!",
            user: newUser,
        });
    } catch(error){
    console.log("register not successful", error);
    res.status(400).json(error);
    };
}

const login = async (req, res) => {
    const userRecord = await User.findOne({email: req.body.email});
    console.log("user record", userRecord);
    if (!userRecord) {
        res.status(400).json({error: "invalid email or password"});
    } else {
        try {
            const isPasswordValid = await bcrypt.compare(req.body.password, userRecord.password);
            if(!isPasswordValid){
                res.status(400).json({error: "invalid email or password"});
            } else {
                const userToken = jwt.sign ({
                    _id: userRecord._id,
                    email: userRecord.email,
                    userName: userRecord.userName,
                    firstName: userRecord.firstName,
                    lastName: userRecord.lastName,
                }, SECRET);
                console.log("jwt", userToken)
                res
                .status(201)
                .cookie('userToken', userToken, {
                    httpOnly: true
                })
                .json({
                    msg: "successfully logged in!",
                    user: userRecord,
                });
            }
        } catch(error) {
        console.log("login error", error)
        res.status(400).json(error);
        };
    }
}

const logout = (req, res) => {
    console.log("successfully logged out")
    res.clearCookie('userToken');
    // res.sendStatus(200);
    res.json({
        message: "you have logged out",
    })
}

const getLoggedInUser = (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET);

    User.findById({_id:user._id})
        .then((user) => res.json(user))
        .catch((err) => res.json({ message: "uh oh... cant show logged in user", error: err }));
};


module.exports = {
  register,
  login,
  logout,
  getLoggedInUser,
  // deleteUser,
};
