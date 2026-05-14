import { useState, useEffect } from "react";

const numberToWords = (num) => {
  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const inWords = (n) => {
    if (n === 0) return '';
    let s = '';
    if (n >= 100) { s += a[Math.floor(n / 100)] + ' Hundred '; n %= 100; }
    if (n >= 20) { s += b[Math.floor(n / 10)] + ' '; n %= 10; }
    if (n > 0) s += a[n] + ' ';
    return s.trim();
  };

  let remainder = Math.round(num);
  const crore = Math.floor(remainder / 10000000);
  remainder %= 10000000;
  const lakh = Math.floor(remainder / 100000);
  remainder %= 100000;
  const thousand = Math.floor(remainder / 1000);
  const hundred = remainder % 1000;

  const parts = [];
  if (crore > 0) parts.push(inWords(crore) + ' Crore');
  if (lakh > 0) parts.push(inWords(lakh) + ' Lakh');
  if (thousand > 0) parts.push(inWords(thousand) + ' Thousand');
  if (hundred > 0) parts.push(inWords(hundred));

  return parts.length > 0 ? parts.join(' and ') : 'Zero';
};

const formatDateTime = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = String(d.getDate()).padStart(2, '0');
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  let hours = d.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = String(d.getDate()).padStart(2, '0');
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

const defaultCourses = [
  { course_id: "(A) LAW415", section: "1", course_name: "Law of Evidence - II", credit_hour: 3, class_time: "16:20-17:50", days: "MW", room: "MK4006" },
  { course_id: "(A) LAW417", section: "2", course_name: "International Law", credit_hour: 3, class_time: "14:40-16:10", days: "ST", room: "C5003" },
  { course_id: "(A) LAW418", section: "1", course_name: "Legal Drafting and Conveyancing - I", credit_hour: 3, class_time: "13:00-14:30", days: "MW", room: "BC4011" },
  { course_id: "(A) LAW419", section: "2", course_name: "Legal Drafting and Conveyancing - II", credit_hour: 3, class_time: "09:40-11:10", days: "ST", room: "C4004" },
  { course_id: "(A) LAW420", section: "2", course_name: "Advocacy Skills (Criminal)", credit_hour: 3, class_time: "13:00-14:30", days: "ST", room: "C5002" },
  { course_id: "(A) LAW421", section: "1", course_name: "Advocacy Skills (Civil)", credit_hour: 3, class_time: "08:00-09:30", days: "ST", room: "C2007" },
];

const defaultReg = {
  student_id: "2220488",
  student_name: "Sharmin Mostarin",
  major: "Law",
  advisor: "Zahidul Islam",
  semester: "Autumn",
  year: "2025",
  level: "Undergraduate",
  transaction_no: "222048801082076",
  bill_no: "125121598",
  registration_date: "2025-07-16T10:07:00",
  print_date: "2025-07-16T13:07:00",
  female_discount: 0,
  child_of_alumni: 0,
  discount_amount: 0,
  semester_fee: 7000,
  graduation_fee: 12000,
  peregrine_fee: 0,
  late_reg_fee: 5,
  cash_back: 0,
  forfeited_amount: 25,
  due_by: "2025-07-22",
  processed_by: "Sharmin Mostarin",
};

const BillingStatement = ({ copy, reg: regProp, courses: coursesProp }) => {
  const reg = regProp || defaultReg;
  const courses = coursesProp || defaultCourses;
  const totalCredits = courses.reduce((s, c) => s + (parseFloat(c.credit_hour) || 0), 0);
  const amountAdded = totalCredits * 6000;
  const femaleDiscountVal = ((parseFloat(reg.female_discount) || 0) / 100) * amountAdded;
  const discountVal = ((parseFloat(reg.discount_amount) || 0) / 100) * amountAdded;
  const lateRegVal = ((parseFloat(reg.late_reg_fee) || 0) / 100) * amountAdded;
  const forfeitedVal = ((parseFloat(reg.forfeited_amount) || 0) / 100) * amountAdded;
  const netPayable = amountAdded
    + (parseFloat(reg.semester_fee) || 0)
    + (parseFloat(reg.graduation_fee) || 0)
    - femaleDiscountVal
    - discountVal
    + lateRegVal
    - (parseFloat(reg.cash_back) || 0)
    - (parseFloat(reg.child_of_alumni) || 0);
  const netPayableRounded = Math.round(netPayable * 100) / 100;

  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      fontSize: "11px",
      border: "1px solid #000",
      padding: "10px 14px",
      marginBottom: "0",
      pageBreakAfter: "always",
      backgroundColor: "#fff",
      width: "680px",
      boxSizing: "border-box",
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
          <div style={{ fontSize: "11px", fontWeight: "bold" }}>Registration {reg.semester}, {reg.year}</div>
          <div style={{ fontSize: "11px", fontWeight: "bold" }}>{reg.level}</div>
        </div>
      </div>

      {/* Student Info Grid */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "4px", fontSize: "11px" }}>
        <tbody>
          <tr>
            <td style={{ width: "80px", fontWeight: "bold" }}>Student ID:</td>
            <td style={{ width: "150px" }}>{reg.student_id}</td>
            <td style={{ width: "110px", fontWeight: "bold" }}>Transaction No:</td>
            <td>{reg.transaction_no}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Student Name:</td>
            <td>{reg.student_name}</td>
            <td style={{ fontWeight: "bold" }}>Bill No:</td>
            <td>{reg.bill_no}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Major:</td>
            <td>{reg.major}</td>
            <td style={{ fontWeight: "bold" }}>Registration Date:</td>
            <td>{formatDateTime(reg.registration_date)}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Advisor:</td>
            <td>{reg.advisor}</td>
            <td style={{ fontWeight: "bold" }}>Print Date:</td>
            <td>{formatDateTime(reg.print_date)}</td>
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
              <td style={{ border: "1px solid #000", padding: "3px 5px" }}>{c.course_id}</td>
              <td style={{ border: "1px solid #000", padding: "3px 5px", textAlign: "center" }}>{c.section}</td>
              <td style={{ border: "1px solid #000", padding: "3px 5px" }}>{c.course_name}</td>
              <td style={{ border: "1px solid #000", padding: "3px 5px", textAlign: "center" }}>{Number(c.credit_hour)}</td>
              <td style={{ border: "1px solid #000", padding: "3px 5px", textAlign: "center" }}>{c.class_time}</td>
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
            ["No of Credits Added", String(totalCredits), `Female Discount(${reg.female_discount}%)`, femaleDiscountVal.toFixed(2), `Forfeited Amount(${reg.forfeited_amount}%)`, forfeitedVal.toFixed(2), false],
            ["No of Credits Dropped", "0", "Child of Alumni", (parseFloat(reg.child_of_alumni) || 0).toFixed(2), "Graduation Fee", (parseFloat(reg.graduation_fee) || 0).toFixed(2), false],
            ["Amount Added", amountAdded.toFixed(2), `Discount Amount(${reg.discount_amount}%)`, discountVal.toFixed(2), "Peregrine Fee", (parseFloat(reg.peregrine_fee) || 0).toFixed(2), false],
            ["Amount Dropped", "0.00", "Semester Fee Discount", "0.00", `Late Registration Fee(${reg.late_reg_fee}%)`, lateRegVal.toFixed(2), false],
            ["Semester Fee", (parseFloat(reg.semester_fee) || 0).toFixed(2), "Cash Back", (parseFloat(reg.cash_back) || 0).toFixed(2), "Net Payable Amount", netPayableRounded.toFixed(2), true],
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
        In words: Taka {numberToWords(netPayableRounded)} Only
      </div>

      {/* Due By / Processed By — centered and right-aligned on same line */}
      <div style={{ fontSize: "11px", display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <div style={{ flex: 1, textAlign: "center" }}>Due By:&nbsp; {formatDate(reg.due_by)}</div>
        <div style={{ flex: 1, textAlign: "right" }}>Processed By:&nbsp; {reg.processed_by}</div>
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

export default function RegistrationBill({ registrationId, onBack }) {
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(!!registrationId);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!registrationId) return;
    setLoading(true);
    setError(null);
    fetch(`http://localhost:3001/api/registrations/${registrationId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch registration');
        return res.json();
      })
      .then(data => {
        setRegistration(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [registrationId]);

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
      <style>{`@media print{@page{margin:15mm;size:A4 portrait}*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}.no-print{display:none!important}}`}</style>
      <div className="no-print" style={{
        width: "680px", marginBottom: "12px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <button onClick={onBack} style={{
          background: "#334155", border: "none", color: "#fff",
          padding: "8px 18px", borderRadius: "6px", cursor: "pointer",
          fontSize: "13px", fontWeight: "600", fontFamily: "'DM Sans', sans-serif",
        }}>← Back to Form</button>
        <button onClick={() => window.print()} style={{
          background: "#334155", border: "none", color: "#fff",
          padding: "8px 18px", borderRadius: "6px", cursor: "pointer",
          fontSize: "13px", fontWeight: "600", fontFamily: "'DM Sans', sans-serif",
        }}>Download</button>
      </div>
      {loading && <div style={{ color: "#333", fontSize: "14px" }}>Loading registration data...</div>}
      {error && <div style={{ color: "#c00", fontSize: "14px" }}>Error: {error}</div>}
      {!loading && !error && (
        <>
          <BillingStatement copy="Student Copy" reg={registration} courses={registration?.courses} />
          <BillingStatement copy="Bank Copy" reg={registration} courses={registration?.courses} />
        </>
      )}
    </div>
  );
}
