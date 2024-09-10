import request from '@/util/requestLimited.js'


export function login(data) {
  return request({
    url: '/yx-sys/api/user/byPhone',
    method: 'get',
    data
  })
}