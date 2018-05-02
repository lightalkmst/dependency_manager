import xs from 'xstream'

import init from '../init'

export default adder => fields => sources => {
  const add_state$ = {}

  return {
    DOM: (
      xs.of (
        <div>
          {
            A.map (x =>
              <div>
                {`${x}: `}
                <input id={`${S.lower (adder)}_adder_${S.lower (x)}`}></input>
              </div>
            ) (fields)
          }
          <button id={`${S.lower (adder)}_adder_name`}>{`Add ${adder}`}</button>
        </div>
      )
    ),
    add_state$,
  }
}
