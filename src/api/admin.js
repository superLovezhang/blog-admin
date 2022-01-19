import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/administrator/login',
    method: 'post',
    data
  })
}

export function info() {
  return request({
    url: '/administrator/userInfo',
    method: 'get'
  })
}
export function logout() {
  return request({
    url: '/administrator/logout',
    method: 'post'
  })
}
