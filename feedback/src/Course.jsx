import React, { useEffect, useMemo, useState } from 'react'

const API = 'http://localhost:6001'

export default function App() {
    const [coursefeedback, setCourseFeedback] = useState([])
    const [name, setName] = useState('')
    const [CourseID, setCourse] = useState('')
    const [search, setSearch] = useState('')
    const [Feedback, setFeedback] = useState('')

  const fetchfeedback = () => {
    fetch(`${API}/coursefeedback`).then(r => r.json()).then(setCourseFeedback)
  }

  useEffect(() => { fetchfeedback() }, [])

  const addfeedback = async () => {
    if (!name || !CourseID || !Feedback) return
    const res = await fetch(`${API}/coursefeedback`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({name, CourseID, Feedback})
    })
    if (res.ok) {
      setName(''); setCourse(''); setFeedback('')
      fetchfeedback()
    }
  }

  const deleteFeedback = async (id) => {
    await fetch(`${API}/coursefeedback/${id}`, { method: 'DELETE' })
    fetchfeedback()
  }

  const filtered = useMemo(() => coursefeedback.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.CourseID.toLowerCase().includes(search.toLowerCase())
  ), [coursefeedback, search])

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: 8 }}>Admin Portal</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>Manage and View feedback.</p>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2>Add Feedback</h2>
          <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 8 }} />
          <input placeholder="CourseID" value={CourseID} onChange={e=>setCourse(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 8 }} />
          <input placeholder="Feedback" value={Feedback} onChange={e=>setFeedback(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 8 }} />
          <button onClick={addfeedback} style={{ padding: '8px 12px' }}>Add</button>
        </div>

        <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2>Search</h2>
          <input placeholder="Search by Course" value={search} onChange={e=>setSearch(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </div>
      </section>

      
      <section style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <h2>Feedback ({filtered.length})</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {filtered.map(s => (
            <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', border: '1px solid #f2f2f2', borderRadius: 12, padding: 12 }}>
              <div>
                <div style={{ fontWeight: 600 }}>{s.name}</div>
                <div style={{ fontSize: 14, opacity: 0.8 }}>{s.CourseID}</div>
                <div style={{ fontSize: 14, opacity: 0.8 }}>{s.Feedback}</div>
              </div>
              <div style={{ display: 'grid', gap: 8, justifyItems: 'end' }}>
                <button onClick={() => deleteFeedback(s.id)} style={{ background: '#ffe5e5', border: '1px solid #f5b5b5', padding: '6px 10px', borderRadius: 8 }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}