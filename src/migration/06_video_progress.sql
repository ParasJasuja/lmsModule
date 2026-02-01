CREATE TABLE IF NOT EXISTS video_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  video_id UUID NOT NULL REFERENCES course_videos(id) ON DELETE CASCADE,
  watched_duration INTEGER DEFAULT 0 CHECK (watched_duration >= 0),
  total_duration INTEGER CHECK (total_duration > 0),
  percentage DECIMAL(5,2) DEFAULT 0.00 CHECK (percentage >= 0 AND percentage <= 100),
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, video_id)
);

CREATE INDEX idx_video_progress_user ON video_progress(user_id);
CREATE INDEX idx_video_progress_video ON video_progress(video_id);
CREATE INDEX idx_video_progress_user_video ON video_progress(user_id, video_id);
CREATE INDEX idx_video_progress_completed ON video_progress(user_id, completed);
CREATE INDEX idx_video_progress_percentage ON video_progress(percentage);

CREATE OR REPLACE FUNCTION check_video_completion()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.percentage >= 90.00 AND OLD.completed = FALSE THEN
    NEW.completed = TRUE;
    NEW.completed_at = CURRENT_TIMESTAMP;
  END IF;
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_video_progress_completion 
  BEFORE UPDATE ON video_progress 
  FOR EACH ROW 
  EXECUTE FUNCTION check_video_completion();

