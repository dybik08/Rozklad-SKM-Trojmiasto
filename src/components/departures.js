import React,{Component} from 'react';
import Schelude from './schelude';
import '../static/css/departures.css';
import data from '../static/mock_data/rozklad_Politechnika_Gdynia';


class Departures extends Component {


    render() {
        return (
            <div className="row">
                <div id="current-stop" className="col-12">Przystanek: Politechnika</div>
                <div id="departures" className="col-6">
                    <div id='departures-header'>
                        <div id="tablica-przystanku">
                            <div id="destination-stop" className="col-12 row">
                                <div className="col-12">Kierunek: Gdynia Główna</div>
                                <div className="col-2">Godziny</div>
                                <div className="col-10">Minuty</div>
                            </div>

                        </div>
                    </div>
                    <div id="rozkład" className="row">
                        <Schelude data={data} direction="Gdynia"/>
                    </div>
                </div>
                <div id="departures" className="col-6">
                    <div id='departures-header'>
                        <div id="tablica-przystanku">
                            <div id="destination-stop" className="col-12 row">
                                <div className="col-12">Kierunek: Gdańsk Główny</div>
                                <div id="hours" className="col-2">Godziny</div>
                                <div className="col-9">Minuty</div>
                            </div>
                        </div>
                        <div id="rozkład">
                            <Schelude data={data} direction="Gdańsk"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Departures;