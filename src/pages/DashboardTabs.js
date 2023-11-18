import React from 'react';
import '../styles/DashboardTabs.css'; // Import the CSS for styling

const DashboardTabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="dashboard-tabs">
            <button
                className={`tab-button ${activeTab === 'applied' ? 'active' : ''}`}
                onClick={() => setActiveTab('applied')}
            >
                Applied Jobs
            </button>
            <button
                className={`tab-button ${activeTab === 'viewed' ? 'active' : ''}`}
                onClick={() => setActiveTab('viewed')}
            >
                Viewed Jobs
            </button>
        </div>
    );
};

export default DashboardTabs;
