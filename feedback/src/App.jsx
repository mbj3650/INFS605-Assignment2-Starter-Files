import React, { useEffect, useMemo, useState } from 'react'

const API = 'http://localhost:5001'

export default function App() {
  const [coursefeedback, setCourseFeedback] = useState([])
  const [name, setName] = useState('')
  const [CourseID, setCourse] = useState('')
  const [search, setSearch] = useState('')
  const [feedback, setFeedback] = useState('')

  const fetchfeedback = () => {
    fetch(`${API}/coursefeedback`).then(r => r.json()).then(setCourseFeedback)
  }

  useEffect(() => { fetchfeedback() }, [])

  const addfeedback = async () => {
    if (!name || !email) return
    const res = await fetch(`${API}/coursefeedback`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ name, email })
    })
    if (res.ok) {
      setName(''); setEmail('')
      fetchfeedback()
    }
  }

  const deleteStudent = async (id) => {
    await fetch(`${API}/coursefeedback/${id}`, { method: 'DELETE' })
    fetchStudents()
  }

  const filtered = useMemo(() => students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  ), [students, search])

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: 8 }}>Admin Portal</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>Manage students, search and record attendance.</p>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2>Add Student</h2>
          <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 8 }} />
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 8 }} />
          <button onClick={addStudent} style={{ padding: '8px 12px' }}>Add</button>
        </div>

        <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2>Search</h2>
          <input placeholder="Search by name or email" value={search} onChange={e=>setSearch(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </div>
      </section>

      <section style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <h2>Students ({filtered.length})</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {filtered.map(s => (
            <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', border: '1px solid #f2f2f2', borderRadius: 12, padding: 12 }}>
              <div>
                <div style={{ fontWeight: 600 }}>{s.name}</div>
                <div style={{ fontSize: 14, opacity: 0.8 }}>{s.email}</div>
                <details style={{ marginTop: 8 }}>
                  <summary>Attendance ({(s.attendance || []).length})</summary>
                  <ul>
                    {(s.attendance || []).map((a, i) => (
                      <li key={i}>{a.date} – {a.status}</li>
                    ))}
                  </ul>
                </details>
              </div>
              <div style={{ display: 'grid', gap: 8, justifyItems: 'end' }}>
                <button onClick={() => deleteStudent(s.id)} style={{ background: '#ffe5e5', border: '1px solid #f5b5b5', padding: '6px 10px', borderRadius: 8 }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}