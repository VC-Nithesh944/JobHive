//Context for the project
//To manage all the central logic and api call in this file
import{ createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
export const AppContext = createContext();

//appContext provider function
export const AppContextProvider = (props) => {

  const [searchFilter, setSearchFilter] = useState({
    title: '',
    location: ''
  }
  )

  const [jobs,setJobs] = useState([])

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

  //Function to fetch Jobs
  const fetchJobs= async() => {
    setJobs(jobsData); {/*This will set the Jobs in state variable, later when we create backend then we will fetch the jobdata from our api */}
  };
   
  //To execute this function whenever client project gets loaded on website we use UseEffect from react

  useEffect(() => {
    fetchJobs()
  },[])


  const[isSearched, setIsSearched] = useState(false)
  const value = {
    // Add any state or functions you want to provide to access those function in entire project
    setSearchFilter, searchFilter,
    isSearched, setIsSearched,
    jobs, setJobs,
    showRecruiterLogin, setShowRecruiterLogin

  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
