import axios from "axios/index";

export const FETCH_DATA = 'FETCH_DATA';

export const fetchData = (station) => {

    return (dispatch) => {
        axios.get(`http://localhost:8000/result/${station}`)
            .then(dataInPromise => {
                // console.log("Returning dataInPromise: ", dataInPromise.data);
                dispatch({
                    payload: dataInPromise.data,
                    station: station,
                    type: FETCH_DATA,
                });
            });
    }
}