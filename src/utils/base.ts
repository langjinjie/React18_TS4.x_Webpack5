export const test = () => {
  console.log('NODE_ENV', process.env.NODE_ENV);
  console.log('BASE_ENV', process.env.BASE_ENV);
  // 多环境变量配置
  console.log('REACT_APP_API_URL', process.env);
};
