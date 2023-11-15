import React, { useState, useContext } from 'react';
import { useAuth } from './authContext';
// import { JobType } from './JobType';
import SearchBar from "./SearchBar";
import JobList from "./JobList";

const SoftwareNewGradPage = () => {

    const { isLoggedIn } = useAuth();

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <div className="content-container">
            <div className="title-container">
                <h3 className="large-title font-semibold text-gray-900 dark:text-white py-3">
                    💻 Software Engineer Full-time Openings
                </h3>
            </div>
            <div className="search-bar-container">
                <SearchBar onSearch={handleSearch} />
            </div>
            <div className="job-list-container">
                <JobList searchQuery={searchQuery} isLoggedIn={isLoggedIn} />
            </div>
        </div>
    );
};

export default SoftwareNewGradPage;
