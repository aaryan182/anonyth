import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserSignup } from "@aaryanbajaj/anonyth-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const navigate = useNavigate();
  const [postInputs, setpostInputs] = useState<UserSignup>({
    password: "",
  });
  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type}`,
        postInputs
      );
      console.log(response.data);
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/posts");
    } catch (e) {
      alert("Error while signing in");
    }
  }
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="flex flex-col px-5 py-5">
            <div className="text-3xl font-extrabold text-center">
              {type === "signin"
                ? "Login to existing account"
                : "Create an Account"}
            </div>
            <div className="text-slate-400 text-center">
              {type === "signin"
                ? "Create a new account"
                : "Already have an account?"}{" "}
              <Link
                to={type === "signin" ? "/signup" : "/signin"}
                className="text-blue-500"
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>
          {type === "signin" ? null : (
            <LabelledInput
              label="Name"
              placeholder="Name"
              onChange={(e) => setpostInputs({ ...postInputs })}
            />
          )}
          <LabelledInput
            label="Email"
            placeholder="Email"
            onChange={(e) => setpostInputs({ ...postInputs })}
          />
          <LabelledInput
            label="Password"
            type={"password"}
            placeholder="Password"
            onChange={(e) =>
              setpostInputs({ ...postInputs, password: e.target.value })
            }
          />
          <div className="flex justify-center mt-4">
            <button
              onClick={sendRequest}
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 "
            >
              {type === "signin" ? "Sign in" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputProps {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputProps) {
  return (
    <div>
      <label className="block mb-2 text-sm font-bold text-gray-900  ">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
