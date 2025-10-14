import React, { useEffect, useMemo, useState } from 'react'

const API = 'http://localhost:5001'
const APIFeedback = 'http://localhost:6001'
const CatalougeAPI = 'http://localhost:5401'
const EmailAPI = 'http://localhost:7474'


export default function App() {
  const [students, setStudents] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [search, setSearch] = useState('')
  const [attDate, setAttDate] = useState('')
  const [attStatus, setAttStatus] = useState('Present')
  const [coursefeedback, setCourseFeedback] = useState([])
  const [CourseID, setCourse] = useState('')
  const [Feedback, setFeedback] = useState('')
  const [section, setSection] = useState('1') //CHANGE TO SWITCH DEFAULT SITE (1 IS USUALLY DEFAULT)
  const [courseinfo, setcourseinfo] = useState([])
  const [admin, setAdmin] = useState('0')
  const [Login, setLogin] = useState('')
  const [Password, setPassword] = useState('')
  const [Code, setCode] = useState('')
  const [toAccess, settoAccess] = useState('4')

  const fetchStudents = () => {
    fetch(`${API}/students`).then(r => r.json()).then(setStudents)
  }

  const fetchfeedback = () => {
    fetch(`${APIFeedback}/coursefeedback`).then(r => r.json()).then(setCourseFeedback)
  }

  const clearAll = () => {
    setName('')
    setEmail('')
    setSearch('')
    setAttDate('')
    setAttStatus('Present')
    setCourse('')
    setFeedback('')
  }


  useEffect(() => { fetchStudents() }, [])


  useEffect(() => {
    const interval = setInterval(() => {
      fetchfeedback();
    }, 2000);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => { fetchfeedback() }, [])
  
  const filteredfeedback = useMemo(() => coursefeedback.filter(s =>
    s.CourseID.toLowerCase().includes(search.toLowerCase())
  ), [coursefeedback, search])

  const filteredfeedbackadmin = useMemo(() => coursefeedback.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.CourseID.toLowerCase().includes(search.toLowerCase())
  ), [coursefeedback, search])

  const addStudent = async () => {
    if (!name || !email) return
    const res = await fetch(`${API}/students`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ name, email })
    })
    if (res.ok) {
      setName(''); setEmail('')
      fetchStudents()
    }
  }

  const addfeedback = async () => {
    if (!name || !CourseID || !Feedback) return
    const res = await fetch(`${APIFeedback}/coursefeedback`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({name, CourseID, Feedback})
    })
    if (res.ok) {
      setName(''); setCourse(''); setFeedback('')
      fetchfeedback()   
      const res = await fetch(`${EmailAPI}/sendemail`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({name, CourseID, Feedback})
      })
      if (emailres.ok) {
      }    

    }
  }


  const setSectionCourse = async () => {
    clearAll()
    setSection('1')
  }
  const setSectionFeedback = async () => {
    clearAll()
    setSection('2')
  }
  const setSectionAttendace = async () => {
    clearAll()
    if(admin == '1'){
      setSection('3')
      settoAccess('3')
    }
    else{
      setSection('5')
    }
    
  }
  const setSectionAdminFeedback = async () => {
    clearAll()
    if(admin == '1'){
      setSection('4')
    }
    else{
      settoAccess('4')
      setSection('5')
    }
  }

  const deleteStudent = async (id) => {
    await fetch(`${API}/students/${id}`, { method: 'DELETE' })
    fetchStudents()
  }

  const addAttendance = async (id) => {
    if (!attDate) return
    await fetch(`${API}/students/${id}/attendance`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ date: attDate, status: attStatus })
    })
    setAttDate('')
    fetchStudents()
  }

  const filtered = useMemo(() => students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  ), [students, search])

  const fetchCatalouge = () => {
    fetch(`${CatalougeAPI}/catalouge`).then(r => r.json()).then(setcourseinfo)
  }
  
  useEffect(() => { fetchCatalouge() }, [])
  
  const Catalougefiltered = useMemo(() => courseinfo.filter(s =>
    s.CourseID.toLowerCase().includes(search.toLowerCase()) || s.name.toLowerCase().includes(search.toLowerCase())
  ), [courseinfo, search])

  const VerifyCredentials = async () => {
    if (!Login || !Password || !Code) return
    if(Login == "admin" && Password == "password" && Code == "123"){
      setAdmin('1')
      setSection(toAccess)
    }
  }

  const deleteFeedback = async (id) => {
    await fetch(`${APIFeedback}/coursefeedback/${id}`, { method: 'DELETE' })
    fetchfeedback()
  }


  if(section == '5'){
    return (
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ marginBottom: 8 }}>Admin Portal</h1>
        <p style={{ marginTop: 0, opacity: 0.8 }}>Admin Login Page.</p>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h2>Enter Credentials</h2>
            <input placeholder="Full name" value={Login} onChange={e=>setLogin(e.target.value)} style={{ width: '95%', padding: 8, marginBottom: 8 }} />
            <input placeholder="Password" value={Password} onChange={e=>setPassword(e.target.value)} style={{ width: '95%', padding: 8, marginBottom: 8 }} />
            <input placeholder="Security Code" value={Code} onChange={e=>setCode(e.target.value)} style={{ width: '95%', padding: 8, marginBottom: 8 }} />
            <button onClick={VerifyCredentials} style={{ padding: '8px 12px' }}>Submit Credentials</button>
            <button onClick={setSectionCourse} style={{ marginLeft: 218, padding: '8px 6px' }}>Back</button>
          </div>
        </section>
      </div>
    )
  }



  else if(section == '4'){
   return (
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
        <section style={{ display: 'grid', gridTemplateColumns: '16fr 1fr', gap: 32, marginBottom: 24 }}>
          <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <button onClick={setSectionCourse} style={{ padding: '8px 6px' }}>View Course Information</button>
              <button onClick={setSectionFeedback} style={{ marginLeft: 24, padding: '8px 6px' }}>View Student Feedback</button>
              <button onClick={setSectionAttendace} style={{ marginLeft: 24, padding: '8px 6px' }}>Manage Student Attendence Rate</button>
              <button onClick={setSectionAdminFeedback} style={{ marginLeft: 24, padding: '8px 6px' }}>Manage Student Feedback</button>
          </div>
        </section>
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
          <h2>Feedback ({filteredfeedbackadmin.length})</h2>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {filteredfeedbackadmin.map(s => (
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





  else if(section == 3){
    return (
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
        <section style={{ display: 'grid', gridTemplateColumns: '16fr 1fr', gap: 32, marginBottom: 24 }}>
          <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <button onClick={setSectionCourse} style={{ padding: '8px 6px' }}>View Course Information</button>
              <button onClick={setSectionFeedback} style={{ marginLeft: 24, padding: '8px 6px' }}>View Student Feedback</button>
              <button onClick={setSectionAttendace} style={{ marginLeft: 24, padding: '8px 6px' }}>Manage Student Attendence Rate</button>
              <button onClick={setSectionAdminFeedback} style={{ marginLeft: 24, padding: '8px 6px' }}>Manage Student Feedback</button>
          </div>
        </section>
        <h1 style={{ marginBottom: 8 }}>Admin Portal</h1>
        <p style={{ marginTop: 0, opacity: 0.8 }}>Manage students, search and record attendance.</p>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h2>Add Student</h2>
            <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} style={{ width: '95%', padding: 8, marginBottom: 8 }} />
            <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{ width: '95%', padding: 8, marginBottom: 8 }} />
            <button onClick={addStudent} style={{ padding: '8px 12px' }}>Add</button>
          </div>

          <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h2>Search</h2>
            <input placeholder="Search by name or email" value={search} onChange={e=>setSearch(e.target.value)} style={{ width: '95%', padding: 8 }} />
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
                  <div>
                    <input type="date" value={attDate} onChange={e=>setAttDate(e.target.value)} />
                    <select value={attStatus} onChange={e=>setAttStatus(e.target.value)}>
                      <option>Present</option>
                      <option>Absent</option>
                      <option>Late</option>
                      <option>Excused</option>
                    </select>
                    <button onClick={() => addAttendance(s.id)} style={{ marginLeft: 8 }}>Record</button>
                  </div>
                  <button onClick={() => deleteStudent(s.id)} style={{ background: '#ffe5e5', border: '1px solid #f5b5b5', padding: '6px 10px', borderRadius: 8 }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }




  
  else if(section == 2){
    return (
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
        <section style={{ display: 'grid', gridTemplateColumns: '16fr 1fr', gap: 32, marginBottom: 24 }}>
          <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <button onClick={setSectionCourse} style={{ padding: '8px 6px' }}>View Course Information</button>
              <button onClick={setSectionFeedback} style={{ marginLeft: 24, padding: '8px 6px' }}>View Student Feedback</button>
              <button onClick={setSectionAttendace} style={{ marginLeft: 24, padding: '8px 6px' }}>Manage Student Attendence Rate</button>
              <button onClick={setSectionAdminFeedback} style={{ marginLeft: 24, padding: '8px 6px' }}>Manage Student Feedback</button>
          </div>
        </section>
        <h1 style={{ marginBottom: 8 }}>Student Portal</h1>
        <p style={{ marginTop: 0, opacity: 0.8 }}>View and Provide course feedback.</p>
  
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h2>Add Feedback</h2>
            <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} style={{ width: '95%', padding: 8, marginBottom: 8 }} />
            <input placeholder="CourseID" value={CourseID} onChange={e=>setCourse(e.target.value)} style={{ width: '95%', padding: 8, marginBottom: 8 }} />
            <input placeholder="Feedback" value={Feedback} onChange={e=>setFeedback(e.target.value)} style={{ width: '95%', padding: 8, marginBottom: 8 }} />
            <button onClick={addfeedback} style={{ padding: '8px 12px' }}>Add</button>
          </div>
  
          <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h2>Search</h2>
            <input placeholder="Search by Course" value={search} onChange={e=>setSearch(e.target.value)} style={{ width: '95%', padding: 8 }} />
          </div>
        </section>
  
        
        <section style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2>Feedback ({filteredfeedback.length})</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {filteredfeedback.map(s => (
              <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', border: '1px solid #f2f2f2', borderRadius: 12, padding: 12 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{s.name}</div>
                  <div style={{ fontSize: 14, opacity: 0.8 }}>{s.CourseID}</div>
                  <div style={{ fontSize: 14, opacity: 0.8 }}>{s.feedback}</div>
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
         <section style={{ display: 'grid', gridTemplateColumns: '16fr 1fr', gap: 32, marginBottom: 24 }}>
          <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <button onClick={setSectionCourse} style={{ padding: '8px 6px' }}>View Course Information</button>
              <button onClick={setSectionFeedback} style={{ marginLeft: 24, padding: '8px 6px' }}>View Student Feedback</button>
              <button onClick={setSectionAttendace} style={{ marginLeft: 24, padding: '8px 6px' }}>Manage Student Attendence Rate</button>
              <button onClick={setSectionAdminFeedback} style={{ marginLeft: 24, padding: '8px 6px' }}>Manage Student Feedback</button>
          </div>
        </section>
        <h1 style={{ marginBottom: 8 }}>Course Viewer Portal</h1>
        <p style={{ marginTop: 0, opacity: 0.8 }}>View course information.</p>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h2>Search</h2>
            <input placeholder="Search by Course name or ID" value={search} onChange={e=>setSearch(e.target.value)} style={{ width: '95%', padding: 8 }} />
          </div>
        </section>

        
        <section style={{ padding: 16, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2>Course Information ({Catalougefiltered.length})</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {Catalougefiltered.map(s => (
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
}