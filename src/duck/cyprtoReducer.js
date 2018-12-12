import axios from 'axios';

////  inital value
const ALLCOINSYMBOL = 'ALLCOINSYMBOL';
const SOMECOINDETAIL = 'SOMECOINDETAIL';

////  initial value
const initialState = {
  allCoinSymbol: [],
  someCoinDetail: [],
}

////  initial action creator for payload
export function getAllSymbolData() {
  // let {topTrendCoin} = initialState
  //  console.log(topTrendCoin)
  return {
    type: ALLCOINSYMBOL,
    payload: axios.get(`/api/getAllCoinDetail`)                
  }
}

export function someCoinDetail(id) {
  console.log(`ID:: ${ id }`)
  // return {
  //   type: SOMECOINDETAIL,
  //   payload: axios.get(`/api/getMultSymbolPrice`)                
  // }
}

// HANDLE STATE CHANGES
export default function cyprtoReducer(state = initialState, action) {
  switch(action.type) {
    case `${ALLCOINSYMBOL}_FULFILLED`:
      // console.log(`${ALLCOINSYMBOL}_FULFILLED`, action.payload.data)
    return {
      ...state,
      allCoinSymbol: action.payload,
    }
    default: 
    return state;
  }
}