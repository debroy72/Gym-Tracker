import { useState, useEffect } from "react";
import WorkoutSelector from "../components/WorkoutSelector";
import WorkoutList from "../components/WorkoutList";
import WorkoutHistory from "../components/WorkoutHistory";
import ProgressChart from "../components/ProgressChart";
import {
  saveProgress,
  loadProgress,
  updateBestLifts,
  getBestLifts,
  getAchievements
} from "../utils/localStorageHelper";
import { motion } from "framer-motion";

const Dashboard = ({ onLogout }) => {
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [workoutData, setWorkoutData] = useState({});
  const [history, setHistory] = useState([]);
  const [bestLifts, setBestLifts] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [showProgress, setShowProgress] = useState(false);

  // ✅ Load saved progress & achievements on mount & when workout selection changes
  useEffect(() => {
    const savedData = loadProgress() || {};
    console.log("📂 Loaded Saved Data from LocalStorage:", savedData);

    if (selectedWorkout) {
      const workoutEntries = savedData[selectedWorkout] || {};
      console.log("🔄 Setting Workout Data for:", selectedWorkout, workoutEntries);

      setWorkoutData((prevData) => ({
        ...prevData,
        ...workoutEntries, // ✅ Merge previous & saved data
      }));
    }

    setHistory(savedData.history || []);
    setBestLifts(getBestLifts());
    setAchievements(getAchievements());
  }, [selectedWorkout]);

  // ✅ Update Exercise Data & Prevent Unnecessary Overrides
  const updateExerciseData = (exercise, field, value) => {
    const stringValue = value !== undefined && value !== null ? String(value).replace(/^0+/, "") : "";
  
    setWorkoutData((prev) => {
      const updatedData = {
        ...prev,
        [exercise]: {
          ...prev[exercise],
          weight1: prev[exercise]?.weight1 || "",
          weight2: prev[exercise]?.weight2 || "",
          weight3: prev[exercise]?.weight3 || "",
          [field]: stringValue, 
        },
      };
  
      console.log(`✏️ Updated Workout Data for ${exercise} - ${field}:`, updatedData);
      return updatedData;
    });
  };

  // ✅ Save Workout & Ensure Data is Stored Correctly
  const saveWorkout = () => {
    const date = new Date().toLocaleDateString();
    console.log("💾 Saving Workout for Date:", date);

    const cleanedExercises = JSON.parse(JSON.stringify(workoutData));
    console.log("📊 Final Workout Data Before Saving:", cleanedExercises);

    // ✅ Update Best Lifts
    updateBestLifts(cleanedExercises);
    setBestLifts(getBestLifts());

    // ✅ Update Achievements
    const updatedAchievements = getAchievements();
    setAchievements(updatedAchievements);

    const updatedHistory = [
      { date, workout: selectedWorkout, exercises: cleanedExercises },
      ...history,
    ];

    const allProgress = loadProgress() || {};
    allProgress.history = updatedHistory;
    allProgress[selectedWorkout] = cleanedExercises;
    saveProgress(allProgress);

    setHistory(updatedHistory);
    console.log("✅ Final History Saved to LocalStorage:", updatedHistory);
    alert("Workout Saved! 🎉");
  };

  // ✅ Reset all workout history and progress
  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      localStorage.clear();
      setHistory([]);
      setWorkoutData({});
      setBestLifts({});
      setAchievements([]);
      console.log("🚨 All Progress Reset!");
      alert("All progress has been reset! 🗑️");
    }
  };

  return (
    <motion.div className="dashboard">
      <div className="dashboard-header">
        <h1>🏋️‍♂️ GYM WORKOUT TRACKER</h1>
        <button className="logout-button" onClick={onLogout}>🚪 Logout</button>
      </div>

      <WorkoutSelector selectedWorkout={selectedWorkout} setSelectedWorkout={setSelectedWorkout} />

      <WorkoutList
        selectedWorkout={selectedWorkout}
        workoutData={workoutData}
        updateExerciseData={updateExerciseData}
        saveWorkout={saveWorkout}
      />

      <WorkoutHistory history={history} />

      {/* 📊 Best Lifts Section */}
      <div className="best-lifts">
        <h2>🏆 Best Lifts</h2>
        {Object.keys(bestLifts).length > 0 ? (
          <ul>
            {Object.keys(bestLifts).map((exercise, index) => (
              <li key={index}>
                {exercise}: {bestLifts[exercise]} kg
              </li>
            ))}
          </ul>
        ) : (
          <p>No best lifts recorded yet.</p>
        )}
      </div>

      {/* 🎖 Achievements Section */}
      <div className="achievements">
        <h2>🎖 Achievements</h2>
        {achievements.length > 0 ? (
          <ul>
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        ) : (
          <p>No achievements unlocked yet.</p>
        )}
      </div>

      <button className="progress-toggle" onClick={() => setShowProgress(!showProgress)}>
        {showProgress ? "Hide Progress 📉" : "Show Progress 📈"}
      </button>

      {showProgress && <ProgressChart />}

      <button className="reset-button" onClick={resetProgress}>Reset Progress 🗑️</button>
    </motion.div>
  );
};

export default Dashboard;