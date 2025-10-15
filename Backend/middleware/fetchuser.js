const jwt = require('jsonwebtoken');
const JWT_SECRET = "adeelalam160";

const fetchuser = (req,res,next)=>{
    //get the user from jwt token and add id  to req object
    const token = req.header('auth-token');
    if(!token)
    {
      return  res.status(401).send({error:"please authenticate a valid token "})
        
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"please authenticate a valid token "})
    }
    
}
module.exports = fetchuser;