import React from "react";

type ProfileCardProps = {
  name: string;
  emoji: string;
  onClick: () => void;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  emoji,
  onClick,
}) => {
  return (
    <button type="button" className="profile-card" onClick={onClick}>
      <div className="profile-avatar">
        <span className="profile-emoji">{emoji}</span>
        <span className="lock">🔒</span>
      </div>
      <div className="profile-name">{name}</div>
    </button>
  );
};

export default ProfileCard;
