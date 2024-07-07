import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { login} from "../http/api";

const LoginPage = () => {
  const navigate = useNavigate();
  
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);



  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      console.log("login succesfull");
      navigate("/dashboard/home");
    },
  });

  //login logic
  const handleLoginSubmit = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log("data", { email, password });
    if (!email || !password) {
      return alert("Please enter email and password");
    }

    //mutate
    mutation.mutate({ email, password });

  
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              ref={emailRef}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input /// <reference path="" />
              ref={passwordRef}
              id="password"
              type="password"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLoginSubmit} className="w-full">
            Sign in
          </Button>
        </CardFooter>
        <div className="mb-4 text-center text-m">
          Don't have an account?{" "}
          <Link to="/auth/register" className="underline">
            Sign up
          </Link>
        </div>
      </Card>
    </section>
  );
};

export default LoginPage;
