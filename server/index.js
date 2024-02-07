const express = require("express")
const app = express()
const dotenv = require("dotenv")
const { connect, close } = require("./config/database")

const operationRoutes = require("./routes/operationRoutes")
const authRoutes = require("./routes/authRoute")

const cors = require("cors")

dotenv.config()
const PORT = process.env.PORT || 4000

//database connect
connect()
//middlewares
app.use(express.json())
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
)

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  })
})

// routes
app.use("/api/v1/operations", operationRoutes)
app.use("/api/v1/auth", authRoutes)

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`)
})

// Close the MongoDB connection when the app is terminated
process.on("SIGINT", async () => {
  await close()
  process.exit(0)
})
