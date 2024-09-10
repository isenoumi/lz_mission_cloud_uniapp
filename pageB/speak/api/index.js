import request from '@/util/request.js'


export function addConvenientlyType(data) {
  return request({
    'url': '/mission_b/mission/bkbConvenientlyType/add',
    'method': 'POST',
    data
  })
}
// export function requestTime(data) {
//   return request({
//     'url': '/mission_gh/xcx_api/bkbPunchCardRecord/requestTime',
//     'method': 'get',
//     params: data
//   })
// }


// export function activitylist(data) {
//   return request({
//     'url': '/mission_gh/v1/activity/list',
//     'method': 'get',
//     params: data
//   })
// }