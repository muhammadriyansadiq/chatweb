import bcrypt from "bcrypt";
import User from "../models/user.js"
import JWT from "jsonwebtoken";
const secret = "Super@Dooper";
import cloudinaryUser from "../utils/useCloudinary.js";

const handleregister = async (req, res) => {
    console.log("chalraha hai yaha tak");
  
    const { name, email, password, photo  } = req.body;
    console.log("Uploaded file:", req?.file);

try{
     let usrdata = await User.findOne({ email: email });
      if (usrdata) {
        return res.json({ msg: "email already exist" });
      } 

      else{
        const hashedPassword = await bcrypt.hash(password, 10);
        let photo;

        if (req.file) {
          const result = await cloudinaryUser.uploader.upload(req?.file?.path);
          photo = result?.url;
        } else {
          photo = ``;
        }
             const payload = await User.create({

          name,
          email,
          password: hashedPassword,
          photo: photo

        });

        req.io.emit('new_signup', { email: payload.email });


        return res.json({ msg: payload});

      }
}

catch(err){
  return res.json({msg:err})
}

  };

  const handlelogin = async (req, res) => {
    console.log("chalraha hai yaha tak login");
  
    
    try{
  const {  email, password } = req.body;

  console.log("usrdata login backend",email,password)

     let usrdata = await User.findOne({ email });
console.log("usrdata login backend",usrdata)
    if(!usrdata){
      return res.status(401).json({mesg: "email does not exist "})
    }
    
    else{

      bcrypt.compare(password, usrdata.password, (err, response) => {
        if (response) {
          const payload = {
            id: usrdata._id,
            email: usrdata.email,
            role:usrdata.role
          };
          const token = JWT.sign(payload, secret);
          res.cookie("accesstoken", token, { httpOnly: true });
          // localStorage.setItem("token",token)
          return res.status(200).json({
            message: "Successfully logged in",
            user: token,
          });
        } else {
          return res.status(400).json({ message: err });
        }
      });
    }

    }

catch(err){
  return res.json({msg:err})
}

  };

  export {
    handleregister,
    handlelogin
  };


  // cloudinary or waisai hi