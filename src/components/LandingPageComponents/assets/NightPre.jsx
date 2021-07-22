import React from "react"
import np from "./NightPre.png"
import Text from "../../shared/Text"
function NightPre(){
    return(
        <div className="elem">
            <Text type="secondary" className="text">Nightinternship</Text>
            <img src={np} alt="Nightpreneurship" />
        </div>
    )
}

export default NightPre