import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { fetchData } from "../actions/fetchData";
import "../static/css/station_chooser.css";

class SearchBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            term: '',
            day: ''
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
    }


    onInputChange(event) {
        this.setState({ term: event.target.value });

    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.fetchData(this.state.term, this.state.day);

    }

    onRadioChange(event){
        this.setState({day: event.target.value});
    }

    render() {
        // console.log("state: ", this.state)
        return (
            <div>
            <form onSubmit={this.onFormSubmit} className="input-group">
                <input
                    id="szukanaStacja"
                    placeholder="Get schelude for selected station !"
                    className="form-control"
                    value={this.state.term}
                    onChange={this.onInputChange} />
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </span>
            </form>
                <div className="form-check-inline">
                    <label className="form-check-label">
                        <input type="radio" className="form-check-input" onChange={this.onRadioChange} value="zwykly" name="optradio" />Dzień powszedni
                    </label>
                </div>
                <div className="form-check-inline">
                    <label className="form-check-label">
                        <input type="radio" className="form-check-input" onChange={this.onRadioChange} value="sobota" name="optradio" />Sobota
                    </label>
                </div>
                <div className="form-check-inline disabled">
                    <label className="form-check-label">
                        <input type="radio" className="form-check-input" onChange={this.onRadioChange} value="niedziela" name="optradio" />Niedziele i Święta
                    </label>
                </div>
            </div>
        );
    }

}
function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchData}, dispatch);
}



export default connect(null, mapDispatchToProps)(SearchBar);