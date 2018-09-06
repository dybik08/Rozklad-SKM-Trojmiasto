import axios from "axios/index";

export const FETCH_DATA = 'FETCH_DATA';

export const fetchData = (station, day) => {
    let stationInPolish = station;
    return (dispatch) => {
        let tableOfPolishSymbols = [/ę/g, /ó/g, /ą/g, /ś/g, /ł/g, /ż/g, /ź/g, /ć/g, /ń/g];
        let tableOfLatinSymbols = ['e', 'o', 'a', 's', 'l', 'z', 'z', 'c', 'n'];
        for (let i=0; i<tableOfPolishSymbols.length; i++){
            station = station.replace(tableOfPolishSymbols[i], tableOfLatinSymbols[i])
        }
        day = (day === 'niedziela') ? 'niedziela': (day === 'sobota') ? 'sobota' : '';
        axios.get(`http://localhost:8000/result/${station}${day}`)
            .then(dataInPromise => {
                dispatch({
                    payload: dataInPromise.data,
                    station: stationInPolish,
                    type: FETCH_DATA,
                });
            });
    }
};