import React, { createContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { } from 'react-router-dom';
import firebaseConfig from './firebase.config';


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

let Context = null;
const { Provider, Consumer } = Context = createContext();

const UserAuthProvider = (props) => {
    //Declare State
    const [user, setUser] = useState(null);
    const [succeed, setSucceed] = useState(false);
    const [error, setError] = useState('');

    // sign in user of google
    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(googleProvider)
            .then(result => {
                const { displayName, email, photoURL } = result.user;
                const signedIUser = {
                    isSigned: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                sessionStorage.setItem('name', signedIUser.name);
                sessionStorage.setItem('user', signedIUser.email);
                setUser(signedIUser);
                setSucceed(true)
                authStateChange();
                storeAuthJwtToken();
                return result;
            }).catch(error => {
                const errorMessage = error.message;
                const email = error.email;
                console.log(errorMessage, email);
                setError(error);
            });
    }

    //auth state changed
    const authStateChange = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                sessionStorage.setItem("user", user.email);
                sessionStorage.setItem("name", user.displayName);
                sessionStorage.setItem("photo", user.photoURL);
            } else {
                console.log("Logout success");

            }
        });
    }
    //verify with JWT Token
    const storeAuthJwtToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(idToken => {
                // console.log(idToken);
                sessionStorage.setItem('token', idToken);
            }).catch(error => {
                console.log(error);
            });
    }

    // logout user
    const logOut = () => {
        firebase.auth().signOut()
            .then(() => {
                setUser(null);
            }).catch(error => {
                console.log(error);
            })
    }
    return (
        <Provider value={
            {
                user,
                succeed,
                error,
                handleGoogleSignIn,
                logOut,
                setUser,
            }
        }>
            {props.children}
        </Provider>
    )

}


export { UserAuthProvider, Consumer as UserConsumer, Context as AuthContext };