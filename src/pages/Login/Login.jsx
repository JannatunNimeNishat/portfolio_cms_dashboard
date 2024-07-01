import { useForm } from "react-hook-form";
import MainForm from "../../components/form/MainForm";
import MainInput from "../../components/form/MainInput";
import { Button } from "antd";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const methods = useForm();
  const handleLogin = async (data) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const toastId = toast.loading("Logging, please wait...");
    try {
      const userLoginData = {
        email: data.email,
        password: data.password,
      };
      const res = await axios.post(`${API_URL}/auth/login`, userLoginData);

      if (res?.data?.message === "Login Successfully") {
        toast.success("Successfully LoggedIn", { id: toastId, duration: 2000 });
        localStorage.setItem("access_token",res?.data?.data);
        navigate("/dashboard/hero");
      }
      if (res?.data?.message === "Something went wrong") {
        toast.error("email or password incorrect!!!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error(`${error?.data?.message}`, { id: toastId, duration: 2000 });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        style={{
          border: "1px solid lightgreen",
          width: "350px",
          margin: "0 auto",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "10px 10px 30px lightgreen",
        }}
      >
        <h2 className="text-xl font-semibold py-3">SignIn:</h2>
        <MainForm onSubmit={handleLogin} methods={methods}>
          <MainInput name="email" type="email" label="email: " />
          <MainInput name="password" type="password" label="password: " />
          <div style={{ margin: "0 auto", width: "150px" }}>
            <Button
              style={{
                width: "150px",
                backgroundColor: "lightblue",
                fontWeight: "600",
                color: "black",
              }}
              htmlType="submit"
            >
              Login
            </Button>
          </div>
        </MainForm>
      </div>
    </div>
  );
};

export default Login;
