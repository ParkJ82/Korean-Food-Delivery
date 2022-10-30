import React, { useState } from "react";

function FoodBlock(properties) {
    const [open, setOpen] = useState(false);

    return (
        <div className="card">
            <div className="card-body" onClick={() => setOpen(!open)}>
                <a href={properties.englishName}>
                    {properties.name}
                    <br/>
                    {properties.price}
                </a>
                    
            </div>
            

        </div>
        
    );
}


export default FoodBlock;