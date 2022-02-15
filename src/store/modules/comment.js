import { list, remove } from '@/api/comment'

const state = {
  queryParams: {},
  pagination: { size: 10, page: 1 },
  commentList: []
}

const mutations = {
  SET_PARAMS: (state, params) => {
    state.queryParams = params
  },
  SET_PAGINATION: (state, pagination) => {
    state.pagination = { ...state.pagination, ...pagination }
  },
  SET_COMMENT_LIST: (state, articles) => {
    state.commentList = articles
  }
}

const actions = {
  getCommentList({ commit, state }) {
    return new Promise((resolve, reject) => {
      list({ ...state.queryParams, ...state.pagination }).then(res => {
        const { data } = res
        const { pages, size, records } = data ?? {}
        commit('SET_COMMENT_LIST', records)
        commit('SET_PAGINATION', { pages, size })
      }).catch(err => reject(err))
    })
  },
  updateQueryParams({ commit, dispatch }, params) {
    commit('SET_PARAMS', params)
    dispatch('getCommentList')
  },
  updatePagination({ commit, dispatch }, pagination) {
    commit('SET_PAGINATION', pagination)
    dispatch('getCommentList')
  },
  removeComment({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      remove(payload)
        .then((res) => {
          dispatch('getCommentList')
          resolve(res.message)
        })
        .catch(err => reject(err))
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
