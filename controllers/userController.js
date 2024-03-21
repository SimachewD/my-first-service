
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const { adminModel, profileModel, aboutModel, messageModel } = require("../Models/userModel");


//Admin
const login = async (req, res)=>{

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({Error:'All Fields Must be Filled'});
      // throw Error('All fields must be field');
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({Error:'Invalid Email'});
      // throw Error('Invalid Email');
    }

    adminModel.findOne({email}).then(async (admin)=>{
          const match = await bcrypt.compare(password, admin.password);
          if (!match) {
            return res.status(404).json({Error:'Wrong Password'});
            // throw Error('Wrong password');
          }
          const token = jwt.sign({admin:admin._id}, process.env.SECRET, {expiresIn:'3d'});
          res.status(200).json({email, token});
    }).catch(()=>{
      res.status(400).json({Error:'User Not Found'});
      // throw Error('User not found');
    });
}

 

//edit admin data
const changePassword = async (req, res)=>{

  const { email, oldPassword, newPassword } = req.body;
    const admin = await adminModel.findOne({email});
    if (!admin) {
      return res.status(400).json({Error:'User Not Found'});
    }

    const match = await bcrypt.compare(oldPassword, admin.password);

    if (!match) {
      return res.status(400).json({Error:'Wrong Password'});
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    adminModel.findOneAndUpdate( {}, { password:hash }, { new: true }).then(() => {
        res.status(200).json({Success:'Password Changed Successfully'});
      }).catch((err)=> {
        return res.status(404).json({'Error updating password:': err});
      });
} 
 
 
//edit profile
const patchProfile = (req, res)=>{

    profileModel.findOneAndUpdate( {}, { ...req.body }, { new: true }).then(() => {
        res.status(200).json({success:'profile updated successfully for admin'});
      }).catch((err)=> {
        return res.status(404).json({'Error updating profile:': err});
    });
}


//edit about
const patchAbout = (req, res)=>{

    aboutModel.findOneAndUpdate( {}, { ...req.body }, { new: true }).then(() => {
        res.status(200).json({success:'About me updated successfully for admin'});
      }).catch((err)=> {
        return res.status(404).json({'Error updating about me:': err});
    });
}



//add new message
const postMessage = (req, res)=>{

  messageModel.create({ ...req.body }).then((message)=>{
      res.status(200).json(message);
  }).catch((err)=>{
      res.status(404).json(err.message);
  });
}



module.exports = {
    changePassword,
    patchProfile,
    patchAbout,
    postMessage,  
    login
}; 