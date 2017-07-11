/**
 * @file
 * @author 何文林
 * @date 2017/7/10
 */
import * as types from './action-type.js';
import axios from '../assets/js/axios'
import requestURL from '../assets/js/requestUrl'
export function addArticle (prams, success) {
  return dispatch => {
    axios.post(requestURL.add, prams)
         .then((data) => {
           console.log(data)
         })
         .catch(err => {
           alert('登录服务器出错');
         })
  };
}