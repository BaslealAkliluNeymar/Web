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
  

  console.log(`from the nav user: ${User}`)
  const handleLogout = () =>{
    dispatch(logoutAsync())
    navigate("/login")
  }
  return (
    <nav className="flex item-center justify-between w-full p-4" >
        <div>
            <h1 className="text-2xl font-bold">My Application</h1>
            <p className="text-sm text-gray-500">Welcome to my application</p>
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