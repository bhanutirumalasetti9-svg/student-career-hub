function StatCard({ number, title }) {

  return (
    <div className="card">

      <h2>{number}</h2>

      <p>{title}</p>

    </div>
  );
}

export default StatCard;