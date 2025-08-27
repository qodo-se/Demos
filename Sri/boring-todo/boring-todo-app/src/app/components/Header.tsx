"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Boring Todo App</h1>
        <div className={styles.userInfo}>
          <span className={styles.username}>Welcome, {user.username}!</span>
          <button onClick={handleLogout} className={styles.logoutButton} data-testid="logout-button">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}