import React, { useEffect, useContext } from 'react';
import AuthContext from './authContext';
// import { JobType } from './JobType';
import SearchBar from "./SearchBar";
import JobList from "./JobList";

const SoftwareNewGradPage = () => {
    const loggedIn = useContext(AuthContext);

    return (
        <div className="content-container">
            <div className="search-bar-container">
                <SearchBar />
            </div>
            <div className="job-list-container">
                <JobList />
            </div>
        </div>
    );
};

export default SoftwareNewGradPage;
