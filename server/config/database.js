const { MongoClient, ServerApiVersion } = require("mongodb")
require("dotenv").config()

const uri = process.env.MONGO_URL
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: false,
  },
})

let isConnected = false

exports.connect = async () => {
  try {
    if (!isConnected) {
      await client.connect()
      isConnected = true
      console.log("Connected to MongoDB")
    }
  } catch (e) {
    console.error(e)
  }
}
exports.close = async () => {
  if (isConnected) {
    await client.close()
    isConnected = false
  }
}

exports.getClient = () => client
