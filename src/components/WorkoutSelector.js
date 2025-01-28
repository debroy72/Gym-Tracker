import { workouts } from "../utils/workoutData";

const WorkoutSelector = ({ selectedWorkout, setSelectedWorkout }) => {
  return (
    <div className="workout-selector">
      <label>Select Workout Day: </label>
      <select
        value={selectedWorkout}
        onChange={(e) => setSelectedWorkout(e.target.value)}
      >
        <option value="">-- Select --</option>
        {Object.keys(workouts).map((workout, index) => (
          <option key={index} value={workout}>
            {workout}
          </option>
        ))}
      </select>
    </div>
  );
};

export default WorkoutSelector;