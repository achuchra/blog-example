import { Response, Request } from 'express';
import { User } from '../../models/User';

export const registerUser = async (req: Request, res: Response) => {
  console.log(req.body);

  const existedUser = await User.findOne({ username: req.body.username });

  if (existedUser) {
    throw new Error('User exist!');
  }

  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    avatar: req.body.avatar,
  });

  await newUser.save();

  res.send(newUser);
};
