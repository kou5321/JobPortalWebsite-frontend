import React, { useState } from 'react';
import SearchBar from "../components/SearchBar";
import JobList from "./JobList";

const SoftwareNewGradPage = () => {

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
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
                <JobList searchQuery={searchQuery} />
            </div>
        </div>
    );
};

export default SoftwareNewGradPage;
