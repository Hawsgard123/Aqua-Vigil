const mongoose = require("mongoose")

const complaintScheme = new mongoose.Schema({
  description: {
    type: String,
  },
  address: {
    type: String,
  },
})
