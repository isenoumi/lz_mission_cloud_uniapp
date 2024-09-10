import request from '@/util/request.js'


export function extraPointsForNewAnswers(data) {
  return request({
    'url': '/mission_gh/xcx_api/bkbChoiceqst_answer/extraPointsForNewAnswers',
    'method': 'get',
    params: data
  })
}
export function answerPoints(data) {
  return request({
    'url': '/mission_gh/xcx_api/bkbChoiceqst_answer/answerPoints',
    'method': 'get',
    params: data
  })
}