import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from "particles-bg"
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

function App() {
    
    const [input, setInput] = useState('')
    const onInputChange = (event) => {
        setInput({input: event.target.value});
    }

    const [route, setRoute] = useState('signin')
    const onRouteChange = (route) => {
        if (route === 'signout') {
            setisSignedIn(false)
        } else if (route === 'home') {
            setisSignedIn(true)
        }
        setRoute(route);
    }

    const [isSignedIn, setisSignedIn] = useState(false)
    

    const MODEL_ID = 'face-detection';
    const returnClarifaiRequestOptions = (imageUrl) => {
        const PAT = '37735c1bffb3434b82929784e60ded0a';
        const USER_ID = 'donovandomaoan';
        const APP_ID = 'face-recognize';
        const MODEL_ID = 'face-detection';
        const IMAGE_URL = imageUrl;
        
        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": IMAGE_URL
                            // "base64": IMAGE_BYTES_STRING
                        }
                    }
                }
            ]
        });
    
        return requestOptions = {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' + PAT
          },
          body: raw
        };
      }

    const onButtonSubmit = () => {
        fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiRequestOptions)
      .then(response => response.json())
      .then(result => {

          const regions = result.outputs[0].data.regions;

          regions.forEach(region => {
              // Accessing and rounding the bounding box values
              const boundingBox = region.region_info.bounding_box;
              const topRow = boundingBox.top_row.toFixed(3);
              const leftCol = boundingBox.left_col.toFixed(3);
              const bottomRow = boundingBox.bottom_row.toFixed(3);
              const rightCol = boundingBox.right_col.toFixed(3);

              region.data.concepts.forEach(concept => {
                  // Accessing and rounding the concept value
                  const name = concept.name;
                  const value = concept.value.toFixed(4);

                  console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
                  
              });
          });

      })
      .catch(error => console.log('error', error));
        }
    
    return (
        <div className="App">
            <ParticlesBg type="cobweb" bg={true} />
            <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
            { route === "home"
                ?   <div>
                        <Logo />
                        <Rank />
                        <ImageLinkForm
                            onInputChange={onInputChange}
                            onButtonSubmit={onButtonSubmit} />
                            {/*<FaceRecognition />*/}
                    </div>
                : (
                    route === "signin"
                    ? <Signin onRouteChange={onRouteChange}/>
                    : <Register onRouteChange={onRouteChange}/>
                )       
            }              
        </div>

    );
}

export default App;
