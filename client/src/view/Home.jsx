import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Row } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import RiddleList from "../components/RiddleList";
import useNotification from "../hooks/useNotification";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";

const Home = ({ riddles, setRiddles }) => {
  const [session] = useContext(AuthContext);
  const [dirty, setDirty] = useState(true);
  const notify = useNotification();
  const { filter } = useParams();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (dirty) {
      api
        .getAllRiddles()
        .then((riddles) => {
          if (filter === "all") setRiddles(riddles);
          else if (filter === "aperto")
            setRiddles(riddles.filter((riddle) => riddle.Active));
          else if (filter === "chiuso")
            setRiddles(riddles.filter((riddle) => !riddle.Active));
          else if (filter === "pubblicati" && session.loggedIn)
            setRiddles(
              riddles.filter((riddle) => riddle.Autore === session.user.id)
            );
          setDirty(false);
        })
        .catch((err) => {
          if (err.status === 404) setRiddles([]);
          else notify.error(err.message);
        })
        .finally(() => {
          setLoaded(true);
        });
    }
  }, [filter, dirty]); // eslint-disable-line react-hooks/exhaustive-deps

  if (session.user) {
    setInterval(() => {
      setDirty(!dirty);
    }, 8000);
  }
  if (loaded) {
    return (
      <Row expand="lg" className="p-3 my-3 flex-fill align-items-start">
        <Sidebar />
        <RiddleList riddles={riddles} setDirty={setDirty} />
      </Row>
    );
  }
};
export default Home;
