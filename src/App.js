import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { setCookie, AUTH_COOKIE } from "./components/common";
import { firestore } from './libs/firebase';

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
          <Route path="/" element={<GuestPage />} />
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="/manage" element={
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
