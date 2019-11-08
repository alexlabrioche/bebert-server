import jwt from 'jsonwebtoken';

const secret = process.env.JWT_TOKEN || '';

const createJWT = (id: number) => {
  const token = jwt.sign(
    {
      id,
    },
    secret,
  );
  return token;
};

export default createJWT;
