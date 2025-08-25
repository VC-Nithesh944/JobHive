import jwt from "jsonwebtoken";
import Company from "../models/company.js";

export const protectCompany = async (req, res, next) => {
  const token = req.headers.token; //To fetch the token
  if (!token) {
    return res.json({ success: false, message: "Not authorized, Login Again" });
  }
  try {
    {
      /*In order to get the Jobs posted by a company we are trying to decode the token, to find the company */
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    {
      /*To get company data using decoded id to fetch company data using company Model */
    }
    req.company = await Company.findById(decoded.id).select("-password");

    next(); //Callback func next()

    //Provide the token to Postman for the last registered, and submit comeback here, see results in terminal
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
