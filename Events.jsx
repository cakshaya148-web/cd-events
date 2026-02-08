import React from "react";
import aiworkshop from "./photos/event1.jpg";
import event2 from "./photos/event2.jpg";
import gamenight from "./photos/event3.jpg";
import event4 from "./photos/event4.jpg";
import event5 from "./photos/event5.jpg";
import event6 from "./photos/event6.jpg";
import EventCard from "./EventCard";
import "./Events.css";

function Events() {
  const upcomingEvents = [
    {
      title: "Tech Fest 2026",
      date: "Feb 20, 2026",
      about: "Tech Fest 2026 brings together students, developers, and innovators for coding competitions, tech talks, and project showcases.",
      photo: event6, 
    },
    {
      title: "Hackathon",
      date: "March 2, 2026",
      about: "A 24-hour coding challenge where teams build innovative projects, solve real-world problems, and compete for exciting prizes.",
      photo: event2,
    },
    {
      title: "AI Workshop",
      date: "March 18, 2026",
      about: "Hands-on workshop covering Machine Learning basics, AI tools, and real-world project implementation using Python.",
      photo: aiworkshop,
    }
  ];

  const pastEvents = [
    {
      title: "Web Dev Bootcamp",
      date: "Jan 2026",
      about: "Intensive training on modern web technologies including React, Tailwind CSS, and backend integration.",
      photo: event4,
    },
    {
      title: "Club Meetup",
      date: "Dec 2025",
      about: "Networking session for members to share ideas, collaborate on projects, and discuss upcoming tech activities.",
      photo: event5,
    },
    {
      title: "Gaming Night",
      date: "Nov 2025",
      about: "Fun gaming event with multiplayer competitions, team battles, and interactive entertainment for students.",
      photo: gamenight,
    }
  ];

  return (
    <div className="events-page">
      {/* YELLOW HEADER BANNER */}
      <header className="events-header-banner">
        <h1>Events</h1>
        <p>Explore our upcoming and past events</p>
      </header>

      <div className="events-container">
        
        <div className="events-grid">
          {upcomingEvents.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>

        <h1 className="section-title">Past Events</h1>
        <div className="events-grid">
          {pastEvents.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;