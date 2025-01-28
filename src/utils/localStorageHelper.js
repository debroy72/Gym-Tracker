// ✅ Save Progress to LocalStorage
export const saveProgress = (data) => {
  localStorage.setItem("workoutProgress", JSON.stringify(data));
};

// ✅ Load Progress from LocalStorage
export const loadProgress = () => {
  const storedData = localStorage.getItem("workoutProgress");
  return storedData ? JSON.parse(storedData) : { history: [], bestLifts: {} };
};

// ✅ Update Best Lifts (Highest Weight for Each Exercise)
export const updateBestLifts = (workoutData) => {
  let savedProgress = loadProgress();
  if (!savedProgress.bestLifts) savedProgress.bestLifts = {};

  Object.keys(workoutData).forEach((exercise) => {
    const weights = [
      Number(workoutData[exercise].weight1 || 0),
      Number(workoutData[exercise].weight2 || 0),
      Number(workoutData[exercise].weight3 || 0),
    ];
    const maxWeight = Math.max(...weights); // Get highest weight lifted

    if (!savedProgress.bestLifts[exercise] || maxWeight > savedProgress.bestLifts[exercise]) {
      savedProgress.bestLifts[exercise] = maxWeight;
    }
  });

  saveProgress(savedProgress);
};

// ✅ Get Best Lifts Data
export const getBestLifts = () => {
  const progress = loadProgress();
  return progress.bestLifts || {};
};

// ✅ Get Workout Achievements
export const getAchievements = () => {
  const progress = loadProgress();
  let achievements = [];

  const workoutCount = progress.history ? progress.history.length : 0;

  if (workoutCount >= 10) achievements.push("🏆 10 Workouts Completed");
  if (workoutCount >= 20) achievements.push("🥇 20 Workouts Completed");
  if (Object.keys(progress.bestLifts || {}).length >= 5) achievements.push("💪 5 Exercises Tracked");
  if (Math.max(...Object.values(progress.bestLifts || { 0: 0 })) >= 100) achievements.push("🔥 100kg Lifted!");

  return achievements;
};