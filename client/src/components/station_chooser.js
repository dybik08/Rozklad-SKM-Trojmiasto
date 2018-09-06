import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { fetchData } from "../actions/fetchData";
import Autosuggest  from 'react-autosuggest';
import "../static/css/theme.css";

let stations = [
    {
       name: "Politechnika"
    },
    {
        name: "Wrzeszcz"
    },
    {
        name: "Główny"
    },
    {
        name: "Stocznia"
    },
    {
        name: "Zaspa"
    }

];

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : stations.filter(station =>
        station.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);

class SearchBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            value: '',
            day: '',
            suggestions: []
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onFormSubmit(event) {
        event.preventDefault();
        console.log(event)
        this.props.fetchData(this.state.value, this.state.day);

    }

    onRadioChange(event){
        this.setState({day: event.target.value});
    }

    render() {

        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Get schelude for selected station !",
            value,
            onChange: this.onChange
        };

        return (
            <div>
                <form onSubmit={this.onFormSubmit} className="input-group">
               <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps} />
                <span className="input-group-btn">
                   <button type="submit" className="btn btn-secondary">Search</button>
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