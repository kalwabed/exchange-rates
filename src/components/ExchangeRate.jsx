import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { RateTable } from './RateTable'
import { CurrencyCodePicker } from './CurrencyCodePicker'
import { AmountField } from './AmountField'
import { getExchangeRates } from '../api'
import { getAmount, supportedCurrencies, getCurrencyCode, changeCurrencyCode } from '../store/rates'

function ExchangeRate() {
  const dispatch = useDispatch()
  const amount = useSelector(getAmount)
  const currencyCode = useSelector(getCurrencyCode)

  // fetch the exchange rates the first time...
  useEffect(() => {
    dispatch(changeCurrencyCode(currencyCode))
  }, [])

  return (
    <>
      <section>
        <h1 className="ExchangeRate-header">
          Exchange Rates <CurrencyCodePicker supportedCurrencies={supportedCurrencies} currencyCode={currencyCode} />
        </h1>
      </section>
      <section>
        <AmountField amount={amount} />
      </section>
      <section>
        <RateTable amount={amount} />
      </section>
    </>
  )
}

export default ExchangeRate
