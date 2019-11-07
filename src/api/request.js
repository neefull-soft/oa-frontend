// 获取信息
import http from '@/utils/httpRequest'
export function request(requestObj) {

  if (requestObj == null || requestObj == undefined) {
     return  JSON.parse('{ data:{code:1}}');
  }
  return new Promise(function (resolve, reject) {
    http({
      url: requestObj.url,
      method: requestObj.method == null ? 'get' : requestObj.method,
      params: requestObj.params,
      data:  requestObj.data
    }).then(({data}) => {
      return resolve(data);
    })
  })
}




