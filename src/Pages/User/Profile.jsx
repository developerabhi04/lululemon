import { useState } from "react";
import Avatar from "../../assets/profile/photo-1494790108377-be9c29b29330.jpg"
import { AdminPanelSettings, Dashboard, Home, LockOpen, LockReset, PersonPin } from "@mui/icons-material";


const Profile = () => {
  const [isAdmin, setIsAdmin] = useState(true); // Simulate admin user
  const [activeSection, setActiveSection] = useState("profile"); // Default section
  const [user, setUser] = useState({
    firstName: "Alexa",
    lastName: "Doe",
    phone: "123-456-7890",
    dob: "1990-01-01",
    email: "johndoe@example.com",
    address: "123, Main Street, New York, NY 10001",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Changes saved successfully!");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={user.dob}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                disabled
              />
            </div>
            <button type="submit" className="save-changes">
              Save Changes
            </button>
          </form>
        );

      case "address":
        return (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={user.address}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
            <button type="submit" className="save-changes">
              Save Address
            </button>
          </form>
        );

      case "changePassword":
        return (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" name="currentPassword" />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" name="newPassword" />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input type="password" name="confirmPassword" />
            </div>
            <button type="submit" className="save-changes">
              Change Password
            </button>
          </form>
        );

      case "forgotPassword":
        return (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={user.email}
                disabled
              />
            </div>
            <button type="submit" className="save-changes">
              Reset Password
            </button>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <section className="profile-page">
      <div className="container">
        <h1 className="page-heading">My Profile</h1>

        <div className="profile-section">
          {/* Left Section */}
          <div className="profile-left">
            <h2>Profile</h2>
            <div className="profile-photo">
              <img
                src={Avatar}
                alt="Profile"
              />
              <button className="update-photo">Change Photo</button>
            </div>

            <div className="profile-info">{renderSection()}</div>
          </div>

          {/* Right Section */}
          <div className="profile-right">
            <h2>Account Options</h2>
            <ul>
              <li onClick={() => setActiveSection("profile")}>
                <PersonPin />Edit Profile
              </li>
              <li onClick={() => setActiveSection("address")}><Home />Address</li>
              <li onClick={() => setActiveSection("changePassword")}>
                <LockOpen /> Change Password
              </li>
              <li onClick={() => setActiveSection("forgotPassword")}>
                <LockReset /> Forgotten Password
              </li>
            </ul>

            {isAdmin && (
              <div className="admin-section">
                <h3><AdminPanelSettings /> Admin Dashboard</h3>
                <ul>
                  <li><Dashboard /> Manage Admin</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
