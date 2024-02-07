const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: {
      validator: function (email) {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      },
      message: (props) => `Email (${props.value}) is invalid!`,
    },
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password should be minimum 6 characters"],
  },
  type: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  location: {
    type: String,
    required: [true, "Please enter your location"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter your phone number"],
  },
  complaint_array: {
    type: Array,
    default: [],
  },
  employee_number: {
    type: Number,
    default: 0,
  },
  emp_array: {
    type: Array,
    default: [],
  },
})

userSchema.pre("save", async (next) => {
  if (!this.isModified("password") || !this.password) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.methods.correctPassword = async (
  candidatePassword,
  userPassword
) => {
  return await bcrypt.compare(candidatePassword, userPassword)
}

const User = new mongoose.model("User", userSchema)
module.exports = User
