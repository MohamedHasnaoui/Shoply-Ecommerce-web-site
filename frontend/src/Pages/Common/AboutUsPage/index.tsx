import React from "react";
import { User, Code, GraduationCap } from "lucide-react";
import "./style.css";
import oussama from "../../../assets/AboutUs/oussama.png";
import mohamed from "../../../assets/AboutUs/mohamed.png";
interface TeamMember {
  name: string;
  title: string;
  education: string;
  role: string;
  image?: string;
  skills?: string[];
}

const AboutUs: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Oussama Lamrabet",
      title: "FullStack Developer",
      education: "Computer Engineering Student at ENSAF",
      role: "Full Stack Developer",
      image: oussama,
      skills: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "JavaScript",
        "ASP.NET",
        "C#",
        "Java",
        "Spring Boot",
        "UML",
        "Merise",
      ],
    },
    {
      name: "Mohamed El Hasnaoui",
      title: "Full Stack Developer",
      education: "Computer Engineering Student at ENSAF",
      role: "Full Stack Developer",
      image: mohamed,
      skills: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "JavaScript",
        "ASP.NET",
        "C#",
        "Java",
        "Spring Boot",
        "UML",
        "Merise",
      ],
    },
  ];

  return (
    <div className="about-container">
      <div className="about-wrapper">
        {/* Header Section */}
        <div className="header-section">
          <div className="logo-container">
            <div className="logo-text">
              <span className="logo-green">Shop</span>
              <span className="logo-gray">ly</span>
            </div>
          </div>
          <h1 className="main-title">About Us</h1>
          <p className="main-description">
            We are passionate computer engineering students dedicated to
            creating innovative e-commerce solutions. Our team combines
            technical expertise with creative vision to build Shoply - your next
            favorite shopping platform.
          </p>
        </div>

        {/* Team Cards */}
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="card-content">
                {/* Profile Image Placeholder */}
                <div className="profile-container">
                  <div className="profile-image">
                    <img
                      src={member.image}
                      alt={`${member.name}'s profile`}
                      className="profile-img"
                    />
                  </div>
                </div>

                {/* Member Info */}
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>

                  <div className="member-title-container">
                    <Code className="title-icon" />
                    <span className="member-title">{member.title}</span>
                  </div>

                  <div className="member-education-container">
                    <GraduationCap className="education-icon" />
                    <span className="member-education">{member.education}</span>
                  </div>

                  {/* Skills/Technologies */}
                  <div className="skills-container">
                    <div className="skills-row">
                      {member.skills.map((skill) => (
                        <span key={skill} className="skill-tag skill-primary">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Accent */}
              <div className="card-accent"></div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="mission-section">
          <div className="mission-card">
            <h2 className="mission-title">Our Mission</h2>
            <p className="mission-description">
              At Shoply, we believe in creating seamless, intuitive, and
              powerful e-commerce experiences. As students at ENSAF, we're
              applying our academic knowledge to real-world challenges, building
              a platform that connects buyers and sellers in the most efficient
              way possible.
            </p>
            <div className="values-grid">
              <div className="value-item">
                <div className="value-icon">
                  <span className="emoji">🚀</span>
                </div>
                <h3 className="value-title">Innovation</h3>
                <p className="value-description">
                  Cutting-edge technology solutions
                </p>
              </div>
              <div className="value-item">
                <div className="value-icon">
                  <span className="emoji">💡</span>
                </div>
                <h3 className="value-title">Creativity</h3>
                <p className="value-description">
                  Unique approaches to common problems
                </p>
              </div>
              <div className="value-item">
                <div className="value-icon">
                  <span className="emoji">🎯</span>
                </div>
                <h3 className="value-title">Excellence</h3>
                <p className="value-description">
                  Commitment to quality and performance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
