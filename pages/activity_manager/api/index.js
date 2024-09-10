import request from '@/util/request.js'


export function getACheckInActivity(data) {
  return request({
    url: '/mission_b/mission/bkbActivePhase/getACheckInActivity',
    method: 'GET',
    params: data
  })
}
export function qrCodeAddPoints(data) {
  return request({
    url: '/mission_b/mission/bkbActivePhaseRecord/qrCodeAdd',
    method: 'GET',
    params: data
  })
}


// export function activitylist(data) {
//   return request({
//     'url': '/mission_gh/v1/activity/list',
//     'method': 'get',
//     params: data
//   })
// }