import { workouts } from "../utils/workoutData";
import WorkoutCard from "./WorkoutCard";
import { motion } from "framer-motion";

const WorkoutList = ({ selectedWorkout, workoutData, updateExerciseData, saveWorkout }) => {
  if (!selectedWorkout) return null;

  return (
    <motion.div className="workout-list">
      <h2>{selectedWorkout} Exercises</h2>
      {workouts[selectedWorkout].map((exercise) => (
        <WorkoutCard
          key={exercise}
          exercise={exercise}
          data={workoutData[exercise] || { completed: false, reps: "", weight: "" }}
          updateExerciseData={updateExerciseData}
        />
      ))}

      {/* Save Workout Button */}
      <button onClick={saveWorkout} className="save-button">
        💾 Save Workout
      </button>
    </motion.div>
  );
};

export default WorkoutList;