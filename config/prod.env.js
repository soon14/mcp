module.exports = {
  authority: true,//强制鉴权(方便开发阶段测试，不会出现没有路由的情况)
  NODE_ENV: '"prod"',
  //需包含的模块，优先级高于moduleFilter.  统一控制台子系统需包含index,login和management三个模块
  moduleContainer:[],
  moduleFilter:['./src/module/faq','./src/module/dashboard'],//过滤不被打包的模块
  urlNoAuthority:['/websiteinfo/contactus', '/websiteinfo/privatepolicy','/websiteinfo/serviceterm','/websiteinfo/faq'],
  api: {
    login:{
      host:'http://mtp.midea.com:9000'
    },
    socket:{
      host: 'http://mtp.midea.com'
    },
    ustack:{
      url:'http://172.20.32.194:5678/auth-iframe'
    },
    manaement: {
      host: 'http://mtp.midea.com:18092'
    },
    monitor:{
      host:'http://mtp.midea.com:8000'
    },
    objectStore: {
      appid:'90aba3aff17f4611b26026b396321444',
      uploadHost:'http://mtp.midea.com:17480',
      appmanager:'http://mtp.midea.com:80',
      mcloud:'http://mtp.midea.com:8080'
    },
    video: {
      uploadHost:'http://mtp.midea.com:27480',
      authen: 'http://mtp.midea.com:80',
      appmanager:'http://mtp.midea.com:9000',
      videoplay: 'http://mtp.midea.com:8080'
    },
    search:{
      host:'http://mtp.midea.com:12109',
      push:'http://mtp.midea.com:10118',
      search:'http://mtp.midea.com:10321'
    }
  }
};
