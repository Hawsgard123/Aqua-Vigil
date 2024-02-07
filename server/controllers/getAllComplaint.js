const { async } = require("emoji-mart")
const { getClient } = require("../config/database")
const database = "Complaints"
const userDatabase = "User"

exports.getAllComplaintsByLocation = async (req, res) => {
  try {
    const client = getClient()
    const complaints = client.db().collection(database)
    const users = client.db().collection(userDatabase)
    const user = await users.findOne({ _id: req.userId })
    const userLocation = user.location
    const result = await complaints.find({ address: userLocation }).toArray()

    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

exports.getAllComplaintsById = async (req, res) => {
  try {
    const client = getClient()
    const complaints = client.db().collection(database)
    const result = await complaints.find({ userId: req.userId }).toArray()

    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}
