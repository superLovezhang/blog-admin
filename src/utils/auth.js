const TokenKey = 'blog_admin_token_key'

export function getToken() {
  return window.localStorage.get(TokenKey)
}

export function setToken(token) {
  return window.localStorage.set(TokenKey, token)
}

export function removeToken() {
  return window.localStorage.remove(TokenKey)
}
