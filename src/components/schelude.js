import React from 'react';
import _ from 'lodash';
import '../static/css/schelude.css';

export default ({data, direction}) => {

    const direction_schelude = _.filter(data, (value, key) => {
        if(key === direction){
            return true
        }
    });

    const renderSchelude = _.map(direction_schelude[0], (value, key) =>
            <li className="list-group-item">
                <p id="godziny">{key}</p>
                <p id="minuty">{`${value} ${" "}`}</p>
            </li>
    );

    return (
        <ul>
            {renderSchelude}
        </ul>
    )
}