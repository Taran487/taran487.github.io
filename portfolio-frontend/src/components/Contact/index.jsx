export default function Contact() {
    return (
        <section className="contact-section">
            <h2 className="section-title">Get In Touch</h2>
            <div className="card contact-card">
                <p className="contact-intro">
                    I'm currently looking for new opportunities. Feel free to reach out directly through any of the channels below:
                </p>
                <div className="contact-details">
                    <div className="contact-item">
                        <span className="contact-label">Email:</span>
                        <a href="mailto:your.email@example.com" className="contact-value">taranp555@gmail.com</a>
                    </div>
                    <div className="contact-item">
                        <span className="contact-label">Location:</span>
                        <span className="contact-value">Brampton, Ontario, Canada</span>
                    </div>
                    <div className="contact-item">
                        <span className="contact-label">GitHub:</span>
                        <a href="https://github.com/taran487" target="_blank" rel="noreferrer" className="contact-value">github.com/taran487</a>
                    </div>
                    <div className="contact-item">
                        <span className="contact-label">Linkdein:</span>
                        <a href="https://www.linkedin.com/in/taranpreet-kaur-3b977b304/" target="_blank" rel="noreferrer" className="contact-value">github.com/taran487</a>
                    </div>
                </div>
            </div>
        </section>
    );
}