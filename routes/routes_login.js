import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../models/user_schema.js"

const ROUTER = express.Router()

ROUTER.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Alla fält måste fyllas i" })
    }

    const exists = await User.findOne({ email })

    if (exists) {
      return res.status(400).json({ message: "Användaren finns redan" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      name: username,
      email,
      password: hashedPassword,
    })

    res.status(201).json({ message: "Registered" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }
})

ROUTER.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email och lösenord krävs" })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "Användaren hittades inte" })
    }

    const ok = await bcrypt.compare(password, user.password)

    if (!ok) {
      return res.status(400).json({ message: "Fel lösenord" })
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    )

    res.json({
      message: "Logged in",
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }
})

export { ROUTER }