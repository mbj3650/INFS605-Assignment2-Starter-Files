import React, { useEffect, useMemo, useState } from 'react'

const API = 'http://localhost:5401'

export default function App() {
    const [coursefeedback, setCourseFeedback] = useState([])
    const [name, setName] = useState('')
    const [CourseID, setCourse] = useState('')
    const [Description, setDescription] = useState('')
    const [Points, setPoints] = useState('')
    const [Level, setLevel] = useState('')
    const [Resources, setResources] = useState('')
    const [Semester, setSemester] = useState('')
    const [search, setSearch] = useState('')
    
    
  const fetchfeedback = () => {
    fetch(`${API}/Catalouge`).then(r => r.json()).then(setCourseFeedback)
  }

  useEffect(() => { fetchfeedback() }, [])

  const filtered = useMemo(() => coursefeedback.filter(s =>
    s.CourseID.toLowerCase().includes(search.toLowerCase())
  ), [coursefeedback, search])

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: 8 }}>Student Portal</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>View and Provide course feedback.</p>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2>Search</h2>
          <input placeholder="Search by Course" value={search} onChange={e=>setSearch(e.target.value)} style={{ width: '95%', padding: 8 }} />
        </div>
      </section>

      
      <section style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <h2>Course Information ({filtered.length})</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {filtered.map(s => (
            <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', border: '1px solid #f2f2f2', borderRadius: 12, padding: 12 }}>
              <div>
                <div style={{ fontWeight: 600 }}>{s.name}</div>
                <div style={{ fontSize: 14, opacity: 0.8 }}>{s.CourseID}</div>
                <div style={{ fontSize: 14, opacity: 0.8 }}>{s.Points}</div>
                <div style={{ fontSize: 14, opacity: 0.8 }}>{s.Level}</div>
                <div style={{ fontSize: 14, opacity: 0.8 }}>{s.Description}</div>
                <div style={{ fontSize: 14, opacity: 0.8 }}>{s.Resources}</div>
                <div style={{ fontSize: 14, opacity: 0.8 }}>{s.Semester}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}