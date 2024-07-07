import { Label } from "@radix-ui/react-label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useRef } from "react"
import { useMutation } from "@tanstack/react-query"
import { register } from "../http/api"
import { LoaderCircle } from "lucide-react"


const RegisterPage = () => {
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      console.log("login succesfull");
      navigate("/dashboard/home");
    },
  });

  //login logic
  const handleRegisterSubmit = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const name = nameRef.current?.value;
    console.log("data", { email, password });
    if (!name || !email || !password ) {
      return alert("Please enter email and password");
    }

    //mutate
    mutation.mutate({name, email, password });
  };
  return (
    <section className="flex justify-center items-center h-screen">
    <Card className="w-full max-w-sm">
    <CardHeader>
      <CardTitle className="text-xl">Sign Up</CardTitle>
      <CardDescription
      >
        Enter your information to create an account
        {mutation.isError && (
                        <span className="text-red-500 text-sm">{'Something went wrong'}</span>
                    )}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="first-name">First name</Label>
            <Input ref={nameRef} id="name" placeholder="Max" required />
          </div>
          
        </div>
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
          <Input ref={passwordRef} id="password" type="password" />
        </div>
        <Button
                            onClick={handleRegisterSubmit}
                            className="w-full"
                            disabled={mutation.isPending}>
                            {mutation.isPending && <LoaderCircle className="animate-spin" />}

                            <span className="ml-2">Create an account</span>
                        </Button>
      
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link to="/auth/login" className="underline" >
          Sign in
        </Link>
      </div>
    </CardContent>
  </Card>
  </section>
  )
}

export default RegisterPage