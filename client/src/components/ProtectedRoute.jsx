import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useNotification from "../hooks/useNotification";

const ProtectedRoute = () => {
  const notify = useNotification();
  const [session] = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session.loggedIn) {
      navigate("/", { replace: true });
      notify.error("Devi essere autenticato per poter eseguire questa azione");
    }
  }, [session.loggedIn]); // eslint-disable-line

  if (session.loggedIn) return <Outlet />;
};

export default ProtectedRoute;
