const teamMembers = [
  {
    name: 'Amjad Almarhej',
    role: 'Developer',
    info: 'Student at Kristianstad University, second year. Main focus in this project: Scrum Master and assisting with front-end development.',
    mail: 'amjad.almarhej0059@stud.hkr.se',
  },
  {
    name: 'Jesper Nilsson',
    role: 'Developer',
    info: 'Student at Kristianstad University, second year. Main focus in this project: Back-end development.',
    mail: 'Jesper.nilsson0205@stud.hkr.se',
  },
  {
    name: 'Besart Sadiku',
    role: 'Developer',
    info: 'Student at Kristianstad University, second year. Main focus in this project: Front-end development.',
    mail: 'besart.sadiku0032@stud.hkr.se',
  },
]

function AboutUs() {
  return (
    <div className="page">
      <h2>About Us</h2>
      <p>Här är information om teamet bakom Police Event Tracker.</p>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <div className="team-card" key={member.name}>
            <h3>{member.name}</h3>
            <span className="team-role">{member.role}</span>
            <p>{member.info}</p>
            <a href={`mailto:${member.mail}`}>{member.mail}</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AboutUs