import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../../store/authSlice";
import { Button, Input, Logo } from "../index";
import { useDispatch } from "react-redux";
import { authService } from "../../appwrite/auth";
import { useForm } from "react-hook-form";
// import Service from "../../appwrite/config";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handelSubmit } = useForm();
  const [error, setError] = useState(null);

  const login = async (data) => {
    console.log(data);
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(storeLogin);
        navigate("/");
      }
    } catch (error) {
      setError("error.message");
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto  w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 `}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight ">
          Sign into your account
        </h2>
        <p className="mt-2 text-center  text-base text-black/60">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center"> {error}</p>}
        <form onSubmit={handelSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email"
              palceholder="Enter email"
              type="email"
              {...register(
                "email", //IT IS A KEY
                {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                      "Enter the valid email address",
                  },
                }
              )} // you have to compusorily spread the register or else whereevr the register is used it will always overwrite the values everywhre  and keep the argument unique so that the data retrived is done using that argurment
            />{" "}
            <Input
              label="Password"
              palceholder="Enter password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign In{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;