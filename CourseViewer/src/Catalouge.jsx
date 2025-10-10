import React, { useEffect, useMemo, useState } from 'react'

const API = 'http://localhost:5401'

export default function App() {
    const [courseinfo, setcourseinfo] = useState([])
    const [name, setName] = useState('')
    const [CourseID, setCourse] = useState('')
    const [Description, setDescription] = useState('')
    const [Points, setPoints] = useState('')
    const [Level, setLevel] = useState('')
    const [Resources, setResources] = useState('')
    const [Semester, setSemester] = useState('')
    const [search, setSearch] = useState('')
    
    
  const fetchfeedback = () => {
    fetch(`${API}/catalouge`).then(r => r.json()).then(setcourseinfo)
  }

  useEffect(() => { fetchfeedback() }, [])

  const filtered = useMemo(() => courseinfo.filter(s =>
    s.CourseID.toLowerCase().includes(search.toLowerCase()) || s.name.toLowerCase().includes(search.toLowerCase())
  ), [courseinfo, search])

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: 8 }}>Course Viewer Portal</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>View course information.</p>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2>Search</h2>
          <input placeholder="Search by Course name or ID" value={search} onChange={e=>setSearch(e.target.value)} style={{ width: '95%', padding: 8 }} />
        </div>
      </section>

      
      <section style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <h2>Course Information ({filtered.length})</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {filtered.map(s => (
            <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', border: '1px solid #f2f2f2', borderRadius: 12, padding: 12 }}>
              <div>
                <div style={{ fontWeight: 600 }}>{s.name}</div>
                <div style={{ fontSize: 14, opacity: 0.8 }}><b>Course ID:</b> {s.CourseID}</div>
                <details style={{ fontSize: 13, marginTop: 8 }}>
                <summary>Details</summary>
                <div style={{ fontSize: 14, opacity: 0.8 }}><b>Description:</b> {s.Description}</div><br></br>
                <div style={{ fontSize: 14, opacity: 0.8 }}><b>Points:</b> {s.Points}</div><br></br>
                <div style={{ fontSize: 14, opacity: 0.8 }}><b>Level:</b> {s.Level}</div><br></br>
                
                <div style={{ fontSize: 14, opacity: 0.8 }}><b>Resources:</b> {s.Resources}</div><br></br>
                <div style={{ fontSize: 14, opacity: 0.8 }}><b>When:</b> {s.Semester}</div>
                </details>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}