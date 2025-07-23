import React, { useState } from "react";

// This component allows users to deposit money into an existing goal
function DepositForm({ goals, onDeposit }) {
  // State for selected goal ID and deposit amount
  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [amount, setAmount] = useState("");

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload

    // Make sure input is valid
    if (!selectedGoalId || !amount || amount <= 0) return;

    // Pass selected goal ID and deposit amount to the parent handler
    onDeposit(selectedGoalId, parseFloat(amount));

    // Reset form fields
    setSelectedGoalId("");
    setAmount("");
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Make a Deposit</h2>

      {/* Dropdown to select goal */}
      <label>
        Select Goal:
        <select
          value={selectedGoalId}
          onChange={(e) => setSelectedGoalId(e.target.value)}
          required
        >
          <option value="">-- Select a Goal --</option>
          {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.name}
            </option>
          ))}
        </select>
      </label>

      {/* Input for deposit amount */}
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="1"
        />
      </label>

      {/* Submit button */}
      <button type="submit" style={styles.button}>
        Deposit
      </button>
    </form>
  );
}

// Styling using inline styles (can be moved to CSS if preferred)
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
    backgroundColor: "#2196f3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

// Export so it can be used in Dashboard
export default DepositForm;
