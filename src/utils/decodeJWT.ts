import jwt from 'jsonwebtoken';
import User from '../entity/User';

const secret = process.env.JWT_TOKEN || '';

const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decoded: any = jwt.verify(token, secret);
    const { id } = decoded;
    const user = await User.findOne({ id });
    return user;
  } catch (error) {
    return;
  }
};

export default decodeJWT;
