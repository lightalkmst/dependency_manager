import xs from 'xstream'

import init from './init'
import search_bar from './components/search_bar'

export default sources => {
  const {
    DOM: search_bar_dom$,
  } = search_bar (sources)

  return {
    DOM: search_bar_dom$,
  }
}
