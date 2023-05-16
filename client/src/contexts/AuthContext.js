import { createContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import useNotification from "../hooks/useNotification";
import api from "../services/api";

const AuthContext = createContext([{}, () => {}]);

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState({
    user: null,
    loggedIn: false,
  });
  const [dirty, setDirty] = useState(true);
  const notify = useNotification();

  useEffect(() => {
    if (dirty) {
      api
        .getUser()
        .then((user) => {
          setSession({ user: { ...user }, loggedIn: true });
        })
        .catch((err) => setSession({user: null, loggedIn: false}))
        .finally(() => setDirty(false));
    }
  }, [dirty]);

  if (!dirty) {
    return (
      <AuthContext.Provider value={[session, setDirty]}>
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <Spinner animation="border" variant="primary" className="opacity-25" />
    </div>
  );
};

export { AuthContext, AuthProvider };
