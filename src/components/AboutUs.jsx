import { useState } from 'react'

const teamMembers = [
  {
    name: 'Amjad Almarhej',
    role: 'Developer',
    info: 'Information om Amjad kommer här.',
    mail: 'amjad.almarhej0059@stud.hkr.se',
  },
  {
    name: 'Jesper Nilsson',
    role: 'Developer',
    info: 'Information om Jesper kommer här.',
    mail: 'Jesper.nilsson0205@stud.hkr.se',
  },
  {
    name: 'Besart Sadiku',
    role: 'Developer',
    info: 'Information om Besart kommer här.',
    mail: 'besart.sadiku0032@stud.hkr.se',
  },
]

function AboutUs() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="page">
      <h2>About Us</h2>
      <p>Här är information om teamet bakom Police Event Tracker.</p>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <div
            className="team-card"
            key={member.name}
            onClick={() => setSelected(member)}
          >
            <h3>{member.name}</h3>
            <span className="team-role">{member.role}</span>
            <p>{member.info}</p>
            <a href={`mailto:${member.mail}`}>{member.mail}</a> 

            
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>{selected.name}</h3>
            <span className="team-role">{selected.role}</span>
            <p>{selected.info}</p>
            <a href={`mailto:${selected.mail}`}>{selected.mail}</a>
            <button className="modal-close" onClick={() => setSelected(null)}>
              Stäng
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AboutUs