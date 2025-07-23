import React from "react";
// Importing helpful date functions from date-fns library
import {
  formatDistanceToNowStrict,
  parseISO,
  isBefore,
  differenceInDays,
} from "date-fns";

// GoalCard component receives props: goal object, onDelete handler, and onUpdate handler
function GoalCard({ goal, onDelete, onUpdate }) {
  // Destructure the goal data for easier access
  const {
    id,
    name,
    category,
    targetAmount,
    savedAmount,
    deadline,
  } = goal;

  // Calculate the progress percentage (capped at 100%)
  const progress = Math.min((savedAmount / targetAmount) * 100, 100).toFixed(0);

  // Calculate the remaining amount to reach the goal
  const remainingAmount = targetAmount - savedAmount;

  // Convert the deadline (string) into a real Date object
  const deadlineDate = parseISO(deadline);
  const today = new Date();

  // Check if the goal is completed (target met)
  const isComplete = savedAmount >= targetAmount;

  // Check if the goal is overdue and not completed
  const isOverdue = isBefore(deadlineDate, today) && !isComplete;

  // Check if the goal deadline is within the next 30 days and not complete
  const isExpiringSoon =
    differenceInDays(deadlineDate, today) <= 30 && !isComplete;

  // JSX to display each goal as a card
  return (
    <div className="goal-card" style={styles.card}>
      {/* Goal name and details */}
      <h3>{name}</h3>
      <p>
        <strong>Category:</strong> {category}
      </p>
      <p>
        <strong>Target:</strong> Ksh{targetAmount.toLocaleString()}
      </p>
      <p>
        <strong>Saved:</strong> Ksh{savedAmount.toLocaleString()}
      </p>
      <p>
        <strong>Remaining:</strong> Ksh{remainingAmount.toLocaleString()}
      </p>

      {/* Progress bar */}
      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progressFill,
            width: `${progress}%`,
            backgroundColor: isComplete ? "#4caf50" : "#2196f3",
          }}
        ></div>
      </div>
      <p>{progress}% of goal reached</p>

      {/* Deadline with time left */}
      <p>
        <strong>Deadline:</strong> {deadline} (
        {formatDistanceToNowStrict(deadlineDate)} left)
      </p>

      {/* Show a warning if overdue or almost expiring */}
      {isOverdue && <p style={styles.overdue}>⚠️ Overdue!</p>}
      {isExpiringSoon && !isOverdue && (
        <p style={styles.warning}>⏳ Deadline soon!</p>
      )}

      {/* Delete button calls the onDelete function with this goal's id */}
      <button onClick={() => onDelete(id)} style={styles.deleteBtn}>
        Delete
      </button>
    </div>
  );
}

// Styling object for inline styles (can later be moved to a CSS file)
const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "1rem",
    marginBottom: "1rem",
    maxWidth: "400px",
  },
  progressBar: {
    backgroundColor: "#eee",
    borderRadius: "6px",
    overflow: "hidden",
    height: "16px",
    margin: "0.5rem 0",
  },
  progressFill: {
    height: "100%",
    transition: "width 0.3s ease-in-out",
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "0.4rem 1rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  warning: {
    color: "#ff9800",
    fontWeight: "bold",
  },
  overdue: {
    color: "#d32f2f",
    fontWeight: "bold",
  },
};

// Export the component so it can be used in other files like Dashboard
export default GoalCard;
