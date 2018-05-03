import xs from 'xstream'

import init from '../init'

import http_requests from './http_requests'

export default adder => fields => sources => {
  const {DOM, HTTP} = sources

  const lower_adder = S.lower (adder)

  const id_of_field = field => `${lower_adder}_adder_${S.lower (field)}`

  return {
    DOM: (
      xs.merge (...[
        DOM.select (`#${lower_adder}_adder_tab`).events ('click'),
        DOM.select (`#${lower_adder}_adder_submit`).events ('click'),
      ])
        .startWith (null)
        // clear out old inputs
        .map (F.tap (() => A.iter (x => (document.getElementById (`${lower_adder}_adder_${S.lower (x)}`) || {}).value = '') (fields)))
        .map (() => (
          <div>
            {
              A.map (x =>
                <div>
                  {`${x}: `}<input id={`${lower_adder}_adder_${S.lower (x)}`}></input>
                </div>
              ) (fields)
            }
            <button id={`${lower_adder}_adder_submit`}>{`Add ${adder}`}</button>
          </div>
      ))
    ),
    HTTP: (
      xs.merge (...[
        // submit
        xs.merge (...[
          DOM.select (`#${lower_adder}_adder_submit`).events ('click')
            .mapTo ([{}, true]),
          xs.merge (...A.map (x => DOM.select (`#${lower_adder}_adder_${S.lower (x)}`).events ('input')) (fields))
            // strip the id down to the field name
            .map (x => [({[S.replace (`${lower_adder}_adder_`) ('') (x.target.id)]: x.target.value}), false]),
        ])
          .fold (([req], [prop, submit]) => [D.extend (req) (prop), submit], [{}, false])
          .map (x => x[1] ? http_requests[`add_${lower_adder}`] (x[0]) : {}),
        // refresh client data
        HTTP.select (`add_${lower_adder}`).flatten ()
          .map (() => http_requests[`get_${lower_adder}s`] ()),
      ])
    ),
  }
}
