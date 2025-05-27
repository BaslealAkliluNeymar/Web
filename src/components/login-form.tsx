import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { useDispatch, useSelector } from "react-redux"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { loginAsync } from "../store/authSlice"
import { AppDispatch } from "../store/store"  
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { LoginCredentials } from "../types"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const navigator = useNavigate()
  const [user, setUser] = useState<LoginCredentials>({
    email: "",
    password: "",
  })
  const dispatch = useDispatch<AppDispatch>()
  const {isAuthenticated} = useSelector((state: any) => state.user)
  console.log(user)

  useEffect(() =>{ 
    if(isAuthenticated){
      navigator("/admin/deliveries")
    }
  },[isAuthenticated])


  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginAsync(user))
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, value } = e.target

    setUser((prev) =>({
      ...prev,
      [name]:value
    }))

  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-1/3 mx-auto mt-42">
        <CardHeader className="flex flex-col gap-1">
          <CardTitle className="text-center text-2xl">FITSCS</CardTitle>
          <CardDescription className="text-center text-sm">
            Fleet Management System
          </CardDescription>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} >
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com" onChange={handleChange}
                  value = {user.email}
                  name="email"
                  required 
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required onChange={handleChange}  value = {user.password} name="password" />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full text-slate-900" >
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
