import axios from 'axios'
import Qs from 'qs'

export const checkURL = (data) => {
  const params = {
    auth_token: data.auth_token,
    link_user: {
      url: window.location.href
    }
  }

  return axios({
    method: 'get',
    url: 'https://mark-it-api.herokuapp.com/link_users/check_url/',
    params: params,
    paramsSerializer: (params) => (
      Qs.stringify(params, { arrayFormat: 'brackets' })
    )
  })
}

export const saveURL = (data) => {
  const params = { 
    auth_token: data.auth_token,
    link_user: {
      host: window.location.host,
      url: window.location.href
    }
  }

  return axios({
    method: 'post',
    url: 'https://mark-it-api.herokuapp.com/link_users/',
    params: params,
    paramsSerializer: (params) => (
      Qs.stringify(params, { arrayFormat: 'brackets' })
    )
  })
}

export const deleteURL = (data) => {
  const params = {
    auth_token: data.auth_token,
    link_user: {
      url: window.location.href
    }
  }

  return axios({
    method: 'delete',
    url: 'https://mark-it-api.herokuapp.com/link_users/1',
    params: params,
    paramsSerializer: (params) => (
      Qs.stringify(params, { arrayFormat: 'brackets' })
    )
  })
}