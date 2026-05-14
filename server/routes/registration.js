import { Router } from 'express'
import pool from '../db.js'

const router = Router()

router.post('/', async (req, res) => {
  const client = await pool.connect()
  try {
    const {
      studentId, studentName, major, advisor,
      semester, year, level, transactionNo, billNo,
      registrationDate, printDate, courses,
      femaleDiscount, childOfAlumni, discountAmount,
      semesterFee, graduationFee, peregrineFee, lateRegFee,
      cashBack, forfeitedAmount, dueBy, processedBy,
    } = req.body

    await client.query('BEGIN')

    const regResult = await client.query(
      `INSERT INTO registrations (
        student_id, student_name, major, advisor,
        semester, year, level, transaction_no, bill_no,
        registration_date, print_date,
        female_discount, child_of_alumni, discount_amount,
        semester_fee, graduation_fee, peregrine_fee, late_reg_fee,
        cash_back, forfeited_amount, due_by, processed_by
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22
      ) RETURNING id`,
      ([
        studentId, studentName, major, advisor,
        semester, year, level, transactionNo, billNo,
        registrationDate, printDate,
        femaleDiscount, childOfAlumni, discountAmount,
        semesterFee, graduationFee, peregrineFee, lateRegFee,
        cashBack, forfeitedAmount, dueBy, processedBy,
      ]).map(v => v === '' ? null : v)
    )

    const registrationId = regResult.rows[0].id

    for (const course of courses) {
      await client.query(
        `INSERT INTO courses (
          registration_id, course_id, section, course_name,
          credit_hour, class_time, days, room
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        ([
          registrationId, course.courseId, course.section, course.courseName,
          course.creditHour, course.classTime, course.days, course.room,
        ]).map(v => v === '' ? null : v)
      )
    }

    await client.query('COMMIT')
    res.status(201).json({ id: registrationId, message: 'Registration saved successfully' })
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Error saving registration:', err)
    res.status(500).json({ error: 'Failed to save registration' })
  } finally {
    client.release()
  }
})

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM registrations ORDER BY id DESC`
    )
    res.json(result.rows)
  } catch (err) {
    console.error('Error fetching registrations:', err)
    res.status(500).json({ error: 'Failed to fetch registrations' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const regResult = await pool.query(
      'SELECT * FROM registrations WHERE id = $1', [req.params.id]
    )
    if (regResult.rows.length === 0)
      return res.status(404).json({ error: 'Registration not found' })

    const coursesResult = await pool.query(
      'SELECT * FROM courses WHERE registration_id = $1 ORDER BY id', [req.params.id]
    )

    res.json({ ...regResult.rows[0], courses: coursesResult.rows })
  } catch (err) {
    console.error('Error fetching registration:', err)
    res.status(500).json({ error: 'Failed to fetch registration' })
  }
})

export default router
