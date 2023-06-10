import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

export const Account = (props) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logout } = UserAuth();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (props.user == null) {
        navigate("/LogIn");
      }
    }, 400);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      {loading ? (
        <BeatLoader
          color={"#123abc"}
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          <h2>Account</h2>
          <p>UserEmail: {props.user && props.user.email} </p>
          <button onClick={handleLogout}>LOGOUT</button>
        </>
      )}
    </div>
  );
};

export default Account;
