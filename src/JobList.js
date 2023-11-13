import React, { useState, useEffect } from 'react';

// JobList component
const JobList = () => {
    // State to hold the job posts
    const [jobPosts, setJobPosts] = useState([]);

    // Function to fetch job posts from the API
    const fetchJobPosts = async () => {
        try {
            const response = await fetch('http://localhost:8080/getAllJobPosts');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setJobPosts(data); // Assuming the API returns an array of job posts
        } catch (error) {
            console.error('Error fetching job posts:', error);
        }
    };

    // useEffect to call fetchJobPosts when the component mounts
    useEffect(() => {
        fetchJobPosts();
    }, []);

    // Render the job posts or a loading message
    return (
        <div>
            {jobPosts.length > 0 ? (
                <ul>
                    {jobPosts.map((job) => (
                        <li key={job.id}>
                            <h2>{job.title} - {job.company}</h2>
                            <p>yoe: {job.yoe}</p>
                            <p>postDate: {job.date_added}</p>
                            {job.apply_link ? (
                                <a href={job.apply_link} target="_blank" rel="noopener noreferrer">Apply Now</a>
                            ) : (
                                <span>Closed</span>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading job posts...</p>
            )}
        </div>
    );
};

export default JobList;
