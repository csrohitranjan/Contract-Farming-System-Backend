import { User } from "../models/user.model.js";
import { generateAccessAndRefreshTokens } from "../utils/generateAccessAndRefreshTokens.js";



const registerUser = async (req, res) => {
    try {
        const { fullName, phoneNumber, state, district, pincode, gender, role, email, password } = req.body;

        // Check if any required field is missing
        if (!fullName || !phoneNumber || !state || !district || !pincode || !gender || !role || !email || !password) {
            return res.status(400).json({
                status: 400,
                message: "All fields are required."
            });
        }

        const existedUser = await User.findOne({
            $or: [{ phoneNumber }, { email }]
        });

        if (existedUser) {
            return res.status(409).json({
                status: 409,
                success: false,
                message: "User already Registered"
            });
        }

        const insertedUser = await User.create({
            fullName,
            phoneNumber,
            state,
            district,
            pincode,
            gender,
            role,
            email,
            password
        });

        const createdUser = await User.findById(insertedUser._id).select(
            "-password -refreshToken"
        );

        if (!createdUser) {
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Something Went Wrong While Registering the User"
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: "User Registered Successfully",
            user: createdUser
        });

    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Internal Server Error on: registerUser Controller",
            error: error.message
        });
    }
};



const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;


        if (!(email && password)) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Email and  Password are required"
            });
        }


        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "User Does not Exist"
            });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: 401,
                success: false,
                message: "Wrong Password"
            });
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        const options = {
            httpOnly: true,
            secure: true
        };

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                status: 200,
                success: true,
                message: "User Logged in Successfully",
                user: loggedInUser,
                accessToken,
                refreshToken
            });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Internal server error occurred in login Controller.",
            error: error.message
        });
    }
};



export { registerUser, loginUser }