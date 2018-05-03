import init from '../init'

const base_url = 'http://localhost:8000'

  //
  // .map (() => {
  //
  //   return {
  //     url: 'https://jsonplaceholder.typicode.com/users/' + String(randomNum),
  //     category: 'users',
  //     method: 'GET',
  //   }
  // })

export default {
  add_service: body => ({
    url: `${base_url}`,
    category: 'add_service',
    method: 'GET',
    // method: 'POST',
    // send: body,
  }),
  add_feature: body => ({
    url: `${base_url}`,
    category: 'add_feature',
    method: 'GET',
  }),
  get_services: () => ({
    url: `${base_url}`,
    category: 'get_services',
    method: 'GET',
  }),
  get_features: () => ({
    url: `${base_url}`,
    category: 'get_features',
    method: 'GET',
  }),
}
