import app from './base';
import 'firebase/auth';

export const handleLogin = async (email, password) => {
    try {
        return await app.auth().signInWithEmailAndPassword(email,password);
    } catch (err) {
        return err
    }
}

export const handleSignup = (email, password) => {
    try {
        app.auth().createUserWithEmailAndPassword(email,password);
    } catch (err) {
        return err
    }
}