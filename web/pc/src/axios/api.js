import config from '@/config'
// const ajaxUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
// const ajaxUrl = process.env.NODE_ENV === 'development'
//   ? 'http://180g1187v9.51mypc.cn:8090/ajaxapi'
//   : 'http://47.103.69.105:8090/ajaxapi/'

var Yurl = window.location.href;
var ajaxUrl = ''
if(Yurl.indexOf('localhost')!=-1 || Yurl.indexOf('180g1187v9.51mypc')!=-1){
  ajaxUrl = "http://180g1187v9.51mypc.cn:8090/ajaxapi"
}else{
  ajaxUrl = "http://47.103.69.105:8090/ajaxapi"
}

export default {
  url: ajaxUrl,
  UpFileUrl:ajaxUrl+'/upload_file'
}
