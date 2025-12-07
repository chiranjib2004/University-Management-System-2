import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setToken, setRole }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [section, setSection] = useState("");  // For navbar content
  const [footerInfo, setFooterInfo] = useState(""); // For footer quick links content
  const navigate = useNavigate();

  const sections = {
    home: (
      <div>
        <h3>Welcome to TGI</h3>
        <p>Explore our vibrant campus, diverse communities, student clubs, and world-class teaching resources. Learn what makes us a top institution for your future.</p>
      </div>
    ),
    about: (
      <div>
        <h3>About Trident Group</h3>
        <ul>
          <li><b>Established:</b> 1994</li>
          <li><b>Accreditation:</b> NAAC A+ | NBA</li>
          <li>Our mission: Empowering students through innovative education, research, and holistic growth.</li>
          <li>Leadership, faculty, and landmark campus achievements.</li>
        </ul>
      </div>
    ),
    careers: (
      <div>
        <h3>Careers at TGI</h3>
        <ul>
          <li>Explore open positions for faculty, staff, and research assistants.</li>
          <li>Learn about internships, student placements, and industry tie-ups.</li>
          <li>Why work at Trident: Growth, community, and recognition.</li>
        </ul>
      </div>
    ),
    alumni: (
      <div>
        <h3>Alumni Network</h3>
        <ul>
          <li>Success stories and testimonials from our graduates.</li>
          <li>Alumni meetups, webinars, and mentorship programs.</li>
          <li>Stay connected & give back to your alma mater.</li>
        </ul>
      </div>
    ),
    contact: (
      <div>
        <h3>Contact & Visit Us</h3>
        <p><b>Address:</b> Trident Campus, Bhubaneswar</p>
        <p><b>Email:</b> info@trident.edu.in</p>
        <p><b>Phone:</b> +91 1234 567890</p>
        <p>Our team will assist you with admissions, campus tours, or academic inquiries.</p>
      </div>
    )
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { id, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem('student_id', res.data.id);
      setToken(res.data.token);
      setRole(res.data.role);
      setMessage("Login successful!");
      if (res.data.role === "admin") navigate("/admin-dashboard");
      else if (res.data.role === "faculty") navigate("/faculty-dashboard");
      else if (res.data.role === "student") navigate("/student-dashboard");
    } catch (err) {
      setMessage("Invalid credentials.");
    }
  }

  return (
    <div className="univ-bg">
      <header className="univ-header">
        <div className="univ-brand">
          Trident Group of Institutions
        </div>
        <nav className="univ-navbar">
          <button className={`univ-link ${section==="home"?"active":""}`} onClick={() => setSection(section==="home"?"": "home")}>Home</button>
          <button className={`univ-link ${section==="about"?"active":""}`} onClick={() => setSection(section==="about"?"":"about")}>About</button>
          <button className={`univ-link ${section==="careers"?"active":""}`} onClick={() => setSection(section==="careers"?"":"careers")}>Careers</button>
          <button className={`univ-link ${section==="alumni"?"active":""}`} onClick={() => setSection(section==="alumni"?"":"alumni")}>Alumni</button>
          <button className={`univ-link ${section==="contact"?"active":""}`} onClick={() => setSection(section==="contact"?"":"contact")}>Contact</button>
        </nav>
        {section &&
          <div className="nav-section-content" onClick={() => setSection("")}>
            {sections[section]}
            <div className="nav-close-tip">Click anywhere here to close</div>
          </div>
        }
      </header>
      <main style={{ minHeight: "calc(100vh - 128px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <form className="univ-login-card" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            className="univ-input"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
          <input
            className="univ-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="univ-btn" type="submit">Login</button>
          {message && <p className="univ-msg">{message}</p>}
        </form>
      </main>
      {/* Footer visible only on Login page */}
      <footer className="login-footer">
        <div className="footer-grid">
          <div className="footer-col">
            <h4 className="footer-title">About Us</h4>
            <p className="footer-about">
              Trident Academy of Technology is where education meets enthusiasm. With state-of-the-art labs, expert faculty,
              and strong industry partnerships, we empower students to become innovators and leaders.
            </p>
          </div>
          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links footer-links-inline">
              <li><a className={`footer-link ${footerInfo==='placements'?'active':''}`} href="#" onClick={(e)=>{e.preventDefault(); setFooterInfo(footerInfo==='placements'?'' : 'placements');}}>Placements</a></li>
              <li><a className={`footer-link ${footerInfo==='resources'?'active':''}`} href="#" onClick={(e)=>{e.preventDefault(); setFooterInfo(footerInfo==='resources'?'' : 'resources');}}>Learning Resources</a></li>
              <li><a className={`footer-link ${footerInfo==='internships'?'active':''}`} href="#" onClick={(e)=>{e.preventDefault(); setFooterInfo(footerInfo==='internships'?'' : 'internships');}}>Internships</a></li>
              <li><a className={`footer-link ${footerInfo==='hostels'?'active':''}`} href="#" onClick={(e)=>{e.preventDefault(); setFooterInfo(footerInfo==='hostels'?'' : 'hostels');}}>Hostels</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-title">Get In Touch</h4>
            <div className="footer-contact">
              <div className="contact-item">📍 F-2, Chandaka Industrial Estate, In front of Infocity, Patia, Bhubaneswar, Odisha - 751024</div>
              <div className="contact-item">✉️ <a className="footer-link" href="mailto:info@trident.ac.in">info@trident.ac.in</a></div>
              <div className="contact-item">☎️ <a className="footer-link" href="tel:+916743530517">0674-3530517</a>, <a className="footer-link" href="tel:+919861191195">9861191195</a></div>
            </div>
          </div>
        </div>
        <div className="footer-copy">© 2025 · TRIDENT ACADEMY OF TECHNOLOGY</div>
      </footer>
      {/* Floating panel for Quick Links info */}
      {footerInfo && (
        <div className="footer-flyout" role="dialog" aria-modal="false">
          <div className="flyout-header">
            <div className="flyout-title">
              {footerInfo === 'placements' && 'Placement Snapshot 2024'}
              {footerInfo === 'resources' && 'Learning Resources'}
              {footerInfo === 'internships' && 'Internship Highlights'}
              {footerInfo === 'hostels' && 'Hostel Facilities'}
            </div>
            <button className="flyout-close" onClick={()=>setFooterInfo('')} aria-label="Close">✕</button>
          </div>
          <div className="flyout-body">
            {footerInfo === 'placements' && (
              <ul>
                <li>Avg CTC: 6.8 LPA | Highest: 18.2 LPA</li>
                <li>Top Recruiters: TCS, Infosys, Capgemini, Accenture</li>
                <li>95% eligible students placed across CSE/ECE/ME</li>
              </ul>
            )}
            {footerInfo === 'resources' && (
              <ul>
                <li>Digital Library: 10,000+ e-books and journals</li>
                <li>MOOCs: Coursera, NPTEL, and edX access</li>
                <li>24x7 Labs: Coding arena and innovation hub</li>
              </ul>
            )}
            {footerInfo === 'internships' && (
              <ul>
                <li>Summer internships: 8–10 weeks with stipends</li>
                <li>Partners: DRDO, Microsoft Reactor, Local startups</li>
                <li>Credit-linked projects and live industry problems</li>
              </ul>
            )}
            {footerInfo === 'hostels' && (
              <ul>
                <li>Separate hostels for boys and girls</li>
                <li>Wi‑Fi, reading rooms, indoor games, mess with veg/non‑veg</li>
                <li>Wardens and 24x7 security</li>
              </ul>
            )}
          </div>
        </div>
      )}

      <style>
        {`
        .univ-bg {
          min-height: 100vh;
          display: flex; flex-direction: column;
          background:
            linear-gradient(rgba(38,51,99,0.89), rgba(74,93,150, 0.77)),
            url('/collegebg.jpg') center center/cover no-repeat;
        }
        .univ-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: linear-gradient(90deg, #173263 55%, #263778 90%);
          box-shadow: 0 2px 20px rgba(32,32,48,0.08);
          padding-top: 18px;
          padding-bottom: 18px;
        }
        .univ-brand {
          font-size: 2.3rem;
          font-weight: 700;
          color: #ffe082;
          letter-spacing: 2px;
          margin-bottom: 10px;
          text-align: center;
          text-shadow: 0 2px 17px #1a235e;
          font-family: 'Segoe UI', sans-serif;
        }
        .univ-navbar {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          background: rgba(41,62,120,0.13);
          border-radius: 7px;
          padding: 10px 0;
          width: 97vw;
          max-width: 790px;
          box-shadow: 0 1px 13px #2222;
        }
        .univ-link {
          background: none;
          border: none;
          color: #e1eaf7;
          font-weight: 600;
          text-decoration: none;
          font-size: 1.08rem;
          padding: 7px 22px;
          border-radius: 22px;
          transition: background 0.2s, color 0.18s;
          cursor: pointer;
        }
        .univ-link.active, .univ-link:hover {
          background: #ffe082;
          color: #173263;
        }
        .nav-section-content {
          position: relative;
          width: 100vw;
          max-width: 600px;
          background: #415785ee;
          color: #fffbe7;
          font-size: 1.06rem;
          padding: 1.4rem 2.2rem 1.7rem 2.2rem;
          border-radius: 0 0 18px 18px;
          box-shadow: 0 8px 33px #2238;
          z-index: 20;
          top: 10px;
          margin: auto;
          text-align: left;
          letter-spacing: 0.2px;
          margin-bottom: 0.9rem;
          animation: fadeInBox 0.39s;
        }
        .nav-close-tip {
          text-align: right;
          font-size: 0.94rem;
          margin-top: 0.9rem;
          color: #ffe082c9;
          cursor: pointer;
        }
        @keyframes fadeInBox {
          from { opacity: 0; transform: translateY(-10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .univ-login-card {
          background: rgba(255,255,255,0.82);
          border-radius: 19px;
          box-shadow: 0 10px 38px 0 rgba(17,38,107,0.18);
          padding: 2.7rem 2rem 2rem 2rem;
          width: 100%;
          max-width: 380px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .univ-login-card h2 {
          color: #3450a3;
          margin-bottom: 1.2rem;
          letter-spacing: 1px;
          text-align: center;
        }
        .univ-input {
          border: none;
          border-radius: 7px;
          padding: 0.95rem 1rem;
          font-size: 1.07rem;
          margin-bottom: 1.1rem;
          background: #e8eaf6;
          color: #1c2346;
          outline: none;
          box-shadow: 0 2px 12px #2223;
          transition: box-shadow .23s, background .17s;
        }
        .univ-input:focus {
          box-shadow: 0 0 0 2.5px #4271f9;
          background: #fffde7;
        }
        .univ-btn {
          background: linear-gradient(90deg,#5533d6 15%, #e478d6 60%, #ffb87b 99%);
          border: none;
          color: #fff;
          font-weight: 700;
          border-radius: 7px;
          padding: 1rem;
          font-size: 1.17rem;
          cursor: pointer;
          letter-spacing: 1px;
          margin-bottom: 0.1rem;
          box-shadow: 0 2px 13px #5e46bb77;
          transition: background 0.22s, color .19s, box-shadow .18s;
        }
        .univ-btn:hover {
          background: linear-gradient(90deg,#ffb87b,#e478d6 80%,#5533d6 99%);
          color: #292941;
          box-shadow: 0 5px 24px #5e46bb66;
        }
        .univ-msg {
          text-align: center;
          margin-top: 0.7rem;
          color: #c92020;
          font-size: 1.05rem;
          letter-spacing: 1px;
        }

        /* Footer */
        .login-footer { margin-top: auto; background: linear-gradient(180deg, #0f2646, #0d2038); color: #dce8ff; border-top: 1px solid rgba(255,255,255,0.08); padding: 36px 18px 22px 18px; position: relative; }
        .footer-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1.2fr 1.2fr 1fr; gap: 36px; align-items: start; }
        .footer-col { min-width: 240px; }
        .footer-title { color: #ffe082; font-size: 1.08rem; letter-spacing: 1px; margin: 0 0 12px 0; }
        .footer-about { line-height: 1.7; color: #e9f2ff; opacity: .95; }
        .footer-links { list-style: none; padding: 0; margin: 0; }
        .footer-links-inline { display: flex; flex-direction: column; gap: 8px; }
        .footer-link { color: #c8e1ff; text-decoration: none; padding: 8px 12px; border-radius: 8px; background: rgba(255,255,255,0.08); display: inline-block; }
        .footer-link:hover { color: #ffe082; text-decoration: underline; }
        .footer-link.active { background: rgba(255, 224, 130, 0.18); color: #ffe082; }
        .footer-copy { text-align: center; margin-top: 18px; color: #b7c9ee; font-size: 0.95rem; }
        .footer-contact .contact-item { margin-bottom: 10px; }
        .contact-social { display: flex; gap: 10px; margin-top: 10px; }
        .social-btn { width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; background: rgba(255,255,255,0.12); color: #e9f2ff; text-decoration: none; box-shadow: 0 2px 10px rgba(0,0,0,.2); }
        .social-btn:hover { background: #ffe082; color: #0f2646; }

        /* Floating quick-link panel */
        .footer-flyout { position: fixed; left: 50%; transform: translateX(-50%); bottom: 110px; width: calc(100% - 28px); max-width: 880px; background: rgba(17,30,58,0.96); color: #eaf3ff; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 18px 40px rgba(0,0,0,.35); border-radius: 14px; backdrop-filter: blur(6px); z-index: 50; animation: flyIn .22s ease-out; }
        .flyout-header { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .flyout-title { font-weight: 800; color: #ffe082; letter-spacing: .6px; }
        .flyout-close { background: transparent; border: none; color: #eaf3ff; font-size: 18px; cursor: pointer; border-radius: 6px; padding: 6px; }
        .flyout-close:hover { background: rgba(255,255,255,0.08); }
        .flyout-body { padding: 12px 18px 16px; }
        @keyframes flyIn { from { opacity: 0; transform: translate(-50%, 8px);} to { opacity: 1; transform: translate(-50%, 0);} }

        @media (max-width:650px) {
          .nav-section-content { max-width: 99vw; padding: 1.15rem 0.9rem 1.4rem 0.9rem;}
          .univ-login-card { max-width: 98vw; }
          .univ-header { padding: 13px 0; }
          .univ-brand { font-size: 1.3rem; letter-spacing: 1px; margin-bottom: 7px; }
          .univ-navbar { gap: 0.9rem; max-width: 98vw; font-size: 14px; }
          .footer-grid { grid-template-columns: 1fr; gap: 18px; }
          .footer-flyout { bottom: 130px; }
        }
        `}
      </style>
    </div>
  );
}

export default Login;
