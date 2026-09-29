import { Mail, Lock } from "lucide-react";
import AuthLayout from '../../../components/layout/auth/AuthLayout'
import useAuthSore from "../../../features/store/auth/useAuthSore";
import { useNavigate } from "react-router";
import handleSignUpValidation from "../../../features/validation/auth/signUp";
import { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import SetPassword from "../../../components/common/auth/password.component";

export default function SignUp() {

  const [form , setForm] = useState({email : "" ,password : "" , fullName : ""});
  const {SignUpState , stopSuccess } = useAuthSore()
  const [showPassword , setShowPassword] = useState(false);
  const [token , setToken] = useState("");

  const {isSignUpLoading} = SignUpState
  const {SignUpSuccess} = SignUpState
  const navigate = useNavigate();
  
  useEffect(()=> {
    if(SignUpSuccess) {
      stopSuccess();
      navigate("/")
      toast.success("Welcome! Your account has been created.");
    }
  } , [SignUpSuccess])



  const googleSignUp = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setToken(tokenResponse.access_token);
      setShowPassword(true);
    },
    onError: () => {
      toast.error("Google Sign Up Failed");
    }
  });


  function handleSubmit(e){
    e.preventDefault();
    handleSignUpValidation(form)
  }


  return (
    <AuthLayout>

      <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16 md:bg-black/10">
        {showPassword && <SetPassword token={token} onClose={() => setShowPassword(false)} />}
        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="mb-10">
            <h2 className="text-4xl flex justify-center font-bold tracking-tight">
              Create your account
            </h2>

            <p className="text-slate-400 mt-3 flex justify-center">
              Sign up to create your account.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* full name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />

                <input onChange={(e)=> setForm({...form , [e.target.name] : e.target.value})} name="fullName" required type="text" placeholder="Enter your full name" className="w-full h-14 pl-12 pr-5 rounded-md bg-white/[0.045] border border-white/10 outline-none text-white placeholder:text-slate-600 transition-all focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 focus:bg-white/[0.07]" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />

                <input onChange={(e)=> setForm({...form , [e.target.name] : e.target.value})} name="email" required type="email" placeholder="you@example.com" className="w-full h-14 pl-12 pr-5 rounded-md bg-white/[0.045] border border-white/10 outline-none text-white placeholder:text-slate-600 transition-all focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 focus:bg-white/[0.07]" />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">
                  Password
                </label>
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />

                <input onChange={(e)=> setForm({...form , [e.target.name] : e.target.value})} name="password" required type="password" placeholder="••••••••" className="w-full h-14 pl-12 pr-5 rounded-md bg-white/[0.045] border border-white/10 outline-none text-white placeholder:text-slate-600 transition-all focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 focus:bg-white/[0.07]" />
              </div>
            </div>

            {/* Sign Up */}
            <button disabled={isSignUpLoading}
              type="submit"
              className="w-full disabled:bg-[#3f4a5a] disabled:cursor-progress h-14 rounded-md bg-[#4e6078] hover:bg-slate-600 border border-white/10 outline-none text-white font-semibold transition-all"
            >
              {isSignUpLoading ? 
              <OrbitProgress
                variant="spokes"
                color="#94a3b8"
                style={{ fontSize: "7px" , marginTop : "5px" }}
                text=""
                textColor=""
              />
              : "Create account" }
            </button>


          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-white/10" />

            <span className="text-xs text-slate-600">
              OR
            </span>

            <div className="flex-1 h-px bg-white/10" />
          </div>

          <button type="button" onClick={googleSignUp} className="w-full h-14 rounded-2xl border border-white/10 bg-white/[0.035] hover:bg-white/[0.07] transition flex items-center justify-center gap-3">
            <span className="font-bold text-lg">
              G
            </span>

            <span className="text-sm font-medium">
              Continue with Google
            </span>
          </button>

          {/* Login */}
          <p className="text-center text-sm text-slate-500 mt-8">
            Already have an account?{" "}
            <a href="/login" type="button" className="text-blue-400 hover:text-blue-300 font-medium transition">
              Sign in
            </a>
          </p>

        </div>
      </div>

    </AuthLayout>
  )
}
