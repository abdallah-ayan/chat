import { useEffect } from "react"
import useAuthSore from "../features/store/auth/useAuthSore"
import { Outlet, useNavigate } from "react-router"
import { OrbitProgress } from "react-loading-indicators";

export default function Authentication() {
  const {check , checkLoading , userAuth} = useAuthSore()
  const navigate = useNavigate();
  useEffect(()=> {
    check()
  } , [])
  
  useEffect(()=>{
    if(!checkLoading && !userAuth){ 
       navigate("/login");
    }
  } , [checkLoading])

  if(checkLoading) 
   return <OrbitProgress color="#94a3b8" size="large" text="" textColor="" />

  if(userAuth)
    return <Outlet />
}
