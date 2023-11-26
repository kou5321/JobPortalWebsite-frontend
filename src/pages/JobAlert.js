import React from 'react';
import '../styles/JobAlert.css';

const JobAlert = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const renderFormOptions = (title, value) => {
        return (
            <div className="form-group">
                <label>
                    <input type="checkbox" value={value} />
                    <span className="label-text">
                    {title}, with less than
                    <select aria-label="Years of experience">
                        {Array.from({ length: 5 }, (_, i) => (
                            <option key={i} value={i}>{i + 1} year{ i > 0 ? 's' : '' }</option>
                        ))}
                    </select>
                    of experience in
                    <select aria-label="Country">
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                    </select>
                </span>
                </label>
            </div>
        );
    };

    return (
        <div className="job-alert-backdrop">
            <div className="job-alert-modal">
                <button className="job-alert-close" onClick={onClose}>×</button>
                <h2>Get Daily Job Alert</h2>
                <form>
                    {renderFormOptions('👩🏻‍💻Software Full-time', 'Software Full-time')}
                    {renderFormOptions('👩‍💻Software Intern', 'Software Intern')}
                    {renderFormOptions('🙋‍♂️Data Full-time', 'Data Full-time')}
                    {renderFormOptions('🙋Data Intern', 'Data Intern')}
                    <div className="form-actions">
                        <button type="submit" className="submit-btn">Submit</button>
                        <button type="button" className="close-btn" onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobAlert;
