// import React, { useState, useEffect, useRef } from "react";
// import "./tailwind.css";
// import db, { firestore } from "./firebase";
// import { getDoc, doc } from "firebase/firestore";
// import { useGlobalState } from "./state";
// import mixpanel from "./mixpanel.js";
// import JobListFilter from "./JobListFilter";
// import JobItem from "./JobItem";
// import UserDashboard from "./UserDashboard";
// import SearchBar from "./SearchBar";
// import { JobType, JobTypeTitle } from "./JobType";
//
// import { fetchJobsData, calculatePostTime } from "./Job";
//
// const JobList = ({ InternPage, jobType }) => {
//     const loadPreferences = (key, defaultValue) => {
//         const savedValue = localStorage.getItem(key);
//         return savedValue !== null ? JSON.parse(savedValue) : defaultValue;
//     };
//     const storageKey = `JobFilters-${jobType}`;
//
//     const [country, setCountry] = useState(
//         loadPreferences(`${storageKey}-country`, null)
//     );
//     const [rangeYoeValue, setRangeYoeValue] = useState(
//         loadPreferences(`${storageKey}-rangeYoeValue`, 1)
//     );
//
//     const fetched = useRef(false); // <-- define a ref
//
//     const [searchResults, setSearchResults] = useState([]);
//     const [searchHasNextPage, setSearchResultHasNextPage] = useState(true); //this variable is for es
//     const searchBarRef = useRef(null);
//
//     // const [country, setCountry] = useState(null);
//     // const [rangeYoeValue, setRangeYoeValue] = useState(1);
//     const [userSelectedCompanies, setUserSelectedCompanies] = useState([]);
//     const [hasMoreJobs, setHasMoreJobs] = useState(true);
//     const [pageNumber, setPageNumber] = useState(1);
//
//     const [currentPage, setCurrentPage] = useState(1);
//
//     const [isLoading, setIsLoading] = useState(false);
//     const [companyH1BMap, setCompanyH1BMap] = useState(null);
//     const [searchPageFrom, setSearchPageFrom] = useState(0);
//
//     const [sponsorH1BStatuses, setSponsorH1BStatuses] = useState({});
//
//     const userID = useGlobalState("user_id");
//
//     const PAGE_SIZE = 20;
//
//     const updateFilters = (country, rangeYoeValue) => {
//         setCountry(country);
//         setRangeYoeValue(rangeYoeValue);
//         fetched.current = false; // Reset the fetched flag
//     };
//
//     const getSeniority = (yoe) => {
//         if (InternPage) return "intern";
//         else {
//             if (rangeYoeValue == 4) {
//                 return 5;
//             }
//             return Number(yoe);
//         }
//     };
//
//     const CompanyH1BBefore = (company_name) => {
//         if (
//             companyH1BMap &&
//             companyH1BMap.company_map &&
//             companyH1BMap.company_map[company_name]
//         ) {
//             return companyH1BMap.company_map[company_name]["sponsored_h1b_before"];
//         } else return null;
//     };
//
//     const GetJobCategory = () => {
//         const jobTypeValue = jobType; // replace this with the actual jobType value you have in your component's state or props
//         let job_category;
//         if (jobTypeValue === 1 || jobTypeValue === 2) {
//             job_category = 0;
//         } else if (jobTypeValue === 3 || jobTypeValue === 4) {
//             job_category = 1;
//         }
//         return job_category;
//     };
//
//     const [displayedJobs, setDisplayedJobs] = useState([]);
//     const [fetchedJobs, setFetchedJobs] = useState([]);
//
//     useEffect(() => {
//         const fetchCompanyData = async () => {
//             const CompanyMapRef = doc(db, "all_companies", "company_map");
//
//             const MapSnap = await getDoc(CompanyMapRef);
//
//             if (MapSnap.exists()) {
//                 setCompanyH1BMap(MapSnap.data());
//             } else {
//                 console.log("No such document!");
//             }
//         };
//
//         fetchCompanyData();
//     }, []);
//
//     useEffect(() => {
//         // Reset fetched flag when country or rangeYoeValue changes
//         fetched.current = false;
//     }, [country, rangeYoeValue]);
//
//     useEffect(() => {
//         if (fetched.current) return;
//
//         const sortJobs = (jobs) => {
//             return jobs.sort((a, b) => {
//                 if (a.days === b.days) {
//                     return a.company < b.company ? -1 : 1;
//                 }
//                 return a.days - b.days;
//             });
//         };
//
//         const fetchData = async () => {
//             if (searchResults.length) return;
//             try {
//                 setIsLoading(true);
//
//                 let job_category = GetJobCategory();
//
//                 const data = await fetchJobsData({
//                     location: country,
//                     yoe_less_than: getSeniority(rangeYoeValue),
//                     page_number: currentPage,
//                     company: userSelectedCompanies,
//                     job_category: job_category,
//                 });
//
//                 const jobsWithPostTime = data.map((job) => {
//                     const { days, postTime, formattedDate } = calculatePostTime(
//                         job.date_added
//                     );
//                     return { id: job.job_id, ...job, days, postTime, formattedDate };
//                 });
//
//                 const sortedJobs = sortJobs(jobsWithPostTime);
//
//                 setFetchedJobs(sortedJobs);
//                 setDisplayedJobs(sortedJobs);
//                 setIsLoading(false);
//
//                 setHasMoreJobs(data.length >= PAGE_SIZE);
//             } catch (error) {
//                 console.error("Error fetching job data:", error);
//                 setIsLoading(false);
//             }
//         };
//
//         fetchData();
//         fetched.current = true;
//     }, [rangeYoeValue, country, userSelectedCompanies]);
//
//     // const getSeniority
//
//     const loadMoreJobs = async () => {
//         try {
//             setIsLoading(true);
//             mixpanel.track("Load More");
//
//             setCurrentPage((prevPage) => prevPage + 1);
//             if (searchResults.length) {
//                 mixpanel.track("Search Load More");
//                 setSearchPageFrom((prevFrom) => prevFrom + PAGE_SIZE);
//                 // console.log("searchPageFrom", searchPageFrom);
//                 await searchBarRef.current.searchAgain();
//                 setIsLoading(false);
//             } else {
//                 // console.log("loading firebase jobs");
//                 let job_category = GetJobCategory();
//
//                 const additionalJobs = await fetchJobsData({
//                     location: country,
//                     yoe_less_than: getSeniority(rangeYoeValue),
//                     page_number: currentPage + 1, // Fetch the next page
//                     company: userSelectedCompanies,
//                     job_category: job_category,
//                 });
//
//                 const jobsWithPostTime = additionalJobs.map((job) => {
//                     const { days, postTime, formattedDate } = calculatePostTime(
//                         job.date_added
//                     );
//                     return { id: job.job_id, ...job, days, postTime, formattedDate };
//                 });
//
//                 // Append the new jobs to the existing jobs
//                 setFetchedJobs((prevJobs) => [...prevJobs, ...jobsWithPostTime]);
//                 setDisplayedJobs((prevJobs) => [...prevJobs, ...jobsWithPostTime]);
//                 setIsLoading(false);
//             }
//         } catch (error) {
//             console.error("Error fetching more jobs:", error);
//             setIsLoading(false);
//         }
//     };
//
//     useEffect(() => {
//         setSearchPageFrom(0);
//     }, [rangeYoeValue, country]);
//
//     useEffect(() => {
//         if (searchResults.length) {
//             setDisplayedJobs(searchResults);
//
//             // console.log(searchResults);
//         } else {
//             setDisplayedJobs(fetchedJobs);
//             setSearchPageFrom(0); // Reset the 'from' value when switching back to regular fetched jobs
//         }
//     }, [searchResults, fetchedJobs]);
//
//     return (
//         <div className="max-w-4xl mx-auto">
//             <div className="mb-10">
//                 <div>
//                     <h3 className="text-3xl font-semibold text-gray-900 dark:text-white py-3">
//                         💻 {JobTypeTitle[jobType]}
//                     </h3>
//                 </div>
//             </div>
//             <UserDashboard />
//             {(jobType === 2 || jobType === 1) && (
//                 <SearchBar
//                     ref={searchBarRef}
//                     onSearchResults={(results) => setSearchResults(results)}
//                     yoe={getSeniority(rangeYoeValue)}
//                     pageSize={PAGE_SIZE}
//                     location={country}
//                     from={searchPageFrom}
//                     setHasNextPage={setSearchResultHasNextPage}
//                 />
//             )}
//
//             <JobListFilter
//                 InternPage={InternPage}
//                 PMPage={GetJobCategory() === 1}
//                 updateFilters={(country, rangeYoeValue) => {
//                     setCountry(country);
//                     setRangeYoeValue(rangeYoeValue);
//                     // rest of the logic
//                 }}
//                 country={country}
//                 setCountry={setCountry}
//                 rangeYoeValue={rangeYoeValue}
//                 setRangeYoeValue={setRangeYoeValue}
//                 JobType={jobType}
//             />
//
//             {Array.isArray(displayedJobs) &&
//                 displayedJobs.map((job, index) => (
//                     <div key={job.id}>
//                         {/* larger screen */}
//                         <JobItem
//                             job={job}
//                             isSponsorH1B={
//                                 sponsorH1BStatuses[job.id] ?? CompanyH1BBefore(job.company)
//                             }
//                             setIsSponsorH1B={(value) => {
//                                 setSponsorH1BStatuses((prev) => ({
//                                     ...prev,
//                                     [job.id]: value,
//                                 }));
//                             }}
//                             firstOne={index === 0}
//                             InternPage={InternPage}
//                             todayLast={job.days === 0 && displayedJobs[index + 1]?.days >= 1}
//                             PMPage={GetJobCategory() === 1}
//                         />
//                     </div>
//                 ))}
//
//             {!isLoading && searchHasNextPage && (
//                 <div>
//                     <button
//                         className="mt-10 py-2 px-3 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
//                         onClick={loadMoreJobs}
//                     >
//                         Load More
//                     </button>
//                 </div>
//             )}
//             {isLoading && (
//                 <div role="status" className="flex items-center justify-center n">
//                     <svg
//                         aria-hidden="true"
//                         className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
//                         viewBox="0 0 100 101"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <path
//                             d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//                             fill="currentColor"
//                         />
//                         <path
//                             d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//                             fill="currentFill"
//                         />
//                     </svg>
//                     <span className="sr-only">Loading...</span>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default JobList;
