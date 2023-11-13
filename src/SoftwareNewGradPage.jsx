import React, { useEffect, useContext } from 'react';
import Header from './Header';
// import JobList from './JobList';
import AuthContext from './authContext';
// import { JobType } from './JobType';
import SearchBar from "./SearchBar";

const SoftwareNewGradPage = () => {
    const loggedIn = useContext(AuthContext);

    return (
        <div className="parent-of-search-bar">
            <SearchBar />
        </div>
    );
};

export default SoftwareNewGradPage;
