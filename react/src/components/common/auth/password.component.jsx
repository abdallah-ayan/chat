import { LockKeyhole, Eye, EyeOff, Check, X } from "lucide-react";
import { useState } from "react";
import "./password.component.css";
import Blur from "../../ui/Blur/blue";
import BorderAnimatedContainer from "../../ui/BorderAnimatedContainer";
import useAuthSore from "../../../features/store/auth/useAuthSore";
import toast from "react-hot-toast";
import { OrbitProgress } from "react-loading-indicators";

export default function SetPassword({ onClose, token }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    password: "",
    confirmPassword: ""
  });

  const { handleGoogleSignUp, SignUpState } = useAuthSore()
  const { isSignUpLoading } = SignUpState

  console.log(isSignUpLoading)

  function handleSignUp(e) {
    e.preventDefault()

    if (form.password != form.confirmPassword) {
      toast.error("The passwords you entered do not match. Please make sure both passwords are exactly the same.")
      return
    }

    if (form.password.length < 6 || form.confirmPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    handleGoogleSignUp({
      accessToken: token,
      password: form.password
    })

  }
  return (
    <div className="password-component min-h-screen flex items-center justify-center px-5 py-10">

      <Blur />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-900/10 blur-3xl" />
      </div>

      <div className="anime-top">
        <BorderAnimatedContainer myClass="rounded-3xl">

          <div className="relative w-[500px] h-[620px] max-w-[calc(100vw-40px)] rounded-3xl border-2 border-slate-800 bg-slate-900 px-9 py-9 shadow-[0_20px_70px_rgba(0,0,0,0.45)]">

            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-800 hover:text-slate-200"
              aria-label="Close"
            >
              <X size={19} />
            </button>

            <div className="mb-8">

              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-800">
                <LockKeyhole className="h-5 w-5 text-slate-300" />
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Create a password
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Your Google account is ready. Add a password to also sign in with your email.
              </p>

            </div>

            <form className="space-y-5" onSubmit={handleSignUp}>

              <div className="flex items-center gap-4">

                <label className="w-[125px] flex-shrink-0 whitespace-nowrap text-sm font-medium text-slate-300">
                  Password
                </label>

                <div className="relative flex-1">

                  <input
                    required
                    name="password"
                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 pr-12 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-500 transition hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <label className="w-[125px] flex-shrink-0 whitespace-nowrap text-sm font-medium text-slate-300">
                  Confirm password
                </label>

                <div className="relative flex-1">

                  <input
                    required
                    name="confirmPassword"
                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat your password"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 pr-12 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-500 transition hover:text-slate-300"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>

                </div>

              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Check size={14} className="text-slate-500" />
                  At least 6 characters
                </div>

              </div>

              <button
                disabled={isSignUpLoading}
                type="submit"
                style={{height : "50px"}}
                className="w-full relative rounded-xl bg-violet-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-500 active:scale-[0.99]"
              >
                {
                  isSignUpLoading ?
                    <OrbitProgress
                      variant="spokes"
                      color="#94a3b8"
                      style={{ fontSize: "6px", marginTop: "5px" , position: "absolute" , left : "50%" , top : "40%" , transform : "translate(-50% , -50%)" }}
                      text=""
                      textColor=""
                    />
                    : "Sign Up"
                }
              </button>

            </form>

            <p className="mt-6 text-center text-xs text-slate-600">
              You can use either Google or your email and password to sign in.
            </p>

          </div>

        </BorderAnimatedContainer>
      </div>

    </div>
  );
}