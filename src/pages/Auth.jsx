
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Layout>
      <div className="w-full px-4 py-8 sm:py-12 md:py-16">
        <div className="flex flex-col items-center justify-center max-w-md mx-auto">
          <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex rounded-t-lg overflow-hidden">
              <Button
                type="button"
                variant="ghost"
                className={`flex-1 py-3 rounded-none ${
                  isLogin ? "bg-mushroom-500 text-white" : "bg-gray-100"
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </Button>
              <Button
                type="button"
                variant="ghost"
                className={`flex-1 py-3 rounded-none ${
                  !isLogin ? "bg-mushroom-500 text-white" : "bg-gray-100"
                }`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </Button>
            </div>

            <div className="p-4 sm:p-6">
              {isLogin ? <LoginForm /> : <RegisterForm />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
