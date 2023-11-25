import React from 'react';
import '../styles/JobAlert.css'

const JobAlert = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="job-alert-backdrop">
            <div className="job-alert-modal">
                <h2>Get Daily Job Alert</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="softwareFulltime">Software Full-time</label>
                        <input type="checkbox" id="softwareFulltime" name="softwareFulltime" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="softwareInternship">Software Internship</label>
                        <input type="checkbox" id="softwareInternship" name="softwareInternship" />
                    </div>
                    {/* Add more form inputs as needed */}
                    <button type="submit">Submit</button>
                    <button type="button" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
};

export default JobAlert;
