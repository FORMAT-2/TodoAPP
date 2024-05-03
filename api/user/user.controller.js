const { User } = require('../../schema/user.mongo.schema')
const { createJwtToken } = require('../../utils/Token/jwtMiddleware')
const { sendWelcomeMail } = require('../../utils/Mailer/sendMail')
const {statusCode} = require('../../utils/Error/statusCode')
const createUser = async (req, res) => {
    const { userPayload } = req.body;
    if (!userPayload) {
        return res.status(statusCode.BadRequest.statusCode).json({ message: "Enter user data" })
    }
    if (!userPayload.userName) {
        return res.status(statusCode.BadRequest.statusCode).json({ message: "Please Enter user Name" });
    }
    if (!userPayload.userMail) {
        return res.status(statusCode.BadRequest.statusCode).json({ message: "Please Enter user Mail" })
    }
    if (!userPayload.password) {
        return res.status(statusCode.BadRequest.statusCode).json({ message: "Please Enter password" })
    }
    if (!userPayload.userPhoneNumber) {
        return res.status(statusCode.BadRequest.statusCode).json({ message: "Please Enter user phone Number" })
    }
    if (!userPayload.userDob) {
        return res.status(statusCode.BadRequest.statusCode).json({ message: "Please Enter user Date of Birth" })
    }
    if (userPayload.password.length < 8) {
        return res.status(statusCode.BadRequest.statusCode).json({ message: "Password should be atleast 8 characters" })
    }
    const userNameExists = await User.findOne({ userName: userPayload.userName });
    const userMailExists = await User.findOne({ userMail: userPayload.userMail });
    const userPhoneNumberExists = await User.findOne({ userPhoneNumber: userPayload.userPhoneNumber });
    if (userNameExists) {
        return res.status(statusCode.BadRequest.statusCode).json({ message: "User Name already exists" })
    }
    if (userMailExists) {
        return res.status(statusCode.BadRequest.statusCode).json({ message: "User Mail already exists" })
    }
    if (userPhoneNumberExists) {
        return res.status(statusCode.BadRequest.statusCode).json({ message: "User Phone Number already exists" })
    }
    await User.create({ userName: userPayload.userName, userPhoneNumber: userPayload.userPhoneNumber, userMail: userPayload.userMail, password: userPayload.password, userDob: userPayload.userDob, });
    await sendWelcomeMail(userPayload.userMail);
    res.status(statusCode.Created.statusCode).json({ status: "success", message: "User Created" })
}
const loginUser = async (req, res) => {
    const { userPayload } = req.body;
    if (!userPayload) {
        return res.status(statusCode.BadRequest.statusCode).json({ message: "Enter user data" })
    }
    if (!userPayload.userName) {
        return res.status(statusCode.BadRequest.statusCode).json({ message: "Please Enter user Name" });
    }
    if (!userPayload.password) {
        return res.status(statusCode.BadRequest.statusCode).json({ message: "Please Enter password" })
    }
    const user = await User.findOne({ userName: userPayload.userName });
    if (!user) {
        return res.status(statusCode.BadRequest.statusCode).json({ message: "User Doesn't exist" });
    }
    if (user.password !== userPayload.password) {
        return res.status(statusCode.BadRequest.statusCode).json({ message: "Username or password is incorrect" })
    }
    const token = createJwtToken(userPayload.userName);
    await User.findByIdAndUpdate(user.id, { token: token });
    res.status(statusCode.OK.statusCode).json({ status: "success", message: "User Logged In", token })

}
const resetPassword = async (req, res) => {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword) {
        return res.status(statusCode.BadRequest.statusCode).json({ message: "Please Enter old password" })
    }
    if (!newPassword) {
        return res.status(statusCode.BadRequest.statusCode).json({ message: "Please Enter new password" })
    }
    const userExists = await User.findById( user.id);
    if (!userExists) {
        return res.status(statusCode.BadRequest.statusCode).json({ message: "Username or password is incorrect" })
    }
    if (newPassword.length < 8) {
        return res.status(statusCode.BadRequest.statusCode).json({ message: "Password should be atleast 8 characters" })
    }
    if(userExists.password==newPassword){
        return res.status(statusCode.BadRequest.statusCode).json({ message: "New Password can not be same as old password" })
    }
    await User.findByIdAndUpdate(user.id, { password: newPassword });
    return res.status(statusCode.OK.statusCode).json({ status: "success", message: "Password Changed" });

}

module.exports = { createUser, loginUser, resetPassword }