import React from "react";
import { auth, googleProvider } from "../../firebase/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
function Login() {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(auth?.currentUser?.photoURL);
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Login;
