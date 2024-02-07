const { ObjectId } = require("mongodb")
const { getClient } = require("../config/database")
const database = "Complaints"


exports.createComplaint = async (req, res) => {
  try {
    const { description, address, image, userId, category } = req.body

    let status =
      description && address && image && userId && category ? true : false

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      })
    }

    const client = getClient()
    const complaints = client.db().collection(database)

    const result = await complaints.insertOne({
      userId: userId,
      description: description,
      address: address,
      image: image,
      category: category,
    })

    res.status(200).json({
      success: true,
      message: "Complaint created successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}
