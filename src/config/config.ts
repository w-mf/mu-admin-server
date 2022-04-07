export default () => ({
  jwtConstants: {
    secret: 'muadminserver2022',
    expiresIn: '1d',
  }, // jwt 配置
  sessionSecret: 'muadminserver2022', // session 密匙
  aesKey: 'ijmX4NlQ2Zbfr2qIw8qb0Zrbq4G4UStn', // aes 加密key，需等于32位
  aesIv: '0000000000000000', // aes 加密iv，需等于16位
  createAccountPass: '123456',
  pathPrefix: 'api', // api前缀
  port: '3000',
  env: process.env.ENV, // 'dev','prod'
  enableSwagger: true, //process.env.ENV === 'dev',
  imgVerifyCodeTtl: 5 * 60, // 图形验证码有效期，单位秒
});
