export const jwtConfig = {
  secret: 'notsosecret', // todo: env var
  signOptions: {
    expiresIn: '30d',
  },
};
