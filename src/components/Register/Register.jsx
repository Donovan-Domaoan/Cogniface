import React from "react";
import { useState, useEffect }  from 'react';


function Register({ onRouteChange, loadUser }) {

    const [nameRegister, setNameRegister] = useState('')
    const onNameRegister = (event) => {
            setNameRegister(event.target.value);
        }

    const [emailRegister, setEmailRegister] = useState('')
    const onEmailRegister = (event) => {
            setEmailRegister(event.target.value);
        }
    
    const [passwordRegister, setPasswordRegister] = useState('')
    const onPasswordRegister = (event) => {
            setPasswordRegister(event.target.value);
        }

    const onSubmitRegister = () => {
        console.log('Sending registration data...');
        fetch('https://cogniface-backend.onrender.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: emailRegister,
                password: passwordRegister,
                name: nameRegister
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to register: ' + response.statusText);
            }
            return response.json();
        })
        .then(user => {
            if (user && user.id) {
                console.log('User registered:', user);
                loadUser(user);  
                onRouteChange('home');
            } else {
                throw new Error('No user ID found in the response.');
            }
        })
        .catch(err => {
            console.error('Error during registration:', err.message);
            alert('Registration failed. Please try again later.');
        });
    };
    
    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent  ph0 mh0">
                        <legend className="f4 fw6 ph0 center mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="name" 
                            id="name"
                            onChange={onNameRegister} />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address" 
                            id="email-address"
                            onChange={onEmailRegister} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password" 
                            id="password"
                            onChange={onPasswordRegister} />
                        </div>
                    </fieldset>
                    <div className="center">
                        <input 
                        onClick={() => onSubmitRegister()}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Register" />
                    </div>
                </div>
            </main>
        </article>
    );
}

export default Register;