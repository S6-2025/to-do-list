import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { getCurrentUser, updateUser, deleteUser } from "../services/userService";

const Profile: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string; role: string }>({ name: "", email: "", role: "" });
  const { email, logout } = useAuth();
  const navigate = useNavigate();

  const [editInfo, setEditInfo] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmDeleteStepTwo, setConfirmDeleteStepTwo] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  // Dados do usuário
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  
  // Senhas para editar
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

useEffect(() => {
  const fetchUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
      setName(userData.name);
      setRole(userData.role);
      setUserEmail(userData.email);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };
  fetchUser();
}, []);


  const handleLogout = () => {
    logout();
    setLoggedOut(true);
    navigate("/login");
  };

const handleSaveInfo = async () => {
  if (!name || !userEmail) {
    alert("Name and Email cannot be empty");
    return;
  }
  try {
    await updateUser({ name, email: userEmail });
    alert("User info updated successfully");
    setEditInfo(false);
  } catch (err: any) {
    alert("Failed to update user info: " + err.message);
  }
};


  const handleSavePassword = async () => {
    if (!currentPassword || !newPassword) {
      alert("Please fill current and new password");
      return;
    }
    try {
      await updateUser({ password: newPassword });
      alert("Password updated successfully");
      setEditPassword(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      alert("Failed to update password: " + err.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (!userEmail) {
      alert("User email not found.");
      return;
    }
    try {
      await deleteUser(userEmail);
      alert("Account deleted");
      logout();
      navigate("/landing");
    } catch (err: any) {
      alert("Failed to delete account: " + err.message);
    }
  };

  return (
    <main className="profile-user__container">
      <header className="profile-header">
        <h1>Profile</h1>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </header>

      {!loggedOut && (
        <>
          <section className="profile-section">
  <label>
    Name:
    {editInfo ? (
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite seu nome"
      />
    ) : (
      <span>{name || "[Nome do usuário]"}</span>
    )}
  </label>

  <label>
    Email:
    {editInfo ? (
      <input
        type="email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        placeholder="Digite seu email"
      />
    ) : (
      <span>{userEmail || "[Email]"}</span>
    )}
  </label>

  <label>
    Role:
    <span>{role || "[Role]"}</span>
  </label>

  <label>
    Password:
    <span>*****</span>
  </label>

  {editInfo ? (
    <div className="profile-buttons-row">
      <button onClick={() => setEditInfo(false)}>Cancel</button>
      <button onClick={handleSaveInfo}>Save</button>
    </div>
  ) : (
    <button onClick={() => setEditInfo(true)}>Edit Info</button>
  )}
</section>


          <section className="profile-section password-section">
            {editPassword ? (
              <>
                <label>
                  Current Password:
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </label>

                <label>
                  New Password:
                  <input
                    type="password"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </label>

                <div className="profile-buttons-row">
                  <button onClick={() => setEditPassword(false)}>Cancel</button>
                  <button onClick={handleSavePassword}>Save Password</button>
                </div>
              </>
            ) : (
              <button onClick={() => setEditPassword(true)}>Edit Password</button>
            )}
          </section>

          <section className="profile-section delete-account-section">
            {!confirmDelete ? (
              <button className="btn-delete" onClick={() => setConfirmDelete(true)}>
                Delete Account
              </button>
            ) : !confirmDeleteStepTwo ? (
              <div className="confirm-delete">
                <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                <button className="confirm-yes-button" onClick={() => setConfirmDeleteStepTwo(true)}>Yes</button>
                <button className="cancel-no-button" onClick={() => setConfirmDelete(false)}>No</button>
              </div>
            ) : (
              <div className="confirm-delete">
                <p>This is your last chance. Confirm delete account?</p>
                <button className="confirm-yes-button" onClick={handleDeleteAccount}>Confirm Delete</button>
                <button className="cancel-no-button" onClick={() => setConfirmDeleteStepTwo(false)}>Cancel</button>
              </div>
            )}
          </section>
        </>
      )}

      {loggedOut && (
        <section className="logout-message">
          <p>Você saiu do perfil.</p>
        </section>
      )}
    </main>
  );
};

export default Profile;
