import axios from 'axios';

const CancelToken = axios.CancelToken;
let source;

export const EarthQuakeService = {
  getEarthQuakes: async (options) => {
    source = CancelToken.source();
    const parameters = Object.entries(options).map((option) => `${option[0].toLowerCase()}=${option[1]}`).join('&');
    const response = await axios.get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&${parameters}&orderby=time`, {
      cancelToken: source.token,
    });

    return response.data.features;
  },

  cancelToken: () => {
    source.cancel();
  },
}

export default EarthQuakeService;
