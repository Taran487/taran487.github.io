import { useState, useEffect } from "react";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_URL = "https://portfolio-backend-n266.onrender.com";

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                let response = await fetch(`${API_URL}/api/projects`);
                let data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) {
        return <div className="loading-text">Loading projects...</div>;
    }

    return (
        <section id="projects" className="portfolio-section">
            <h2 className="section-title">Projects</h2>
            
            <div className="cards-grid">
                {projects.map((project) => {
                    // Resolve image URL (if it's a relative path from the backend, prepend API_URL)
                    const imageUrl = project.imageUrl 
                        ? (project.imageUrl.startsWith("http") ? project.imageUrl : `${API_URL}${project.imageUrl}`)
                        : "";

                    return (
                        <div className="card" key={project._id || project.id}>
                            <div className="card-content-wrapper">
                                {/* Project Image Preview */}
                                {imageUrl && (
                                    <div className="project-image-container" style={{ 
                                        marginBottom: "1.25rem", 
                                        overflow: "hidden", 
                                        borderRadius: "0.75rem", 
                                        border: "1px solid var(--border-color)",
                                        backgroundColor: "#09090b", // Sleek dark background framing
                                        padding: "0.5rem"           // Gives breathing room around the image
                                    }}>
                                        <img 
                                            src={imageUrl} 
                                            alt={project.title} 
                                            style={{ 
                                                width: "100%", 
                                                height: "200px",      // You can adjust this height if you want it larger
                                                objectFit: "contain", // Ensures the entire image is shown fully without cutting sides off
                                                display: "block" 
                                            }} 
                                        />
                                    </div>
                                )}

                                <h3 className="card-title">{project.title}</h3>
                                <p className="card-description">{project.description}</p>
                                
                                {/* Tech Stack Tags */}
                                <div className="tags-container" style={{ marginBottom: "1.5rem" }}>
                                    {project.techStack?.map((tech, idx) => (
                                        <span className="tag" key={idx}>{tech}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="card-actions">
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                        Live Demo
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                                        GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}