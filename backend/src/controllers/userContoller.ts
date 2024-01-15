
import { Request, Response } from 'express';
import User from '../models/User'; 
import bcrypt from 'bcryptjs'

const userController = {
  async signUp(req: Request, res: Response) {
      const {email,password,username}   = req.body;
      // console.log(req.body)
      try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
      const newUser = new User({
        email:email,
        username:username,
        password: hash,
      });

      await newUser.save();
      res.status(200).send({ data: "user has been created" });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while signing up.' });
    }

  },

  async getUser(req: Request, res: Response){
    const {email,passwword,username} =req.body;

    
  }
};

export default userController;

