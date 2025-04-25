import { useState, useEffect } from 'react'
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
        setInput(event.target.value);
    }

    const [imageUrl, setImageUrl] = useState('')
    const onImageUrlChange = (event) => {
        setImageUrl(event.target.value);
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
    
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch("https://cogniface-backend.onrender.com/")
        .then(res => res.json())
        .then(setData);
    }, []);

    const [loadUser, setLoadUser] = useState({
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    })
    const onLoadUser = (data) => {
        setLoadUser({
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        });
    }

    const [boxes, setBoxes] = useState([]);
    const calculateFaceLocation = (data) => {
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        
        return data.outputs[0].data.regions.map(region => {
            const box = region.region_info.bounding_box;
            return {
                leftCol: box.left_col * width,
                topRow: box.top_row * height,
                rightCol: width - (box.right_col * width),
                bottomRow: height - (box.bottom_row * height)
            }
        });
    };

    const[errorMessage, setErrorMessage] = useState('');

    const onPictureSubmit = () => {
        if (!input) return;

        setImageUrl(input);
        setErrorMessage('');

        fetch('https://cogniface-backend.onrender.com/imageurl', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input })
        })
            .then(response => response.json())
            .then(response => {
                if (response && response.outputs && response.outputs[0].data.regions) {
                    fetch('https://cogniface-backend.onrender.com/image', {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: loadUser.id })
                    })
                        .then(res => res.json())
                        .then(count => {
                            setLoadUser(prevUser => ({ ...prevUser, entries: count }));
                        })
                        .catch(console.log);

                    setBoxes(calculateFaceLocation(response));
                } else {
                    setErrorMessage('No faces detected. Please try another image.');
                }
            })
            .catch(err => { 
                console.log('error:', err);
                setErrorMessage("Error processing image. Please try again later.");
            });
    };
    
    return (
        <div className="App">
            <ParticlesBg type="cobweb" bg={true} />
            <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
            { route === "home"
                ?   <div>
                        <Logo />
                        <Rank 
                            name={loadUser.name}
                            entries={loadUser.entries}/>
                        <ImageLinkForm
                            input={input}
                            onInputChange={onInputChange}
                            onPictureSubmit={onPictureSubmit} />
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <FaceRecognition 
                            imageUrl={imageUrl}
                            boxes={boxes}/>
                    </div>
                : (
                    route === "signin"
                    ? <Signin loadUser={onLoadUser} onRouteChange={onRouteChange}/>
                    : <Register loadUser={onLoadUser} onRouteChange={onRouteChange}/>
                )       
            }              
        </div>
    );
}

export default App;
