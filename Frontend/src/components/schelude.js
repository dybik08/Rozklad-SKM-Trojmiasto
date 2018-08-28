import React from 'react';
import _ from 'lodash';
import '../static/css/schelude.css';

export default ({data, direction}) => {
    console.log("direction: ", direction)
    // console.log("Data in schelude(to render): ", data);
    const direction_schelude = _.filter(_.map(_.filter(data, (value, key) => {
        if(key === 0){
            return true
        }
    }), (value, key) => {
        return value[0];
    })[0], (value, key) => {
        console.log(key)
        if(key === 'Politechnika'){
            return true
        }
    });
    console.log("Direction schelude: ", direction_schelude)
    // console.log(value, key)

    const renderSchelude = _.map(_.filter(direction_schelude[0], (value, key) => {

        if (key === direction) {
            return true
        }

    })[0], (value, key) => {
        console.log('key: ',key, 'value: ', value)
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