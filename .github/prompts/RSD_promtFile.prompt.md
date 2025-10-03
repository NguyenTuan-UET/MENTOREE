🎯 Mentoree – Luồng MVC rút gọn
1. Model (Dữ liệu cốt lõi)

User: id, email, password, role (mentor/mentee/admin), status, avatar, bio, skills[].

MentorAvailability: mentor_id, start_utc, end_utc, type(slot/block).

Booking: id, mentor_id, mentee_id, slot_start_utc, slot_end_utc, status, goal, meeting_link.

Review: id, booking_id, rating, comment, created_at.

CVVersion: id, mentee_id, file_url, is_current, score, report_json.

JD: id, mentee_id, file_url, parsed_json.

Notification: id, booking_id, type, sent_at, payload.

AuditLog: id, actor_id, action, target_type, target_id, meta, created_at.

2. View (Giao diện / Trải nghiệm người dùng)

Auth View: màn hình đăng ký, đăng nhập (Email/Google OAuth).

Profile View: form cập nhật avatar, bio, skills, upload CV (mentee) hoặc slot (mentor).

Search & Mentor List View: ô tìm kiếm + filter (skill, giá, kinh nghiệm, timezone).

Calendar View: lịch slot trống, chọn thời gian.

Booking View: form nhập mục tiêu, xem trạng thái booking, join meeting.

Review View: form chấm sao + comment.

Admin Dashboard View: thống kê user, booking, review, export CSV.

AI Views:

Analyze CV (score + feedback)

Optimize CV theo JD (kỹ năng thiếu / gợi ý)

Mock interview (chat Q&A)

Career Assistant (Q&A định hướng nghề nghiệp)

3. Controller (Luồng xử lý chính)

AuthController

Đăng ký / Đăng nhập (JWT, OAuth2)

Quên mật khẩu, khóa tài khoản

ProfileController

CRUD hồ sơ mentor/mentee

Upload CV (check PDF ≤ 5MB, lưu phiên bản)

SearchController

Tìm kiếm mentor theo filter, trả kết quả phân trang

BookingController

Tạo booking (mentee chọn slot → trạng thái “Chờ duyệt”)

Mentor accept → tạo link họp, chuyển “Đã xác nhận” + gửi notification

Mentor reject → booking “Đã từ chối” + giải phóng slot

Nhắc lịch: trigger T-24h, T-1h (job scheduler)

Join meeting: xác thực quyền truy cập

ReviewController

Gửi review (sau phiên kết thúc)

Tính điểm trung bình mentor

ScheduleController (mentor)

Quản lý slot trống, block time

Bật/tắt “Nhận lịch”

AdminController

Quản lý user: khóa/mở khóa, đổi role

Dashboard: thống kê, export CSV

AIController

AnalyzeCV: phân tích & chấm CV

OptimizeCV: so khớp CV–JD, gợi ý

MockInterview: hỏi – đáp AI, chấm điểm

CareerAssistant: trả lời câu hỏi nghề nghiệp

4. Business Flow (Luồng tổng quát)

Mentee login → search mentor → xem lịch → đặt slot.

Booking vào “Chờ duyệt” → Mentor accept/reject.

Nếu accept: tạo link họp, lên lịch reminder.

Đến giờ → cả hai join phòng → sau buổi mentee đánh giá.

AI features: mentee upload CV, JD → hệ thống phân tích, gợi ý → lưu version.

Admin theo dõi dashboard, xử lý tài khoản, xuất báo cáo.

5. Liên kết MVC

Model: giữ dữ liệu (User, Booking, CV, Review, Notification…).

Controller: xử lý logic (auth, booking, ai, admin).

View: hiển thị UI/UX (React/Next + Tailwind).