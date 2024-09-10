import request from '@/util/requestLimitedObject.js'


export function getLimitedList(data) {
  return request({
    url: '/yx-project/api/limitedSpaceIdentification/byType',
    method: 'get',
    data
  })
}
export function jobInsert(data) {
  return request({
    url: '/yx-project/api/jobRecords/jobRecordsInsert',
    method: 'post',
    data
  })
}
export function jobEdit(data) {
  return request({
    url: '/yx-project/api/jobRecords/jobRecordsEdite',
    method: 'put',
    data
  })
}
export function jobInfo(data) {
  return request({
    url: '/yx-project/api/jobRecords/' + data,
    method: 'get',
  })
}