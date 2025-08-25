import Job from "../models/job.js";
import JobApplication from "../models/jobApplication.js";
import User from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";
{
  /* Creating routes for the User for job applying and view application data and upload the resume also */
}

//Get user data
export const getUserData = async (req, res) => {
  {
    /* Now its time to add the logic and fetch the userdata */
  }
  {
    /* Using clerk middle ware, will covert the token into .auth object contain userID and user Details*/
  }

  const userId = req.auth.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Apply for a job
export const applyForJob = async (req, res) => {
  {
    /* For This we need a new model jobApplication.js, creating it */
  }
  const { jobId } = req.body;
  const userId = req.auth.userId;

  try {
    const isAlreadyApplied = await JobApplication.find({ jobId, userId });

    if (isAlreadyApplied.length > 0) {
      return res.json({ success: false, message: "Already Applied" });
    }

    const jobData = await Job.findById(jobId);

    {
      /* if the user is applying for other job that is not in the Job Database */
    }
    if (!jobData) {
      return res.json({ success: false, message: "Job Not Found" });
    }

    {
      /* Creating Job Application */
    }
    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });
    //Status property will automatically created with pending status

    res.json({ success: true, message: "Applied Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Fetch the job applied status of the user
export const getUserJobApplication = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    if (!applications) {
      return res.json({
        success: false,
        message: "No job applications found for this user.",
      });
    }

    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Update user Profile i mean Resume because other attributes are edited through Clerk
export const updateUserResume = async (req, res) => {
  {
    /* we send using middle the resume, we send the uploaded resume in form data format using 'resume' field name */
  }

  try {
    const userId = req.auth.userId;
    const resumeFile = req.file;
    const userData = await User.findById(userId);

    {
      /* we will update this resume on cloudinary platform then we add the resume file link in userData */
    }

    if (resumeFile) {
      //this holds the url of the resume file
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
      userData.resume = resumeUpload.secure_url;
      //secure_url provide pulic url safe for accessing the file
    }

    await userData.save();

    return res.json({ success: true, message: "Resume Updated" });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }

  {
    /* Now its time for integrations...... */
  }
};
