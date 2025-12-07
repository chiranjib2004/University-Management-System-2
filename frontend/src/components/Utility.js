import React, { useState } from "react";
import "./FormPageStyles.css";

function Utility() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const [note, setNote] = useState("");

  // Calculator buttons
  const buttons = [
    "7","8","9","/",
    "4","5","6","*",
    "1","2","3","-",
    "0",".","=","+"
  ];

  function handleCalcClick(val) {
    if(val === "=") {
      try {
        // eslint-disable-next-line
        setResult(eval(calc).toString());
        setCalc("");
      } catch {
        setResult("Err");
        setCalc("");
      }
    } else if(val === "C") {
      setCalc(""); setResult("");
    } else if(val === "←") {
      setCalc(prev => prev.slice(0, -1));
    } else {
      setCalc(prev => prev + val);
    }
  }

  return (
    <div className="form-bg">
      <div className="form-card utility-page-flex">
        <div className="utility-tool card-block calc-block">
          <h2>Calculator</h2>
          <input
            type="text"
            className="form-input calc-input"
            value={calc}
            placeholder="0"
            readOnly
          />
          <div className="calc-result">{result !== "" ? result : "\u00A0"}</div>
          <div className="calc-keypad">
            {buttons.map((btn, i) =>
              <button key={i} className={btn==="="? "form-btn submit calc-equal" : "form-btn calc-btn"}
                onClick={e => {e.preventDefault(); handleCalcClick(btn);}}>
                {btn}
              </button>
            )}
            <button className="form-btn cancel calc-btn" onClick={e => {e.preventDefault(); handleCalcClick("C");}}>C</button>
            <button className="form-btn calc-btn" onClick={e => {e.preventDefault(); handleCalcClick("←");}}>←</button>
          </div>
        </div>
        <div className="utility-tool card-block notepad-block">
          <h2>Notepad</h2>
          <textarea
            rows={13}
            className="form-input notepad-text"
            placeholder="Type your notes here..."
            value={note}
            onChange={e => setNote(e.target.value)}
          />
        </div>
      </div>
      <style>
      {`
      .utility-page-flex {
        display: flex;
        gap: 2.3rem;
        align-items: flex-start;
        justify-content: center;
        padding-bottom: 1.7rem;
      }
      .card-block {
        background: rgba(25,35,60,.27);
        border-radius: 16px;
        padding: 2.2rem 1.25rem 1.4rem 1.25rem;
        box-shadow: 0 4px 22px #17326318;
        min-width: 315px;
        min-height: 400px;
      }
      .calc-block {
        width: 340px; min-width:320px; max-width:410px;
      }
      .notepad-block {
        flex: 1;
        min-width: 380px;
      }
      .calc-input, .notepad-text {
        background: #232434;
        color: #e1eaf7;
        font-size: 1.21rem;
        margin-bottom: 0.7rem;
        border-radius: 9px;
        border: none;
        margin-top: 0.1rem;
      }
      .calc-input { text-align: right; font-weight: 600; box-shadow: 0; }
      .calc-result {
        text-align: right; color: #ffe082; font-size: 1.13rem;
        min-height: 20px; margin-bottom: 12px; font-weight: 700;
      }
      .calc-keypad {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.5rem 0.4rem;
      }
      .calc-btn, .calc-equal {
        padding: 0.5rem 0.3rem;
        font-size: 1.16rem;
        min-width: 0;
        margin: 0;
        border-radius: 8px;
        font-weight: 600;
        letter-spacing: .7px;
        background: linear-gradient(90deg,#0e2545 66%,#ffb87b 100%);
        color: #ffe082;
        transition: background 0.18s, color 0.19s;
      }
      .calc-btn:hover { background: #3450a3; color: #fff;}
      .calc-equal {
        background: linear-gradient(90deg,#ffb87b 62%,#3450a3 91%);
        color: #232432;
        grid-column: 4;
        font-weight: 700;
      }
      .calc-equal:hover { background: #ffc86d; color: #0e2545;}
      .notepad-block h2 {
        text-align: left !important;
        color: #ffe082;
        font-size: 1.34rem;
        margin-bottom: 0.44rem;
      }
      .notepad-text {
        min-height:220px;
        height: 330px;
        resize: vertical;
        font-size: 1.14rem;
        border-radius: 8px;
      }
      .utility-tool h2 { color: #ffe082; letter-spacing: 1.1px; margin-bottom: 18px; text-align: center;}
      @media (max-width: 1050px) {
        .utility-page-flex { flex-direction: column; gap:1.7rem;}
        .card-block { min-width: 230px; }
      }
      `}
      </style>
    </div>
  );
}

export default Utility;
