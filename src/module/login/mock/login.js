import axios from 'utils/http';
import MockAdapter from 'axios-mock-adapter';
import { Users } from './data/user';

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    mock.onPost('/v1/manage/service/login').reply(config => {
      let {account, password} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = Users.some(u => {
            if (u.account === account && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });
          if (hasUser) {
            resolve([200, { errorCode: 200, msg: 'success', result:user }]);
          } else {
            resolve([200, { errorCode: 500, msg: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });
  }
};
