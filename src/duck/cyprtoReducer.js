import axios from 'axios';

////  inital value
const ALLCOINSYMBOL = 'ALLCOINSYMBOL';
const SOMECOINDETAIL = 'SOMECOINDETAIL';
const SYMBOLID = 'SYMBOLID';
const PAPROKAID = 'PAPROKAID';

////  initial value
const initialState = {
  allCoinSymbol: [],
  someCoinDetail: [],
  cryptoCompareCoinId: [],
  paprokaId: [],
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

export function postSymbolId(ids) {
  // console.log(`IDS:: ${ ids }`)
  return {
    type: SYMBOLID,
    payload: ids              
  }
}

export function getpaprokaId(id) {
  // console.log(`LINE 34 HIT`)
  // console.log(`id ${ id }` )
  return {
    type: SYMBOLID,
    payload: axios.get(`/api/getpaprokaId/${ id }`)              
  }
}

// HANDLE STATE CHANGES
export default function cyprtoReducer(state = initialState, action) {
  console.log(state)
  switch(action.type) {
    case `${ALLCOINSYMBOL}_FULFILLED`:
      // console.log(`${ALLCOINSYMBOL}_FULFILLED`, action.payload.data)
    return {
      ...state,
      allCoinSymbol: action.payload,
    }

    case SYMBOLID:
      // console.log(`${SYMBOLID}_FULFILLED`, action.payload)
    return {
      ...state,
      cryptoCompareCoinId: action.payload.id,
    }

    default: 
    return state;
  }
}
