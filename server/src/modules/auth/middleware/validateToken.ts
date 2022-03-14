import { TokenExpiredError, verify, VerifyErrors } from 'jsonwebtoken';

export const validateToken = async (req: any, res: any, next: any) => {
  console.log(req.headers);
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send('No token provided');
  }

  // @ts-ignore
  verify(token, process.env.JWT_SECRET, (err: VerifyErrors | null, decoded: any) => {
    if (err) {
      console.log({ err, isExpired: err instanceof TokenExpiredError });

      if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: 'Token expired' });
      }

      return res.status(401).send({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
};
