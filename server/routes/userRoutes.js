import express from 'express'
import { applyForJob, getUserData, getUserJobApplication, updateUserResume } from '../controller/userController.js'
import upload from '../config/multer.js'


const router = express.Router()

//TO get the User Data
router.get('/user', getUserData)

//to apply for job (post)
router.post('/apply', applyForJob)

//Get applied jobs data
router.get('/applications',getUserJobApplication)

//Update User Resume
router.post('/update-resume', upload.single('resume'), updateUserResume)

export default router