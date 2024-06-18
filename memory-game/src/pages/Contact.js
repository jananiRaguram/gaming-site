import React, { useState } from 'react';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import '../styles/contact.css';

const Contact = () => {
  const apiUrl = process.env.REACT_APP_API_URL || 'https://cis4250w24-10.socs.uoguelph.ca/api';
  console.log(apiUrl)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  function useHover() {
    const [hover, setHoverInfo] = useState(false)
    const hoverInfo = {
      onMouseEnter: () => setHoverInfo(true),
      onMouseLeave: () => setHoverInfo(false),
    }
    return [hover, hoverInfo] 
  }



  const [title, setTitle] = useHover();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/save_message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('Message saved successfully');
        // Clear form fields if needed
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        // Display toast notification
        toast.success('Message sent successfully!', {
          autoClose: 3000 // Close the toast after 3 seconds
        });
      } else {
        console.error('Failed to save message');
      }
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  return (
    <>
      <div>
        <h1 className="titletransition" {...setTitle} >
          {title ? "Next Clue: Shoot a Hoop!" : "Contact Us"}
        </h1>
      </div>

      <div className="form-container pt-4">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="emailAddress"
              placeholder="name@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" className="form-control" id="subject" name="subject" value={formData.subject} onChange={handleChange}required/>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea className="form-control" id="message" rows="3" name="message" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
