import React, { useState, useEffect } from 'react';
import '../styles/JobList.css';
import { useAuth } from '../auth/authContext.js';
import axios from 'axios';

const JobList = ({ searchQuery }) => {
    const [jobPosts, setJobPosts] = useState([]);
    const { user, isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchJobPosts = async () => {
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

        const fetchAppliedJobs = async () => {
            if (isLoggedIn && user) {
                try {
                    const response = await axios.get(`http://localhost:8080/users/${user.id}/get-user-applied-list`);
                    const appliedJobs = new Set(response.data.map(job => job.id));

                    setJobPosts(prevJobs => prevJobs.map(job => ({
                        ...job,
                        hasUserApplied: appliedJobs.has(job.id),
                    })));
                } catch (error) {
                    console.error('Error fetching applied jobs:', error);
                }
            }
        };
        fetchJobPosts();
        fetchAppliedJobs();
    }, [searchQuery, isLoggedIn, user]); // Dependency array includes searchQuery

    const handleCheckboxChange = async (jobId, hasApplied) => {
        if (!isLoggedIn) {
            alert("Please log in");
            return;
        }
        try {
            // Construct the URL with jobPostingId as a query parameter
            const url = `http://localhost:8080/users/${user.id}/${hasApplied ? 'unmark-applied-job' : 'mark-applied-job'}?jobPostingId=${jobId}`;

            // Determine the method based on whether the job is currently marked as applied
            const method = hasApplied ? 'delete' : 'post';

            await axios({ method, url });

            // Update the jobPosts state to reflect the change
            setJobPosts(prevJobs => prevJobs.map(job =>
                job.id === jobId ? {...job, hasUserApplied: !hasApplied} : job
            ));
        } catch (error) {
            console.error('Error updating job application status:', error);
        }
    };

    const handleJobClick = async (jobId) => {
        if (isLoggedIn && user) {
            try {
                await axios.post(`http://localhost:8080/users/${user.id}/mark-viewed-job`, null, {
                    params: { jobPostingId: jobId }
                });
            } catch (error) {
                console.error('Error marking job as viewed:', error);
            }
        }
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
                        <th><span role="img" aria-label="Software NewGrad">🏙</span> Company</th>
                        <th><span role="img" aria-label="Software NewGrad">💼</span> Job</th>
                        <th><span role="img" aria-label="Software NewGrad">🗓️</span> Yoe</th>
                        <th><span role="img" aria-label="Software NewGrad">🕓</span> Posted</th>
                        <th><span role="img" aria-label="Software NewGrad">⏫</span>  Applied?</th>
                    </tr>
                    </thead>
                    <tbody>
                    {jobPosts.map((job) => (
                        <tr key={job.id}>
                            <td>{job.company}</td>
                            <td>
                                {job.apply_link ? (
                                    <a href={job.apply_link} target="_blank" rel="noopener noreferrer" className="no-underline" onClick={() => handleJobClick(job.id)}>
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
                                    checked={job.hasUserApplied}
                                    onChange={() => handleCheckboxChange(job.id, job.hasUserApplied)}
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

