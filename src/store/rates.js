import { getExchangeRates } from '../api'

const initialState = {
  amount: '12.00',
  currencyCode: 'USD',
  currencyData: { USD: { displayLabel: 'US Dollars', code: 'USD', rate: 1.0 } },
  supportedCurrencies: ['USD', 'EUR', 'JPY', 'CAD', 'GBP', 'MXN']
}

export function ratesReducer(state = initialState, action) {
  switch (action.type) {
    case AMOUNT_CHANGED:
      return { ...state, amount: action.payload }
    case CURRENY_CODE_CHANGED:
      return { ...state, currencyCode: action.payload }
    case LABEL_RECEIVED: {
      const { displayLabel, currencyCode } = action.payload

      return {
        ...state,
        currencyData: {
          ...state.currencyData,
          [currencyCode]: {
            ...state.currencyCode[currencyCode],
            displayLabel
          }
        }
      }
    }
    case RATES_RECEIVED: {
      const codes = Object.keys(action.payload).concat(state.currencyCode)
      const currencyData = {}
      for (const code in action.payload) {
        currencyData[code] = { code, rate: action.payload[code] }
      }
      return { ...state, currencyData, supportedCurrencies: codes }
    }
    default:
      return state
  }
}

// selectors
export const getAmount = state => state.rates.amount
export const getCurrencyCode = state => state.rates.currencyCode
export const getCurrencyData = state => state.rates.currencyData
export const getSupportedCurrencies = state => state.rates.supportedCurrencies
export const getDisplayLabel = (state, currencyCode) => {
  const match = state.rates.currencyData[currencyCode]
  if (match) return match.displayLabel
}

// action types
export const AMOUNT_CHANGED = 'rates/amountChanged'
export const CURRENY_CODE_CHANGED = 'rates/currencyCodeChanged'
export const RATES_RECEIVED = 'rates/ratesReceived'
export const LABEL_RECEIVED = 'rates/labelReceived'

// action creators
export const changeAmount = amount => ({ type: AMOUNT_CHANGED, payload: amount })
// with thunk
export const changeCurrencyCode = currencyCode => (dispatch, getState) => {
  const state = getState()
  const supportedCurrencies = getSupportedCurrencies(state)

  dispatch({ type: CURRENY_CODE_CHANGED, payload: currencyCode })
  getExchangeRates(currencyCode, supportedCurrencies).then(rates => {
    dispatch({ type: RATES_RECEIVED, payload: rates })
  })
}

// thunks
export function getInitialRates(dispatch, getState) {
  const state = getState()
  const currencyCode = getCurrencyCode(state)
  dispatch(changeCurrencyCode(currencyCode))
}
