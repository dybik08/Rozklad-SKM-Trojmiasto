import axios from "axios/index";

export const FETCH_DATA = 'FETCH_DATA';

export const fetchData = (station, day) => {
    // console.log("Station before dispatch: ",station)

    return (dispatch) => {
        station = (station === 'Główny') ? 'glowny' : station;
        day = (day === 'niedziela') ? 'niedziela': (day === 'sobota') ? 'sobota' : '';
        console.log(day)
        axios.get(`http://localhost:8000/result/${station}/${day}`)
            .then(dataInPromise => {
                console.log("Returning dataInPromise: ", dataInPromise.data);
                dispatch({
                    payload: dataInPromise.data,
                    station: station,
                    type: FETCH_DATA,
                });
            });
    }
}