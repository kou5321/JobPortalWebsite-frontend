import React, { useState } from 'react';
import { useAuth } from '../auth/authContext';
import SearchBar from "../components/SearchBar";
import JobList from "./JobList";
import { ViewedJobProvider } from "../context/ViewedJobsContext.js";

const SoftwareNewGradPage = () => {

    const { isLoggedIn } = useAuth();

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <ViewedJobProvider>
            <div className="content-container">
                <div className="title-container">
                    <h3 className="large-title font-semibold text-gray-900 dark:text-white py-3">
                        <span role="img" aria-label="Software NewGrad">💻</span> Software Engineer Full-time Openings
                    </h3>
                </div>
                <div className="search-bar-container">
                    <SearchBar onSearch={handleSearch} />
                </div>
                <div className="job-list-container">
                    <JobList searchQuery={searchQuery} isLoggedIn={isLoggedIn} />
                </div>
            </div>
        </ViewedJobProvider>
    );
};

export default SoftwareNewGradPage;
