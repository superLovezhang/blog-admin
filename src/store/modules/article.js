import { list, audit } from '@/api/article'

const state = {
  queryParams: {},
  pagination: { size: 10, page: 1 },
  articleList: []
}

const mutations = {
  SET_PARAMS: (state, params) => {
    state.queryParams = params
  },
  SET_PAGINATION: (state, pagination) => {
    state.pagination = { ...state.pagination, ...pagination }
  },
  SET_ARTICLE_LIST: (state, articles) => {
    state.articleList = articles
  }
}

const actions = {
  getArticleList({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      list(state.queryParams).then(res => {
        const { data } = res
        const { pages, size, records } = data ?? {}
        commit('SET_ARTICLE_LIST', records)
        commit('SET_PAGINATION', { page: pages, size })
      }).catch(err => reject(err))
    })
  },
  updateQueryParams({ commit, dispatch }, params) {
    commit('SET_PARAMS', params)
    dispatch('getArticleList')
  },
  updatePagination({ commit, dispatch }, pagination) {
    commit('SET_PAGINATION', pagination)
    dispatch('getArticleList')
  },
  auditArticle({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      audit(payload)
        .then((res) => {
          dispatch('getArticleList')
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
