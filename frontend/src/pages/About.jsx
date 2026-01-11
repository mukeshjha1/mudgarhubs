import './About.css'

export default function About() {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <h1>About MudgarHub</h1>
                    <p>Reviving the Ancient Art of Indian Fitness</p>
                </div>
            </section>

            {/* Story Section */}
            <section className="about-story">
                <div className="container">
                    <div className="story-content">
                        <h2>Our Story</h2>
                        <p>
                            MudgarHub was founded with a simple mission: to bring back the traditional Indian
                            fitness equipment that our ancestors used for centuries. In an age of modern gym
                            equipment, we believe there's immense value in the time-tested tools like Mudgar,
                            Samtola, and Gada.
                        </p>
                        <p>
                            Our products are handcrafted by skilled artisans using premium quality wood like
                            Sheesham and Teak. Each piece is not just fitness equipment—it's a work of art
                            that connects you to India's rich heritage of strength training.
                        </p>
                        <p>
                            Whether you're a professional wrestler, fitness enthusiast, or someone looking
                            to add traditional exercises to your routine, MudgarHub has the perfect equipment
                            for you.
                        </p>
                    </div>
                    <div className="story-image">
                        <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600" alt="Traditional Training" />
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="about-values">
                <div className="container">
                    <h2>Why Choose Us</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <span className="value-icon">🇮🇳</span>
                            <h3>Made in India</h3>
                            <p>All products are proudly manufactured in India by local artisans</p>
                        </div>
                        <div className="value-card">
                            <span className="value-icon">🪵</span>
                            <h3>Premium Wood</h3>
                            <p>Only the finest Sheesham, Teak, and Rosewood used in our products</p>
                        </div>
                        <div className="value-card">
                            <span className="value-icon">🏋️</span>
                            <h3>Authentic Design</h3>
                            <p>Traditional designs perfected over generations of Indian wrestlers</p>
                        </div>
                        <div className="value-card">
                            <span className="value-icon">🎥</span>
                            <h3>Free Workouts</h3>
                            <p>Every purchase includes access to our online workout video series</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact & Address Section */}
            <section className="about-contact">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-info">
                            <h2>Visit Us</h2>
                            <div className="address-card">
                                <span className="icon">📍</span>
                                <div>
                                    <h4>Our Address</h4>
                                    <p>
                                        MudgarHub Fitness Equipment<br />
                                        123, Akhara Road, Khari Baoli<br />
                                        Old Delhi, Delhi - 110006<br />
                                        India
                                    </p>
                                </div>
                            </div>
                            <div className="address-card">
                                <span className="icon">📞</span>
                                <div>
                                    <h4>Phone</h4>
                                    <p>+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="address-card">
                                <span className="icon">✉️</span>
                                <div>
                                    <h4>Email</h4>
                                    <p>info@mudgarhub.com</p>
                                </div>
                            </div>
                            <div className="address-card">
                                <span className="icon">🕐</span>
                                <div>
                                    <h4>Working Hours</h4>
                                    <p>Mon - Sat: 10:00 AM - 7:00 PM<br />Sunday: Closed</p>
                                </div>
                            </div>
                        </div>
                        <div className="contact-map">
                            <h2>Find Us on Map</h2>
                            <div className="map-placeholder">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5!2d77.22!3d28.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM5JzAwLjAiTiA3N8KwMTMnMTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                                    width="100%"
                                    height="350"
                                    style={{ border: 0, borderRadius: '15px' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="MudgarHub Location"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta">
                <div className="container">
                    <h2>Ready to Start Your Traditional Fitness Journey?</h2>
                    <p>Explore our collection of authentic Indian fitness equipment</p>
                    <a href="/shop" className="btn-shop">Shop Now</a>
                </div>
            </section>
        </div>
    )
}
