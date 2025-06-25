import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  updateUser,
  deleteUser,
} from "../services/userService";

const Profile: React.FC = () => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string;
  }>({ name: "", email: "", role: "" });

  const { email, logout } = useAuth();
  const navigate = useNavigate();

  const [editInfo, setEditInfo] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmDeleteStepTwo, setConfirmDeleteStepTwo] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [userEmail, setUserEmail] = useState("");

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
        <h1>Perfil</h1>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {!loggedOut && (
        <>
          <section className="profile-section">
            <div className="profile-fields">
              <label>
                Nome:
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
                Senha:
                <span>*****</span>
              </label>
            </div>

            {editInfo ? (
              <div className="profile-buttons-row">
                <button onClick={() => setEditInfo(false)}>Cancel</button>
                <button onClick={handleSaveInfo}>Save</button>
              </div>
            ) : (
              <div className="edit-buttons-row">
                <button onClick={() => setEditInfo(true)}>Edit Info</button>
                <button onClick={() => setEditPassword(true)}>
                  Editar senha
                </button>
              </div>
            )}

            {editPassword && (
              <div className="password-edit-fields">
                <label>
                  Senha atual:
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </label>

                <label>
                 Nova Senha:
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
              </div>
            )}
          </section>

          <section className="profile-section delete-account-section">
            {!confirmDelete ? (
              <button
                className="btn-delete"
                onClick={() => setConfirmDelete(true)}
              >
                Deletar Conta
              </button>
            ) : !confirmDeleteStepTwo ? (
              <div className="confirm-delete">
                <p>
                  Você tem certeza de que deseja excluir sua conta? Esta ação não poderá ser desfeita.

                </p>
                <button
                  className="confirm-yes-button"
                  onClick={() => setConfirmDeleteStepTwo(true)}
                >
                 Sim
                </button>
                <button
                  className="cancel-no-button"
                  onClick={() => setConfirmDelete(false)}
                >
                  Não
                </button>
              </div>
            ) : (
              <div className="confirm-delete">
                <p>Última chance. Quer mesmo deletar?</p>
                <button
                  className="confirm-yes-button"
                  onClick={handleDeleteAccount}
                >
                  Confirmar
                </button>
                <button
                  className="cancel-no-button"
                  onClick={() => setConfirmDeleteStepTwo(false)}
                >
                  Cancelar
                </button>
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
