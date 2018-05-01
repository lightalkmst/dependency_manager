import xs from 'xstream'

import init from '../init'

import css from './styles.css'

export default sources => {
  const {DOM} = sources

  const nav_state$ =
    xs.merge (...[
      DOM.select ('#service_browser_tab').events ('click').mapTo ('service_browser'),
      DOM.select ('#feature_browser_tab').events ('click').mapTo ('feature_browser'),
      DOM.select ('#service_adder_tab').events ('click').mapTo ('service_adder'),
      DOM.select ('#feature_adder_tab').events ('click').mapTo ('feature_adder'),
      DOM.select ('#feature_tagger_tab').events ('click').mapTo ('feature_tagger'),
    ])
      .startWith ('service_browser')

  return {
    DOM: (
      nav_state$.map (() =>
        <div className='nav_bar'>
          <ul>
            <li id='service_browser'>Browse Services</li>
            <li id='feature_browser'>Browse Feature</li>
            <li id='service_adder'>Add Service</li>
            <li id='feature_adder'>Add Feature</li>
            <li id='feature_tagger'>Mark Dependency</li>
          </ul>
        </div>
      )
    ),
    nav_state$,
  }
}
