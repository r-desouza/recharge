import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);

  return <></>;
};

export default Home;
