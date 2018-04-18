import {run} from '@cycle/run'
import {makeDOMDriver} from '@cycle/dom'
import main from './app'

run (main, {
  DOM: makeDOMDriver ('#root'),
})
