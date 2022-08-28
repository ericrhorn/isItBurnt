// const { request } = require("express");
// const { model } = require("mongoose");
const Recipe = require("../models/project.models");
const jwt = require("jsonwebtoken")
const User = require("../models/user.models")

const addRecipe = (req, res) => {
  const newRecipeObject = new Recipe(req.body);

  // const decodedJWT = jwt.decode(req.cookies.userToken, {
  //   complete: true
  // })

  newRecipeObject.createdBy = req.jwtpayload._id
  // newRecipeObject.createdBy = decodedJWT.payload._id

  newRecipeObject.save()
    .then((newRecipe) => res.json(newRecipe))
    .catch((err) => res.status(400).json(err));
  // Recipe.create(req.body)
  //   .then((newRecipe) => res.json(newRecipe))
  //   .catch((err) => res.status(400).json(err));
};

const showRecipe = (req, res) => {
  Recipe.find()
  .populate("createdBy", "userName email")
  console.log(createdBy)
  // Recipe.find({})
    // .collation({ locale: "en", strength: 2 })
    // .sort({ petType: 1 })
    .then((allRecipies) => res.json(allRecipies))
    .catch((err) => res.status(400).json(err));
};


//new
const findAllRecipiesByUser = (req, res) => {
  console.log("req.jwtpayload.userName :", req.jwtpayload.userName)
  console.log("req.params.userName :", req.params.userName)

  User.findOne({userName: req.params.userName})
    .then((user) => {
      Recipe.find({ createdBy: user._id})
        .populate('createdBy', 'userName email')
        .then((recipie) => {
          res.json(recipie);
        })
        .catch((err) => {
          res.status(400).json({message: 'uh oh!'})
        })
        .catch((err) => {
          res.status(400).json({message: 'oh no, uh oh'})
        })
    })

  // if(req.jwtpayload.userName !== req.params.userName){
  //   User.findOne({userName: req.params.userName})
  //     .then((userNotLoggedIn) => {
  //       Recipe.find({createdBy: userNotLoggedIn._id})
  //         .populate("createdBy", "userName")
  //         .then((allRecipiesFromUser) => {
  //           console.log(allRecipiesFromUser);
  //           res.json(allRecipiesFromUser);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           res.status(400).json(err);
  //         })
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(400).json(err)
  //     })
  // }
  // else{
  //   console.log("current user")
  //   console.log("req.payload.id", req.jwtpayload._id)
  //   Recipe.find({createdBy: req.jwtpayload.id})
  //     .populate("createdBy", "userName")
  //     .then((allRecipiesFromLoggedInUser) => {
  //       console.log(allRecipiesFromLoggedInUser);
  //       res.json(allRecipiesFromLoggedInUser);
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       res.status(400).json(err)
  //     })
  // }
}

const showOneRecipe = (req, res) => {
  Recipe.findOne({ _id: req.params.id })
    .then((oneRecipe) => res.json(oneRecipe))
    .catch((err) => res.status(400).json(err));
};

const updateRecipe = (req, res) => {
  Recipe.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedRecipe) => res.json(updatedRecipe))
    .catch((err) => res.status(400).json(err));
};

const deleteRecipe = (req, res) => {
  Recipe.deleteOne({ _id: req.params.id })
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
    addRecipe,
    showRecipe,
    findAllRecipiesByUser,
    showOneRecipe,
    updateRecipe,
    deleteRecipe,
};
