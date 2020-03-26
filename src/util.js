import CryptoJS from 'crypto-js'
import {private_key} from './const'

let util = {
  // 加密
  encrypt: function (originalText) {
    let cipherText = CryptoJS.AES.encrypt(originalText, private_key);
    return cipherText;
  },
  // 解密
  decrypt: function (cipherText) {
    let bytes = CryptoJS.AES.decrypt(cipherText, private_key);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  },
  MD5: function (originalText) {
    return CryptoJS.MD5(originalText);
  },
  // 设置cookie
  setCookie(cname, cvalue, exdays) {
    let date = new Date();
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  },
  // 读取cookie
  getCookie: function (cname) {
    let name = cname + "=";
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let c = cookies[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) != -1) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },
  // 清除cookie
  clearCookie: function (cname) {
    this.setCookie(cname, "", -1);
  },

};

export default util;

