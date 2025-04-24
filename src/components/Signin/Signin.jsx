import React from "react";
import { useState, useEffect }  from 'react';

function Signin({ onRouteChange, loadUser }) {

    const [emailSignIn, setEmailSignIn] = useState('')
    const onEmailSignIn = (event) => {
            setEmailSignIn(event.target.value);
    }

    const [passwordSignIn, setPasswordSignIn] = useState('')
    const onPasswordSignIn = (event) => {
            setPasswordSignIn(event.target.value);
    }

    const onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: emailSignIn,
                password: passwordSignIn
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.id) {
                loadUser(data);
                onRouteChange('home');
            }
        })
    }
      
    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent  ph0 mh0">
                        <legend className="f4 fw6 ph0 center mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address" 
                            id="email-address" 
                            onChange={onEmailSignIn}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password" 
                            id="password"
                            onChange={onPasswordSignIn}
                            />
                        </div>
                    </fieldset>
                    <div className="center">
                        <input
                            onClick={() => onSubmitSignIn()}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in" />
                    </div>
                    <div className="lh-copy mt3 center">
                        <p
                            onClick={() => onRouteChange('register')}
                            className="f6 link dim black db pointer">Register</p>
                    </div>
                </div>
            </main>
        </article>

    );
}


export default Signin;