import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { RegisterSchema, LoginSchema } from "../utils/validators";

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = RegisterSchema.safeParse(req.body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return res.status(400).json({ message: firstError?.message});
    }

    //this is like doing const const name = parsed.data.name; email = parsed.data.email; ...
    const {
      name,
      email,
      password,
      pin,
      dateOfBirth,
    } = parsed.data;

    // check if user already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save to MongoDB
    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json({success: true, message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({success: false, message: "Database error" });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const parsed = LoginSchema.safeParse(req.body);

    /*
    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return res.status(400).json({ message: firstError?.message});
    }
    */
    //this is like doing const const name = parsed.data.name; email = parsed.data.email; ...
    //const {email} = parsed.data;
    const { email, password } = req.body;

    // check if user already exists
    const userData = await User.findOne({ email });
    if (!userData) {
      return  res.status(400).json({
        success: false,
        message: "User don't exists" + email,
      });
    }

    const valid = await bcrypt.compare(password, userData.password);
    if (!valid) 
      return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({success: false, message: "Database error" });
  }
};