import request from '@/util/requestLimitedObject.js'


export function getRecord(data) {
  return request({
    url: '/yx-project/api/limitedSpaceIdentification/appPage',
    method: 'get',
    data
  })
}
export function getInfo(data) {
  return request({
    url: '/yx-project/api/limitedSpaceIdentification/appOne',
    method: 'get',
    data
  })
}