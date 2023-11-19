import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/authContext';
import DashboardTabs from '../components/DashboardTabs';
import '../styles/JobList.css'; // Assuming this CSS styles the job list appropriately
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [viewedJobs, setViewedJobs] = useState([]);
    const [activeTab, setActiveTab] = useState('applied');
    const { user, isLoggedIn } = useAuth();

    useEffect(() => {
        if (isLoggedIn && user) {
            const fetchJobs = async () => {
                try {
                    const appliedResponse = await axios.get(`http://localhost:8080/users/${user.id}/get-user-applied-list`);
                    setAppliedJobs(appliedResponse.data);
                    // Replace URL with your endpoint for fetching viewed jobs
                    const viewedResponse = await axios.get(`http://localhost:8080/users/${user.id}/get-user-viewed-list`);
                    setViewedJobs(viewedResponse.data);
                } catch (error) {
                    console.error('Error fetching jobs:', error);
                }
            };
            fetchJobs();
        }
    }, [isLoggedIn, user]);

    if (!isLoggedIn) {
        return <div>Please log in to view your dashboard.</div>;
    }

    // function formatDate(dateString) {
    //     const date = new Date(dateString);
    //     const options = { year: 'numeric', month: 'short', day: 'numeric' };
    //     return date.toLocaleDateString('en-US', options);
    // }

    return (
        <div className="dashboard-container">
            <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="job-list">
                {activeTab === 'applied' ? (
                    <>
                        <h2>Applied Jobs</h2>
                        {appliedJobs.length > 0 ? (
                            <table>
                                <thead>
                                <tr>
                                    <th><span role="img" aria-label="Software NewGrad">🏙️</span> Company</th>
                                    <th><span role="img" aria-label="Software NewGrad">💼 </span>Job</th>
                                    <th><span role="img" aria-label="Software NewGrad">🔗</span>Link</th>
                                    {/* TODO: add date applied */}
                                </tr>
                                </thead>
                                <tbody>
                                {appliedJobs.map(job => (
                                    <tr key={job.id}>
                                        <td>{job.company}</td>
                                        <td>{job.title}</td>
                                        <td>
                                            {job.apply_link && (
                                                <a href={job.apply_link} target="_blank" rel="noopener noreferrer">Apply Link</a>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>You have not applied to any jobs yet.</p>
                        )}
                    </>
                ) : (
                    <>
                        <h2>Viewed Jobs</h2>
                        {viewedJobs.length > 0 ? (
                            <table>
                                <thead>
                                <tr>
                                    <th><span role="img" aria-label="Software NewGrad">🏙️</span> Company</th>
                                    <th><span role="img" aria-label="Software NewGrad">💼 </span> Job</th>
                                    <th><span role="img" aria-label="Software NewGrad">🔗</span> Link</th>
                                    {/* TODO: add date applied */}
                                </tr>
                                </thead>
                                <tbody>
                                {viewedJobs.map(job => (
                                    <tr key={job.id}>
                                        <td>{job.company}</td>
                                        <td>{job.title}</td>
                                        <td>
                                            {job.apply_link && (
                                                <a href={job.apply_link} target="_blank" rel="noopener noreferrer">Apply Link</a>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>You have not viewed any jobs yet.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
