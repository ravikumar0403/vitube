import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducer";

const initialState = {
  user: null,
  error: "",
  loading: false,
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [{ user, error, loading }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      dispatch({
        type: "AUTH_SUCCESS",
        payload: data,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, error, loading, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
