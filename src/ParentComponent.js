import React from 'react';
import { useAuth } from "./authContext";
import JobList from './JobList';

const ParentComponent = () => {
    const { isLoggedIn } = useAuth(); // Ensure this is getting the correct state

    return (
        <div>
            <JobList isLoggedIn={isLoggedIn} />
        </div>
    );
};

export default ParentComponent;