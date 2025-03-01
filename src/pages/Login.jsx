import { useState } from "react";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setIsAdmin(false);
    setFormData({ name: "", email: "", password: "" });
    setErrors({});
  };

  const switchToAdmin = () => {
    setIsLogin(true);
    setIsAdmin(true);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isAdmin) {
        alert("Admin login successful!");
      } else if (isLogin) {
        alert("User login successful!");
      } else {
        alert("Signup successful!");
      }
      setFormData({ name: "", email: "", password: "" });
      setErrors({});
    }
  };

  // Styles
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f2f2f2",
      padding: "20px",
      boxSizing: "border-box",
    },
    formContainer: {
      background: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
      boxSizing: "border-box",
    },
    heading: {
      marginBottom: "20px",
      textAlign: "center",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxSizing: "border-box",
    },
    errorText: {
      color: "red",
      fontSize: "12px",
      marginTop: "5px",
    },
    submitBtn: {
      width: "100%",
      padding: "10px",
      background: isAdmin ? "#dc3545" : "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    toggleText: {
      textAlign: "center",
      marginTop: "15px",
    },
    toggleBtn: {
      background: "none",
      border: "none",
      color: "#007bff",
      cursor: "pointer",
      textDecoration: "underline",
    },
    adminBtn: {
      width: "100%",
      padding: "10px",
      marginTop: "10px",
      background: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>
          {isAdmin ? "Admin Login" : isLogin ? "User Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                style={styles.input}
              />
              {errors.name && <p style={styles.errorText}>{errors.name}</p>}
            </div>
          )}
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              style={styles.input}
            />
            {errors.email && <p style={styles.errorText}>{errors.email}</p>}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              style={styles.input}
            />
            {errors.password && <p style={styles.errorText}>{errors.password}</p>}
          </div>
          <button type="submit" style={styles.submitBtn}>
            {isAdmin ? "Admin Login" : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle User/Signup */}
        {!isAdmin && (
          <p style={styles.toggleText}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={toggleForm} style={styles.toggleBtn}>
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        )}

        {/* Admin Login Button */}
        {!isAdmin && (
          <button onClick={switchToAdmin} style={styles.adminBtn}>
            Admin Login
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
