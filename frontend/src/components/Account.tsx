import { useNavigate } from "react-router-dom";
import authServiceInstance from "../service/AuthService";
import { User } from "firebase/auth";
import { Button } from "react-bootstrap";

type AccountProps = {
  user: User | null;
};

export const Account = (props: AccountProps) => {


  
  const navigate = useNavigate();

 
  const handleLogout = async () => {
    try {
      await authServiceInstance.logout();
      navigate("/");
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return ((
        <>
          <div className="container">
            <h2 className="text-center mb-4" style={{ color: "white" }}>
              User Account
            </h2>
            <div className="card">
              <div className="card-header">
                <h5>Welcome, {props.user?.displayName}</h5>
              </div>
              <div className="card-body">
                <h6>Email: {props.user?.email}</h6>
                <p>Account Details:</p>
              </div>
            </div>
            <div className="text-center mt-4">
              <Button variant="primary">Edit Account</Button>
              <Button variant="danger">Delete Account</Button>
            </div>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
            <div></div>
          </div>
        </>
      )

  );
};

export default Account;
