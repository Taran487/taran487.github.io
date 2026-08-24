import { useState, useEffect } from "react";

export default function Skills() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = "https://portfolio-backend-n266.onrender.com";

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                let response = await fetch(`${API_URL}/api/skills`);
                let data = await response.json();
                setSkills(data);
            } catch (error) {
                console.error("Error fetching skills:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    if (loading) return <div className="loading-text">Loading skills...</div>;

    return (
        <section>
            <h2 className="section-title">Skills & Expertise</h2>
            <div className="cards-grid">
                {skills.map((group) => (
                    <div className="card" key={group._id}>
                        <h3 className="card-title">{group.category}</h3>
                        <div className="tags-container">
                            {group.skills?.map((skill, index) => (
                                <span key={index} className="tag">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}