import axios from 'axios';

export const EarthQuakeService = {
  getEarthQuakes: async (options) => {
    const parameters = Object.entries(options).map((option) => `${option[0].toLowerCase()}=${option[1]}`).join('&');
    const response = await axios.get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&${parameters}&orderby=time`);
    return response.data.features;
  }
}

export default EarthQuakeService;
