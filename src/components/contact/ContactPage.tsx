import React, { useState } from 'react';
import { useBusinessConfig } from '../../context/BusinessContext';

export const ContactPage: React.FC = () => {
  const { currentBusinessConfig } = useBusinessConfig();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <div className="space-y-4">
            <p>
              <strong>Address:</strong><br />
              {currentBusinessConfig.contact.address}
            </p>
            <p>
              <strong>Phone:</strong><br />
              {currentBusinessConfig.contact.phone}
            </p>
            <p>
              <strong>Email:</strong><br />
              {currentBusinessConfig.contact.email}
            </p>
            <div>
              <strong>Hours:</strong>
              <ul className="mt-2">
                {currentBusinessConfig.contact.hours.map((hour, index) => (
                  <li key={index}>{hour}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                rows={4}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
