import User from "../models/user.js";
import nodemailer from "nodemailer"
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
const secret = "Super@Dooper";
// 

const forgetpassword = async (req, res) => {
    console.log("chalraha hai yaha tak backend");

    try {
        const { email } = req.body;

        console.log("forgetemail got", email);

        let usrdata = await User.findOne({ email });
        console.log("usrdata", usrdata);

        if (!usrdata) {
            return res.status(401).json({ mesg: "Email does not exist" });
        } else {
            
/*Generating random string*/
function generateRandomString(length) {
    return crypto.getRandomValues(new Uint8Array(length))
        .reduce((str, byte) => str + String.fromCharCode(byte % 62 + (byte % 62 < 10 ? 48 : byte % 62 < 36 ? 55 : 61)), '');
}

const token = generateRandomString(16); // Example output: "zY9aKdBmXQ0PlW3D"
var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "06c825a0521772",
        pass: "5e823ce520c012"
    }
});

const mailOptions = {
    from: 'muhammadriyansadiq786@gmail.com',
    to: usrdata.email,
    subject: 'Reset Password Link',
    html: `<p>Click <a href="http://localhost:5173/forgetpasswordseted/${token}">here</a> to reset your password</p>`
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log("errfromtransporter", error);
    } else {
        // Extract only necessary information for the JWT payload
        const tokenPayload = {
            id: usrdata._id,  // Typically you would use the user's ID
            email: usrdata.email
        };

        // Sign the token with the secret
        const token = JWT.sign(tokenPayload, secret);

        // Set the token in a cookie
        res.cookie("accesstoken", token, { httpOnly: true });

        return res.json({ Status: "Success", usrdata });
    }
});
            // var transporter = nodemailer.createTransport({
            //     host: "sandbox.smtp.mailtrap.io",
            //     port: 2525,
            //     auth: {
            //         user: "06c825a0521772",
            //         pass: "5e823ce520c012"
            //     }
            // });

            // const mailOptions = {
            //     from: 'muhammadriyansadiq786@gmail.com',
            //     to: usrdata.email,
            //     subject: 'Reset Password Link',
            //     html: `<p>Click <a href="http://localhost:5173/forgetpasswordseted/${token}">here</a> to reset your password</p>`
            // };

            // transporter.sendMail(mailOptions, function (error, info) {
            //     if (error) {
            //         console.log("errfromtransporter", error);
            //     } else {
            //         // Extract only necessary information for the JWT payload
            //         const tokenPayload = {
            //             id: usrdata._id,  // Typically you would use the user's ID
            //             email: usrdata.email
            //         };

            //         // Sign the token with the secret
            //         const token = JWT.sign(tokenPayload, secret);

            //         // Set the token in a cookie
            //         res.cookie("accesstoken", token, { httpOnly: true });

            //         return res.json({ Status: "Success", usrdata });
            //     }
            // });
        }
    } catch (err) {
        return res.json({ msg: err });
    }
};


const forgetseted = async (req, res) => {
    try {
        const { newpassword, confirmpassword } = req.body;
        const token = req.cookies.accesstoken;
        console.log("passwords", newpassword, confirmpassword, token);

        if (newpassword !== confirmpassword) {
            return res.json({ msg: "Passwords do not match" });
        }

        // Verify the token synchronously
        const decoded = JWT.verify(token, secret);

        // Find the user by ID using the decoded token data
        const userdata = await User.findById(decoded.id);

        if (!userdata) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newpassword, 10);

        // Update the user's password
        userdata.password = hashedPassword;
        await userdata.save();

        return res.json({ msg: "Password reset successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};


// const changepassword = async (req,res)=>{

//     try{

//         const {currentpassword ,newpassword, confirmpassword } = req.body;
//         const token = req?.cookies?.accesstoken;
//         // const decodedToken = jwtDecode(token);
//         const payload = await JWT.verify(token,secret)

// console.log("passwords",currentpassword,confirmpassword,newpassword,payload.id)

// const findobject = await User.findById(payload.id)

// const datapassword = findobject.password

// bcrypt.compare(currentpassword, datapassword, (err, response) => {
//     if (response) {
 
//      return res.json({msg:"password matched fron db"})

//     } else {

//       return res.status(400).json({ msg: "password not matched from db" });

//     }
//   });

// return res.json({msg:findobject})

//     }

//     catch(err){

//         console.log("err",err)
//         return res.json({msg:"fields not getted"})

//     }
// }

const changepassword = async (req, res) => {
    try {
        const { currentpassword, newpassword, confirmpassword } = req.body;
        const token = req?.cookies?.accesstoken;

        // Verify the token and extract payload
        const payload = await JWT.verify(token, secret);
        console.log("passwords", currentpassword, confirmpassword, newpassword, payload.id);

        // Find the user by ID
        const findobject = await User.findById(payload.id);

        if (!findobject) {
            return res.status(404).json({ msg: "User not found" });
        }

        const datapassword = findobject.password;

        // Compare passwords
        const isMatch = await bcrypt.compare(currentpassword, datapassword);
        console.log("findobject",findobject)
        if (isMatch) {
            // Password matched
console.log("ismatched")

if(confirmpassword !== newpassword){
    return res.json({ msg: "confirmPassword and newpassword not matched " });
}

else{
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    findobject.password = hashedPassword;
    await findobject.save();
console.log("reseted successfylllu")
return res.json({msg:"reseted successfylllu"})
}
        } else {
            // Password not matched
            console.log("isnotmatched")
            return res.status(400).json({ msg: "Current Password not matched" });
        }



    } catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ msg: "An error occurred" });
    }

};

export {
    forgetpassword,
    forgetseted,
    changepassword
};
