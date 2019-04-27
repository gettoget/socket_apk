import config from '@/config'
// const ajaxUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
const ajaxUrl = process.env.NODE_ENV === 'development'
  ? 'http://180g1187v9.51mypc.cn:8090/ajaxapi'
  : 'http://180g1187v9.51mypc.cn:8090/ajaxapi'

export default {

  NETWORK_ERR_STR: '网络加载异常!',
  url: ajaxUrl,
  upFile: ajaxUrl + '/upload',
  // getImgUrl: 'http://192.168.3.35:8889'+'/img/',
  getImgUrl: ajaxUrl + '/img/',
  LOGIN: {
    QUERY: 'login',
    YZ: '/pub/image/Kaptcha/',
    getUKeyPwd:'/getUKeyPwd',
    getUserLoginType:'/getUserLoginType',
  },
  USERROOT:{
    MODIFY_PSD: '/api/yh/mdfPwd'
  }
}
