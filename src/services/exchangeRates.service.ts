import axios from "axios";

class ExchangeRatesAPIService {
  private axios = axios;

  getConvert(amount: string, from: string, to: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const convertedValue = await this.axios.get(
          `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
          {
            headers: {
              apikey: process.env.EXCHANGERATES_API_KEY,
            },
          }
        );

        resolve(convertedValue.data);
      } catch (err: any) {
        let error = err;

        if (err?.response?.data?.error?.code === "invalid_from_currency")
          error = { message: "Invalid value for from" };

        if (err?.response?.data?.error?.code === "invalid_to_currency")
          error = { message: "Invalid value for to" };

        if (err?.response?.data?.error?.code === "invalid_conversion_amount")
          error = { message: "Invalid value for amount" };

        reject(error);
      }
    });
  }

  getLatest(from: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const latest = await this.axios.get(
          `https://api.apilayer.com/exchangerates_data/latest?base=${from}`,
          {
            headers: {
              apikey: process.env.EXCHANGERATES_API_KEY,
            },
          }
        );

        resolve(latest.data);
      } catch (err: any) {
        let error = err;

        if (err?.response?.data?.error?.code === "invalid_base_currency")
          error = { message: "Invalid value for from" };

        reject(error);
      }
    });
  }
}

export default ExchangeRatesAPIService;
