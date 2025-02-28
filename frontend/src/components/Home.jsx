import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);


  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredTasks(tasks.filter((task) => task.title.toLowerCase().includes(query)));
  };


  // ดึงข้อมูล Tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks");
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  // ลบ Task
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
        setTasks(tasks.filter((task) => task.id !== id));
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const formatForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // ตัด ".SSSZ" ออกไป
  };

  // เริ่มแก้ไข Task
  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditStatus(task.status);
    setEditDueDate(formatForInput(task.due_date));
  };

  // บันทึก Task ที่แก้ไข
  const handleEditSave = async (id) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
          status: editStatus,
          due_date: editDueDate,
        }),
      });
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // แปลงวันที่ให้อ่านง่าย
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };


  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Task List</h1>
                {/* 🔹 ช่องค้นหา */}
        <div className="mb-6 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="🔍 ค้นหา Task ตามชื่อ..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-2 border rounded-lg shadow-sm"
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-600">No tasks available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div key={task.id} className="bg-white p-6 rounded-lg shadow-lg">
                {editingTask === task.id ? (
                  <>
                    {/* แบบฟอร์มแก้ไข */}
                    <input
                      type="text"
                      className="border p-2 w-full mb-2"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <textarea
                      className="border p-2 w-full mb-2"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <select
                      className="border p-2 w-full mb-2"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <input
                    type="datetime-local"
                    className="border p-2 w-full mb-2"
                    value={formatForInput(editDueDate)}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    />
                    {/* ปุ่มบันทึกและยกเลิก */}
                    <button
                      className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      onClick={() => handleEditSave(task.id)}
                    >
                      Save
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                      onClick={() => setEditingTask(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {/* แสดงข้อมูล Task */}
                    <h2 className="text-xl font-bold mb-2">{task.title}</h2>
                    <p className="text-gray-700">{task.description}</p>
                    <p className="mt-2 text-sm text-gray-600">
                      <strong>Status:</strong> {task.status}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      <strong>Due Date:</strong> {formatDate(task.due_date)}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      <strong>Created At:</strong> {formatDate(task.created_at)}
                    </p>

                    {/* ปุ่ม Edit & Delete */}
                    <button
                      className="mt-4 mr-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                      onClick={() => startEditing(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
