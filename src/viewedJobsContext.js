import { createContext, useContext, useState } from "react";

const ViewedJobContext = createContext(null);

export const useViewedJob = () => {
    const context = useContext(ViewedJobContext);
    if (!context)
        throw new Error("useViewedJob must be used within a ViewedJobProvider");
    return context;
};

export const ViewedJobProvider = ({ children }) => {
    const [lastViewedJob, setLastViewedJob] = useState(null);
    return (
        <ViewedJobContext.Provider value={[lastViewedJob, setLastViewedJob]}>
            {children}
        </ViewedJobContext.Provider>
    );
};