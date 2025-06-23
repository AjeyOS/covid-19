import axios from 'axios';

const url = "https://disease.sh/v3/covid-19";

export const FetchData = async (country) => {
  let changeableUrl = `${url}/all`;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const { data: { cases, recovered, deaths, updated } } = await axios.get(changeableUrl);

    return {
      confirmed: { value: cases },
      recovered: { value: recovered },
      deaths: { value: deaths },
      lastUpdate: updated,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/historical/all?lastdays=30`);

    const modifiedData = Object.keys(data.cases).map((date) => ({
      confirmed: data.cases[date],
      deaths: data.deaths[date],
      date,
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`${url}/countries`);
    return data.map((country) => country.country);
  } catch (err) {
    console.log(err);
  }
};
