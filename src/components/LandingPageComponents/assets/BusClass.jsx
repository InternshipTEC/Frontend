import React from "react"
import bclass from "./BusClass.png"
import "./Carousel.css"
import Text from "../../shared/Text"
function BusClass(){
    return(
        <div className="elem">
            <Text type="secondary" className="text">Business Class</Text>
            <img src={bclass} alt="Bussiness Class" />
        </div>
    )
}

export default BusClass