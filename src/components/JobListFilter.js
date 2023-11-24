import React, { useState } from "react";

const JobListFilter = ({ onFilterChange }) => {
    const [selectCanada, setSelectCanada] = useState(true);
    const [selectUS, setSelectUS] = useState(true);

    const handleCountryFilterChange = (country) => {
        if (country === "Canada") {
            setSelectCanada(!selectCanada);
            onFilterChange({ "Canada": !selectCanada, "United States": selectUS });
        } else if (country === "United States") {
            setSelectUS(!selectUS);
            onFilterChange({ "Canada": selectCanada, "United States": !selectUS });
        }
    };

    return (
        <div>
            <label>
                Canada
                <input
                    type="checkbox"
                    checked={selectCanada}
                    onChange={() => handleCountryFilterChange("Canada")}
                />
            </label>
            <label>
                United States
                <input
                    type="checkbox"
                    checked={selectUS}
                    onChange={() => handleCountryFilterChange("United States")}
                />
            </label>
        </div>
    );
};

export default JobListFilter;
