import { logoutAsync } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
const Home = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      Home
      <button
        onClick={() => {
          dispatch(logoutAsync());
        }}
      >
        Logout
      </button>
      <button
        onClick={() => {
          navigator("/login");
        }}
      >
        login
      </button>
    </div>
  );
};

export default Home;
