import React, { useState, useEffect } from "react";

function ChooseProfile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [pinInputs, setPinInputs] = useState(["", "", "", ""]);
  const [pinError, setPinError] = useState(false);
  const [profiles, setProfiles] = useState([]);

  // Load user and profiles from db.json
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch("./db.json");
        const data = await res.json();
        const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        let username = savedUser?.username || (data.users[0]?.username ?? "");

        const user = data.users.find((u) => u.username === username);
        if (user) {
          setCurrentUser(user);
          setProfiles(user.profiles);
        }
      } catch (err) {
        console.error("Failed to load db.json:", err);
      }
    };

    fetchProfiles();
  }, []);

  const openPin = (profile) => {
    setSelectedProfile(profile);
    setPinInputs(["", "", "", ""]);
    setPinError(false);
  };

  const closePin = () => {
    setSelectedProfile(null);
    setPinInputs(["", "", "", ""]);
    setPinError(false);
  };

  const handlePinChange = (value, idx) => {
    if (/^\d?$/.test(value)) {
      const newInputs = [...pinInputs];
      newInputs[idx] = value;
      setPinInputs(newInputs);

      // Auto-focus next input
      if (value && idx < 3) {
        const nextInput = document.getElementById(`pin-${idx + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handlePinBackspace = (idx, e) => {
    if (e.key === "Backspace" && !pinInputs[idx] && idx > 0) {
      const prevInput = document.getElementById(`pin-${idx - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePinSubmit = () => {
    const enteredPin = pinInputs.join("");
    if (enteredPin === selectedProfile.pin) {
      localStorage.setItem("activeProfile", JSON.stringify(selectedProfile));
      window.location.href = "/mainPageBest"; // adjust route
    } else {
      setPinError(true);
      setPinInputs(["", "", "", ""]);
      const firstInput = document.getElementById("pin-0");
      if (firstInput) firstInput.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F9FD] flex flex-col font-[Poppins] px-4">
      {/* HEADER */}
      <header className="bg-[#7EE081] py-6 shadow-md rounded-b-3xl">
        <h1 className="text-center text-4xl font-extrabold text-white">
          Who’s Learning Today?
        </h1>
      </header>

      {/* PROFILES */}
      <section className="max-w-4xl mx-auto mt-12 flex flex-wrap justify-center gap-10">
        {profiles.map((profile, idx) => (
          <div
            key={idx}
            className="w-40 cursor-pointer"
            onClick={() => openPin(profile)}
          >
            <div className="bg-white p-5 rounded-3xl shadow-lg hover:scale-105 transition relative">
              <div className="absolute top-3 right-3 text-[#419D78] text-xl">🔒</div>
              <img
                src={`https://cdn-icons-png.flaticon.com/512/2922/29225${idx % 2 === 0 ? "10" : "06"}.png`}
                className="w-24 mx-auto mb-3 rounded-xl"
                alt="profile avatar"
              />
            </div>
            <p className="text-center mt-3 font-bold text-xl text-[#419D78]">
              {profile.profileName}
            </p>
          </div>
        ))}
      </section>

      {/* PIN MODAL */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white w-80 p-8 rounded-3xl shadow-xl text-center">
            <h2 className="text-2xl font-bold text-[#419D78] mb-4">
              {selectedProfile.profileName}'s PIN
            </h2>
            <p className="text-gray-600 mb-3">Enter the 4-digit PIN to continue</p>
            {pinError && <p className="text-red-500 text-sm mb-2">Wrong PIN, try again.</p>}

            <div className="flex justify-center gap-3 mb-6">
              {pinInputs.map((val, idx) => (
                <input
                  key={idx}
                  id={`pin-${idx}`}
                  maxLength={1}
                  value={val}
                  onChange={(e) => handlePinChange(e.target.value, idx)}
                  onKeyDown={(e) => handlePinBackspace(idx, e)}
                  className="pin-input w-12 h-12 text-center text-2xl font-bold border-2 border-[#7EE081] rounded-xl focus:outline-[#419D78]"
                />
              ))}
            </div>

            <button
              onClick={handlePinSubmit}
              className="w-full bg-[#7EE081] text-white font-bold py-3 rounded-xl hover:brightness-110"
            >
              Continue
            </button>
            <button
              onClick={closePin}
              className="mt-4 text-[#419D78] font-semibold hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChooseProfile;
