import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/article/list',
    method: 'get',
    params
  })
}

export function audit(params) {
  return request({
    url: '/article/audit',
    method: 'post',
    params
  })
}
