import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/comment/list',
    method: 'get',
    params
  })
}

export function remove(params) {
  return request({
    url: '/comment',
    method: 'delete',
    params
  })
}
