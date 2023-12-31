import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <div className="search-bar-container">
            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    className="search-input"
                    type="search"
                    placeholder="Search Job Title, Skill Sets, Companies ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-button" type="submit">Search</button>
            </form>
        </div>
    );
};

export default SearchBar;
