import { list, ban } from '@/api/user'
import { login, info } from '@/api/admin'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userList: [],
    nextPagination: false,
    userListParams: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_LIST: (state, list) => {
    state.userList = list
  },
  SET_PAGINATION: (state, pagination) => {
    state.nextPagination = pagination
  },
  SET_USER_LIST_PARAMS: (state, params) => {
    state.userListParams = params
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ email: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      info().then(response => {
        const { data } = response

        if (!data) {
          return reject('验证失败，请重新登录.')
        }

        const { adminName, avatar } = data

        commit('SET_NAME', adminName)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getUserList({ commit, state }) {
    return new Promise((resolve, reject) => {
      list(state.userListParams).then(response => {
        const { data } = response
        const { records, next } = data
        commit('SET_USER_LIST', records ?? [])
        commit('SET_PAGINATION', next ?? false)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateUserListParams({ commit, dispatch }, params) {
    commit('SET_USER_LIST_PARAMS', params)
    dispatch('getUserList')
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  banUser({ dispatch }, params) {
    return new Promise((resolve, reject) => {
      ban(params).then(res => {
        dispatch('getUserList')
      }).catch(err => reject(err))
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

