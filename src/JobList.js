// import React, { useState, useEffect } from 'react';
//
// // JobList component
// const JobList = () => {
//     // State to hold the job posts
//     const [jobPosts, setJobPosts] = useState([]);
//
//     // Function to fetch job posts from the API
//     const fetchJobPosts = async () => {
//         try {
//             const response = await fetch('http://localhost:8080/getAllJobPosts');
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const data = await response.json();
//             setJobPosts(data); // Assuming the API returns an array of job posts
//         } catch (error) {
//             console.error('Error fetching job posts:', error);
//         }
//     };
//
//     // useEffect to call fetchJobPosts when the component mounts
//     useEffect(() => {
//         fetchJobPosts();
//     }, []);
//
//     // Render the job posts or a loading message
//     return (
//         <div>
//             {jobPosts.length > 0 ? (
//                 <ul>
//                     {jobPosts.map((job) => (
//                         <li key={job.id}>
//                             <h2>{job.title} - {job.company}</h2>
//                             <p>yoe: {job.yoe}</p>
//                             <p>postDate: {job.date_added}</p>
//                             {job.apply_link ? (
//                                 <a href={job.apply_link} target="_blank" rel="noopener noreferrer">Apply Now</a>
//                             ) : (
//                                 <span>Closed</span>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>Loading job posts...</p>
//             )}
//         </div>
//     );
// };
//
// export default JobList;

import React, { useState, useEffect } from 'react';
import './JobList.css';

// JobList component
const JobList = () => {
    const [jobPosts, setJobPosts] = useState([]);

    const fetchJobPosts = async () => {
        try {
            const response = await fetch('http://localhost:8080/getAllJobPosts');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setJobPosts(data);
        } catch (error) {
            console.error('Error fetching job posts:', error);
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options); // Adjust 'en-US' as needed for your locale
    }

    useEffect(() => {
        fetchJobPosts();
    }, []);

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
                                    // checked={job.applied} // assuming 'applied' is a boolean property of the job object
                                    // onChange={() => handleCheckboxChange(job.id)} // handleCheckboxChange needs to be implemented
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading job posts...</p>
            )}
        </div>
    );
};

export default JobList;

