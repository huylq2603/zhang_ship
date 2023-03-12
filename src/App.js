import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { PATH } from "./components/common";

import ProtectedRoute from "./components/ProtectedRoute";
import Authenticate from "./pages/Authenticate";
import GuestPage from "./pages/GuestPage";
import ManagePage from "./pages/ManagePage";

function App() {

  const [okToRender, setOkToRender] = useState(false);

  useEffect(() => {
    // console.log('alo');
    // setCookie(AUTH_COOKIE, 'false', 0);

    setOkToRender(true);
  }, []);

  return (
    <div className="App">
      {
        okToRender &&
        <Routes>
          <Route path={PATH.HOME} element={<GuestPage />} />
          <Route path={PATH.AUTHEN} element={<Authenticate />} />
          <Route path={PATH.MANAGE} element={
            <ProtectedRoute>
              <ManagePage />
            </ProtectedRoute>
          } />
        </Routes>
      }
    </div>
  );
}

export default App;
