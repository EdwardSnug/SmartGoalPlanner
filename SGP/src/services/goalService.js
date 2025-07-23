//This page handles the logic for the goal service, which includes creating, updating, and deleting goals.

// src/services/goalService.js

const apiEndpoint = "http://localhost:3000/goals";

async function getGoals() {
  const res = await fetch(apiEndpoint);
  if (!res.ok) throw new Error("Failed to fetch goals.");
  return res.json();
}

async function createGoal(goal) {
  const res = await fetch(apiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  });
  if (!res.ok) throw new Error("Failed to create goal.");
  return res.json();
}

async function updateGoal(id, updates) {
  const res = await fetch(`${apiEndpoint}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update goal.");
  return res.json();
}

async function deleteGoal(id) {
  const res = await fetch(`${apiEndpoint}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete goal.");
}

export { getGoals, createGoal, updateGoal, deleteGoal };
