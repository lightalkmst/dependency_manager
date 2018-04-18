import xs from 'xstream'

import init from '../init'

const search_terms = [
  'name',
  'feature',
  'description',
]

export default sources => {
  return {
    DOM: xs.of (
      <div>
        Search for your API: <select>
          {
            A.map (x =>
              <option value={x}>{`${S.upper (x[0])}${S.substr (1) (-1) (x)}`}</option>
            ) (search_terms)
          }
        </select> <input type='text' id='search_term' /> <button>Search</button>
      </div>
    ),
  }
}
