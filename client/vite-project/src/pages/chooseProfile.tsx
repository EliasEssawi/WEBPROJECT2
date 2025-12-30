import React, { useEffect, useState } from "react";

type Profile = {
  profileName: string;
  pin: string | number;
};

type User = {
  username: string;
  profiles?: Profile[];
};

type DbData = {
  users?: User[];
};

const ChooseProfile: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [pinInputs, setPinInputs] = useState<string[]>(["", "", "", ""]);
  const [pinError, setPinError] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchProfiles = async (): Promise<void> => {
      try {
        const res = await fetch("./db.json");
        const data: DbData = await res.json();

        const savedUserRaw = localStorage.getItem("loggedInUser");
        const savedUser = savedUserRaw ? (JSON.parse(savedUserRaw) as Partial<User>) : null;

        const username =
          savedUser?.username ||
          data.users?.[0]?.username ||
          "";

        const user = data.users?.find((u) => u.username === username) ?? null;

        if (user) {
          setCurrentUser(user);
          setProfiles(user.profiles ?? []);
        } else {
          setCurrentUser(null);
          setProfiles([]);
        }
      } catch (err) {
        console.error("Failed to load db.json:", err);
      }
    };

    fetchProfiles();
  }, []);

  const focusPin = (index: number): void => {
    const el = document.getElementById(`pin-${index}`) as HTMLInputElement | null;
    el?.focus();
  };

  const openPin = (profile: Profile): void => {
    setSelectedProfile(profile);
    setPinInputs(["", "", "", ""]);
    setPinError(false);

    // focus first input after modal opens
    setTimeout(() => focusPin(0), 0);
  };

  const closePin = (): void => {
    setSelectedProfile(null);
    setPinInputs(["", "", "", ""]);
    setPinError(false);
  };

  const handlePinChange = (value: string, idx: number): void => {
    // allow only one digit (or empty)
    if (!/^\d?$/.test(value)) return;

    setPinInputs((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });

    if (value && idx < 3) {
      focusPin(idx + 1);
    }
  };

  const handlePinBackspace = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Backspace" && !pinInputs[idx] && idx > 0) {
      focusPin(idx - 1);
    }
  };

  const handlePinSubmit = (): void => {
    if (!selectedProfile) return;

    const enteredPin = pinInputs.join("");
    const realPin = String(selectedProfile.pin);

    if (enteredPin === realPin) {
      localStorage.setItem("activeProfile", JSON.stringify(selectedProfile));
      window.location.href = "/mainPageBest"; // change route if needed
      return;
    }

    setPinError(true);
    setPinInputs(["", "", "", ""]);
    focusPin(0);
  };

  return (
    <div className="page">
      {/* HEADER */}
      <header className="header">
        <h1 className="header-title">Who’s Learning Today?</h1>
      </header>

      {/* PROFILES */}
      <section className="profiles" aria-label="Choose a profile">
        {profiles.map((profile, idx) => (
          <div
            key={`${profile.profileName}-${idx}`}
            className="profile-item"
            onClick={() => openPin(profile)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openPin(profile)}
            aria-label={`Open PIN for ${profile.profileName}`}
          >
            <div className="card card-pad card-hover" style={{ position: "relative" }}>
              <div className="lock">🔒</div>

              <img
                src={`https://cdn-icons-png.flaticon.com/512/2922/29225${
                  idx % 2 === 0 ? "10" : "06"
                }.png`}
                className="avatar"
                alt="Profile avatar"
              />
            </div>

            <p className="profile-name">{profile.profileName}</p>
          </div>
        ))}
      </section>

      {/* PIN MODAL */}
      {selectedProfile && (
        <div className="modal-backdrop" onClick={closePin} role="dialog" aria-modal="true">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">{selectedProfile.profileName}&apos;s PIN</h2>
            <p className="modal-sub">Enter the 4-digit PIN to continue</p>

            {pinError && <p className="error">Wrong PIN, try again.</p>}

            <div className="pin-row">
              {pinInputs.map((val, idx) => (
                <input
                  key={idx}
                  id={`pin-${idx}`}
                  maxLength={1}
                  value={val}
                  onChange={(e) => handlePinChange(e.target.value, idx)}
                  onKeyDown={(e) => handlePinBackspace(idx, e)}
                  className="pin-input"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  aria-label={`PIN digit ${idx + 1}`}
                />
              ))}
            </div>

            <button type="button" onClick={handlePinSubmit} className="btn btn-primary">
              Continue
            </button>

            <button type="button" onClick={closePin} className="btn-link">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooseProfile;
