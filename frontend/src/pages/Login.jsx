import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OpenEyeIcon from "../../icons/OpenEyeIcon";
import { UsersShemalogin } from "../interface/UserShema";
import Input from "../components/Input";
import ErrorInput from "../components/ErrorInput";
import axios from "axios";
import { UserContext } from "../hooks/UserContext";
import { MdHome } from "react-icons/md";
import CloseEyeIcon from "./../../icons/CloseEyeicon";
import LoginWithgoogle from "../components/LoginWithgoogle";

export default function Login() {
  const [eyePassword, useEyePassword] = useState("password");
  const { setUserInfo } = useContext(UserContext);
  const [load, setload] = useState(false);
  const toggleEyePassword = () => {
    useEyePassword(eyePassword === "password" ? "text" : "password");
  };
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorState, setErrorState] = useState({
    email: null,
    password: null,
  });
  const navigate = useNavigate();
  const Login = async (e) => {
    try {
      e.preventDefault();

      const { error, value } = UsersShemalogin.validate(
        { email: form.email, password: form.password },
        { abortEarly: false }
      );

      if (error) {
        const errors = error.details.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        console.log(errors);
        setErrorState(errors);
      } else {
        setErrorState({ email: null, password: null });
        setload(true);
        try {
          const response = await axios.post(
            "https://book-store-backend-sigma-one.vercel.app/users/login",
            {
              email: value.email,
              password: value.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const Data = response.data.data;
          localStorage.setItem("token", Data.user.token);
          localStorage.setItem("user", JSON.stringify(Data.user));

          const userData = JSON.parse(localStorage.getItem("user"));

          setUserInfo(userData);
          setload(false);
          navigate("/", { replace: true });
        } catch (err) {
          console.error("An error occurred:", err);
          setload(false);
          if (err.response && err.response.data && err.response.data.message) {
            if (
              err.response.data.message.includes("Incorrect Email or Password")
            ) {
              setErrorState({
                email: "Incorrect Email or Password",
                password: "Incorrect Email or Password",
              });
            } else {
              setErrorState({
                email: "Login failed. Please try again.",
                password: null,
              });
            }
          } else {
            setErrorState({
              email: "A network error occurred. Please try again later.",
              password: null,
            });
          }
        }
      }
    } catch (e) {
      console.error("An unexpected error occurred:", e);
      setErrorState({
        email: "An unexpected error occurred. Please try again.",
        password: null,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };
  const handleOnBLur = (e) => {
    const { name, value } = e.target;

    const { error } = UsersShemalogin.validate(
      { ...form, [name]: value },
      { abortEarly: false }
    );

    if (error) {
      const errors = error.details.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
      setErrorState((prevState) => ({
        ...prevState,
        [name]: errors[name],
      }));
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        [name]: null,
      }));
    }
  };

  return (
    <div style={{ height: "100vh" }} className="flex justify-center">
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative flex flex-col space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-8 md:p-14">
            <Link to={"/"} className="absolute top-5 left-5">
              <MdHome className="size-6 text-blue-950" />
            </Link>
            <span className="mb-3 text-4xl font-bold  text-blue-950">
              {" "}
              Welcome Back
            </span>
            <span className="font-light text-gray-500 mb-8">
              {" "}
              Welcome Back Please enter your details
            </span>
            <form onSubmit={Login}>
              {errorState.email ? (
                <ErrorInput
                  value={form.email}
                  onChanges={handleChange}
                  Error={errorState.email}
                  text=" Email"
                  placeHolder="Email"
                  htmlFor="email"
                  name="email"
                  id="email"
                  type="text"
                  onBlur={handleOnBLur}
                />
              ) : (
                <Input
                  value={form.email}
                  onChanges={handleChange}
                  text=" Email"
                  placeHolder="Email"
                  htmlFor="email"
                  name="email"
                  id="email"
                  type="text"
                  onBlur={handleOnBLur}
                />
              )}
              {errorState.password ? (
                <div className="relative">
                  <ErrorInput
                    value={form.password}
                    onChanges={handleChange}
                    Error={errorState.password}
                    text="Password"
                    placeHolder="Password"
                    htmlFor="password"
                    name="password"
                    id="password"
                    type={eyePassword}
                    onBlur={handleOnBLur}
                  />
                  <button
                    type="button"
                    onClick={toggleEyePassword}
                    className="absolute top-1/2 right-3 transform  -translate-y-4 md:-translate-y-1  "
                  >
                    {eyePassword === "password" ? (
                      <CloseEyeIcon />
                    ) : (
                      <OpenEyeIcon />
                    )}
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <Input
                    value={form.password}
                    onChanges={handleChange}
                    text="Password"
                    placeHolder="Password"
                    htmlFor="password"
                    name="password"
                    id="password"
                    type={eyePassword}
                    onBlur={handleOnBLur}
                  />
                  <button
                    type="button"
                    onClick={toggleEyePassword}
                    className="absolute top-1/2 right-3 transform translate-y-1 "
                  >
                    {eyePassword === "password" ? (
                      <CloseEyeIcon />
                    ) : (
                      <OpenEyeIcon />
                    )}
                  </button>
                </div>
              )}

              {load ? (
                <button
                  type="submit"
                  className="w-full cursor-not-allowed text-black p-2 rounded-lg mb-6 opacity-50 bg-white border border-brown-200"
                  disabled
                >
                  <span>
                    <img
                      src="/loadinglogin.gif"
                      width={"30"}
                      className="inline"
                    />{" "}
                  </span>
                </button>
              ) : (
                <input
                  type="submit"
                  className="w-full text-white p-2 rounded-lg mb-5 mt-5 bg-blue-950 hover:cursor-pointer duration-200 font-bold hover:bg-blue-950 hover:text-[#dbb891]"
                  value="Log in"
                />
              )}
              <p className="text-center text-xs">OR</p>
              <div className="text-center text-gray-400">
                <LoginWithgoogle />
                <hr />
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-bold inline-block text-blue-950 hover:underline mt-5"
                >
                  Sign up for free
                </Link>
              </div>
            </form>
          </div>
          <div className="relative">
            <img
              src="/bookloginimage.avif"
              alt="image"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
