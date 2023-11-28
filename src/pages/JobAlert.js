import React, {useState} from 'react';
import '../styles/JobAlert.css';
import axios from 'axios';
import {useAuth} from "../auth/AuthProvider";

const JobAlert = ({isOpen, onClose}) => {

    const [isSoftwareNewGradChecked, setIsSoftwareNewGradChecked] = useState(false);
    const [location, setLocation] = useState("United States");
    const [preferYoe, setPreferYoe] = useState(5);
    const { user } = useAuth();
    const username = user.username;
    if (!isOpen) return null;

    const handleCheckboxChange = (event) => {
        setIsSoftwareNewGradChecked(event.target.checked);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handlePreferYoeChange = (event) => {
        setPreferYoe(parseInt(event.target.value));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const params = new URLSearchParams({
            username,
            preferredLocation: location,
            preferredYear: preferYoe
        });


        try {
            if (isSoftwareNewGradChecked) {
                // Call /subscribe API
                await axios.post(`http://localhost:8080/users/subscribe?${params.toString()}`);
                alert('Subscribed successfully');
            } else {
                // Call /unsubscribe API
                await axios.delete(`http://localhost:8080/users/unsubscribe?${params.toString()}`);
                alert('Unsubscribed successfully');
            }
        } catch (error) {
            console.error('Error in subscription/unsubscription:', error);
            alert('An error occurred');
        }

        onClose();
    };

    return (
        <div className="job-alert-backdrop">
            <div className="job-alert-modal">
                <button className="job-alert-close" onClick={onClose}>×</button>
                <h2>Get Daily Job Alert</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            <input type="checkbox"
                                   value="Software Newgrad"
                                   checked={isSoftwareNewGradChecked}
                                   onChange={handleCheckboxChange}/>
                            <span className="label-text">
                        <span> </span>
                                👩🏻‍💻Software New Grad, with less than
                        <span> </span>
                    <select aria-label="Years of experience"
                            value={preferYoe}
                            onChange={handlePreferYoeChange}>
                        {Array.from({length: 5}, (_, i) => (
                            <option key={i} value={i}>{i + 1} year{i > 0 ? 's' : ''}</option>
                        ))}
                    </select>
                        <span> </span>
                    of experience in
                        <span> </span>
                    <select aria-label="Country"
                            value={location}
                            onChange={handleLocationChange}>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                    </select>
                </span>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <input type="checkbox"
                                   value="Software Intern"/>
                            <span className="label-text">
                        <span> </span>
                                👩‍💻Software Intern, with less than
                        <span> </span>
                    <select aria-label="Years of experience">
                        {Array.from({length: 5}, (_, i) => (
                            <option key={i} value={i}>{i + 1} year{i > 0 ? 's' : ''}</option>
                        ))}
                    </select>
                        <span> </span>
                    of experience in
                        <span> </span>
                    <select aria-label="Country">
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                    </select>
                </span>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <input type="checkbox"
                                   value="Data Newgrad"/>
                            <span className="label-text">
                        <span> </span>
                                🙋‍♂️Data New Grad, with less than
                        <span> </span>
                    <select aria-label="Years of experience">
                        {Array.from({length: 5}, (_, i) => (
                            <option key={i} value={i}>{i + 1} year{i > 0 ? 's' : ''}</option>
                        ))}
                    </select>
                        <span> </span>
                    of experience in
                        <span> </span>
                    <select aria-label="Country">
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                    </select>
                </span>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <input type="checkbox"
                                   value="Data Intern"/>
                            <span className="label-text">
                        <span> </span>
                                🙋Data Intern, with less than
                        <span> </span>
                    <select aria-label="Years of experience">
                        {Array.from({length: 5}, (_, i) => (
                            <option key={i} value={i}>{i + 1} year{i > 0 ? 's' : ''}</option>
                        ))}
                    </select>
                        <span> </span>
                    of experience in
                        <span> </span>
                    <select aria-label="Country">
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                    </select>
                </span>
                        </label>
                    </div>
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
