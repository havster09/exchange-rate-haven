export const SET_FROM_CURRENCY = 'SET_FROM_CURRENCY';
export const SET_TO_CURRENCY = 'SET_TO_CURRENCY';
export const SET_AMOUNT = 'SET_AMOUNT';
export const SET_EXCHANGE_RATE = 'SET_EXCHANGE_RATE';
export const SET_LOADING = 'SET_LOADING';

export const initialState = {
  fromCurrency: 'AU',
  toCurrency: 'US',
  amount: '',
  exchangeRate: null,
  loading: false,
};

export const ratesReducer = (state, action) => {
  switch (action.type) {
    case SET_FROM_CURRENCY:
      return { ...state, fromCurrency: action.payload };
    case SET_TO_CURRENCY:
      return { ...state, toCurrency: action.payload };
    case SET_AMOUNT:
      return { ...state, amount: action.payload };
    case SET_EXCHANGE_RATE:
      return { ...state, exchangeRate: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
