import http from '@/utils/httpRequest'
export function requestUrl(url) {

  return http.adornUrl(url)
}
