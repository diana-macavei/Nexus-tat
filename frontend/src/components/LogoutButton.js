import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        backgroundColor: "#a855f7",
        color: "white",
        border: "none",
        borderRadius: "8px",
        padding: "0.5rem 1rem",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
