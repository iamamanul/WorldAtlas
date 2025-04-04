import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: '8e41a02e-f1a9-432e-bd73-43b52782c53c',
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    subject: 'New Contact Form Submission - World Atlas'
                })
            });

            const result = await response.json();

            if (result.success) {
                toast.success('Message sent successfully!');
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
            } else {
                throw new Error(result.message || 'Something went wrong!');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.message || 'Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="section-contact">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <h2 className="container-title">Contact Us</h2>
            <div className="contact-wrapper container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            className="form-control"
                            rows="6"
                            placeholder="Enter your message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            disabled={isSubmitting}
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </section>
    );
};
