import { createContext } from "react";
import { Provider, useSelector } from "react-redux";
import store from "@app/store";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

const AuthWrapper = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};

export default AuthWrapper;
