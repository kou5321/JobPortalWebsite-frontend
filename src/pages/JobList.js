import React, { useState, useEffect } from 'react';
import '../styles/JobList.css';
import { useAuth } from '../auth/AuthProvider';
import axios from "axios";
import JobListFilter from "../components/JobListFilter";

const JobList = ({ searchQuery }) => {
    const [jobPosts, setJobPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(0);
    const { user, isLoggedIn } = useAuth();
    const [yearsOfExperience, setYearsOfExperience] = useState(0);
    const [countryFilter, setCountryFilter] = useState({
        "United States": true,
        "Canada": true,
    });

    useEffect(() => {
        const fetchJobPosts = async () => {
            let apiUrl;
            let queryParams = new URLSearchParams({
                page: currentPage,
                size: pageSize,
                yoe: yearsOfExperience
            });

            if (!countryFilter["United States"] && !countryFilter["Canada"]) {
                setJobPosts([]);
                setTotalPages(0);
                return; // Exit early if no country is selected
            }

            if (searchQuery) {
                // If there is a search query, always use the search endpoint
                apiUrl = 'http://localhost:8080/jobPost/search';
                queryParams.append('text', searchQuery);
                if (countryFilter["United States"] && countryFilter["Canada"]) {}
                // Append country filters regardless of their state
                else if (countryFilter["United States"]) {
                    queryParams.append('country', 'United States');
                }
                else if (countryFilter["Canada"]) {
                    queryParams.append('country', 'Canada');
                }
            } else {
                // No search query: use getAllJobPosts or filtered based on country
                if (countryFilter["United States"] !== countryFilter["Canada"]) {
                    // Only one country filter is selected
                    apiUrl = 'http://localhost:8080/jobPost/search';
                    const selectedCountry = countryFilter["United States"] ? 'United States' : 'Canada';
                    queryParams.append('country', selectedCountry);
                } else {
                    // Both countries or none are selected
                    apiUrl = 'http://localhost:8080/jobPost/search';
                }
            }

            queryParams.append('maxYearsOfExperience', yearsOfExperience);

            apiUrl += `?${queryParams}`;

            try {
                const response = await axios.get(apiUrl);
                setJobPosts(response.data.content || []);
                setTotalPages(response.data.totalPages || 0);
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
    }, [searchQuery, currentPage, pageSize, isLoggedIn, user, countryFilter, yearsOfExperience]);

    const toggleCountryFilter = (country) => {
        setCountryFilter({
            ...countryFilter,
            [country]: !countryFilter[country],
        });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleExperienceChange = (event) => {
        setYearsOfExperience(event.target.value);
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
            <div className="filters-container">
                <div className="filter-item filter-toggle">
                    <JobListFilter onFilterChange={setCountryFilter} />
                </div>
                <div className="filter-item">
                    <label htmlFor="yearsOfExperience">
                        Year of Experience: &#8804; {yearsOfExperience}
                    </label>
                    <input
                        type="range"
                        id="yearsOfExperience"
                        name="yearsOfExperience"
                        min="0"
                        max="5" // Set the max as per your requirements
                        value={yearsOfExperience}
                        onChange={handleExperienceChange}
                    />
                </div>
            </div>

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