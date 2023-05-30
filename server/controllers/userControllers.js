import { UserDetails } from "../model/userModel.js";
import bcrypt from "bcrypt"

const register = async(req,res,next) => {
   try
   {
            const {username,email,password} = req.body;
            const userNameCheck = await UserDetails.findOne({username});
            if(userNameCheck)   
                return res.json({message:"Username already exists",status:false})

            const userEmailCheck = await UserDetails.findOne({email});
            if(userEmailCheck)   
                return res.json({message:"Email already exists",status:false})

            const hashedPassword =await  bcrypt.hash(password,12);

            // const newUser = await UserDetails.create({
            //     email,username,password
            // });

            const newUser = new UserDetails({
                email,
                username,
                password:hashedPassword,
            })
            await newUser.save()

            delete newUser.password;
            return res.json({status:true,newUser})
   }
   catch(e)
   {
        next(e);
   }
    
}



const login = async(req,res,next) => {
    try
    {
             const {username,password} = req.body;
             const user = await UserDetails.findOne({username});
             if(!user)   
                 return res.json({message:"Username not exists",status:false})
 
    
 
             const isPasswordValid =await  bcrypt.compare(password,user.password);
             if(!isPasswordValid)
                return res.json({message:"Invalid Login Credentials",status:false})
 
             delete user.password;
             return res.json({status:true,user})
    }
    catch(e)
    {
         next(e);
    }
     
 }



export  {register,login}