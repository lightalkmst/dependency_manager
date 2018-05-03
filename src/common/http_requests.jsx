import init from '../init'

const base_url = 'http://localhost:8000'

const get = path => category => () => ({
  url: `${base_url}${path}`,
  category,
  method: 'GET',
})

const post = path => category => send => ({
  url: `${base_url}${path}`,
  category,
  method: 'POST',
  send,
})

export default {
  get_services: get ('') ('get_services'),
  get_features: get ('') ('get_features'),
  add_service: post ('') ('add_service'),
  add_feature: post ('') ('add_feature'),
}
