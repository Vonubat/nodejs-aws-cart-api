const { REGION, DB_PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export const region = REGION || 'eu-west-1';
export const dbPort = DB_PORT || '5432';
export const dbHost =
  DB_HOST || 'cart-api-db.crouiakku3bv.eu-west-1.rds.amazonaws.com';
export const dbUser = DB_USER || 'postgres';
export const dbPassword = DB_PASSWORD || '1234567890';
export const dbName = DB_NAME || 'DbCartApi';
