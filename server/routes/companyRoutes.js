import express from "express";
import {
  changeJobApplicationStatus,
  changeVisibility,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
} from "../controller/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Register a company
router.post("/register", upload.single("image"), registerCompany);

//Company Login
router.post("/login", loginCompany);

//Get Company data
router.get("/company", protectCompany, getCompanyData);

//Post a job
router.post("/post-job", protectCompany, postJob);

//Get Applicants Data of the Company
router.get("/applicants", protectCompany, getCompanyJobApplicants);

//Get Company Job list
router.get("/list-jobs", protectCompany, getCompanyPostedJobs);

//Change Application Status
router.post("/change-status", protectCompany, changeJobApplicationStatus);

//Change Applications visibility
router.post("/change-visibility", protectCompany, changeVisibility);

{
  /* always add / symbol before the path route, it wasted my 15 minutes for the above resolution */
}

export default router;
