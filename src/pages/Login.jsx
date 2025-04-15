import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Internal CSS styles
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    formContainer: {
      backgroundColor: "#ffffff",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
      transition: "all 0.3s ease"
    },
    heading: {
      marginBottom: "25px",
      textAlign: "center",
      fontSize: "28px",
      color: "#333",
      fontWeight: "600"
    },
    formGroup: {
      marginBottom: "20px"
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "14px",
      color: "#555",
      fontWeight: "500"
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      fontSize: "16px",
      transition: "border 0.3s ease",
      outline: "none"
    },
    errorText: {
      color: "#dc3545",
      fontSize: "13px",
      marginTop: "5px",
      height: "18px"
    },
    submitBtn: {
      width: "100%",
      padding: "12px",
      backgroundColor: isAdmin ? "#dc3545" : "#007bff",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "600",
      marginTop: "15px",
      transition: "background-color 0.3s ease, opacity 0.3s ease",
      opacity: loading ? 0.7 : 1,
      pointerEvents: loading ? "none" : "auto"
    },
    toggleText: {
      textAlign: "center",
      marginTop: "20px",
      fontSize: "14px",
      color: "#666"
    },
    toggleBtn: {
      backgroundColor: "transparent",
      border: "none",
      color: "#007bff",
      cursor: "pointer",
      textDecoration: "underline",
      fontSize: "14px",
      fontWeight: "600",
      marginLeft: "5px",
      padding: "0"
    },
    adminBtn: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#6c757d",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "600",
      marginTop: "15px",
      transition: "background-color 0.3s ease"
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setIsAdmin(false);
    setFormData({ name: "", email: "", password: "" });
    setErrors({});
  };

  const switchToAdmin = () => {
    setIsAdmin(true);
    setIsLogin(true);
    setFormData({ name: "", email: "", password: "" });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin && !formData.name) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const endpoint = isAdmin
          ? "/auth/admin/login"
          : isLogin
          ? "/auth/login"
          : "/auth/signup";

        const response = await fetch(`http://localhost:5000${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Something went wrong");
        }

        const data = await response.json();
        alert(data.message);

        localStorage.setItem("email", formData.email);
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isAdmin", isAdmin.toString());
        }

        if (isAdmin) {
          navigate("/Admin/AdminPanel");
        } else if (isLogin) {
          navigate("/");
        } else {
          // After successful signup, switch to login form
          toggleForm();
          alert("Please login with your new credentials");
        }

        setFormData({ name: "", email: "", password: "" });
        setErrors({});
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>
          {isAdmin ? "Admin Login" : isLogin ? "User Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && !isAdmin && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                style={styles.input}
                autoComplete="name"
              />
              {errors.name && <p style={styles.errorText}>{errors.name}</p>}
            </div>
          )}
          <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              style={styles.input}
              autoComplete="email"
            />
            {errors.email && <p style={styles.errorText}>{errors.email}</p>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              style={styles.input}
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
            {errors.password && <p style={styles.errorText}>{errors.password}</p>}
          </div>
          <button 
            type="submit" 
            style={styles.submitBtn}
            disabled={loading}
          >
            {loading ? "Processing..." : isAdmin ? "Admin Login" : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Show admin button only on signup page */}
        {!isLogin && !isAdmin && (
          <button 
            onClick={switchToAdmin} 
            style={styles.adminBtn}
          >
            Admin Login
          </button>
        )}

        {/* Toggle between login/signup */}
        <p style={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={toggleForm} style={styles.toggleBtn}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;