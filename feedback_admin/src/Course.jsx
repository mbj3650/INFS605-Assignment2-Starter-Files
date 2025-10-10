import React, { useEffect, useMemo, useState } from 'react'

const API = 'http://localhost:6001'

export default function App() {
    const [admin, setAdmin] = useState('0')
    const [coursefeedback, setCourseFeedback] = useState([])
    const [name, setName] = useState('')
    const [Password, setPassword] = useState('')
    const [search, setSearch] = useState('')
    const [Code, setCode] = useState('')
    
  const fetchfeedback = () => {
    fetch(`${API}/coursefeedback`).then(r => r.json()).then(setCourseFeedback)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchfeedback();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => { fetchfeedback() }, [])

  const VerifyCredentials = async () => {
    if (!name || !Password || !Code) return
    if(name == "admin" && Password == "password" && Code == "123"){
      setAdmin('1');
    }
  }

  const deleteFeedback = async (id) => {
    await fetch(`${API}/coursefeedback/${id}`, { method: 'DELETE' })
    fetchfeedback()
  }

  const refreshFeedback = async (id) => {
    fetchfeedback()
  }

  const filtered = useMemo(() => coursefeedback.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.CourseID.toLowerCase().includes(search.toLowerCase())
  ), [coursefeedback, search])
  if(admin == '1'){
    return (
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ marginBottom: 8 }}>Admin Portal</h1>
        <p style={{ marginTop: 0, opacity: 0.8 }}>Manage and View feedback.</p>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h2>Search</h2>
            <input placeholder="Search by Student or Course" value={search} onChange={e=>setSearch(e.target.value)} style={{ width: '95%', padding: 8 }} />
          </div>
        </section>

        
        <section style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', padding: 1 }}>
          <h2>Feedback ({filtered.length})</h2>
            <div style={{ display: 'grid', gap: 0, justifyItems: 'end' }}>
              <button onClick={refreshFeedback} style={{ background: '#f3d7bdff', border: '1px solid #d5b986ff', padding: '6px 10px', borderRadius: 10 }}>Refresh feedback</button>
            </div>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {filtered.map(s => (
              <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', border: '1px solid #f2f2f2', borderRadius: 12, padding: 12 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{s.name}</div>
                  <div style={{ fontSize: 14, opacity: 0.8 }}>{s.CourseID}</div>
                  <div style={{ fontSize: 14, opacity: 0.8 }}>{s.feedback}</div>
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
  else{
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: 8 }}>Admin Portal</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>Manage and View feedback.</p>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2>Enter Credentials</h2>
          <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 8 }} />
          <input placeholder="Password" value={Password} onChange={e=>setPassword(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 8 }} />
          <input placeholder="Security Code" value={Code} onChange={e=>setCode(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 8 }} />
          <button onClick={VerifyCredentials} style={{ padding: '8px 12px' }}>Submit Credentials</button>
        </div>
      </section>
    </div>
  )
}
}