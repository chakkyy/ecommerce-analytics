import * as bcrypt from 'bcrypt';

export const hashPassword = async password => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export const comparePassword = async (enteredPassword, dbPassword) => {
  const match = await bcrypt.compare(enteredPassword, dbPassword);
  return match;
};
