import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/App.css';
import {useAuth} from "../auth/AuthProvider";

const JobPostingForm = () => {
    const [jobPost, setJobPost] = useState({
        company: '',
        category: '',
        title: '',
        yoe: '',
        date_added: '', // Add if needed, or handle it in the backend
        location: '',
        sponsor: '',
        apply_link: ''
    });
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (!user || !user.roles.includes('ADMIN')) {
            navigate('/'); // redirect to home or another appropriate page
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setJobPost({ ...jobPost, [e.target.name]: e.target.value });
    };

// Inside your JobPostingForm component

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token'); // Corrected key for token retrieval

        try {

            const response = await axios.post('http://localhost:8080/addJobPost', jobPost, {
                headers: {
                    'Authorization': `Bearer ${token}` // Attach the token in the Authorization header
                }
            });
            console.log(response.data);
            navigate('/software-newgrad');
        }  catch (error) {
        console.error('Error submitting job post:', error);
    }
};




            return (
        <form onSubmit={handleSubmit} className="job-posting-form">
            <h2>Add Job post</h2>
            <input type="text" name="company" value={jobPost.company} onChange={handleChange} placeholder="Company" />
            <input type="text" name="category" value={jobPost.category} onChange={handleChange} placeholder="Category" />
            <input type="text" name="title" value={jobPost.title} onChange={handleChange} placeholder="Job Title" />
            <input type="text" name="yoe" value={jobPost.yoe} onChange={handleChange} placeholder="Years of Experience" />
            <input type="text" name="location" value={jobPost.location} onChange={handleChange} placeholder="Location" />
            <input type="text" name="sponsor" value={jobPost.sponsor} onChange={handleChange} placeholder="Sponsor" />
            <input type="text" name="apply_link" value={jobPost.apply_link} onChange={handleChange} placeholder="Apply Link" />
            <button type="submit">Submit</button>
        </form>
    );
};

export default JobPostingForm;
