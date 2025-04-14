import React from "react";
import Tilt from 'react-parallax-tilt';
import Brain from "./face-scan.png";

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt style={{height:"200px", width: "200px"}}>
                <div>
                    <img style={{paddingTop: "1px"}} alt= "logo" src={Brain}/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;