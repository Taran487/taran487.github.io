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

    // Resolve resume URL from backend
    const resumeUrl = profile?.resumeUrl 
        ? (profile.resumeUrl.startsWith("http") ? profile.resumeUrl : `${API_URL}${profile.resumeUrl}`)
        : "";

    // Function to handle direct file download from custom API
    const handleDownload = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(resumeUrl);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = "resume.pdf"; // Name of the file saved to device folder
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Download failed:", error);
            // Fallback if fetch fails due to strict CORS headers
            window.open(resumeUrl, "_blank");
        }
    };

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

                    {/* Attractive Action Buttons using inline/utility classes that won't break your layout */}
                    {resumeUrl && (
                        <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
                            {/* View Button */}
                            <a 
                                href={resumeUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.75rem 1.5rem",
                                    borderRadius: "0.75rem",
                                    fontWeight: "500",
                                    color: "#ffffff",
                                    background: "linear-gradient(to right, #4f46e5, #7c3aed)",
                                    boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)",
                                    textDecoration: "none",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                <svg style={{ width: "1.25rem", height: "1.25rem" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View Resume
                            </a>
                            
                            {/* Download Button */}
                            <a 
                                href={resumeUrl} 
                                onClick={handleDownload}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.75rem 1.5rem",
                                    borderRadius: "0.75rem",
                                    fontWeight: "500",
                                    color: "#4f46e5",
                                    background: "#ffffff",
                                    border: "2px solid #4f46e5",
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                <svg style={{ width: "1.25rem", height: "1.25rem" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download Resume
                            </a>

                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}