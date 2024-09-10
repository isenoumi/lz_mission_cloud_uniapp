import request from '@/util/requestLimitedObject.js'


export function selfExaminationInsert(data) {
  return request({
    url: '/yx-project/api/selfExamination/selfExaminationInsert',
    method: 'post',
    data
  })
}
export function getRecord(data) {
  return request({
    url: '/yx-project/api/selfExamination/page',
    method: 'get',
    data
  })
}
export function jobInfo(data) {
  return request({
    url: '/yx-project/api/selfExamination/' + data,
    method: 'get',
  })
}