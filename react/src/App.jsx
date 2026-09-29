import {Route , Routes} from "react-router"
import Login from "./pages/auth/Login/login"
import SignUp from "./pages/auth/SignUp/Signup"
import Home from "./pages/home/Home"
import AppLayout from "./components/layout/app/AppLayout"
import Authentication from "./auth/Authentication"
export default function App() {
  return (
      <AppLayout>
        <Routes>
          <Route element={<Authentication />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<SignUp />} />
        </Routes>
      </AppLayout>
  )
}