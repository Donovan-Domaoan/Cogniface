import React from "react";
import './FaceRecognition.css';

function FaceRecognition({ imageUrl, boxes }) {
    const hideContent = !imageUrl || boxes.length === 0;
    return (
        <div className={`center ma ${hideContent ? 'hidden' : ''}`}>
            <div className='absolute mt2'>
                {imageUrl && (
                    <img id='inputimage'
                        src={imageUrl}
                        alt='NO Detected Face'
                        width='500px'
                        height='auto' />
                )}
                {boxes.map((box, i) => (
                    <div
                        key={i}
                        className='bounding-box'
                        style={{
                            top: box.topRow,
                            right: box.rightCol,
                            bottom: box.bottomRow,
                            left: box.leftCol,
                            position: 'absolute',
                            boxShadow: '0 0 0 3px #149df2 inset',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default FaceRecognition;
