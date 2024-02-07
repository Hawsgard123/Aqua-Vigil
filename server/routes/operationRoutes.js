const express = require("express")
const router = express.Router()

const { createComplaint } = require("../controllers/createComplaint")
const {getAllComplaintsById, getAllComplaintsByLocation} = require("../controllers/getAllComplaint")
const { protect } = require("../controllers/auth")

router.post("/createComplaint", protect, createComplaint)
router.get("/getAllComplaintsById", protect, getAllComplaintsById)
router.get("/getAllComplaintsByLocation", protect, getAllComplaintsByLocation)

module.exports = router
