import React, { useEffect, useState } from "react";
import GoalCard from "../components/GoalCard"; // Displays each individual goal
import GoalForm from "../components/GoalForm"; // Form to add a new goal
import DepositForm from "../components/DepositForm"; // Form to deposit money into a goal
import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../services/goalService";

const apiEndpoint = "http://localhost:3000/goals"; // Base URL for the goals API

function Dashboard() {
  // Holds all goals from the server
  const [goals, setGoals] = useState([]);

  // Fetch all goals from the db.json server when the component mounts
  useEffect(() => {
    fetch(apiEndpoint)
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error("Failed to fetch goals:", err));
  }, []);

  // Function to handle adding a new goal
  function handleAddGoal(newGoal) {
    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGoal),
    })
      .then((res) => res.json())
      .then((createdGoal) => setGoals((prev) => [...prev, createdGoal]));
  }

  // Function to handle deposits
  function handleDeposit(goalId, depositAmount) {
    const goalToUpdate = goals.find((goal) => goal.id === goalId);
    if (!goalToUpdate) return;

    const updatedSavedAmount = goalToUpdate.savedAmount + depositAmount;

    fetch(`http://localhost:3000/goals/${goalId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ savedAmount: updatedSavedAmount }),
    })
      .then((res) => res.json())
      .then((updatedGoal) => {
        // Update local state
        setGoals((prevGoals) =>
          prevGoals.map((goal) => (goal.id === goalId ? updatedGoal : goal))
        );
      });
  }

  // Overview Calculations
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const totalGoals = goals.length;
  const completedGoals = goals.filter(
    (goal) => goal.savedAmount >= goal.targetAmount
  ).length;

  return (
    <div /**style={styles.container}*/ className="container py-4">
      <h1 className="text-center text-primary mb-4">SMART Goal Planner</h1>

      {/* Overview section */}
      <section
        /*style={styles.overview}*/ className="bg-light p-4 rounded shadow-sm mb-4"
      >
        <h2>Overview</h2>
        <p>Total Goals: {totalGoals}</p>
        <p>Total Saved: Ksh{totalSaved.toLocaleString()}</p>
        <p>Goals Completed: {completedGoals}</p>
      </section>

      {/* Add new goal */}
      <div className="mb-4">
        <GoalForm onAddGoal={handleAddGoal} />
      </div>

      {/* Deposit to goals */}
      <div className="mb-4">
        <DepositForm goals={goals} onDeposit={handleDeposit} />
      </div>

      {/* List all goals */}
      <section style={styles.goalsList}>
        <h2 className="h4 mb-3">Your Goals</h2>
        <div className="row">
          {goals.map((goal) => (
            <div key={goal.id} className="col -12 col-md-6 col-lg-4 mb-4">
                <GoalCard goal={goal} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Basic layout styles
const styles = {
  container: {
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
    maxWidth: "900px",
    margin: "0 auto",
  },
  overview: {
    background: "#f4f4f4",
    padding: "1rem",
    borderRadius: "10px",
    marginBottom: "2rem",
  },
  goalsList: {
    marginTop: "2rem",
  },
};

export default Dashboard;
