import React from 'react';
import _ from 'lodash';
import '../static/css/schelude.css';

export default ({data, direction}) => {
    const direction_schelude = _.filter((data[0])[0], (value, key) => {
        if(key === data[1]){
                return true
        }
    });
    const renderSchelude = _.map(_.filter(direction_schelude[0], (value, key) => {
        if (key === direction) {
            return true
        }
    })[0], (value, key) => {
        return (
            <li key={key} className="list-group-item">
                <p id="godziny">{key}</p>
                <p id="minuty">{`${value} ${" "}`}</p>
            </li>
        );
    });

    return (
        <ul>
            {renderSchelude}
        </ul>
    )
}