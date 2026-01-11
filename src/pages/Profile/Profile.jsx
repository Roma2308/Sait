import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css';
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

function Profile() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ name: "", surname: "", email: "", phone: "", photo: "" });
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    const loggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

    if (!storedUser) {
      navigate("/register");
    } else if (!loggedIn) {
      navigate("/login");
    } else {
      setUser(storedUser);
      setEditedUser({
        name: storedUser.name || "",
        surname: storedUser.surname || "",
        email: storedUser.email || "",
        phone: storedUser.phone || "",
        photo: storedUser.photo || ""
      });
    }
  }, [navigate]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser({ ...editedUser, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...editedUser };
    setUser(updatedUser);
    localStorage.setItem("userData", JSON.stringify(updatedUser));
    setIsEditing(false);
    alert("Профиль сохранён!");
  };

  const handleCancel = () => {
    setEditedUser({
      name: user.name || "",
      surname: user.surname || "",
      email: user.email || "",
      phone: user.phone || "",
      photo: user.photo || ""
    });
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className={`profile-page ${theme}`}>
      <div className="profile-card">
        <div className="profile-photo">
          <img src={editedUser.photo || user.photo || "https://via.placeholder.com/200"} alt={t.profile} />
          {isEditing && (
            <div className="photo-upload">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
              <button onClick={() => fileInputRef.current?.click()} className="upload-btn">
                {editedUser.photo ? t.changePhoto : t.uploadPhoto}
              </button>
            </div>
          )}
        </div>
        <div className="profile-info">
          {!isEditing ? (
            <>
              <h1>{user.name} {user.surname}</h1>
              <p><strong>{t.email}:</strong> {user.email}</p>
              <p><strong>{t.phone}:</strong> {user.phone}</p>
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                {t.editProfile}
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder={t.name}
                value={editedUser.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                className="profile-input"
              />
              <input
                type="text"
                placeholder={t.surname}
                value={editedUser.surname}
                onChange={(e) => setEditedUser({ ...editedUser, surname: e.target.value })}
                className="profile-input"
              />
              <input
                type="email"
                placeholder={t.email}
                value={editedUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                className="profile-input"
              />
              <input
                type="text"
                placeholder={t.phone}
                value={editedUser.phone}
                onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                className="profile-input"
              />
              <div className="profile-actions">
                <button onClick={handleSave} className="save-btn">{t.save}</button>
                <button onClick={handleCancel} className="cancel-btn">{t.cancel}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile