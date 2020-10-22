const env = process.env.NODE_ENV || "local";

const local = {
  app: {
    port: 3000,
  },
  dbTest: {
    host: "localhost",
    user: "root",
    database: "nodebase",
    password: "ehdgur154!",
    port: 3306,
    connectionLimit: 100,
    waitForConnections: true,
  },
  // path:{
  //     basePath    : 'C:\\Users\\galaxysoft\\workspace\\apollo\\public\\temp\\',
  //     stationPath : 'C:\\Users\\galaxysoft\\workspace\\apollo\\public\\resources\\station\\',
  //     portfolioPath : 'C:\\Users\\galaxysoft\\workspace\\apollo\\public\\resources\\portfolio\\'
  // }
};

const config = {
  local,
};

module.exports = config[env];
