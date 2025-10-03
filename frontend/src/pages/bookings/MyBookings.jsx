import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Video, Star, X, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { getBookingsByMentee } from '../../data/mockBookings';
import { getUserById } from '../../data/mockUsers';

const MyBookings = () => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const allBookings = getBookingsByMentee(currentUser?.id || 0);

  const upcomingBookings = allBookings.filter(
    (b) => b.status === 'confirmed' && new Date(b.slotStartUtc) > new Date()
  );

  const pendingBookings = allBookings.filter((b) => b.status === 'pending');

  const completedBookings = allBookings.filter(
    (b) => b.status === 'completed' || (b.status === 'confirmed' && new Date(b.slotEndUtc) < new Date())
  );

  const cancelledBookings = allBookings.filter((b) => b.status === 'cancelled');

  const getBookingsByTab = () => {
    switch (activeTab) {
      case 'upcoming':
        return upcomingBookings;
      case 'pending':
        return pendingBookings;
      case 'completed':
        return completedBookings;
      case 'cancelled':
        return cancelledBookings;
      default:
        return [];
    }
  };

  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    // TODO: Call API to cancel booking
    console.log('Cancel booking:', selectedBooking.id);
    setShowCancelModal(false);
    setSelectedBooking(null);
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
    const mentor = getUserById(booking.mentorId);
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
                  <img src={mentor?.avatar} alt={mentor?.name} />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg">{mentor?.name}</h3>
                <div className={`badge badge-sm ${getStatusBadge(booking.status)}`}>
                  {booking.status}
                </div>
              </div>
            </div>
            {booking.status === 'confirmed' && !isPast && (
              <button
                onClick={() => handleCancelBooking(booking)}
                className="btn btn-ghost btn-sm btn-circle text-error"
              >
                <X size={20} />
              </button>
            )}
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
              <div className="text-sm text-base-content/70">
                <strong>Goal:</strong> {booking.goal}
              </div>
            )}
          </div>

          <div className="card-actions justify-end">
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
            {booking.status === 'completed' && !booking.hasReview && (
              <Link
                to={`/bookings/${booking.id}/review`}
                className="btn btn-accent btn-sm gap-2"
              >
                <Star size={16} />
                Leave Review
              </Link>
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
          <h1 className="text-4xl font-bold mb-4">My Bookings</h1>
          <p className="text-xl opacity-90">Manage your mentorship sessions</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="tabs tabs-boxed mb-6 bg-base-100 shadow-lg p-2">
          <button
            className={`tab tab-lg ${activeTab === 'upcoming' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming ({upcomingBookings.length})
          </button>
          <button
            className={`tab tab-lg ${activeTab === 'pending' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending ({pendingBookings.length})
          </button>
          <button
            className={`tab tab-lg ${activeTab === 'completed' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed ({completedBookings.length})
          </button>
          <button
            className={`tab tab-lg ${activeTab === 'cancelled' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled ({cancelledBookings.length})
          </button>
        </div>

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
              {activeTab === 'upcoming' || activeTab === 'pending'
                ? "You haven't booked any sessions yet"
                : `No ${activeTab} bookings to show`}
            </p>
            {(activeTab === 'upcoming' || activeTab === 'pending') && (
              <Link to="/mentors" className="btn btn-primary">
                Find a Mentor
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      {showCancelModal && selectedBooking && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Cancel Booking?</h3>
            <p className="mb-4">
              Are you sure you want to cancel this session with{' '}
              <strong>{getUserById(selectedBooking.mentorId)?.name}</strong>?
            </p>
            <div className="alert alert-warning mb-4">
              <span>
                Please note: Cancellations made less than 24 hours before the session may affect
                your booking privileges.
              </span>
            </div>
            <div className="modal-action">
              <button onClick={() => setShowCancelModal(false)} className="btn btn-ghost">
                Keep Booking
              </button>
              <button onClick={confirmCancel} className="btn btn-error">
                Cancel Booking
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setShowCancelModal(false)}></div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
