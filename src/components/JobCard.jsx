function JobCard({
  job,
  onApply,
  onSave,
  saved,
  applied
}) {

  return (
    <div className="job-card">

      <h3>{job.title}</h3>

      <p className="company">
        {job.company}
      </p>

      <p>
        {job.skills}
      </p>

      <p>
        📍 {job.location}
      </p>

      <p>
        💼 {job.type}
      </p>


      <div className="job-buttons">

        <button
          onClick={() => onApply(job)}
        >
          {applied ? "Applied" : "Apply"}
        </button>


        <button
          onClick={() => onSave(job)}
        >
          {saved ? "Saved" : "Save"}
        </button>

      </div>

    </div>
  );
}

export default JobCard;