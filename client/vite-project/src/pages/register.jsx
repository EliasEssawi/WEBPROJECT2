import React, { useState, useEffect } from "react";

function Register() {
  const [captcha, setCaptcha] = useState({ question: "", answer: "" });
  const [userAnswer, setUserAnswer] = useState("");

  // Generate simple arithmetic captcha
  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10 + 1);
    const b = Math.floor(Math.random() * 10 + 1);
    setCaptcha({ question: `${a} + ${b}`, answer: (a + b).toString() });
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userAnswer !== captcha.answer) {
      alert("Incorrect CAPTCHA answer.");
      generateCaptcha();
      setUserAnswer("");
      return;
    }

    // TODO: handle registration logic
    alert("Registered successfully!");
  };

  return (
    <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col md:flex-row">
        

        {/* LEFT SIDE (Brand / Illustration area) */}
        <div className="hidden md:flex w-1/2 bg-dark-sidebar text-white flex-col justify-center p-12 relative">
          <h1 className="text-4xl font-extrabold mb-4">Welcome 👋</h1>
          <p className="text-white/80 text-lg max-w-md">
            Create your account to start your learning journey and track progress across talking, reading, listening, and vocabulary.
          </p>
          <div className="absolute bottom-8 left-12 text-white/50 text-sm">
            © 2025 Your App
          </div>
        </div>

        {/* RIGHT SIDE (Register Form) */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 overflow-y-auto">

          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Register</h2>
            <p className="text-gray-500 mb-8">Fill in your details to create an account</p>

            <form className="space-y-5" onSubmit={handleSubmit}>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                <input type="text" required className="w-full px-4 py-3 text-black rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green transition" placeholder="Your name" />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input type="email" required className="w-full px-4 py-3 text-black rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green transition" placeholder="you@example.com" />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                <input type="password" required className="w-full px-4 py-3 text-black rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green transition" placeholder="••••••••" />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
                <input type="password" required className="w-full px-4 py-3 text-black rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green transition" placeholder="••••••••" />
              </div>

              {/* Pin */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Pin (4 digits)</label>
                <input
                  type="password"
                  required
                  maxLength={4}
                  pattern="\d{4}"
                  inputMode="numeric"
                  className="w-full px-4 py-3 text-black rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green transition"
                  placeholder="1234"
                />
              </div>

              {/* Confirm Pin */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Pin</label>
                <input
                  type="password"
                  required
                  maxLength={4}
                  pattern="\d{4}"
                  inputMode="numeric"
                  className="w-full px-4 py-3 text-black rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green transition"
                  placeholder="1234"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
                <input type="date" required className="w-full px-4 py-3 text-black rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green transition" />
              </div>

              {/* CAPTCHA */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Solve CAPTCHA:</label>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-gray-800">{captcha.question}</span>
                  <button type="button" onClick={generateCaptcha} className="text-gray-500 hover:text-gray-800">↻</button>
                </div>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-black rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green transition"
                  placeholder="Enter the answer"
                />
              </div>

              {/* Submit */}
              <button type="submit" className="w-full py-3 rounded-xl bg-brand-green text-white font-bold shadow-lg hover:bg-brand-light transition hover:scale-[1.02]">
                REGISTER
              </button>

              <div className="text-right mt-4 text-sm">
                <a href="/login" className="text-blue-500 hover:underline">Already have an account? Log in</a>
              </div>

            </form>
          </div>
        </div>

    </div>
  );
}

export default Register;
