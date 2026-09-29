import BorderAnimatedContainer from "./../../ui/BorderAnimatedContainer";
import "./authLayout.css"
import { useRef } from "react";

export default function AuthLayout({children}) {
  const faceCard = useRef(null);

  return (
    <div className="w-full text-white flex items-center justify-center overflow-hidden md:p-4">

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[140px]" />
      </div>

      {/* Main Container */}
      <BorderAnimatedContainer myClass="w-full h-screen max-md:border-0 max-md:[background:none] max-md:rounded-none md:w-[680px] md:h-auto md:rounded-[32px] lg:w-full lg:h-auto lg:max-w-6xl lg:rounded-[32px]">

        <div className="relative w-full min-h-screen md:min-h-0 md:h-full lg:h-auto lg:min-h-[720px] grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-none md:rounded-[32px] border-0 md:border md:border-white/10 bg-transparent md:bg-white/[0.035] shadow-none md:shadow-2xl backdrop-blur-xl bg-white/[0.035] md:backdrop-blur-xl">

          {/* ================= LEFT ================= */}
          <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-gradient-to-br from-blue-600/20 via-transparent to-violet-600/20">

            {/* Circles */}
            <div className="absolute z-10 -top-32 -left-32 w-96 h-96 rounded-full border border-white/10" />
            <div className="absolute z-10 top-20 -left-20 w-72 h-72 rounded-full border border-white/5" />

            {/* Content */}
            <div className="relative">

              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.82L3 20l1.5-4.1A7.56 7.56 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>

                <span className="text-2xl font-bold tracking-tight">
                  Chatify
                </span>
              </div>

              {/* Hero */}
              <div className="mt-32 max-w-lg">
                <p className="text-blue-400 font-medium mb-5">
                  CONNECT. CHAT. SHARE.
                </p>

                <h1 className="text-5xl font-bold leading-[1.05] tracking-tight">
                  <span className="lg:text-6xl">
                    Your conversations,
                  </span>

                  <span className="block xl:text-6xl bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                    all in one place.
                  </span>
                </h1>

                <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-md">
                  Stay connected with the people who matter.
                  Simple, fast and beautifully designed.
                </p>
              </div>

              {/* Fake Chat Preview */}
              <div ref={faceCard} className="face-card-auth absolute z-50 right-[-36px] w-[330px] rounded-3xl border border-white/10 bg-[#1e293b] p-5 rotate-[-5deg] shadow-2xl" style={{ top: -10 }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-violet-500" />

                  <div>
                    <p className="text-sm font-semibold">
                      Alex
                    </p>

                    <p className="text-xs text-green-400">
                      ● Online
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-white/10 rounded-2xl rounded-bl-md px-4 py-3 text-sm w-fit">
                    Hey! How are you?
                  </div>

                  <div className="bg-blue-600 rounded-2xl rounded-br-md px-4 py-3 text-sm w-fit ml-auto">
                    I'm doing great! 👋
                  </div>

                  <div className="bg-white/10 rounded-2xl rounded-bl-md px-4 py-3 text-sm w-fit">
                    Nice! Let's catch up soon.
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-20 text-sm text-slate-500">
              <div className="absolute z-10 w-[590px] h-[590px] rounded-full border border-white/5" style={{ right: "-270px", bottom: "-400px" }} />
              <div className="absolute z-10 w-96 h-96 rounded-full border border-white/10" style={{ right: "-170px", bottom: "-270px" }} />
              <div className="absolute z-10 -bottom-50 w-72 h-72 rounded-full border border-white/5" style={{ right: "-160px" }} />
              © 2026 Chatify
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          {children}
        </div>

      </BorderAnimatedContainer>
    </div>
  );
}