import React from "react";
import "./ImageLinkForm.css"

const ImageLinkForm = ({ input, onInputChange, onPictureSubmit }) => {
    return (
        <div>
            <p className="f3 tc">
                {"Drop a photo and let Cogniface show you who's in it."}
            </p>
            <div className="center">
                <div className="form center pa4 br3 w-30 shadow-5">
                    <input className="f4 pa2 w-70 center" 
                    type="text"
                    value={input} 
                    onChange={onInputChange}/>
                    <button 
                    className="w-30 grow f4 link ph3 pv2 dib white bg-green"
                    onClick={onPictureSubmit}
                    disabled={!input.trim()}
                    >Detect</button>
                </div>
            </div>
        </div>  
    );
}

export default ImageLinkForm;