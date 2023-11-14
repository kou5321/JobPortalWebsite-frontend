import React, { useState, useEffect } from "react";
const JobListFilter = ({}) => {
    const [selectCanada, setSelectCanada] = useState(
        country === "Canada" || country === null
    );
    const [selectUS, setSelectUS] = useState(
        country === "United States" || country === null
    );
}