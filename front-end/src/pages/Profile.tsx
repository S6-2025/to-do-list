// import React, { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// import { getUserByEmail , updateUser, deleteUser } from "../services/userService";

// interface UserDTO {
//   name: string;
//   email: string;
//   role: "PO" | "SM" | "EMPLOYEE";
// }

// const Profile: React.FC = () => {
//   const { token, role, logout } = useAuth();
//   const navigate = useNavigate();

//   const [user, setUser] = useState<UserDTO | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [editInfo, setEditInfo] = useState(false);
//   const [editPassword, setEditPassword] = useState(false);

//   const [name, setName] = useState("");

//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   const [confirmDelete, setConfirmDelete] = useState(false);
//   const [confirmDeleteStepTwo, setConfirmDeleteStepTwo] = useState(false);

//   // Função para extrair userId do token
//   const getUserIdFromToken = (): string | null => {
//     if (!token) return null;
//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       return payload.sub || null; // assuming 'sub' contains userId
//     } catch {
//       return null;
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       navigate("/landing");
//       return;
//     }

//     async function fetchUser() {
//       setLoading(true);
//       setError(null);

//       const userId = getUserIdFromToken();

//       if (!userId) {
//         logout();
//         navigate("/landing");
//         return;
//       }

//       try {
//         const userData = await getUserByEmail (userId);
//         setUser(userData);
//         setName(userData.name);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchUser();
//   }, [token, navigate, logout]);

//   const handleLogout = () => {
//     logout();
//     navigate("/landing");
//   };
// const userId = getUserIdFromToken();

// const handleSaveInfo = async () => {
//   if (!name) {
//     alert("Name cannot be empty");
//     return;
//   }
//   if (!userId) return; // previne erro

//   try {
//     const newToken = await updateUser(userId, { name });
//     // resto do código...
//   } catch (err: any) {
//     alert(err.message);
//   }
// };

// const handleSavePassword = async () => {
//   if (!currentPassword || !newPassword) {
//     alert("Current and new password must be filled");
//     return;
//   }
//   if (!userId) return;

//   try {
//     const newToken = await updateUser(userId, { password: newPassword });
//     // resto do código...
//   } catch (err: any) {
//     alert(err.message);
//   }
// };

//   const handleDeleteAccount = async () => {
//     const userId = getUserIdFromToken();
//     if (!userId) {
//       alert("User ID not found.");
//       logout();
//       navigate("/landing");
//       return;
//     }

//     try {
//       await deleteUser(userId);
//       alert("Account deleted");
//       logout();
//       navigate("/landing");
//     } catch (err: any) {
//       alert(err.message);
//     }
//   };

//   if (loading) return <div>Loading profile...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!user) return null;

//   return (
//     <main className="profile-user__container">
//       <header className="profile-header">
//         <h1>Profile</h1>
//         <button className="btn-logout" onClick={handleLogout}>
//           Logout
//         </button>
//       </header>

//       <section className="profile-section">
//         <label>
//           Name:
//           {editInfo ? (
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//           ) : (
//             <span>{user.name}</span>
//           )}
//         </label>

//         <label>
//           Email:
//           <span>{user.email}</span>
//         </label>

//         <label>
//           Role:
//           <span>{user.role}</span>
//         </label>

//         <label>
//           Password:
//           <span>***</span>
//         </label>

//         {editInfo ? (
//           <div className="profile-buttons-row">
//             <button onClick={() => setEditInfo(false)}>Cancel</button>
//             <button onClick={handleSaveInfo}>Save</button>
//           </div>
//         ) : (
//           <button onClick={() => setEditInfo(true)}>Edit Info</button>
//         )}
//       </section>

//       <section className="profile-section password-section">
//         {editPassword ? (
//           <>
//             <label>
//               Current Password:
//               <input
//                 type="password"
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//                 autoComplete="current-password"
//               />
//             </label>

//             <label>
//               New Password:
//               <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 autoComplete="new-password"
//               />
//             </label>

//             <div className="profile-buttons-row">
//               <button onClick={() => setEditPassword(false)}>Cancel</button>
//               <button onClick={handleSavePassword}>Save Password</button>
//             </div>
//           </>
//         ) : (
//           <button onClick={() => setEditPassword(true)}>Edit Password</button>
//         )}
//       </section>

//       <section className="profile-section delete-account-section">
//         {!confirmDelete ? (
//           <button className="btn-delete" onClick={() => setConfirmDelete(true)}>
//             Delete Account
//           </button>
//         ) : !confirmDeleteStepTwo ? (
//           <div className="confirm-delete">
//             <p>
//               Are you sure you want to delete your account? This action cannot be undone.
//             </p>
//             <button onClick={() => setConfirmDeleteStepTwo(true)}>Yes</button>
//             <button onClick={() => setConfirmDelete(false)}>No</button>
//           </div>
//         ) : (
//           <div className="confirm-delete">
//             <p>This is your last chance. Confirm delete account?</p>
//             <button onClick={handleDeleteAccount}>Confirm Delete</button>
//             <button onClick={() => setConfirmDeleteStepTwo(false)}>Cancel</button>
//           </div>
//         )}
//       </section>
//     </main>
//   );
// };

// export default Profile;
