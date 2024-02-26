const jwt = require("jsonwebtoken");

module.exports = (req,res,next) =>{
    let token;
    let decode;
    try{
        token = req.get("Authorization").split(" ")[1];
        console.log(token);
        decode =  jwt.verify(token,"ITIPDLab04");
        console.log(decode);
 
    }catch(error)
    {
        error.message="Not Authorized";
        error.status =403;
        next(error);
    }
 
    if(decode != undefined)
    {
        req.role = decode.role;
        console.log(req.role);
        next();
    }
}