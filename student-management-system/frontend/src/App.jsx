import { useEffect, useState } from 'react';

const API = 'http://localhost:8080/api/students';

function App() {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [message, setMessage] = useState('');

    async function loadStudents() {
        try {
            const response = await fetch(API);

            if (!response.ok) {
                throw new Error('Failed to fetch students');
            }

            const data = await response.json();
            setStudents(data);
            setMessage('');
        } catch (error) {
            setMessage('Backend connect nahi ho raha hai.');
        }
    }

    useEffect(() => {
        loadStudents();
    }, []);

    async function addStudent(event) {
        event.preventDefault();

        try {
            const response = await fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    course: course
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add student');
            }

            setName('');
            setCourse('');
            setMessage('Student successfully added!');

            await loadStudents();
        } catch (error) {
            setMessage('Student add nahi hua.');
        }
    }

    async function deleteStudent(id) {
        try {
            const response = await fetch(`${API}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete student');
            }

            setMessage('Student deleted successfully!');

            await loadStudents();
        } catch (error) {
            setMessage('Student delete nahi hua.');
        }
    }

    return (
        <div className="container">
            <h1>Student Manager</h1>

            <p>Add and manage your students.</p>

            <form onSubmit={addStudent}>
                <input
                    type="text"
                    placeholder="Student Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Course"
                    value={course}
                    onChange={(event) => setCourse(event.target.value)}
                    required
                />

                <button type="submit">
                    Add Student
                </button>
            </form>

            {message && <p>{message}</p>}

            <h2>Student List</h2>

            {students.length === 0 ? (
                <p>No students found.</p>
            ) : (
                <ul>
                    {students.map((student) => (
                        <li key={student.id}>
                            <span>
                                {student.name} - {student.course}
                            </span>

                            <button
                                className="delete"
                                onClick={() => deleteStudent(student.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;