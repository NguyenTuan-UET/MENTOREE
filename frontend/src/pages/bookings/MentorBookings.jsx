import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Video, CheckCircle, XCircle, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { getBookingsByMentor } from '../../data/mockBookings';
import { getUserById } from '../../data/mockUsers';

const MentorBookings = () => {
  const { currentUser, acceptBooking, rejectBooking } = useApp();
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const allBookings = getBookingsByMentor(currentUser?.id || 0);

  const pendingBookings = allBookings.filter((b) => b.status === 'pending');
  const upcomingBookings = allBookings.filter(
    (b) => b.status === 'confirmed' && new Date(b.slotStartUtc) > new Date()
  );
  const completedBookings = allBookings.filter(
    (b) => b.status === 'completed' || (b.status === 'confirmed' && new Date(b.slotEndUtc) < new Date())
  );

  const getBookingsByTab = () => {
    switch (activeTab) {
      case 'pending':
        return pendingBookings;
      case 'upcoming':
        return upcomingBookings;
      case 'completed':
        return completedBookings;
      default:
        return [];
    }
  };

  const handleAccept = async (bookingId) => {
    await acceptBooking(bookingId);
    // TODO: Refresh bookings
  };

  const handleReject = (booking) => {
    setSelectedBooking(booking);
    setShowRejectModal(true);
  };

  const confirmReject = async () => {
    if (selectedBooking) {
      await rejectBooking(selectedBooking.id, rejectReason);
      setShowRejectModal(false);
      setSelectedBooking(null);
      setRejectReason('');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge-warning',
      confirmed: 'badge-success',
      completed: 'badge-info',
      cancelled: 'badge-error',
    };
    return badges[status] || 'badge-ghost';
  };

  const BookingCard = ({ booking }) => {
    const mentee = getUserById(booking.menteeId);
    const startDate = new Date(booking.slotStartUtc);
    const endDate = new Date(booking.slotEndUtc);
    const isPast = endDate < new Date();

    return (
      <div className="card bg-base-100 shadow-lg hover:shadow-xl transition">
        <div className="card-body">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={mentee?.avatar} alt={mentee?.name} />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg">{mentee?.name}</h3>
                <div className={`badge badge-sm ${getStatusBadge(booking.status)}`}>
                  {booking.status}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-base-content/70">
              <Calendar size={16} />
              <span>{startDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2 text-base-content/70">
              <Clock size={16} />
              <span>
                {startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} -{' '}
                {endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            {booking.goal && (
              <div className="text-sm">
                <strong>Session Goal:</strong>
                <p className="text-base-content/70 mt-1">{booking.goal}</p>
              </div>
            )}
          </div>

          <div className="card-actions justify-end">
            {booking.status === 'pending' && (
              <>
                <button
                  onClick={() => handleReject(booking)}
                  className="btn btn-error btn-sm gap-2"
                >
                  <XCircle size={16} />
                  Reject
                </button>
                <button
                  onClick={() => handleAccept(booking.id)}
                  className="btn btn-success btn-sm gap-2"
                >
                  <CheckCircle size={16} />
                  Accept
                </button>
              </>
            )}
            {booking.status === 'confirmed' && !isPast && booking.meetingLink && (
              <a
                href={booking.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm gap-2"
              >
                <Video size={16} />
                Join Meeting
              </a>
            )}
            <Link
              to={`/bookings/${booking.id}`}
              className="btn btn-ghost btn-sm gap-2"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-primary text-primary-content py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Mentor Bookings</h1>
          <p className="text-xl opacity-90">Manage your mentorship sessions</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="tabs tabs-boxed mb-6 bg-base-100 shadow-lg p-2">
          <button
            className={`tab tab-lg ${activeTab === 'pending' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending ({pendingBookings.length})
          </button>
          <button
            className={`tab tab-lg ${activeTab === 'upcoming' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming ({upcomingBookings.length})
          </button>
          <button
            className={`tab tab-lg ${activeTab === 'completed' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed ({completedBookings.length})
          </button>
        </div>

        {/* Pending Requests Alert */}
        {pendingBookings.length > 0 && activeTab !== 'pending' && (
          <div className="alert alert-info mb-6">
            <span>
              You have {pendingBookings.length} pending booking request{pendingBookings.length > 1 ? 's' : ''} waiting for your response.
            </span>
            <button onClick={() => setActiveTab('pending')} className="btn btn-sm btn-primary">
              Review Now
            </button>
          </div>
        )}

        {/* Bookings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getBookingsByTab().map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>

        {/* Empty State */}
        {getBookingsByTab().length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold mb-2">No {activeTab} bookings</h3>
            <p className="text-base-content/70 mb-4">
              {activeTab === 'pending'
                ? 'No pending booking requests at the moment'
                : `No ${activeTab} bookings to show`}
            </p>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && selectedBooking && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Reject Booking Request</h3>
            <p className="mb-4">
              Please provide a reason for rejecting the booking with{' '}
              <strong>{getUserById(selectedBooking.menteeId)?.name}</strong>
            </p>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Reason (optional)</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="e.g., Schedule conflict, Topic outside my expertise..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
            <div className="modal-action">
              <button onClick={() => setShowRejectModal(false)} className="btn btn-ghost">
                Cancel
              </button>
              <button onClick={confirmReject} className="btn btn-error">
                Confirm Rejection
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setShowRejectModal(false)}></div>
        </div>
      )}
    </div>
  );
};

export default MentorBookings;
