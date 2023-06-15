import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  navigate("/LogIn");

  return <></>;
};

export default Home;
