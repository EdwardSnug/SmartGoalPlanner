import React, { useState } from "react";

// This component lets the user create a new savings goal
function GoalForm({ onAddGoal }) {
  // Set up state for each input field in the form
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload

    // Create a new goal object
    const newGoal = {
      name,
      category,
      targetAmount: parseFloat(targetAmount), // convert string to number
      savedAmount: 0, // start with no savings
      deadline,
      createdAt: new Date().toISOString().split("T")[0], // today's date (YYYY-MM-DD)
    };

    // Pass the new goal to the parent Dashboard component
    onAddGoal(newGoal);

    // Reset the form fields after submission
    setName("");
    setCategory("");
    setTargetAmount("");
    setDeadline("");
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Add New Goal</h2>

      {/* Name input */}
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      {/* Category input */}
      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </label>

      {/* Target amount input */}
      <label>
        Target Amount:
        <input
          type="number"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          required
        />
      </label>

      {/* Deadline input */}
      <label>
        Deadline:
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </label>

      {/* Submit button */}
      <button type="submit" style={styles.button}>
        Add Goal
      </button>
    </form>
  );
}

// Basic styles using inline CSS
const styles = {
  form: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "1rem",
    margin: "1rem 0",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

// Export so it can be used in Dashboard
export default GoalForm;
