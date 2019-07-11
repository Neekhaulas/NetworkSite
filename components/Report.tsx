import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

class Report extends Component {
    render() {
        return (
            <div>
                <FontAwesomeIcon icon={faFlag} /> Report
            </div>
        )
    }
}

export default Report;