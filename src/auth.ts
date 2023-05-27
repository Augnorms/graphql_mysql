import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Secret key for JWT
const secretKey = 'validate1234'; // Replace with your own secret key

interface User {
  id: string;
}

// Generate JWT token
const generateToken = (user: User): string => {
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
  return token;
};

// Verify JWT token
const verifyToken = (token: string): string => {
  try {
    const decoded = jwt.verify(token, secretKey) as { userId: string };
    return decoded.userId;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// Hash password using bcrypt
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Compare password with hashed password using bcrypt
const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
};

export { generateToken, verifyToken, hashPassword, comparePassword };
