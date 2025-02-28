import React, { useState, useEffect } from "react";
import Navbar from './Navbar.jsx'

function CreatTask() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { title, description, status, due_date: dueDate };
    
        try {
          const response = await fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
          });
    
          if (!response.ok) {
            throw new Error("Failed to create task");
          }
    
          alert("Task created successfully!");
          navigate("/"); // กลับไปหน้า Home หลังจากสร้าง Task สำเร็จ
        } catch (error) {
          console.error("Error creating task:", error);
        }
      };

  return (
    <>
    <Navbar />
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Create Task</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              className="w-full border p-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Status</label>
            <select
              className="w-full border p-2 rounded"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Due Date</label>
            <input
              type="datetime-local"
              className="w-full border p-2 rounded"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Create Task
          </button>
        </form>
      </div>
    </>
  )
}

export default CreatTask