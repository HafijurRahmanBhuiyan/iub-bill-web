import { useState } from "react";

const DAYS_OPTIONS = ["MW", "ST", "MWF", "MTW", "TR", "M", "T", "W", "S", "F"];

const defaultCourse = () => ({
  id: crypto.randomUUID(),
  courseId: "",
  section: "",
  courseName: "",
  creditHour: "",
  classTime: "",
  days: "",
  room: "",
});

const defaultForm = {
  studentId: "",
  studentName: "",
  major: "",
  advisor: "",
  semester: "Autumn",
  year: "2025",
  level: "Undergraduate",
  transactionNo: "",
  billNo: "",
  registrationDate: "",
  printDate: "",
  courses: [defaultCourse()],
  femaleDiscount: "0",
  childOfAlumni: "0.00",
  discountAmount: "0",
  semesterFee: "7000.00",
  graduationFee: "0.00",
  peregrineFee: "0.00",
  lateRegFee: "0",
  cashBack: "0.00",
  forfeitedAmount: "25",
  dueBy: "",
  processedBy: "",
};

const semesters = ["Autumn", "Spring", "Summer"];
const levels = ["Undergraduate", "Graduate"];

const Field = ({ label, children, half }) => (
  <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    flex: half ? "0 0 calc(50% - 8px)" : "1",
  }}>
    <label style={{
      fontSize: "10px",
      fontWeight: "700",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "#94a3b8",
    }}>{label}</label>
    {children}
  </div>
);

const inputStyle = {
  background: "#1e293b",
  border: "1px solid #334155",
  borderRadius: "6px",
  color: "#f1f5f9",
  fontSize: "13px",
  padding: "9px 12px",
  outline: "none",
  fontFamily: "'DM Mono', monospace",
  transition: "border-color 0.2s",
  width: "100%",
  boxSizing: "border-box",
};

const selectStyle = { ...inputStyle, cursor: "pointer" };

const SectionTitle = ({ number, title, subtitle }) => (
  <div style={{ marginBottom: "20px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
      <div style={{
        width: "28px", height: "28px", borderRadius: "50%",
        background: "linear-gradient(135deg, #3b82f6, #6366f1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "12px", fontWeight: "700", color: "#fff", flexShrink: 0,
      }}>{number}</div>
      <h2 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#f1f5f9", letterSpacing: "0.02em" }}>{title}</h2>
    </div>
    {subtitle && <p style={{ margin: "0 0 0 40px", fontSize: "11px", color: "#64748b" }}>{subtitle}</p>}
    <div style={{ height: "1px", background: "linear-gradient(to right, #334155, transparent)", marginTop: "12px" }} />
  </div>
);

export default function RegistrationForm() {
  const [form, setForm] = useState(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const setCourse = (id, key, val) =>
    setForm(f => ({ ...f, courses: f.courses.map(c => c.id === id ? { ...c, [key]: val } : c) }));

  const addCourse = () => setForm(f => ({ ...f, courses: [...f.courses, defaultCourse()] }));

  const removeCourse = (id) =>
    setForm(f => ({ ...f, courses: f.courses.filter(c => c.id !== id) }));

  const getInputStyle = (fieldId) => ({
    ...inputStyle,
    borderColor: focusedField === fieldId ? "#3b82f6" : "#334155",
    boxShadow: focusedField === fieldId ? "0 0 0 3px rgba(59,130,246,0.15)" : "none",
  });

  const totalCredits = form.courses.reduce((s, c) => s + (parseFloat(c.creditHour) || 0), 0);
  const amountAdded = totalCredits * 6000;
  const netPayable = amountAdded
    + (parseFloat(form.semesterFee) || 0)
    + (parseFloat(form.graduationFee) || 0)
    - ((parseFloat(form.femaleDiscount) || 0) / 100 * amountAdded)
    - ((parseFloat(form.discountAmount) || 0) / 100 * amountAdded)
    + ((parseFloat(form.lateRegFee) || 0) / 100 * amountAdded)
    - (parseFloat(form.cashBack) || 0)
    - (parseFloat(form.childOfAlumni) || 0);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('http://localhost:3001/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Server error');
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{
        minHeight: "100vh", background: "#0f172a",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div style={{
            width: "72px", height: "72px", borderRadius: "50%",
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px", fontSize: "32px",
          }}>✓</div>
          <h2 style={{ color: "#f1f5f9", fontSize: "22px", margin: "0 0 8px" }}>Registration Submitted</h2>
          <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 24px" }}>
            {form.studentName} · {form.studentId} · {totalCredits} credits · ৳{netPayable.toLocaleString("en-BD", { minimumFractionDigits: 2 })} net payable
          </p>
          <button onClick={() => setSubmitted(false)} style={{
            background: "#1e293b", border: "1px solid #334155", color: "#94a3b8",
            padding: "10px 24px", borderRadius: "8px", cursor: "pointer", fontSize: "13px",
          }}>← Back to Form</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "'DM Sans', sans-serif", padding: "40px 20px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: "820px", margin: "0 auto" }}>

        {/* Page Header */}
        <div style={{ marginBottom: "36px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#3b82f6", fontWeight: "700", marginBottom: "6px" }}>
                Independent University, Bangladesh
              </div>
              <h1 style={{ margin: "0 0 4px", fontSize: "24px", fontWeight: "700", color: "#f1f5f9", lineHeight: 1.2 }}>
                Course Registration
              </h1>
              <p style={{ margin: 0, color: "#64748b", fontSize: "13px" }}>Billing Statement · Registrar's Office</p>
            </div>
            <div style={{
              background: "#1e293b", border: "1px solid #334155",
              borderRadius: "10px", padding: "12px 18px", textAlign: "right",
            }}>
              <div style={{ fontSize: "10px", color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase" }}>Net Payable</div>
              <div style={{ fontSize: "22px", fontWeight: "700", color: "#3b82f6", fontFamily: "'DM Mono', monospace" }}>
                ৳{netPayable.toLocaleString("en-BD", { minimumFractionDigits: 2 })}
              </div>
              <div style={{ fontSize: "10px", color: "#475569", marginTop: "2px" }}>{totalCredits} credit{totalCredits !== 1 ? "s" : ""} registered</div>
            </div>
          </div>
        </div>

        {/* Card wrapper */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Section 1: Student Information */}
          <div style={{ background: "#1e293b", borderRadius: "14px", border: "1px solid #334155", padding: "28px" }}>
            <SectionTitle number="1" title="Student Information" subtitle="Personal and academic details of the student" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <Field label="Student ID" half>
                <input value={form.studentId} onChange={e => set("studentId", e.target.value)}
                  placeholder="e.g. 2220488"
                  style={getInputStyle("studentId")}
                  onFocus={() => setFocusedField("studentId")} onBlur={() => setFocusedField(null)} />
              </Field>
              <Field label="Student Name" half>
                <input value={form.studentName} onChange={e => set("studentName", e.target.value)}
                  placeholder="Full name"
                  style={getInputStyle("studentName")}
                  onFocus={() => setFocusedField("studentName")} onBlur={() => setFocusedField(null)} />
              </Field>
              <Field label="Major" half>
                <input value={form.major} onChange={e => set("major", e.target.value)}
                  placeholder="e.g. Law, CSE, BBA"
                  style={getInputStyle("major")}
                  onFocus={() => setFocusedField("major")} onBlur={() => setFocusedField(null)} />
              </Field>
              <Field label="Advisor" half>
                <input value={form.advisor} onChange={e => set("advisor", e.target.value)}
                  placeholder="Advisor name"
                  style={getInputStyle("advisor")}
                  onFocus={() => setFocusedField("advisor")} onBlur={() => setFocusedField(null)} />
              </Field>
            </div>
          </div>

          {/* Section 2: Registration Details */}
          <div style={{ background: "#1e293b", borderRadius: "14px", border: "1px solid #334155", padding: "28px" }}>
            <SectionTitle number="2" title="Registration Details" subtitle="Semester, level, and billing reference numbers" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <Field label="Semester" half>
                <select value={form.semester} onChange={e => set("semester", e.target.value)}
                  style={selectStyle}>
                  {semesters.map(s => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Year" half>
                <input value={form.year} onChange={e => set("year", e.target.value)}
                  placeholder="e.g. 2025"
                  style={getInputStyle("year")}
                  onFocus={() => setFocusedField("year")} onBlur={() => setFocusedField(null)} />
              </Field>
              <Field label="Level" half>
                <select value={form.level} onChange={e => set("level", e.target.value)}
                  style={selectStyle}>
                  {levels.map(l => <option key={l}>{l}</option>)}
                </select>
              </Field>
              <Field label="Transaction No" half>
                <input value={form.transactionNo} onChange={e => set("transactionNo", e.target.value)}
                  placeholder="Transaction number"
                  style={getInputStyle("transactionNo")}
                  onFocus={() => setFocusedField("transactionNo")} onBlur={() => setFocusedField(null)} />
              </Field>
              <Field label="Bill No" half>
                <input value={form.billNo} onChange={e => set("billNo", e.target.value)}
                  placeholder="Bill number"
                  style={getInputStyle("billNo")}
                  onFocus={() => setFocusedField("billNo")} onBlur={() => setFocusedField(null)} />
              </Field>
              <Field label="Registration Date" half>
                <input type="datetime-local" value={form.registrationDate} onChange={e => set("registrationDate", e.target.value)}
                  style={getInputStyle("registrationDate")}
                  onFocus={() => setFocusedField("registrationDate")} onBlur={() => setFocusedField(null)} />
              </Field>
            </div>
          </div>

          {/* Section 3: Course Registration */}
          <div style={{ background: "#1e293b", borderRadius: "14px", border: "1px solid #334155", padding: "28px" }}>
            <SectionTitle number="3" title="Course Registration" subtitle="Add all courses for this semester" />

            {form.courses.map((course, idx) => (
              <div key={course.id} style={{
                background: "#0f172a", borderRadius: "10px", border: "1px solid #334155",
                padding: "18px", marginBottom: "12px", position: "relative",
              }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px",
                }}>
                  <span style={{ fontSize: "11px", fontWeight: "700", color: "#3b82f6", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Course {idx + 1}
                  </span>
                  {form.courses.length > 1 && (
                    <button onClick={() => removeCourse(course.id)} style={{
                      background: "transparent", border: "1px solid #ef4444", color: "#ef4444",
                      borderRadius: "5px", padding: "2px 10px", fontSize: "11px", cursor: "pointer",
                    }}>Remove</button>
                  )}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  <Field label="Course ID">
                    <input value={course.courseId} onChange={e => setCourse(course.id, "courseId", e.target.value)}
                      placeholder="e.g. LAW415"
                      style={getInputStyle(`ci-${course.id}`)}
                      onFocus={() => setFocusedField(`ci-${course.id}`)} onBlur={() => setFocusedField(null)} />
                  </Field>
                  <Field label="Section" half>
                    <input value={course.section} onChange={e => setCourse(course.id, "section", e.target.value)}
                      placeholder="1"
                      style={getInputStyle(`sec-${course.id}`)}
                      onFocus={() => setFocusedField(`sec-${course.id}`)} onBlur={() => setFocusedField(null)} />
                  </Field>
                  <Field label="Course Name">
                    <input value={course.courseName} onChange={e => setCourse(course.id, "courseName", e.target.value)}
                      placeholder="Full course name"
                      style={{ ...getInputStyle(`cn-${course.id}`), flex: 2 }}
                      onFocus={() => setFocusedField(`cn-${course.id}`)} onBlur={() => setFocusedField(null)} />
                  </Field>
                  <Field label="Credit Hr" half>
                    <input type="number" min="1" max="4" value={course.creditHour}
                      onChange={e => setCourse(course.id, "creditHour", e.target.value)}
                      placeholder="3"
                      style={getInputStyle(`ch-${course.id}`)}
                      onFocus={() => setFocusedField(`ch-${course.id}`)} onBlur={() => setFocusedField(null)} />
                  </Field>
                  <Field label="Class Time" half>
                    <input value={course.classTime} onChange={e => setCourse(course.id, "classTime", e.target.value)}
                      placeholder="e.g. 16:20-17:50"
                      style={getInputStyle(`ct-${course.id}`)}
                      onFocus={() => setFocusedField(`ct-${course.id}`)} onBlur={() => setFocusedField(null)} />
                  </Field>
                  <Field label="Days" half>
                    <select value={course.days} onChange={e => setCourse(course.id, "days", e.target.value)}
                      style={selectStyle}>
                      <option value="">Select</option>
                      {DAYS_OPTIONS.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </Field>
                  <Field label="Room" half>
                    <input value={course.room} onChange={e => setCourse(course.id, "room", e.target.value)}
                      placeholder="e.g. MK4006"
                      style={getInputStyle(`rm-${course.id}`)}
                      onFocus={() => setFocusedField(`rm-${course.id}`)} onBlur={() => setFocusedField(null)} />
                  </Field>
                </div>
              </div>
            ))}

            <button onClick={addCourse} style={{
              width: "100%", padding: "11px",
              background: "transparent", border: "1px dashed #334155",
              borderRadius: "8px", color: "#3b82f6", fontSize: "13px",
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: "500",
              transition: "border-color 0.2s, background 0.2s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = "#3b82f6"; e.target.style.background = "rgba(59,130,246,0.05)"; }}
              onMouseLeave={e => { e.target.style.borderColor = "#334155"; e.target.style.background = "transparent"; }}>
              + Add Another Course
            </button>
          </div>

          {/* Section 4: Fees & Discounts */}
          <div style={{ background: "#1e293b", borderRadius: "14px", border: "1px solid #334155", padding: "28px" }}>
            <SectionTitle number="4" title="Fees & Discounts" subtitle="Financial adjustments applied to this registration" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <Field label="Female Discount (%)" half>
                <input type="number" min="0" max="100" value={form.femaleDiscount}
                  onChange={e => set("femaleDiscount", e.target.value)}
                  style={getInputStyle("fd")}
                  onFocus={() => setFocusedField("fd")} onBlur={() => setFocusedField(null)} />
              </Field>
              <Field label="Child of Alumni (৳)" half>
                <input type="number" min="0" value={form.childOfAlumni}
                  onChange={e => set("childOfAlumni", e.target.value)}
                  style={getInputStyle("coa")}
                  onFocus={() => setFocusedField("coa")} onBlur={() => setFocusedField(null)} />
              </Field>
              <Field label="Discount Amount (%)" half>
                <input type="number" min="0" max="100" value={form.discountAmount}
                  onChange={e => set("discountAmount", e.target.value)}
                  style={getInputStyle("da")}
                  onFocus={() => setFocusedField("da")} onBlur={() => setFocusedField(null)} />
              </Field>
              <Field label="Semester Fee (৳)" half>
                <input type="number" min="0" value={form.semesterFee}
                  onChange={e => set("semesterFee", e.target.value)}
                  style={getInputStyle("sf")}
                  onFocus={() => setFocusedField("sf")} onBlur={() => setFocusedField(null)} />
              </Field>
              <Field label="Graduation Fee (৳)" half>
                <input type="number" min="0" value={form.graduationFee}
                  onChange={e => set("graduationFee", e.target.value)}
                  style={getInputStyle("gf")}
                  onFocus={() => setFocusedField("gf")} onBlur={() => setFocusedField(null)} />
              </Field>
              <Field label="Peregrine Fee (৳)" half>
                <input type="number" min="0" value={form.peregrineFee}
                  onChange={e => set("peregrineFee", e.target.value)}
                  style={getInputStyle("pf")}
                  onFocus={() => setFocusedField("pf")} onBlur={() => setFocusedField(null)} />
              </Field>
              <Field label="Late Registration Fee (%)" half>
                <input type="number" min="0" max="100" value={form.lateRegFee}
                  onChange={e => set("lateRegFee", e.target.value)}
                  style={getInputStyle("lrf")}
                  onFocus={() => setFocusedField("lrf")} onBlur={() => setFocusedField(null)} />
              </Field>
              <Field label="Cash Back (৳)" half>
                <input type="number" min="0" value={form.cashBack}
                  onChange={e => set("cashBack", e.target.value)}
                  style={getInputStyle("cb")}
                  onFocus={() => setFocusedField("cb")} onBlur={() => setFocusedField(null)} />
              </Field>
              <Field label="Forfeited Amount (%)" half>
                <input type="number" min="0" max="100" value={form.forfeitedAmount}
                  onChange={e => set("forfeitedAmount", e.target.value)}
                  style={getInputStyle("fa")}
                  onFocus={() => setFocusedField("fa")} onBlur={() => setFocusedField(null)} />
              </Field>
            </div>

            {/* Live fee summary */}
            <div style={{
              marginTop: "20px", background: "#0f172a", borderRadius: "10px",
              border: "1px solid #334155", padding: "16px",
            }}>
              <div style={{ fontSize: "10px", color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>Fee Summary</div>
              {[
                ["Credits Registered", totalCredits],
                ["Amount Added (credits × 6000)", `৳${amountAdded.toLocaleString("en-BD", { minimumFractionDigits: 2 })}`],
                ["Semester Fee", `৳${parseFloat(form.semesterFee || 0).toLocaleString("en-BD", { minimumFractionDigits: 2 })}`],
                ["Graduation Fee", `৳${parseFloat(form.graduationFee || 0).toLocaleString("en-BD", { minimumFractionDigits: 2 })}`],
              ].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#94a3b8", marginBottom: "5px" }}>
                  <span>{label}</span><span style={{ fontFamily: "'DM Mono', monospace" }}>{val}</span>
                </div>
              ))}
              <div style={{ height: "1px", background: "#334155", margin: "10px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "700" }}>
                <span style={{ color: "#f1f5f9" }}>Net Payable Amount</span>
                <span style={{ color: "#3b82f6", fontFamily: "'DM Mono', monospace" }}>
                  ৳{netPayable.toLocaleString("en-BD", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Section 5: Processing Info */}
          <div style={{ background: "#1e293b", borderRadius: "14px", border: "1px solid #334155", padding: "28px" }}>
            <SectionTitle number="5" title="Processing Information" subtitle="Due date and processing details" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <Field label="Due By" half>
                <input type="date" value={form.dueBy} onChange={e => set("dueBy", e.target.value)}
                  style={getInputStyle("dueBy")}
                  onFocus={() => setFocusedField("dueBy")} onBlur={() => setFocusedField(null)} />
              </Field>
              <Field label="Processed By" half>
                <input value={form.processedBy} onChange={e => set("processedBy", e.target.value)}
                  placeholder="Name of processor"
                  style={getInputStyle("processedBy")}
                  onFocus={() => setFocusedField("processedBy")} onBlur={() => setFocusedField(null)} />
              </Field>
            </div>
          </div>

          {submitError && (
            <div style={{
              background: "#450a0a", border: "1px solid #ef4444", borderRadius: "10px",
              padding: "12px 16px", color: "#fca5a5", fontSize: "13px", textAlign: "center",
            }}>
              Failed to submit: {submitError}
            </div>
          )}

          {/* Submit */}
          <button onClick={handleSubmit} disabled={submitting} style={{
            width: "100%", padding: "16px",
            background: submitting ? "#475569" : "linear-gradient(135deg, #3b82f6, #6366f1)",
            border: "none", borderRadius: "12px",
            color: "#fff", fontSize: "15px", fontWeight: "700",
            cursor: submitting ? "not-allowed" : "pointer",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.02em",
            boxShadow: submitting ? "none" : "0 4px 24px rgba(59,130,246,0.3)",
            transition: "opacity 0.2s, transform 0.1s",
          }}
            onMouseEnter={e => { if (!submitting) e.target.style.opacity = "0.92" }}
            onMouseLeave={e => { if (!submitting) e.target.style.opacity = "1" }}
            onMouseDown={e => { if (!submitting) e.target.style.transform = "scale(0.99)" }}
            onMouseUp={e => { if (!submitting) e.target.style.transform = "scale(1)" }}>
            {submitting ? 'Submitting...' : 'Submit Registration'}
          </button>

        </div>
      </div>
    </div>
  );
}
