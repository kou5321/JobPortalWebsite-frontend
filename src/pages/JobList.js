import React, { useState, useEffect } from 'react';
import '../styles/JobList.css';
import { useAuth } from '../auth/AuthProvider';
import axios from "axios";

const JobList = ({ searchQuery }) => {
    const [jobPosts, setJobPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(0);
    const { user, isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchJobPosts = async () => {
            const apiUrl = searchQuery
                ? `http://localhost:8080/jobPost/search/text=${encodeURIComponent(searchQuery)}&page=${currentPage}&size=${pageSize}`
                : `http://localhost:8080/getAllJobPosts?page=${currentPage}&size=${pageSize}`;

            try {
                const response = await axios.get(apiUrl);
                setJobPosts(response.data.content || []);
                setTotalPages(response.data.totalPages || 0);
                console.log(response);
            } catch (error) {
                console.error('Error fetching job posts:', error);
            }
        };

        const fetchAppliedJobs = async () => {
            if (isLoggedIn && user) {
                try {
                    const { data } = await axios.get(`http://localhost:8080/users/${user.id}/get-user-applied-list`);
                    const appliedJobs = new Set(data.map(job => job.id));
                    setJobPosts(prevJobs => prevJobs.map(job => ({
                        ...job,
                        hasUserApplied: appliedJobs.has(job.id),
                    })));
                } catch (error) {
                    console.error('Error fetching applied jobs:', error);
                }
            }
        };

        fetchJobPosts().then(() => {
            fetchAppliedJobs();
        });
    }, [searchQuery, currentPage, pageSize, isLoggedIn, user]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

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
            {jobPosts && jobPosts.length > 0 ? (
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
            <div className="pagination">
                {[...Array(totalPages || 0).keys()].map(pageNumber => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={pageNumber === currentPage ? 'active' : ''}
                    >
                        {pageNumber + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default JobList;
