import React from "react";


function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-[Poppins]">
      <div className="w-full max-w-5xl h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex">

        {/* LEFT SIDE (Brand / Illustration area) */}
        <div className="hidden md:flex w-1/2 bg-dark-sidebar text-white flex-col justify-center p-12 relative">
          <h1 className="text-4xl font-extrabold mb-4">
            Welcome Back 👋
          </h1>
          <p className="text-white/80 text-lg max-w-md">
            Continue your learning journey and track your progress across
            talking, reading, listening and vocabulary.
          </p>

          <div className="absolute bottom-8 left-12 text-white/50 text-sm">
            © 2025 Your App
          </div>
        </div>

        {/* RIGHT SIDE (Login Form) */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Login
            </h2>
            <p className="text-gray-500 mb-8">
              Enter your credentials to continue
            </p>

            <form className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Username or Email
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green transition"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-xl text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green transition"
                  placeholder="••••••••"
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand-green text-white font-bold shadow-lg hover:bg-brand-light transition hover:scale-[1.02]"
              >
                Login
              </button>

              {/* Extra actions */}
              <div className="flex justify-between items-center text-sm mt-4">
                <button
                  type="button"
                  className="text-brand-green hover:underline"
                  onClick={() =>
                    alert("Forgot password feature coming soon")
                  }
                >
                  Forgot password?
                </button>

                <a
                  href="/register"
                  className="text-gray-500 hover:text-gray-800"
                >
                  Create account →
                </a>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
