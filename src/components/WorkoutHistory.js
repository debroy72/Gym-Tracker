const WorkoutHistory = ({ history }) => {
  console.log("📜 Workout History Data:", history); // ✅ Debugging log

  return (
    <div className="workout-history">
      <h2>📅 Workout History</h2>
      {history.length === 0 ? <p>No workouts saved yet.</p> : null}

      {history.map((entry, index) => (
        <div key={index} className="history-card">
          <h3>{entry.date} - {entry.workout}</h3>
          <ul>
            {Object.keys(entry.exercises).map((exercise, i) => {
              const exData = entry.exercises[exercise];
              console.log(`🔍 History Entry for [${exercise}]:`, exData); // ✅ Debugging log

              return (
                <li key={i}>
                  {exercise}: 
                  ✅ Completed: {exData.completed ? "✔️" : "❌"},
                  ⚖️ Weight 1: {exData.weight1 || "0"} kg,
                  ⚖️ Weight 2: {exData.weight2 || "0"} kg,
                  ⚖️ Weight 3: {exData.weight3 || "0"} kg
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WorkoutHistory;