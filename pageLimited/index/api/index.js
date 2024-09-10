import request from '@/util/requestLimitedObject.js'

export function getEnterpriseInfo(data) {
  return request({
    url: '/yx-project/api/countyOperationLedger/selectByName',
    method: 'get',
    data
  })
}