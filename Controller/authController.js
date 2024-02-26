const Teacher = require("./../Model/teacherSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.Login = (req,res,next) =>{
    console.log("log in");
    Teacher.findOne({email:req.body.email,password:req.body.password})
        .then(data => {
            let token;
            if(data == null)
            {
                console.log(token);
                if(req.body.email == "admin1@gmail.com" && req.body.password =="123456")
                {
                    token = jwt.sign({
                        email:req.body.email,
                        role:"admin"
                    },"ITIPDLab04" ,{expiresIn:"1h"});
                    res.status(200).json({data,token});      
                }
                else{
                    throw new Error ("invalid email or password!");
                }
            }
            else{
                token = jwt.sign({
                    email:req.body.email,
                    role:"teacher"
                },"ITIPDLab04" ,{expiresIn:"1h"});
                res.status(200).json({token});      
            }
          })
        .catch(error => {
            next(error);
        })
}

exports.changePassword = async (req, res, next) => {
    try {
      const { email, oldPassword, newPassword } = req.body;
      const user = await Teacher.findOne({ email });
      if (user) {
        const auth = await bcrypt.compare(oldPassword, user.password);
        if (auth) {
          user.password = newPassword;
          user
            .save()
            .then((data) => {
              res.status(200).json({ data });
            })
            .catch((error) => {
              res.status(500).json({ message: error + "" });
            });
        } else {
          res.status(401).json({ message: "Invalid password" });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error + "err" });
    }
};


exports.signup = (req, res, next) => {
    try {
      const { fullname, email, password, image } = req.body;
      const newUser = new Teacher({
        fullname,
        email,
        password,
        image,
      });
      const token = JWT.sign(
        { id: newUser._id, role: newUser.role },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );
      newUser
        .save()
        .then((data) => {
          res.status(201).json({ data, token });
        })
        .catch((error) => {
          res.status(500).json({ message: error + "" });
        });
    } catch (error) {
      res.status(500).json({ message: error + "" });
    }
  };