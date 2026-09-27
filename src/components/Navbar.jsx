function Navbar({
  page,
  setPage,
  savedCount
}) {

  return (

    <nav className="navbar">

      <h2>CareerHub</h2>

      <div className="nav-links">

        <button
          className={page === "Dashboard" ? "active" : ""}
          onClick={() => setPage("Dashboard")}
        >
          Dashboard
        </button>


        <button
          className={page === "Jobs" ? "active" : ""}
          onClick={() => setPage("Jobs")}
        >
          Jobs
        </button>


        <button
          className={page === "Internships" ? "active" : ""}
          onClick={() => setPage("Internships")}
        >
          Internships
        </button>


        <button
          className={page === "Saved" ? "active" : ""}
          onClick={() => setPage("Saved")}
        >
          Saved ({savedCount})
        </button>


        <button
          className={page === "Skills" ? "active" : ""}
          onClick={() => setPage("Skills")}
        >
          Skills
        </button>


        <button
          className={page === "Interview" ? "active" : ""}
          onClick={() => setPage("Interview")}
        >
          Interview
        </button>

      </div>

    </nav>
  );
}

export default Navbar;