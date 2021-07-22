import React from "react"
import bchl  from "./BusChal.png";
import Text from "../../shared/Text"
//import "./Carousel.css"

function BusChal(){
    return(
        <div className="buschal">
            <Text type="secondary" className="text">Business Challenge</Text>
            <img src={bchl} alt="BusChal" />
        </div>
    )
}

export default BusChal