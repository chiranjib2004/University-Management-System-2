import React from "react";
import "./FormPageStyles.css";
function Examination() {
  return (
    <div className="form-bg">
      <div className="form-card">
        <h2>Examination Panel</h2>
        <form>
          <div className="form-row">
            <div className="form-group"><label>Exam Name:</label><input type="text" className="form-input" /></div>
            <div className="form-group"><label>Date:</label><input type="date" className="form-input" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Branch:</label>
              <select className="form-input"><option>Select</option><option>CSE</option><option>ECE</option><option>EEE</option><option>ME</option><option>Civil</option></select>
            </div>
            <div className="form-group"><label>Semester:</label>
              <select className="form-input"><option>Select</option><option>I</option><option>II</option><option>III</option><option>IV</option><option>V</option><option>VI</option><option>VII</option><option>VIII</option></select>
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="form-btn submit">Schedule</button>
            <button type="reset" className="form-btn cancel">Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Examination;
