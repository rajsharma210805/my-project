import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/students";

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", course: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadStudents() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Could not load students");
      setStudents(await response.json());
      setMessage("");
    } catch {
      setMessage("Backend connect nahi ho raha. Pehle Java Spring Boot backend start karo.");
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function addStudent(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Could not add student");
      setForm({ name: "", email: "", course: "" });
      setMessage("Student successfully add ho gaya!");
      await loadStudents();
    } catch {
      setMessage("Student add nahi hua. Backend aur MySQL connection check karo.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteStudent(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Delete failed");
      setStudents((current) => current.filter((student) => student.id !== id));
      setMessage("Student delete ho gaya.");
    } catch {
      setMessage("Delete nahi hua. Backend check karo.");
    }
  }

  return (
    <main className="page">
      <header className="hero">
        <span className="badge">BEGINNER PROJECT</span>
        <h1>Student Management</h1>
        <p>React + Java Spring Boot + MySQL</p>
      </header>

      <section className="card">
        <h2>Add a student</h2>
        <form onSubmit={addStudent}>
          <label>
            Full name
            <input name="name" value={form.name} onChange={updateField} placeholder="e.g. Raj Sharma" required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={updateField} placeholder="raj@example.com" required />
          </label>
          <label>
            Course
            <input name="course" value={form.course} onChange={updateField} placeholder="e.g. CSE" required />
          </label>
          <button type="submit" disabled={loading}>{loading ? "Saving..." : "Add Student"}</button>
        </form>
        {message && <p className="message" role="status">{message}</p>}
      </section>

      <section className="card">
        <div className="list-heading">
          <h2>Students</h2>
          <button className="secondary" onClick={loadStudents} type="button">Refresh</button>
        </div>
        {students.length === 0 ? (
          <p className="empty">No students yet. Add your first student above.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Course</th><th>Action</th></tr></thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td><td>{student.name}</td><td>{student.email}</td><td>{student.course}</td>
                    <td><button className="delete" onClick={() => deleteStudent(student.id)} type="button">Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <footer>Simple college practice project</footer>
    </main>
  );
}
