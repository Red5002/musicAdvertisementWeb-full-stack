import { useState } from "react";
import api from "@/api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants";
import { Button } from "@/components/ui/button";

function Form() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Default to false

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Tokens are not present: make the login API call
    try {
      const res = await api.post("api/token/", { username, password });
      // Store tokens once received
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      alert("Login Successful.");
      // Navigate to admin after storing tokens
      navigate("/admin");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full place-items-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="h-full w-full gap-6 max-w-sm p-4 flex flex-col justify-center"
      >
        <h1 className="text-center text-3xl font-extrabold mb-4 text-gray-500 dark:text-gray-400">
          Login
        </h1>
        <input
          type="text"
          className="py-2 pl-1 text-2xl shadow-lg rounded-md"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
          autoComplete="username"
        />
        <input
          type="password"
          className="py-2 pl-1 text-2xl shadow-lg rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
        />
        <Button
          className="form-button w-full text-xl p-5 bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}

export default Form;
