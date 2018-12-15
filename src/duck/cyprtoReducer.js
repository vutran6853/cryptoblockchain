import axios from 'axios';

////  inital value
const ALLCOINSYMBOL = 'ALLCOINSYMBOL';
const SOMECOINDETAIL = 'SOMECOINDETAIL';
const SYMBOLID = 'SYMBOLID';
const PAPROKAID = 'PAPROKAID';
const SINGLESYMBOLPRICEID = 'SINGLESYMBOLPRICEID';
const SINGLESYMBOLFILLID = 'SINGLESYMBOLFILLID';
const HISTORICALDAILYID = 'HISTORICALDAILYID';
const COININFOID = 'COININFOID';

////  initial value
const initialState = {
  allCoinSymbol: [],
  someCoinDetail: [],
  cryptoCompareCoinId: '',
  paprokaId: [],
  singleSymbolPriceId: [],
  singleSymbolFullId: [],
  historicalDailyId: [],
  coinInfoId: [],
}

////  initial action creator for payload

// export function getAllSymbolData() {
//   // let {topTrendCoin} = initialState
//   //  console.log(topTrendCoin)
//   return {
//     type: ALLCOINSYMBOL,
//     payload: axios.get(`/api/getAllCoinDetail`)                
//   }
// }

export function postSymbolId(ids) {
  // console.log(`IDS:: ${ ids }`)
  return {
    type: SYMBOLID,
    payload: ids              
  }
}

export function getSingleSymbolPriceId(id) {
  // console.log(`id::${ id }`)
  return {
    type: SINGLESYMBOLPRICEID,
    payload: axios.get(`/api/getSingleSymbolPriceId/${ id }`)                
  }
}

export function getSingleSymbolFullId(id) {
    // console.log(`id::${ id }`)
    return {
      type: SINGLESYMBOLFILLID,
      payload: axios.get(`/api/getSingleSymbolFullId/${ id }`)                
    }
}

export function getHistoricalDailyId(id) {
    // console.log(`id::${ id }`)
    return {
      type: HISTORICALDAILYID,
      payload: axios.get(`/api/getHistoricalDailyId/${ id }`)                
    }
}

export function getCoinInfoId(id) {
  // console.log(`id::${ id }`)
  return {
    type: COININFOID,
    payload: axios.get(`/api/getCoinInfoId/${ id }`)                
  }
}

export function getpaprokaId(id) {
  // console.log(`id ${ id }` )
  return {
    type: PAPROKAID,
    payload: axios.get(`/api/getpaprokaId/${ id }`)
  }
}

export function getPaprokaDescriptionID(id) {
  // console.log(`id ${ id }` )
  return {
    type: PAPROKAID,
    payload: axios.get(`/api/getPaprokaDescriptionID/${ id }`)
  }
}



// HANDLE STATE CHANGES
export default function cyprtoReducer(state = initialState, action) {
  switch(action.type) {
    case `${ ALLCOINSYMBOL }_FULFILLED`:
      // console.log(`${ALLCOINSYMBOL}_FULFILLED`, action.payload.data)
    return {
      ...state,
      allCoinSymbol: action.payload,
    }

    case SYMBOLID:
      // console.log(`${ SYMBOLID }_FULFILLED`, action.payload.id)
    return {
      ...state,
      cryptoCompareCoinId: action.payload.id,
    }

    case PAPROKAID:
    // console.log(`${ PAPROKAID }_FULFILLED`, action.payload)
    return {
      ...state,
      paprokaId: action.payload.data
    }

    case SINGLESYMBOLPRICEID:
    // console.log(`${ SINGLESYMBOLPRICEID }_FULFILLED`, action.payload)
    return {
      ...state,
      singleSymbolPriceId: action.payload.data
    }

    case SINGLESYMBOLFILLID:
    // console.log(`${ SINGLESYMBOLFILLID }_FULFILLED`, action.payload)
    return {
      ...state,
      singleSymbolFullId: action.payload.data
    }

    case HISTORICALDAILYID:
    // console.log(`${ HISTORICALDAILYID }_FULFILLED`, action.payload)
    return {
      ...state,
      historicalDailyId: action.payload.data
    }

    case COININFOID:
    // console.log(`${ COININFOID }_FULFILLED`, action.payload)
    return {
      ...state,
      getCoinInfoId: action.payload.data
    }

    default: 
    return state;
  }
}
