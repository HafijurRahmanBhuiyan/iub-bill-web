import { useState } from "react";

const BillingStatement = ({ copy }) => {
  const courses = [
    { id: "(A) LAW415", section: "1", name: "Law of Evidence - II", credit: 3, time: "16:20-17:50", days: "MW", room: "MK4006" },
    { id: "(A) LAW417", section: "2", name: "International Law", credit: 3, time: "14:40-16:10", days: "ST", room: "C5003" },
    { id: "(A) LAW418", section: "1", name: "Legal Drafting and Conveyancing - I", credit: 3, time: "13:00-14:30", days: "MW", room: "BC4011" },
    { id: "(A) LAW419", section: "2", name: "Legal Drafting and Conveyancing - II", credit: 3, time: "09:40-11:10", days: "ST", room: "C4004" },
    { id: "(A) LAW420", section: "2", name: "Advocacy Skills (Criminal)", credit: 3, time: "13:00-14:30", days: "ST", room: "C5002" },
    { id: "(A) LAW421", section: "1", name: "Advocacy Skills (Civil)", credit: 3, time: "08:00-09:30", days: "ST", room: "C2007" },
  ];

  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      fontSize: "11px",
      border: "1px solid #000",
      padding: "10px 14px",
      marginBottom: "0",
      pageBreakAfter: "always",
      backgroundColor: "#fff",
      width: "750px",
    }}>
      {/* Header */}
      <div style={{ position: "relative", marginBottom: "4px" }}>
        {/* Grey "Student Copy / Bank Copy" box — top right */}
        <div style={{
          position: "absolute",
          top: "0",
          right: "0",
          backgroundColor: "#888",
          color: "#000",
          fontWeight: "bold",
          fontSize: "13px",
          padding: "3px 14px",
        }}>{copy}</div>

        {/* Left-aligned header text */}
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: "13px", fontWeight: "bold" }}>Independent University, Bangladesh</div>
          <div style={{ fontSize: "11px", fontWeight: "bold" }}>REGISTRAR'S OFFICE</div>
          <div style={{ fontSize: "11px", fontWeight: "bold" }}>Course Registration Billing Statement</div>
          <div style={{ fontSize: "11px", fontWeight: "bold" }}>Registration Autumn, 2025</div>
          <div style={{ fontSize: "11px", fontWeight: "bold" }}>Undergraduate</div>
        </div>
      </div>

      {/* Student Info Grid */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "4px", fontSize: "11px" }}>
        <tbody>
          <tr>
            <td style={{ width: "80px", fontWeight: "bold" }}>Student ID:</td>
            <td style={{ width: "150px" }}>2220488</td>
            <td style={{ width: "110px", fontWeight: "bold" }}>Transaction No:</td>
            <td>222048801082076</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Student Name:</td>
            <td>Sharmin Mostarin</td>
            <td style={{ fontWeight: "bold" }}>Bill No:</td>
            <td>125121598</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Major:</td>
            <td>Law</td>
            <td style={{ fontWeight: "bold" }}>Registration Date:</td>
            <td>16-Jul-2025 10:07 AM</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Advisor:</td>
            <td>Zahidul Islam</td>
            <td style={{ fontWeight: "bold" }}>Print Date:</td>
            <td>16-Jul-2025 01:07 PM</td>
          </tr>
        </tbody>
      </table>

      {/* Course Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "4px", fontSize: "11px" }}>
        <thead>
          <tr style={{ backgroundColor: "#d0d0d0" }}>
            <th style={{ border: "1px solid #000", padding: "3px 5px", textAlign: "left" }}>COURSE ID</th>
            <th style={{ border: "1px solid #000", padding: "3px 5px", textAlign: "center" }}>SECTION</th>
            <th style={{ border: "1px solid #000", padding: "3px 5px", textAlign: "left" }}>COURSE NAME</th>
            <th style={{ border: "1px solid #000", padding: "3px 5px", textAlign: "center" }}>CREDIT HOUR</th>
            <th style={{ border: "1px solid #000", padding: "3px 5px", textAlign: "center" }}>CLASS TIME</th>
            <th style={{ border: "1px solid #000", padding: "3px 5px", textAlign: "center" }}>DAYS</th>
            <th style={{ border: "1px solid #000", padding: "3px 5px", textAlign: "center" }}>ROOM</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c, i) => (
            <tr key={i}>
              <td style={{ border: "1px solid #000", padding: "3px 5px" }}>{c.id}</td>
              <td style={{ border: "1px solid #000", padding: "3px 5px", textAlign: "center" }}>{c.section}</td>
              <td style={{ border: "1px solid #000", padding: "3px 5px" }}>{c.name}</td>
              <td style={{ border: "1px solid #000", padding: "3px 5px", textAlign: "center" }}>{c.credit}</td>
              <td style={{ border: "1px solid #000", padding: "3px 5px", textAlign: "center" }}>{c.time}</td>
              <td style={{ border: "1px solid #000", padding: "3px 5px", textAlign: "center" }}>{c.days}</td>
              <td style={{ border: "1px solid #000", padding: "3px 5px", textAlign: "center" }}>{c.room}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary Table — no cell borders, plain rows, underline only on last row values */}
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", marginBottom: "2px" }}>
        <tbody>
          {[
            ["No of Credits Added", "18", "Female Discount(0%)", "0.00", "Forfeited Amount(25%)", "0.00", false],
            ["No of Credits Dropped", "0", "Child of Alumni", "0.00", "Graduation Fee", "12000.00", false],
            ["Amount Added", "108000.00", "Discount Amount(0%)", "0.00", "Peregrine Fee", "0.00", false],
            ["Amount Dropped", "0.00", "Semester Fee Discount", "0.00", "Late Registration Fee(5%)", "0.00", false],
            ["Semester Fee", "7000.00", "Cash Back", "0.00", "Net Payable Amount", "127000.00", true],
          ].map(([l1, v1, l2, v2, l3, v3, isLast], i) => (
            <tr key={i}>
              <td style={{ padding: "1px 6px 1px 0", textDecoration: isLast ? "underline" : "none", width: "17%" }}>{l1}</td>
              <td style={{ padding: "1px 14px 1px 0", textAlign: "right", textDecoration: isLast ? "underline" : "none", width: "10%" }}>{v1}</td>
              <td style={{ padding: "1px 6px 1px 8px", textDecoration: isLast ? "underline" : "none", width: "18%" }}>{l2}</td>
              <td style={{ padding: "1px 14px 1px 0", textAlign: "right", textDecoration: isLast ? "underline" : "none", width: "8%" }}>{v2}</td>
              <td style={{ padding: "1px 6px 1px 8px", fontWeight: isLast ? "bold" : "normal", textDecoration: isLast ? "underline" : "none", width: "22%" }}>{l3}</td>
              <td style={{ padding: "1px 0 1px 0", textAlign: "right", fontWeight: isLast ? "bold" : "normal", textDecoration: isLast ? "underline" : "none", width: "12%" }}>{v3}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* In Words — bold and italic */}
      <div style={{ fontSize: "11px", marginBottom: "3px", fontWeight: "bold", fontStyle: "italic" }}>
        In words: Taka One Lakh and Twenty Seven Thousands Only
      </div>

      {/* Due By / Processed By — centered and right-aligned on same line */}
      <div style={{ fontSize: "11px", display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <div style={{ flex: 1, textAlign: "center" }}>Due By:&nbsp; 22-Jul-2025</div>
        <div style={{ flex: 1, textAlign: "right" }}>Processed By:&nbsp; Sharmin Mostarin</div>
      </div>

      {/* Footer note inside each copy */}
      <div style={{ fontSize: "10.5px", marginTop: "6px", lineHeight: "1.8" }}>
        <div style={{ fontStyle: "italic" }}>
          Please deposit the net payable amount to: 1. Any Branch of Mutual Trust Bank, Dhaka Bank, or Midland Bank PLC, 2. Online payment through IRAS. Please see Tuition &amp; Fees Payment Procedure at IUB's Website.
        </div>
        <div style={{ marginTop: "4px" }}>
          This is a computer generated bill, hence no signature is required.<strong>Room numbers beginning with 'J' refers to the new building and those with 'BC' refers to existing building.</strong>
        </div>
      </div>

      {/* Thick bottom separator line */}
      <div style={{ borderTop: "3px solid #000", marginTop: "8px" }} />
    </div>
  );
};

export default function RegistrationBill({ onBack }) {
  return (
    <div style={{
      backgroundColor: "#e0e0e0",
      minHeight: "100vh",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0",
    }}>
      <div style={{
        width: "750px", marginBottom: "12px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <button onClick={onBack} style={{
          background: "#334155", border: "none", color: "#fff",
          padding: "8px 18px", borderRadius: "6px", cursor: "pointer",
          fontSize: "13px", fontWeight: "600", fontFamily: "'DM Sans', sans-serif",
        }}>← Back to Form</button>
        <button onClick={() => {}} style={{
          background: "#334155", border: "none", color: "#fff",
          padding: "8px 18px", borderRadius: "6px", cursor: "pointer",
          fontSize: "13px", fontWeight: "600", fontFamily: "'DM Sans', sans-serif",
        }}>Download</button>
      </div>
      {/* Student Copy */}
      <BillingStatement copy="Student Copy" />

      {/* Bank Copy */}
      <BillingStatement copy="Bank Copy" />
    </div>
  );
}
