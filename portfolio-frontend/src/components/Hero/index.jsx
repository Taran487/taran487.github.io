import { useState, useEffect } from "react";

export default function Hero() {
    const [profile, setProfile] = useState(null);
    const API_URL = "https://portfolio-backend-n266.onrender.com";

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                let response = await fetch(`${API_URL}/api/about`);
                let data = await response.json();
                
                const profileObj = Array.isArray(data) ? data[0] : data;
                if (profileObj) {
                    setProfile(profileObj);
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };
        fetchProfile();
    }, []);

    const profileImageUrl = profile?.profileImage 
        ? (profile.profileImage.startsWith("http") ? profile.profileImage : `${API_URL}${profile.profileImage}`)
        : "";

    return (
        <section className="hero-section">
            <div className="hero-container">
                {profileImageUrl && (
                    <div className="hero-image-container">
                        <img src={profileImageUrl} alt={profile?.name || "Profile"} className="hero-profile-img" />
                    </div>
                )}
                <div className="hero-text-content">
                    <h1 className="hero-title">
                        Hi, I'm <span>{profile?.name || "Full-Stack Developer"}</span>
                    </h1>
                    <p className="hero-subtitle">
                        {profile?.bio || "Crafting robust backend architectures with Node.js & MongoDB, paired with high-performance responsive web applications."}
                    </p>
                </div>
            </div>
        </section>
    );
}