import { Mail, Lock } from "lucide-react";
import AuthLayout from '../../../components/layout/auth/AuthLayout'
import { useEffect, useState } from "react";
import handleLoginValidation from "./../../../features/validation/auth/login.js";
import useAuthSore from "../../../features/store/auth/useAuthSore.js";
import { OrbitProgress } from "react-loading-indicators"
import { useNavigate } from "react-router";
import { useGoogleLogin } from '@react-oauth/google';
import toast from "react-hot-toast";
export default function login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { LoginState , handleGoogleLogin , stopSuccess} = useAuthSore()
  const { isLoginLoading } = LoginState
  const { LoginSuccess } = LoginState
  const navigate = useNavigate();

  useEffect(() => {
    if (LoginSuccess) {
      stopSuccess();
      navigate("/")
      toast.success("Welcome back! Login successful.");
    }
  }, [LoginSuccess])

  function handleSubmit(e) {
    e.preventDefault();
    handleLoginValidation(form)
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      handleGoogleLogin({
            accessToken: tokenResponse.access_token
      })
    },
    onError: () => {
      toast.error("Google Login Failed");
    }
  });

  return (
    <AuthLayout>
      <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16 md:bg-black/10">
        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="mb-10">
            <h2 className="text-4xl flex justify-center font-bold tracking-tight">
              Welcome back
            </h2>

            <p className="text-slate-400 mt-3 flex justify-center">
              Sign in to continue to your account.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />

                <input type="email" required onChange={(e) => { setForm({ ...form, [e.target.name]: e.target.value }) }} name="email" placeholder="you@example.com" className="w-full h-14 pl-12 pr-5 rounded-md bg-white/[0.045] border border-white/10 outline-none text-white placeholder:text-slate-600 transition-all focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 focus:bg-white/[0.07]" />
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

                <input type="password" required onChange={(e) => { setForm({ ...form, [e.target.name]: e.target.value }) }} name="password" placeholder="••••••••" className="w-full h-14 pl-12 pr-5 rounded-md bg-white/[0.045] border border-white/10 outline-none text-white placeholder:text-slate-600 transition-all focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 focus:bg-white/[0.07]" />
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center gap-3 pt-1">
              <input
                type="checkbox"
                className="w-4 h-4 accent-blue-600"
              />

              <span className="text-sm pt-1 text-slate-400">
                Remember me
              </span>
            </div>

            {/* Login */}
            <button disabled={isLoginLoading}
              type="submit"
              className="w-full disabled:bg-[#3f4a5a] disabled:cursor-progress h-14 rounded-md bg-[#4e6078] hover:bg-slate-600 border border-white/10 outline-none text-white font-semibold transition-all"
            >
              {isLoginLoading ?
                <OrbitProgress
                  variant="spokes"
                  color="#94a3b8"
                  style={{ fontSize: "7px", marginTop: "5px" }}
                  text=""
                  textColor=""
                />
                : "Sign In"}
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

          <button type="button" onClick={() => googleLogin()} className="w-full h-14 rounded-2xl border border-white/10 bg-white/[0.035] hover:bg-white/[0.07] transition flex items-center justify-center gap-3">
            <span className="font-bold text-lg">
              G
            </span>

            <span className="text-sm font-medium">
              Continue with Google
            </span>
          </button>

          {/* Signup */}
          <p className="text-center text-sm text-slate-500 mt-8">
            Don't have an account?{" "}
            <a href="/register" type="button" className="text-blue-400 hover:text-blue-300 font-medium transition">
              Create account
            </a>
          </p>

        </div>
      </div>

    </AuthLayout>
  )
}
