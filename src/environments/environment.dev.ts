export const environment = {
  env: 'DEV',
  production: false,
  // serverBaseUrl: 'https://testing.merchant.zithara.in/',
  // serverBaseUrl: 'http://localhost:8150',
  serverBaseUrl: 'http://localhost:8150',
  // serverBaseUrl: 'http://138.201.127.9:8150',
  authApiPath: 'authapp',
  merchantApiPath: 'merchantapp',
  transactionApiPath: 'zitrans',
  swaggerTransactionUrl: 'http://95.217.129.28:8080/zitrans/swagger-ui.html#/',
  swaggerMerchantUrl: 'http://95.217.129.28:8080/merchant/swagger-ui.html#/',
  swaggerAuthUrl: 'http://95.217.129.28:8080/authapp/swagger-ui.html#/',
  kcurl: 'https://kctest.merchant.zithara.in/auth/',
                // url: 'https://merchant.zithara.in/zikeycloak/auth',
  kcrealm: 'zimerchant-test',
  kcclientId: 'zifrontend-dev',
  roleredirct : 'https://onboarding.merchant.zithara.in'
};
