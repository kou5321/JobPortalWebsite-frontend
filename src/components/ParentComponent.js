import React from 'react';
import { useAuth } from "../auth/authContext";
import JobList from '../pages/JobList';

const ParentComponent = () => {
    const { isLoggedIn } = useAuth(); // Ensure this is getting the correct state

    return (
        <div>
            <JobList isLoggedIn={isLoggedIn} />
        </div>
    );
};

export default ParentComponent;