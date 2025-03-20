const BASE_URL = 'https://rates.staging.api.paytron.com';

export const fetchRate = async (sellCurrency, buyCurrency) => {
    const url = `${BASE_URL}/rate/public?sellCurrency=${sellCurrency}&buyCurrency=${buyCurrency}`;
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch exchange rate');
    }

    const data = await response.json();
    return data.retailRate;
}; 