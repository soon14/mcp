/**
 * Created by CHENRC2 on 2017-7-29.
 */
import axios from 'utils/http.js';
import {addressbook} from "common/api.js";
import {searchusers} from 'common/api.js';

//获取通讯录
export const requestNewMember = params => {
  return axios.post(addressbook, params).then(res => res.data);
};

//搜索成员列表
export const searchUsers = params => {
  return axios.post(searchusers, params).then(res => res.data);
}
