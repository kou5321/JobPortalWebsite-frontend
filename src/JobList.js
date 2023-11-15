import React, { useState, useEffect } from 'react';
import './JobList.css';

// JobList component
const JobList = ({ searchQuery, isLoggedIn }) => {
    const [jobPosts, setJobPosts] = useState([]);

    useEffect(() => {
        const fetchJobPosts = async () => {
            // Correctly use searchQuery in the API URL
            console.log('Search Query:', searchQuery);
            const apiUrl = searchQuery
                ? `http://localhost:8080/jobPost/search/text=${encodeURIComponent(searchQuery)}`
                : 'http://localhost:8080/getAllJobPosts';

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setJobPosts(data);
            } catch (error) {
                console.error('Error fetching job posts:', error);
            }
        };
        fetchJobPosts();
    }, [searchQuery]); // Dependency array includes searchQuery

    const handleCheckboxChange = (jobId) => {
        if (!isLoggedIn) {
            alert("Please log in");
            return;
        }
        // Logic to handle the checkbox change if the user is logged in
        // For example, updating the job's applied status
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options); // Adjust 'en-US' as needed for your locale
    }

    return (
        <div className="job-list">
            {jobPosts.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>🏙️ Company</th>
                        <th>💼 Job</th>
                        <th>🗓️ Yoe</th>
                        <th>🕓 Posted</th>
                        <th>⏫  Applied?</th>
                    </tr>
                    </thead>
                    <tbody>
                    {jobPosts.map((job) => (
                        <tr key={job.id}>
                            <td>{job.company}</td>
                            <td>
                                {job.apply_link ? (
                                    <a href={job.apply_link} target="_blank" rel="noopener noreferrer" className="no-underline">
                                        {job.title}
                                    </a>
                                ) : (
                                    job.title
                                )}
                            </td>
                            <td>{job.yoe}</td>
                            {job.apply_link ? (<td>{formatDate(job.date_added)}</td>) : (<td>Closed</td>)}
                            <td>
                                <input
                                    type="checkbox"
                                    // checked={job.applied} // assuming 'applied' is a boolean property
                                    onChange={() => handleCheckboxChange(job.id)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Sorry. No results found for this keyword.</p>
            )}
        </div>
    );
};

export default JobList;

