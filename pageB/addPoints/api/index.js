import request from '@/util/request.js'


export function manualCreditsAdd(data) {
  return request({
    'url': '/mission_b/mission/bkbActivePhaseRecord/manualCreditsAdd',
    'method': 'POST',
    data
  })
}
export function getActivityList(data) {
  return request({
    'url': '/mission_b/mission/bkbActivePhaseRecord/mainContents',
    'method': 'get',
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