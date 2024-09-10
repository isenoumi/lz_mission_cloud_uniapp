import request from '@/util/request.js'


export function getBkbActivePhaseUser(data) {
  return request({
    'url': '/mission_b/mission/bkbActivePhaseUser/byphone',
    'method': 'get',
    params: data
  })
}