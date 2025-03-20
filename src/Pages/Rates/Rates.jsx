import { useEffect, useReducer, useState } from 'react';
import DropDown from '../../Components/DropDown';
import ProgressBar from '../../Components/ProgressBar';
import Loader from '../../Components/Loader';
import TextInput from '../../Components/TextInput/TextInput';
import Flag from '../../Components/Flag';

import { useAnimationFrame } from '../../Hooks/useAnimationFrame';
import { ReactComponent as Transfer } from '../../Icons/Transfer.svg';
import { fetchRate } from '../../api';

import classes from './Rates.module.css';

import CountryData from '../../Libs/Countries.json';
import countryToCurrency from '../../Libs/CountryCurrency.json';
import {
  initialState,
  ratesReducer,
  SET_AMOUNT,
  SET_EXCHANGE_RATE,
  SET_FROM_CURRENCY,
  SET_LOADING,
  SET_TO_CURRENCY,
} from './reducer';

const countries = CountryData.CountryCodes;
const MARKUP_PERCENTAGE = 0.005; // 0.5%

const Rates = () => {
  const [state, dispatch] = useReducer(ratesReducer, initialState);
  const { fromCurrency, toCurrency, amount, exchangeRate, loading } = state;
  const [progression, setProgression] = useState(0);
  const [error, setError] = useState(null);

  const calculateConversion = (inputAmount) => {
    if (!inputAmount || !exchangeRate) {
      return { true: '', marked: '' };
    }

    const numericAmount = parseFloat(inputAmount);
    if (isNaN(numericAmount)) {
      return { true: '', marked: '' };
    }

    const trueConversion = numericAmount * exchangeRate;

    const markupAdjustment = exchangeRate * MARKUP_PERCENTAGE;
    const markedUpRate = exchangeRate - markupAdjustment;
    const markedUpConversion = numericAmount * markedUpRate;

    return {
      true: trueConversion.toFixed(2),
      marked: markedUpConversion.toFixed(2),
    };
  };

  const conversionResults = calculateConversion(amount);

  const updateRate = async (fromCurrency, toCurrency) => {
    if (!loading) {
      try {
        dispatch({ type: SET_LOADING, payload: true });
        setError(null);
        const sellCurrency = countryToCurrency[fromCurrency];
        const buyCurrency = countryToCurrency[toCurrency];

        const rate = await fetchRate(sellCurrency, buyCurrency);
        dispatch({ type: SET_EXCHANGE_RATE, payload: rate });
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
        const errorData = {
          title: 'Error Fetching Rate',
          detail: 'An unexpected error occurred. Please try again later.',
        };

        setError(errorData);
        dispatch({ type: SET_EXCHANGE_RATE, payload: null });
      } finally {
        dispatch({ type: SET_LOADING, payload: false });
      }
    }
  };

  useAnimationFrame(!loading, (deltaTime) => {
    setProgression((prevProgression) => {
      if (prevProgression > 0.998) {
        updateRate(fromCurrency, toCurrency);
        return 0;
      }
      return (prevProgression + deltaTime * 0.0001) % 1;
    });
  });

  useEffect(() => {
    updateRate(fromCurrency, toCurrency);
  }, [fromCurrency, toCurrency]);

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.heading}>Currency Conversion</div>

        {error && (
          <div className={classes.error}>
            <h3>{error.title}</h3>
            <p>{error.detail}</p>
          </div>
        )}

        <div className={classes.rowWrapper}>
          <div>
            <DropDown
              leftIcon={<Flag code={fromCurrency} />}
              label={'From'}
              selected={countryToCurrency[fromCurrency]}
              options={countries.map(({ code }) => ({
                option: countryToCurrency[code],
                key: code,
                icon: <Flag code={code} />,
              }))}
              setSelected={(updatedFromCurrency) => {
                setError(null);
                dispatch({ type: SET_FROM_CURRENCY, payload: updatedFromCurrency });
                updateRate(updatedFromCurrency, toCurrency);
              }}
              style={{ marginRight: '20px' }}
            />
          </div>

          <div className={classes.exchangeWrapper}>
            <div className={classes.transferIcon}>
              <Transfer height={'25px'} />
            </div>
            <div className={classes.rate}>{exchangeRate?.toFixed(4)}</div>
          </div>

          <div>
            <DropDown
              leftIcon={<Flag code={toCurrency} />}
              label={'To'}
              selected={countryToCurrency[toCurrency]}
              options={countries.map(({ code }) => ({
                option: countryToCurrency[code],
                key: code,
                icon: <Flag code={code} />,
              }))}
              setSelected={(updatedToCurrency) => {
                setError(null);
                dispatch({ type: SET_TO_CURRENCY, payload: updatedToCurrency });
                updateRate(fromCurrency, updatedToCurrency);
              }}
              style={{ marginLeft: '20px' }}
            />
          </div>
        </div>

        <div className={classes.amountWrapper}>
          <TextInput
            value={amount}
            onChange={(value) => dispatch({ type: SET_AMOUNT, payload: value })}
            label="Amount"
            placeholder={`Enter amount in ${countryToCurrency[fromCurrency]}`}
            leftIcon={<Flag code={fromCurrency} />}
          />
          {amount && (
            <div className={classes.conversionResults}>
              <div className={classes.resultRow}>
                <span className={classes.resultLabel}>Market Rate:</span>
                <span className={classes.resultValue}>
                  {conversionResults.true} {countryToCurrency[toCurrency]}
                </span>
              </div>
              <div className={classes.resultRow}>
                <span className={classes.resultLabel}>
                  OFX Rate (inc. {MARKUP_PERCENTAGE * 100}% markup):
                </span>
                <span className={classes.resultValue}>
                  {conversionResults.marked} {countryToCurrency[toCurrency]}
                </span>
              </div>
            </div>
          )}
        </div>

        <ProgressBar
          progress={progression}
          animationClass={loading ? classes.slow : ''}
          style={{ marginTop: '20px' }}
        />

        {loading && (
          <div className={classes.loaderWrapper}>
            <Loader width={'25px'} height={'25px'} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Rates;
