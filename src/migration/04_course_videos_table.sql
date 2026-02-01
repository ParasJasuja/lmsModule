CREATE TABLE IF NOT EXISTS course_videos (
  id  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  video_url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500),
  duration INTEGER NOT NULL,
  order_index INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_course_videos_course_id ON course_videos(course_id);

CREATE TRIGGER update_course_videos_updated_at 
  BEFORE UPDATE ON course_videos 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();