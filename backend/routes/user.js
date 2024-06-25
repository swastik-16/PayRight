const express=require("express");
const router=express.Router();
const zod = require("zod");
const { User,Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcryptjs");



const  { authMiddleware } = require("../middleware");



const signupbody=zod.object({
     username:zod.string().email(),
     password:zod.string(),
    firstname:zod.string(),
     lastname:zod.string()
});

router.post("/signup",async (req,res)=>{
   const {success}=signupbody.safeParse(req.body);

   if(!success){
     return res.status(411).json({
          message: "Email already taken / Incorrect inputs"
     });
   };

   const u=await User.findOne({username:req.body.username})

if(u){
     return res.status(411).json({
          message: "Email already taken / Incorrect inputs"
})}

const body= req.body;
 const pass= await bcrypt.hash(body.password, 8)

 let user;
try{
user=await User.create({
    username:body.username,
    password:pass,
   firstname:body.firstname,
    lastname:body.lastname
    
})}
catch(err){
    return res.status(411).json({message: "Error while creating user"})
}
const userid=user._id;


await Account.create({
    userId:userid,
    balance:1+Math.random()*10000
})


const token=jwt.sign({userid},JWT_SECRET);

res.json({
     message: "User created successfully",
     token: token
 })


});

const signinBody = zod.object({
     username: zod.string().email(),
      password: zod.string()
 })


 router.post("/signin", async (req, res) => {
    const { success, error } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Incorrect inputs",
            error: error.errors
        });
    }

    const user = await User.findOne({
        username: req.body.username
    });

    if (!user) {
        return res.status(401).json({
            message: "Invalid username or password"
        });
    }

    const passwordCheck = await bcrypt.compare(req.body.password, user.password);

    if (passwordCheck) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        return res.json({
            token: token
        });
    } else {
        return res.status(401).json({
            message: "Invalid username or password"
        });
    }
});


const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

// router.put("/", authMiddleware, async (req, res) => {
//     const { success } = updateBody.safeParse(req.body)
//     if (!success) {
//         res.status(411).json({
//             message: "Error while updating information"
//         })
//     }

// 		await User.updateOne({ _id: req.userId }, req.body);
	
//     res.json({
//         message: "Updated successfully"
//     })
// })
 
 


router.get("/bulk", async (req, res) => {
     const filter = req.query.filter || "";
     const users = await User.find({
         $or: [{
             firstname: {
                 "$regex": filter, "$options": "i"
             }
         }, {
             lastname: {
             "$regex": filter, "$options": "i"
             }
         }]
     })
   
 
     res.json({
         user: users.map(user => ({
             username: user.username,
             firstName: user.firstname,
             lastName: user.lastname,
             _id: user._id
         }))
     })
 })
  


 router.get('/userinfo', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({
           _id: req.userId 
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({
            firstName: user.firstName
        });
    } catch (error) {
        console.error("Error in /userinfo route:", error); 
        res.status(500).json({ error: "Server Error" });
    }
});





module.exports=router;