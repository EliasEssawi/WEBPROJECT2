import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { RegisterSchema, LoginSchema, ChangePassSchema } from "../utils/validators";
import crypto from "crypto";
import {verifyUserResetCode} from "../services/userService"

export function generateCode(length = 8): string {
  return crypto
    .randomBytes(length)
    .toString("base64")
    .replace(/[^A-Z0-9]/gi, "")
    .slice(0, length)
    .toUpperCase();
}


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
      name,
      email,
      password: hashedPassword,
      pin,
      dateOfBirth,
      profiles: [] // ✅ start with empty profiles
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

export const sendResetPassCode = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // check if user already exists
    const userData = await User.findOne({ email });
    if (!userData) {
      return  res.status(400).json({
        success: false,
        message: "User don't exists" + email,
      });
    }

    //create random code
    const code = generateCode();
    const hashedCode = crypto
      .createHash("sha256")
      .update(code)
      .digest("hex");
    await User.updateOne({ email },
      {
        resetCode: hashedCode,
        resetCodeExpiresAt: new Date(Date.now() + 3 * 60 * 1000), // 3 minutes
      }
    );

    //TODO: send the code to Email
    console.log(email + "verification code is " + code)

    res.status(200).json({ message: "verification code send to email " + email });
  } catch (err) {
    res.status(500).json({success: false, message: "Database error" });
  }
};

export const verifyPassCode = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;

    const user = await verifyUserResetCode(email, code);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired code",
      });
    }

    res.status(200).json({ message: "code verified " });
  } catch (err) {
    res.status(500).json({success: false, message: "Database error" });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {

    const parsed = ChangePassSchema.safeParse(req.body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return res.status(400).json({ message: firstError?.message});
    }

    //this is like doing const const name = parsed.data.name; email = parsed.data.email; ...
     const {
      email,
      newPassword,
      code,
    } = parsed.data;


    //Verify the code (and expiration)
    const user = await verifyUserResetCode(email, code);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired code",
      });
    }

    // Hash the new password
    user.password = await bcrypt.hash(newPassword, 10);

     // Clear reset code after successful use
    user.resetCode = undefined;
    user.resetCodeExpiresAt = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (err) {
    res.status(500).json({success: false, message: "Database error" });
  }
};
