import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

export const generateTokens = (userData: JwtPayload) => {
  const accessToken = jwt.sign(
    userData,
    process.env.AUTH_ACCESS_TOKEN_SECRET as Secret,
    {
      expiresIn: process.env.AUTH_ACCESS_TOKEN_EXPIRY,
    }
  );

  const refreshToken = jwt.sign(
    userData,
    process.env.AUTH_REFRESH_TOKEN_SECRET as Secret,
    {
      expiresIn: process.env.AUTH_REFRESH_TOKEN_EXPIRY,
    }
  );

  return { accessToken, refreshToken };
};
