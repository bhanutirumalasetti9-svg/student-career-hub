import { useState, useEffect } from "react";

import "./App.css";

import Navbar from "./components/Navbar";
import JobCard from "./components/JobCard";
import StatCard from "./components/StatCard";

import {
  jobs,
  internships,
  interviewQuestions
} from "./data/data";


function App() {

  // =========================
  // PAGE
  // =========================

  const [page, setPage] = useState("Dashboard");


  // =========================
  // SEARCH
  // =========================

  const [search, setSearch] = useState("");

  const [internshipSearch, setInternshipSearch] =
    useState("");


  // =========================
  // APPLIED JOBS
  // =========================

  const [appliedJobs, setAppliedJobs] = useState(() => {

    const saved =
      localStorage.getItem("appliedJobs");

    return saved
      ? JSON.parse(saved)
      : [];

  });


  // =========================
  // SAVED JOBS
  // =========================

  const [savedJobs, setSavedJobs] = useState(() => {

    const saved =
      localStorage.getItem("savedJobs");

    return saved
      ? JSON.parse(saved)
      : [];

  });


  // =========================
  // SAVE APPLIED JOBS
  // =========================

  useEffect(() => {

    localStorage.setItem(
      "appliedJobs",
      JSON.stringify(appliedJobs)
    );

  }, [appliedJobs]);


  // =========================
  // SAVE SAVED JOBS
  // =========================

  useEffect(() => {

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(savedJobs)
    );

  }, [savedJobs]);


  // =========================
  // APPLY FOR JOB
  // =========================

  function applyJob(job) {

    const alreadyApplied =
      appliedJobs.some(
        (item) => item.id === job.id
      );


    // Don't allow duplicate application

    if (alreadyApplied) {
      return;
    }


    // Add job to applied jobs

    setAppliedJobs([
      ...appliedJobs,
      job
    ]);

  }


  // =========================
  // SAVE / UNSAVE JOB
  // =========================

  function saveJob(job) {

    const alreadySaved =
      savedJobs.some(
        (item) => item.id === job.id
      );


    if (alreadySaved) {

      // Remove job

      setSavedJobs(
        savedJobs.filter(
          (item) => item.id !== job.id
        )
      );

    } else {

      // Add job

      setSavedJobs([
        ...savedJobs,
        job
      ]);

    }

  }


  // =========================
  // FILTER JOBS
  // =========================

  const filteredJobs =
    jobs.filter((job) =>
      job.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );


  // =========================
  // FILTER INTERNSHIPS
  // =========================

  const filteredInternships =
    internships.filter((internship) =>
      internship.title
        .toLowerCase()
        .includes(
          internshipSearch.toLowerCase()
        )
    );


  // =========================
  // CHECK SAVED
  // =========================

  function isSaved(job) {

    return savedJobs.some(
      (item) => item.id === job.id
    );

  }


  // =========================
  // CHECK APPLIED
  // =========================

  function isApplied(job) {

    return appliedJobs.some(
      (item) => item.id === job.id
    );

  }


  return (

    <div className="app">


      {/* =========================
          NAVBAR
      ========================= */}

      <Navbar
        page={page}
        setPage={setPage}
        savedCount={savedJobs.length}
      />


      {/* =========================
          DASHBOARD
      ========================= */}

      {page === "Dashboard" && (

        <main className="main">

          <div className="hero">

            <h1>
              Student Career Hub
            </h1>

            <p>
              Build your skills. Find opportunities.
              Crack your interviews.
            </p>

          </div>


          {/* Statistics */}

          <div className="cards">

            <StatCard
              number={jobs.length}
              title="Jobs"
            />


            <StatCard
              number={internships.length}
              title="Internships"
            />


            <StatCard
              number="65%"
              title="Skills Completed"
            />


            <StatCard
              number={appliedJobs.length}
              title="Applications"
            />


            <StatCard
              number={savedJobs.length}
              title="Saved Jobs"
            />

          </div>


          {/* Latest Opportunities */}

          <section className="section">

            <h2>
              Latest Opportunities
            </h2>


            <div className="opportunities">

              {jobs
                .slice(0, 3)
                .map((job) => (

                  <JobCard

                    key={job.id}

                    job={job}

                    onApply={applyJob}

                    onSave={saveJob}

                    saved={isSaved(job)}

                    applied={isApplied(job)}

                  />

                ))}

            </div>

          </section>

        </main>

      )}


      {/* =========================
          JOBS
      ========================= */}

      {page === "Jobs" && (

        <main className="main">

          <h1>
            Find Your Next Job
          </h1>


          {/* Search */}

          <input

            className="search"

            type="text"

            placeholder="Search jobs..."

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }

          />


          {/* Job Cards */}

          <div className="opportunities">

            {filteredJobs.length > 0 ? (

              filteredJobs.map((job) => (

                <JobCard

                  key={job.id}

                  job={job}

                  onApply={applyJob}

                  onSave={saveJob}

                  saved={isSaved(job)}

                  applied={isApplied(job)}

                />

              ))

            ) : (

              <div className="empty">

                <h2>
                  No jobs found
                </h2>

                <p>
                  Try searching for another role.
                </p>

              </div>

            )}

          </div>

        </main>

      )}


      {/* =========================
          INTERNSHIPS
      ========================= */}

      {page === "Internships" && (

        <main className="main">

          <h1>
            Find Internships
          </h1>


          {/* Search */}

          <input

            className="search"

            type="text"

            placeholder="Search internships..."

            value={internshipSearch}

            onChange={(e) =>
              setInternshipSearch(
                e.target.value
              )
            }

          />


          {/* Internship Cards */}

          <div className="opportunities">

            {filteredInternships.length > 0 ? (

              filteredInternships.map(
                (internship) => (

                  <JobCard

                    key={internship.id}

                    job={internship}

                    onApply={applyJob}

                    onSave={saveJob}

                    saved={isSaved(internship)}

                    applied={isApplied(internship)}

                  />

                )
              )

            ) : (

              <div className="empty">

                <h2>
                  No internships found
                </h2>

                <p>
                  Try searching for another role.
                </p>

              </div>

            )}

          </div>

        </main>

      )}


      {/* =========================
          SAVED JOBS
      ========================= */}

      {page === "Saved" && (

        <main className="main">

          <h1>
            Saved Opportunities
          </h1>


          {savedJobs.length === 0 ? (

            <div className="empty">

              <h2>
                No saved jobs yet
              </h2>

              <p>
                Save interesting opportunities
                and find them here.
              </p>

            </div>

          ) : (

            <div className="opportunities">

              {savedJobs.map((job) => (

                <JobCard

                  key={`${job.type}-${job.id}`}

                  job={job}

                  onApply={applyJob}

                  onSave={saveJob}

                  saved={true}

                  applied={isApplied(job)}

                />

              ))}

            </div>

          )}

        </main>

      )}


      {/* =========================
          SKILLS
      ========================= */}

      {page === "Skills" && (

        <main className="main">

          <h1>
            Skills Tracker
          </h1>


          <div className="skills-card">


            {/* HTML */}

            <div className="skill">

              <div>

                <span>
                  HTML
                </span>

                <span>
                  90%
                </span>

              </div>

              <progress
                value="90"
                max="100"
              />

            </div>


            {/* CSS */}

            <div className="skill">

              <div>

                <span>
                  CSS
                </span>

                <span>
                  80%
                </span>

              </div>

              <progress
                value="80"
                max="100"
              />

            </div>


            {/* JavaScript */}

            <div className="skill">

              <div>

                <span>
                  JavaScript
                </span>

                <span>
                  70%
                </span>

              </div>

              <progress
                value="70"
                max="100"
              />

            </div>


            {/* React */}

            <div className="skill">

              <div>

                <span>
                  React
                </span>

                <span>
                  60%
                </span>

              </div>

              <progress
                value="60"
                max="100"
              />

            </div>


            {/* Java */}

            <div className="skill">

              <div>

                <span>
                  Java
                </span>

                <span>
                  75%
                </span>

              </div>

              <progress
                value="75"
                max="100"
              />

            </div>


            {/* DSA */}

            <div className="skill">

              <div>

                <span>
                  DSA
                </span>

                <span>
                  65%
                </span>

              </div>

              <progress
                value="65"
                max="100"
              />

            </div>

          </div>

        </main>

      )}


      {/* =========================
          INTERVIEW
      ========================= */}

      {page === "Interview" && (

        <main className="main">

          <h1>
            Interview Practice
          </h1>


          <div className="questions">

            {interviewQuestions.map(
              (item, index) => (

                <div
                  className="question"
                  key={index}
                >

                  <h3>
                    {item.question}
                  </h3>

                  <p>
                    {item.answer}
                  </p>

                </div>

              )
            )}

          </div>

        </main>

      )}

    </div>

  );
}


export default App;