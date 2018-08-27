import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { fetchData } from "../actions/fetchData";
import "../static/css/station_chooser.css";

class SearchBar extends Component {
    constructor(props){
        super(props);

        this.state = { term: '' };

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }


    onInputChange(event) {
        this.setState({ term: event.target.value });

    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.fetchData(this.state.term);
        this.setState({ term: '' });
    }

    render() {
        return (
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
        );
    }

}
function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchData}, dispatch);
}



export default connect(null, mapDispatchToProps)(SearchBar);