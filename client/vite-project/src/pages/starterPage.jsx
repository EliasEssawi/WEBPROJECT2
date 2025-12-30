import React from "react";

function StarterPage() {
  const goToPage = (page) => {
    // Replace with React Router navigation if using
    if (page === "login") window.location.href = "/login";
    if (page === "register") window.location.href = "/register";
  };

  return (
    <div className="min-h-screen bg-[#E8F9FD] flex flex-col font-Poppins">

      {/* HEADER */}
      <header className="bg-[#7EE081] py-5 shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-3xl font-extrabold text-white drop-shadow-sm">
            PlayLearn English
          </h1>

          <nav className="flex gap-4">
            <button
              type="button"
              onClick={() => goToPage("login")}
              className="bg-white px-4 py-2 rounded-full font-semibold text-[#419D78] hover:scale-105 transition"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => goToPage("register")}
              className="bg-white px-4 py-2 rounded-full font-semibold text-[#FF6B6B] hover:scale-105 transition"
            >
              Register
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN HERO SECTION */}
      <section className="flex flex-col items-center mt-12 text-center px-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4994/4994708.png"
          className="w-40 drop-shadow-lg mb-6"
          alt="Mascot"
        />

        <h2 className="text-4xl font-bold text-[#419D78]">
          Learn English the Fun Way!
        </h2>

        <p className="mt-3 text-lg text-gray-600 max-w-xl">
          Play games, practice vocabulary, listen to stories, and chat with our AI friend.
        </p>

        <button
          className="mt-8 bg-[#7EE081] text-white px-10 py-4 rounded-full text-xl font-bold shadow-md hover:scale-105 transition"
        >
          Start Learning
        </button>
      </section>

      {/* FEATURES SECTION */}
      <section className="mt-16 max-w-5xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-[#419D78] text-center mb-8">
          What You Can Do
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: "https://cdn-icons-png.flaticon.com/512/5293/5293973.png", title: "Choose Topic", desc: "Animals, Food, School & more" },
            { icon: "https://cdn-icons-png.flaticon.com/512/1048/1048949.png", title: "Vocabulary Games", desc: "Translate, choose picture, complete sentence" },
            { icon: "https://cdn-icons-png.flaticon.com/512/833/833472.png", title: "Listening", desc: "Hear English stories & words" },
            { icon: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png", title: "Reading", desc: "Short stories for kids" },
            { icon: "https://cdn-icons-png.flaticon.com/512/387/387561.png", title: "Speaking", desc: "Practice pronunciation" },
            { icon: "https://cdn-icons-png.flaticon.com/512/4712/4712027.png", title: "Chat With Bot", desc: "Speak with your AI friend" }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-lg p-6 text-center hover:scale-105 transition cursor-pointer"
            >
              <img src={feature.icon} className="w-20 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-[#419D78]">{feature.title}</h4>
              <p className="text-gray-600 text-sm mt-1">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-20 py-6 bg-[#7EE081] text-center text-white font-semibold">
        © 2025 PlayLearn English — Learn & Play!
      </footer>
    </div>
  );
}

export default StarterPage;
