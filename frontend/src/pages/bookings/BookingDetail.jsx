import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Video, MapPin, MessageCircle, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { getBookingById } from '../../data/mockBookings';
import { getUserById } from '../../data/mockUsers';

const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useApp();
  const booking = getBookingById(Number(id));

  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Booking not found</h2>
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          Go Back
        </button>
      </div>
    );
  }

  const mentor = getUserById(booking.mentorId);
  const mentee = getUserById(booking.menteeId);
  const otherUser = currentUser?.role === 'mentor' ? mentee : mentor;
  const startDate = new Date(booking.slotStartUtc);
  const endDate = new Date(booking.slotEndUtc);
  const isPast = endDate < new Date();
  const isUpcoming = startDate > new Date();

  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: 'badge-warning', text: 'Pending Approval' },
      confirmed: { class: 'badge-success', text: 'Confirmed' },
      completed: { class: 'badge-info', text: 'Completed' },
      cancelled: { class: 'badge-error', text: 'Cancelled' },
    };
    return badges[status] || { class: 'badge-ghost', text: status };
  };

  const statusBadge = getStatusBadge(booking.status);

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-sm mb-4 text-white hover:bg-white/20"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className="text-4xl font-bold mb-2">Booking Details</h1>
          <div className={`badge ${statusBadge.class} badge-lg`}>
            {statusBadge.text}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Session Information */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Session Information</h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar size={24} className="text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Date</div>
                      <div className="text-base-content/70">
                        {startDate.toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={24} className="text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Time</div>
                      <div className="text-base-content/70">
                        {startDate.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        -{' '}
                        {endDate.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                        <span className="text-sm ml-2">
                          ({Math.round((endDate - startDate) / 60000)} minutes)
                        </span>
                      </div>
                    </div>
                  </div>

                  {booking.goal && (
                    <div className="flex items-start gap-3">
                      <MessageCircle size={24} className="text-primary mt-1" />
                      <div>
                        <div className="font-semibold">Session Goal</div>
                        <div className="text-base-content/70">{booking.goal}</div>
                      </div>
                    </div>
                  )}

                  {booking.meetingLink && booking.status === 'confirmed' && (
                    <div className="flex items-start gap-3">
                      <Video size={24} className="text-primary mt-1" />
                      <div className="flex-1">
                        <div className="font-semibold mb-2">Meeting Link</div>
                        <a
                          href={booking.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm gap-2"
                        >
                          <Video size={16} />
                          Join Meeting
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Booking Timeline</h2>
                <ul className="timeline timeline-vertical">
                  <li>
                    <div className="timeline-start">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </div>
                    <div className="timeline-middle">
                      <div className="w-4 h-4 rounded-full bg-primary"></div>
                    </div>
                    <div className="timeline-end timeline-box">Booking Requested</div>
                    <hr className="bg-primary" />
                  </li>
                  {booking.status !== 'pending' && (
                    <li>
                      <hr className="bg-primary" />
                      <div className="timeline-start">
                        {booking.confirmedAt
                          ? new Date(booking.confirmedAt).toLocaleDateString()
                          : 'N/A'}
                      </div>
                      <div className="timeline-middle">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            booking.status === 'cancelled' ? 'bg-error' : 'bg-success'
                          }`}
                        ></div>
                      </div>
                      <div className="timeline-end timeline-box">
                        {booking.status === 'cancelled' ? 'Booking Cancelled' : 'Booking Confirmed'}
                      </div>
                      {booking.status === 'completed' && <hr className="bg-success" />}
                    </li>
                  )}
                  {booking.status === 'completed' && (
                    <li>
                      <hr className="bg-success" />
                      <div className="timeline-start">
                        {endDate.toLocaleDateString()}
                      </div>
                      <div className="timeline-middle">
                        <div className="w-4 h-4 rounded-full bg-info"></div>
                      </div>
                      <div className="timeline-end timeline-box">Session Completed</div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Participant Info */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title mb-4">
                  {currentUser?.role === 'mentor' ? 'Mentee' : 'Mentor'}
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={otherUser?.avatar} alt={otherUser?.name} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold">{otherUser?.name}</h4>
                    <p className="text-sm text-base-content/70">{otherUser?.email}</p>
                  </div>
                </div>
                <Link
                  to={`/profile/${otherUser?.id}`}
                  className="btn btn-outline btn-sm btn-block"
                >
                  View Profile
                </Link>
              </div>
            </div>

            {/* Mentor Info (for mentee view) */}
            {currentUser?.role === 'mentee' && mentor && (
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title mb-4">Mentor Details</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-base-content/70">Experience</div>
                      <div className="font-semibold">{mentor.experience}</div>
                    </div>
                    <div>
                      <div className="text-sm text-base-content/70">Timezone</div>
                      <div className="font-semibold">{mentor.timezone}</div>
                    </div>
                    <div>
                      <div className="text-sm text-base-content/70">Skills</div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {mentor.skills?.slice(0, 3).map((skill) => (
                          <div key={skill} className="badge badge-primary badge-sm">
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            {booking.status === 'completed' && !booking.hasReview && currentUser?.role === 'mentee' && (
              <div className="card bg-primary text-primary-content shadow-lg">
                <div className="card-body">
                  <h3 className="card-title">Leave a Review</h3>
                  <p className="text-sm opacity-90">Share your experience with this session</p>
                  <Link
                    to={`/bookings/${booking.id}/review`}
                    className="btn btn-accent btn-sm mt-2"
                  >
                    Write Review
                  </Link>
                </div>
              </div>
            )}

            {/* Help */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-sm">Need Help?</h3>
                <p className="text-xs text-base-content/70">
                  If you have any issues with this booking, please contact our support team.
                </p>
                <button className="btn btn-ghost btn-sm btn-block mt-2">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
