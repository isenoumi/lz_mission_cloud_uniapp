import request from '@/util/requestLimited.js'


export function addConvenientlyType(data) {
  return request({
    'url': '/mission_b/mission/bkbVolunteer/add',
    'method': 'POST',
    data
  })
}
export function subscribeById(data) {
  return request({
    'url': '/mission_b/mission/bkbVolunteer/queryByPhone',
    'method': 'get',
    params: data
  })
}