import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const { setIsSignedIn } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = isSignUp ? "/api/users/auth/register/" : "/api/users/auth/login/";
      const payload = isSignUp
        ? {
            username: form.username,
            email: form.email,
            password: form.password,
          }
        : {
            username: form.username,
            password: form.password,
          };

      if (isSignUp && form.password !== form.confirm_password) {
        setError("Passwords do not match");
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Request failed");
      }

      const data = await response.json();
      console.log("Auth success:", data);

      // Store token if your backend sends one
      localStorage.setItem("token", data.token || "");

      // Navigate to home page after login/signup
      localStorage.setItem("token", data.access);
      setIsSignedIn(true);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">
        {isSignUp ? "Sign Up" : "Log In"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded shadow p-6 space-y-4"
      >
        {error && <div className="text-red-600">{error}</div>}

        {isSignUp && (
          <>
            <div>
              <label className="block mb-1 font-medium">Username *</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Your username"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Your email"
              />
            </div>
          </>
        )}

        {!isSignUp && (
          <div>
            <label className="block mb-1 font-medium">Username *</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter username"
            />
          </div>
        )}

        <div>
          <label className="block mb-1 font-medium">Password *</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter password"
          />
        </div>

        {isSignUp && (
          <div>
            <label className="block mb-1 font-medium">Confirm Password *</label>
            <input
              type="password"
              name="confirm_password"
              value={form.confirm_password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Confirm password"
            />
          </div>
        )}

        <Button type="submit" className="w-full">
          {isSignUp ? "Create Account" : "Log In"}
        </Button>
      </form>

      <div className="mt-4 text-center">
        {isSignUp ? (
          <p>
            Already have an account?{" "}
            <button
              onClick={() => setIsSignUp(false)}
              className="text-blue-600 underline"
            >
              Log In
            </button>
          </p>
        ) : (
          <p>
            Don’t have an account?{" "}
            <button
              onClick={() => setIsSignUp(true)}
              className="text-blue-600 underline"
            >
              Sign Up
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
