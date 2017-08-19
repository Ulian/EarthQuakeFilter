import axios from 'axios';

const EarthQuakeService = {
  getEarthQuakes: (startTime, endTime, minMag) => {
    axios.get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startTime}&endtime=${endTime}&minmagnitude=${minMag}`)
      .then(response => {
        this.setState({earthquakes: response.data.features});
      });
  }
}

export default EarthQuakeService;
