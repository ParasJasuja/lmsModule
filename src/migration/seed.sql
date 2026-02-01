INSERT INTO roles (title, description)
VALUES
  ('admin', 'System administrator'),
  ('student', 'Student role');
select * from roles;


WITH role_ids AS (
  SELECT id, title FROM roles
)
INSERT INTO users (email, password, name, role_id)
SELECT
  u.email,
  u.password,
  u.name,
  r.id
FROM (
  VALUES
    ('admin@dev.com', 'admin_pas', 'Admin User', 'admin'),
    ('student1@dev.com', 'student_pas', 'Student One', 'student'),
    ('student2@dev.com', 'student_pas', 'Student Two', 'student'),
    ('student3@dev.com', 'student_pas', 'Student Three', 'student'),
    ('student4@dev.com', 'student_pas', 'Student Four', 'student'),
    ('student5@dev.com', 'student_pas', 'Student Five', 'student')
) AS u(email, password, name, role_title)
JOIN role_ids r ON r.title = u.role_title;
select * from users;

WITH admin_user AS (
  SELECT id FROM users WHERE email = 'admin@dev.com'
)
INSERT INTO courses (title, description, created_by)
SELECT
  c.title,
  c.description,
  a.id
FROM admin_user a
JOIN (
  VALUES
    ('PostgreSQL Fundamentals', 'Learn PostgreSQL'),
    ('Advanced SQL', 'CTEs and window functions'),
    ('Database Design', 'Schema design'),
    ('Node.js Backend', 'APIs with Node.js'),
    ('Performance Tuning', 'Indexes and performance')
) AS c(title, description) ON TRUE;
select * from courses c;


WITH course_data AS (
  SELECT id, title FROM courses
)
INSERT INTO course_videos (
  course_id, title, description, video_url, duration, order_index
)
SELECT
  c.id,
  v.title,
  v.description,
  v.video_url,
  v.duration,
  v.order_index
FROM course_data c
JOIN (
  VALUES
    ('PostgreSQL Fundamentals', 'Intro', 'Overview', 'https://vid.dev/pg1', 480, 1),
    ('PostgreSQL Fundamentals', 'Tables', 'Tables & schemas', 'https://vid.dev/pg2', 600, 2),
    ('Advanced SQL', 'CTEs', 'CTEs explained', 'https://vid.dev/sql1', 900, 1),
    ('Advanced SQL', 'Windows', 'Window functions', 'https://vid.dev/sql2', 1000, 2)
) AS v(course_title, title, description, video_url, duration, order_index)
ON v.course_title = c.title;
select * from course_videos cv ;



INSERT INTO course_assignment (user_id, course_id, progress_percentage)
SELECT
  u.id,
  c.id,
  (random() * 100)::DECIMAL(5,2)
FROM users u
JOIN roles r ON r.id = u.role_id
JOIN courses c ON TRUE
WHERE r.title = 'student';
select * from course_assignment ca ;


INSERT INTO video_progress (
  user_id,
  video_id,
  watched_duration,
  total_duration,
  percentage,
  completed
)
SELECT
  ca.user_id,
  v.id,
  v.duration,
  v.duration,
  100,
  true
FROM course_assignment ca
JOIN course_videos v ON v.course_id = ca.course_id;
select * from video_progress vp ;
