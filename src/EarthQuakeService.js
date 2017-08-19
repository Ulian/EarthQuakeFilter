import axios from 'axios';

const EarthQuakeService = {
  getEarthQuakes: async (startTime, endTime, minMag) => {
    const response = await axios.get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startTime}&endtime=${endTime}&minmagnitude=${minMag}`)
    return response.data.features;
  }
}

export default EarthQuakeService;
