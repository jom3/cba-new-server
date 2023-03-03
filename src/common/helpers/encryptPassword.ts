import { genSaltSync, hashSync } from 'bcrypt';

export const encryptPassword = (password: string) => {
  const salt = genSaltSync(parseInt(process.env.SALTROUNDS));

  const hash = hashSync(password, salt);

  return hash;
};
