import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MainPage.css';
import companyBanner from '../assets/companyBanner.png'
import { useAuth } from '../auth/AuthProvider';
import JobAlert from "../pages/JobAlert";

const MainPage = () => {
    const [companyNumber, setCompanyNumber] = useState(0);
    const { isLoggedIn } = useAuth();
    const [isJobAlertOpen, setIsJobAlertOpen] = useState(false);
    const openJobAlert = () => setIsJobAlertOpen(true);
    const closeJobAlert = () => setIsJobAlertOpen(false);

    useEffect(() => {
        // Fetch the number of unique companies from the backend on component mount
        const fetchCompanyNumber = async () => {
            try {
                const response = await axios.post('http://localhost:8080/getCompanyNumber');
                setCompanyNumber(response.data);
            } catch (error) {
                console.error('Error fetching the number of companies:', error);
            }
        };

        fetchCompanyNumber();
    }, []);


    const handleUpdateButton = () => {
        if (!isLoggedIn) {
            alert("Please log in");
            return;
        }
        openJobAlert();
    };

    return (
        <div className="main-page">
            <h1>A Place for
                <span> </span>
                <span className="underline underline-offset-3 decoration-8 decoration-blue-500 dark:decoration-blue-600">Students</span>
                <span> </span>
                to Find Latest Jobs in Tech</h1>
            <p>Entry-Level Software Engineering roles in leading tech companies, updated every 12 hours so that you don't miss out on existing opportunities.</p>
            <div className="tracking-info">
                We are now tracking
                <span className="company-number"> {companyNumber} </span>
                top companies
            </div>
            <button className="update-button" onClick={handleUpdateButton}>Get Job Updates →</button>
            <div className="company-logos">
                <img src={companyBanner} alt="Company Logos" />
            </div>
            <JobAlert isOpen={isJobAlertOpen} onClose={closeJobAlert} />
        </div>
    );
};

export default MainPage;
