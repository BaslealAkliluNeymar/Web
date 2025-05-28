import { useNavigate } from "react-router"
import { ModeToggle } from "./mood-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useDispatch, useSelector } from "react-redux"
import { logoutAsync } from "../store/authSlice"
import { AppDispatch } from "../store/store"


const Navbar = () => {
  const User = useSelector((state:any) => state.user.user)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  

  const handleLogout = () =>{
    dispatch(logoutAsync())
    navigate("/login")
  }
  return (
    <nav className="flex item-center justify-between w-full p-4" >
       <div className="flex flex-col gap-2 p-4">
          <h1 className="text-4xl font-bold">FITHSCS Logistics</h1>
          <p className="text-md text-gray-500">Welcome to the Fleet Management System</p>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
    
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shdcn.png" />
                <AvatarFallback>
                  <div className="flex items-center justify-center w-full h-full text-sm font-medium text-slate-700 bg-white rounded-full">
                    <p className="text-xl text-slate-900">{User?.charAt(0).toUpperCase()}</p>
                  </div>
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={() =>handleLogout()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
    </nav>
  )
}

export default Navbar