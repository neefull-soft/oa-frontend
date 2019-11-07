import http from '@/utils/httpRequest'
export function requestParam(paramObject,method,canTrans) {

   if (paramObject == null || paramObject == {}) {
     return null;
   }
   if (method == null || 'get' === method ){
     return http.adornParams(paramObject);
   } else {
     if (!canTrans) {
       return http.adornData(paramObject,false);
     }
     return http.adornData(paramObject);
   }
}
