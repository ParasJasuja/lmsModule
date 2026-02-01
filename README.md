#### Database Tables
```
roles
 - id (PK)
 - title
 - description
 - created_at
 - updated_at
```

```
users
 - id (PK)
 - email
 - password
 - name
 - role_id (FK - roles)
 - is_active
 - created_at
 - updated_at
```

```
courses
 - id (PK)
 - title
 - description
 - thumbnail_url
 - created_by
 - is_active
 - created_at
 - updated_at
```

```
course_videos
 - id (PK)
 - course_id (FK - courses)
 - title
 - description
 - video_url
 - thumbnail_url
 - duration
 - order_index
 - is_active
 - created_at
 - updated_at
```

```
course_assignment
 - id (PK)
 - user_id (FK - users)
 - course_id (FK - users)
 - enrolled_at
 - completed_at
 - progress_percentage
 - is_active
```

```
video_progress
 - id
 - user_id
 - video_id
 - watched_duration
 - total_duration
 - percentage
 - completed
 - completed_at
 - updated_at
```

### Routes
#### Auth

```
POST   /auth/login             - Login
GET    /auth/me                - Get current user
```

#### Users (Admin only)

```
POST   /register               - Register new user (Admin only)
GET    /users                  - List all users
GET    /users/:id              - Get user by ID
PUT    /users/:id              - Update user
DELETE /users/:id              - Delete user
GET    /users/students         - List all students
```

#### Courses

```
GET    /courses                - List all courses (with filters)
GET    /courses/:id            - Get course details with videos
POST   /courses                - Create course (Admin)
PUT    /courses/:id            - Update course (Admin)
DELETE /courses/:id            - Delete course (Admin)
GET    /courses/categories     - Get all categories
GET    /courses/tags           - Get all tags
```

#### Videos

```
GET    /videos/:courseId       - Get videos by course
GET    /videos/detail/:id      - Get video details
POST   /videos                 - Create video (Admin)
PUT    /videos/:id             - Update video (Admin)
DELETE /videos/:id             - Delete video (Admin)
PUT    /videos/:id/reorder     - Reorder videos (Admin)
```

#### Enrollments

```
GET    /enrollments/courses           - Get student's enrolled courses
POST   /enrollments                   - Enroll student (Admin)
DELETE /enrollments/:id               - Unenroll student (Admin)
GET    /enrollments/course/:courseId  - Get course enrollments (Admin)
GET    /enrollments/student/:userId   - Get student enrollments (Admin)
```

#### Video Progress

```
GET    /progress/video/:videoId       - Get video progress
PUT    /progress/update               - Update progress
GET    /progress/course/:courseId     - Get course progress
```

#### Analytics (Admin only)

```
GET    /analytics/students            - Student-wise reports
GET    /analytics/courses             - Course-wise analytics
GET    /analytics/student/:userId     - Detailed student report
GET    /analytics/course/:courseId    - Detailed course analytics
```
