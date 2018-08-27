export const FETCH_DATA = 'FETCH_DATA';

export function fetchData(station) {
    console.log("Station: ", station);
    const data = require(`../static/mock_data/${station}`);
    console.log("Data in actions: ", data);

    return {
        payload: data,
        station: station,
        type: FETCH_DATA,
    };
}