const  User =require  ('../models/user')
const bcrypt = require("bcryptjs")
const jwt  = require("jsonwebtoken")
const config = require("config");
const authMiddleWare = require('../middleware/auth.middleWare')

class AuthControllers {
    async registration(req, res) {
        try {
            const {email, password,passwordAllowing} = req.body
            if(passwordAllowing !=='allowing password ***'){
                res.json({message:"not allowed"})
            }
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: `User with email ${email} already exist`})
            }
            const hashPassword = await bcrypt.hash(password, 8)
            const user = new User({email, password: hashPassword})
            await user.save()
            res.json({message: "User in bd was created"})
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }

    }
    async Login(req, res) {
        try {
            const {email, password} = req.body
            /* шукаєм юзера в базі даних tru or false вертається*/
            const user  = await User.findOne({email})
            if (!user){
                return res.status(404).json({message:`user ${email} not foundUser`})
            }
            /* перевіряє співпадіння паролів tru or false*/
            const isPassValid = bcrypt.compareSync(password, user.password)
            if(!isPassValid){
                return res.status(400).json({message:'pasword not valid'})
            }
            /*  створ.єм токен деперший параметр ід другий секретний ключ
            * третій скільки юуде існувати*/
            const token = jwt.sign({email:email},config.get("secretKey"),{})
            // const token = jwt.sign({id:user.id},config.get("secretKey"),{expiresIn: "10h"})

            return res.json({token})

        } catch (e) {
            console.log(e)
            res.send({message: 'server error 98423948'})
        }
    }
    async auth(req,res){
        try {
            const user = await User.findOne({email:req.user.email})
            const token = jwt.sign({email:user.email},config.get("secretKey"),{expiresIn: "10h"})

            return res.json({
                token,

})
        } catch (e) {
            console.log(e)
            res.send({message: 'server error in authorisation 111'})
        }
    }
}
module.exports = new AuthControllers()





