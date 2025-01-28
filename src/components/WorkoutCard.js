import { motion } from "framer-motion";

const WorkoutCard = ({ exercise, data, updateExerciseData }) => {
  // ✅ Handle input changes safely, ensuring values remain consistent
  const handleInputChange = (field, value) => {
    let sanitizedValue = value !== undefined && value !== null ? String(value) : "";

    // ✅ Remove leading zeroes only if it's a number
    if (!isNaN(sanitizedValue) && sanitizedValue !== "") {
      sanitizedValue = sanitizedValue.replace(/^0+/, "");
    }

    updateExerciseData(exercise, field, sanitizedValue);
  };

  return (
    <motion.div
      className="workout-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <h3>{exercise}</h3>

      <div className="workout-inputs">
        {/* ✅ Completed Checkbox */}
        <label className="black-label">
          ✅ Completed:
          <input
            type="checkbox"
            checked={data?.completed || false}
            onChange={() => updateExerciseData(exercise, "completed", !data.completed)}
          />
        </label>

        {/* 🔢 Fixed Reps to 3 */}
        <p className="fixed-reps">Sets: <strong>3</strong></p>

        {/* 🏋️‍♂️ Three Weight Inputs */}
        <label className="black-label">
          ⚖️ Weight 1st Rep:
          <input
            type="number"
            value={data?.weight1 || ""}
            onChange={(e) => handleInputChange("weight1", e.target.value)}
            min="0"
          />
        </label>

        <label className="black-label">
          ⚖️ Weight 2nd Rep:
          <input
            type="number"
            value={data?.weight2 || ""}
            onChange={(e) => handleInputChange("weight2", e.target.value)}
            min="0"
          />
        </label>

        <label className="black-label">
          ⚖️ Weight 3rd Rep:
          <input
            type="number"
            value={data?.weight3 || ""}
            onChange={(e) => handleInputChange("weight3", e.target.value)}
            min="0"
          />
        </label>
      </div>
    </motion.div>
  );
};

export default WorkoutCard;