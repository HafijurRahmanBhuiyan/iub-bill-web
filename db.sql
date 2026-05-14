CREATE DATABASE iubBill;

CREATE TABLE registrations (
  id            SERIAL PRIMARY KEY,
  student_id    VARCHAR(50),
  student_name  VARCHAR(200),
  major         VARCHAR(100),
  advisor       VARCHAR(200),
  semester      VARCHAR(20),
  year          VARCHAR(10),
  level         VARCHAR(20),
  transaction_no VARCHAR(100),
  bill_no       VARCHAR(100),
  registration_date TIMESTAMP,
  print_date    TIMESTAMP,
  female_discount     NUMERIC(10,2) DEFAULT 0,
  child_of_alumni     NUMERIC(10,2) DEFAULT 0,
  discount_amount     NUMERIC(10,2) DEFAULT 0,
  semester_fee        NUMERIC(10,2) DEFAULT 0,
  graduation_fee      NUMERIC(10,2) DEFAULT 0,
  peregrine_fee       NUMERIC(10,2) DEFAULT 0,
  late_reg_fee        NUMERIC(10,2) DEFAULT 0,
  cash_back           NUMERIC(10,2) DEFAULT 0,
  forfeited_amount    NUMERIC(10,2) DEFAULT 0,
  due_by        DATE,
  processed_by  VARCHAR(200),
  created_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE courses (
  id              SERIAL PRIMARY KEY,
  registration_id INTEGER REFERENCES registrations(id) ON DELETE CASCADE,
  course_id       VARCHAR(50),
  section         VARCHAR(20),
  course_name     VARCHAR(200),
  credit_hour     NUMERIC(4,2),
  class_time      VARCHAR(50),
  days            VARCHAR(20),
  room            VARCHAR(50)
);
