import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../Api/api";
import { useNavigate } from "react-router-dom";
import "../css/GoogleLogin.model.css";
export default function LoginWithgoogle() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const responseGoogle = async (authResult) => {
    try {
      setIsLoading(true);
      console.log("Loading started");
      if (authResult.code) {
        // console.log("Auth Result:", authResult);
        const result = await googleAuth(authResult.code);
        console.log("Google Auth Result:", result);
        if (result && result.data) {
          const { email, username, image,id} = result.data.user;
          const token = result.data.token;
          const obj = { email, username, image,id};
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(obj));
          navigate("/", { replace: true });
        } else {
          //console.error("No user data received");
          setErrorMessage("No user data received");
        }
      } else {
        setErrorMessage("No authorization code found in authResult");
        console.error("No authorization code found in authResult");
      }
    } catch (err) {
      setErrorMessage("Error while requesting Google code");
      console.error("Error while requesting google code :", err);
    } finally {
      setIsLoading(false);
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: () => {
      console.error("Login failed", error);
      setIsLoading(false);
    },
    flow: "auth-code",
  });
  return (
    <div className="my-4">
      
      <button
        onClick={googleLogin}
        type="button"
        className="login-with-google-btn"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Sign in with Google"}
      </button>
    </div>
  );
}
