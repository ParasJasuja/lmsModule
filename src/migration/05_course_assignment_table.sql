CREATE TABLE IF NOT EXISTS course_assignment (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  progress_percentage DECIMAL(5,2) DEFAULT 0.00 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  is_active BOOLEAN DEFAULT true,
  UNIQUE(user_id, course_id)
);

CREATE INDEX idx_course_assignment_user ON course_assignment(user_id);
CREATE INDEX idx_course_assignment_course ON course_assignment(course_id);
CREATE INDEX idx_course_assignment_completed ON course_assignment(completed_at);
CREATE INDEX idx_course_assignment_progress ON course_assignment(progress_percentage);