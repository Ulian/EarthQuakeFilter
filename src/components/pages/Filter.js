import React from 'react';

import { InputGroup, EarthQuakeList } from '../index';
import Alert from "../ui/Alert";
import { EarthQuakeService } from '../../services';

const Filter = () => {
  const date = new Date();

  const [ earthQuakeList, setEarthQuakeList ] = React.useState([]);
  const [ startTime, setStartTime ] = React.useState(`${ date.getFullYear() }-${ ('0' + (date.getMonth() + 1)).slice(-2) }-${ ('0' + (date.getDate() - 1)).slice(-2) }`);
  const [ endTime, setEndTime ] = React.useState(`${ date.getFullYear() }-${ ('0' + (date.getMonth() + 1)).slice(-2) }-${ ('0' + date.getDate()).slice(-2) }`);
  const [ minMagnitude, setMinMagnitude ] = React.useState('3.0');
  const [ limit, setLimit ] = React.useState(10);

  React.useEffect(() => {
    EarthQuakeService.getEarthQuakes({ startTime, endTime, minMagnitude, limit })
        .then(response => setEarthQuakeList(response));
  }, [ minMagnitude, startTime, endTime, limit ]);

  const inputGroups = [{
      id: 'minMagnitude',
      name: `Magnitude ${ parseFloat(minMagnitude).toFixed(1) }`,
      type: 'range',
      value: minMagnitude.toString(),
      min: '0.1',
      max: '10.0',
      step: '0.1',
      onChange: ({ target }) => setMinMagnitude(target.value),
    }, {
      id: 'startTime',
      name: 'Start Date',
      type: 'date',
      value: startTime,
      onChange: ({ target }) => setStartTime(target.value),
    }, {
      id: 'endTime',
      name: 'End Date',
      type: 'date',
      value: endTime,
      onChange: ({ target }) => setEndTime(target.value),
    }, {
      id: 'limit',
      name: 'Limit',
      type: 'number',
      value: limit.toString(),
      onChange: ({ target }) => setLimit(target.value),
    }
  ].map(props => <InputGroup key={ props.id } { ...props } />);

  return(
    <div>
      <form className="form-inline my-3">
        { inputGroups }
      </form>

      { earthQuakeList.length > 0 ? <EarthQuakeList data={ earthQuakeList } /> : <Alert type="warning">No results with the current filters...</Alert> }
    </div>
  )
}

export default Filter;
