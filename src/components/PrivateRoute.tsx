import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { generateUserAsync } from "../store/authSlice";

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>()


  useEffect(() =>{
    const fetchUser = async () =>{
      dispatch(generateUserAsync())
    }
    fetchUser()
  },[])

  
  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
