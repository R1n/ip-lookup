import { registerAs } from '@nestjs/config';

export default registerAs('ip', () => {
  return {
    baseUrl: 'https://ipwho.is/',
  };
});
