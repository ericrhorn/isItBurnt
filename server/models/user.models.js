const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "A user name is required"],
      minLength: [2, "A user name must be at least 2 characters"],
    },
    firstName: {
      type: String,
      required: [true, "A first name is required"],
      minLength: [2, "A first name must be at least 2 characters"],
    },
    lastName: {
      type: String,
      required: [true, "A last name is required"],
      minLength: [2, "A first name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "An email is required"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "A password is required"],
      minLength: [8, "password must be at least 8 characters"],
    },

  },
  { timestamps: true }
);

// Virtual field
//  store information from our request, but it will not be saved in the DB
userSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => this._confirmPassword = value);

// middleware jumps in the middle of a process, does some work,
// then continues with the NEXT step of the process as though it has never been interrupted

userSchema.pre("validate", function (next) {
  console.log("inside pre-validate");
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password");
  }
  next();
});

userSchema.pre("save", function (next) {
  // encript the password BEFORE it is saved to the DB
  console.log("inside pre-save");
  bcrypt
    .hash(this.password, 10)
    .then((hashedPassword) => {
      // update teh password in this instance to use the hashed returned version
      this.password = hashedPassword;
      next();
    })
    .catch((err) => {
      console.log("error while hashing password");
    });
});

// User will become the name of our collection
// mongoose will make it lowercase AND plurl... collection name: users

const User = mongoose.model("User", userSchema);

module.exports = User;
