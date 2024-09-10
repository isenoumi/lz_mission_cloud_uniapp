import request from '@/util/requestLimitedObject.js'


export function getRecord(data) {
  return request({
    url: '/yx-project/api/jobRecords/xPage',
    method: 'get',
    data
  })
}
export function jobInfo(data) {
  return request({
    url: '/yx-project/api/jobRecords/' + data,
    method: 'get',
  })
}