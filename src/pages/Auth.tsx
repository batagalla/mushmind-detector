
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md">
            <div className="mb-6 flex rounded-md overflow-hidden">
              <Button
                type="button"
                variant="ghost"
                className={`flex-1 py-2 rounded-none ${
                  isLogin ? "bg-mushroom-500 text-white" : "bg-gray-100"
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </Button>
              <Button
                type="button"
                variant="ghost"
                className={`flex-1 py-2 rounded-none ${
                  !isLogin ? "bg-mushroom-500 text-white" : "bg-gray-100"
                }`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </Button>
            </div>

            {isLogin ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
