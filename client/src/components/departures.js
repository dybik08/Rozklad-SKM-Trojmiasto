import React,{Component} from 'react';
import {connect} from 'react-redux';
import Schelude from './schelude';
import SearchBar from './station_chooser';
import '../static/css/departures.css';


class Departures extends Component {

    renderStation = () => {
        if(this.props.data.length !== 0){
            return (
                <div className="row">
                    <div id="current-stop" className="col-12">Przystanek: Gdańsk {this.props.data[1] = (this.props.data[1] === 'glowny') ? 'Główny' : this.props.data[1]}</div>
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
                            <Schelude data={this.props.data} direction="Gdynia"/>
                        </div>
                    </div>
                    <div id="departures" className="col-6">
                        <div id='departures-header'>
                            <div id="tablica-przystanku">
                                <div id="destination-stop" className="col-12 row">
                                    <div className="col-12">Kierunek: Gdańsk Śródmieście</div>
                                    <div id="hours" className="col-2">Godziny</div>
                                    <div className="col-9">Minuty</div>
                                </div>
                            </div>
                            <div id="rozkład">
                                <Schelude data={this.props.data} direction="Gdańsk"/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                <SearchBar/>
                {this.renderStation()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.data,
    }
}

export default connect(mapStateToProps, null)(Departures);