import express from "express"
import { hashPassword } from "../utility/bcryptHelper.js"
import { createUser, updateUser } from "../model/userModel.js"
import { v4 as uuidv4 } from 'uuid';
import { createSession, deleteSession } from "../model/sessionModel.js";
import { sendVerificationEmail } from "../utility/nodeMailerHelper.js";
import { buildErrorResponse, buildSuccessResponse } from "../utility/responseHelper.js";

const userRouter = express.Router()

// Create User | POST
userRouter.post("/", async(req, res)=>{
    try {
      // HASH THE PASSWORD
      const { password } = req.body
      const hashedPassword = hashPassword(password)
  
      // Create user in DB | using QUERY
      const user = await createUser({...req.body, password: hashedPassword})
  
      // If user is created, send verification Email
      if(user?._id){
        // generate the unique token
        const uniqueToken = uuidv4()
        // save this token and user email in session
        const session = await createSession({ userEmail: user.email, token: uniqueToken })
  
        if(session?._id){
            // Build verification link
            const verificationLink = `${process.env.CLIENT_ROOT_URL}/verify-user?email=${user.email}&token=${uniqueToken}`
    
            // Send verficaition email
            sendVerificationEmail(user.email, user.name, verificationLink)
          }
        }
        user?._id
        ? buildSuccessResponse(res, {}, "Check your inbox/spam to verify your email") 
        : buildErrorResponse(res, "Could not register the user")
    } catch (error) {
      if(error.code === 11000){
        error.message = "User with this email already exists!!"
      }
  
      buildErrorResponse(res, error.message)
    }
  })