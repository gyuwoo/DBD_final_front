import React from "react"
import spotMain1 from '../../../../../assets/spot_main_01.png';
import spotMain2 from '../../../../../assets/spot_main_02.png';
import spotMain3 from '../../../../../assets/spot_main_03.png';

import './ShowSpot.css';

export const ShowSpot = ({

}) => {
    return (
        <div className="show-spot">
            <div className="spot-1">
                <img src={spotMain1} className="spot-main-1" />
            </div>
        </div>
    )
}