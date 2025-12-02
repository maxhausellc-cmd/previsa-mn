import { login } from "./services/auth";

const handleLogin = async () => {
  try {
    const data = await login({ email: "test@test.com", password: "1234" });
    console.log("Login success:", data);
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
  }
};

handleLogin();