import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MessageCircle, CreditCard, ArrowLeft, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { getUserById } from '../../data/mockUsers';
import { getAvailabilityByMentor } from '../../data/mockAvailability';

const BookSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, createBooking } = useApp();
  const mentor = getUserById(Number(id));
  const availability = getAvailabilityByMentor(Number(id));

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);

  // Filter only available slots (type='slot', not booked, future dates)
  const availableSlots = availability
    .filter((slot) => slot.type === 'slot' && new Date(slot.startUtc) > new Date())
    .sort((a, b) => new Date(a.startUtc) - new Date(b.startUtc));

  // Group slots by date
  const groupedSlots = availableSlots.reduce((acc, slot) => {
    const date = new Date(slot.startUtc).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(slot);
    return acc;
  }, {});

  const dates = Object.keys(groupedSlots).sort((a, b) => new Date(a) - new Date(b));

  const handleBooking = async () => {
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }

    if (!goal.trim()) {
      alert('Please describe your session goal');
      return;
    }

    setLoading(true);

    const bookingData = {
      mentorId: mentor.id,
      menteeId: currentUser.id,
      slotId: selectedSlot.id,
      goal: goal.trim(),
    };

    const result = await createBooking(bookingData);

    setLoading(false);

    if (result.success) {
      alert('Booking request sent successfully! The mentor will review and confirm.');
      navigate('/my-bookings');
    }
  };

  if (!mentor) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Mentor not found</h2>
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          Go Back
        </button>
      </div>
    );
  }

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
          <h1 className="text-4xl font-bold mb-2">Book a Session</h1>
          <p className="text-xl opacity-90">with {mentor.name}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Calendar & Slots */}
          <div className="lg:col-span-2 space-y-6">
            {/* Available Slots */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  <Calendar size={24} />
                  Select a Time Slot
                </h2>

                {dates.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📅</div>
                    <h3 className="text-2xl font-bold mb-2">No Available Slots</h3>
                    <p className="text-base-content/70">
                      This mentor doesn't have any available time slots at the moment.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {dates.map((date) => (
                      <div key={date}>
                        <h3 className="font-bold text-lg mb-3">
                          {new Date(date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {groupedSlots[date].map((slot) => (
                            <button
                              key={slot.id}
                              onClick={() => setSelectedSlot(slot)}
                              className={`btn ${
                                selectedSlot?.id === slot.id
                                  ? 'btn-primary'
                                  : 'btn-outline'
                              } gap-2`}
                            >
                              <Clock size={16} />
                              {new Date(slot.startUtc).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                              {selectedSlot?.id === slot.id && <Check size={16} />}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Session Goal */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  <MessageCircle size={24} />
                  Session Goal
                </h2>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      What would you like to learn or discuss?
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-32"
                    placeholder="e.g., I want to learn React hooks, get feedback on my portfolio, prepare for interviews..."
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  />
                  <label className="label">
                    <span className="label-text-alt text-base-content/70">
                      This helps the mentor prepare for your session
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Summary & Payment */}
          <div className="space-y-6">
            {/* Booking Summary */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title mb-4">Booking Summary</h3>

                {/* Mentor Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={mentor.avatar} alt={mentor.name} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold">{mentor.name}</h4>
                    <p className="text-sm text-base-content/70">{mentor.experience}</p>
                  </div>
                </div>

                <div className="divider"></div>

                {/* Selected Slot */}
                {selectedSlot ? (
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-base-content/70">Date & Time</div>
                      <div className="font-semibold">
                        {new Date(selectedSlot.startUtc).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="font-semibold">
                        {new Date(selectedSlot.startUtc).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        -{' '}
                        {new Date(selectedSlot.endUtc).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-base-content/70">Duration</div>
                      <div className="font-semibold">
                        {Math.round(
                          (new Date(selectedSlot.endUtc) - new Date(selectedSlot.startUtc)) /
                            60000
                        )}{' '}
                        minutes
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-base-content/70">Rate</div>
                      <div className="font-semibold text-success text-2xl">
                        ${mentor.price}/hour
                      </div>
                    </div>

                    <div className="divider"></div>

                    <div className="bg-primary/10 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-2xl text-primary">
                          ${mentor.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-base-content/70">
                    Select a time slot to see booking summary
                  </div>
                )}

                {/* Book Button */}
                <button
                  onClick={handleBooking}
                  className={`btn btn-primary btn-block gap-2 mt-4 ${loading ? 'loading' : ''}`}
                  disabled={!selectedSlot || !goal.trim() || loading}
                >
                  {!loading && <CreditCard size={20} />}
                  {loading ? 'Processing...' : 'Request Booking'}
                </button>

                <div className="text-xs text-center text-base-content/70 mt-2">
                  Payment will be processed after mentor confirms
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-sm">Cancellation Policy</h3>
                <ul className="text-xs text-base-content/70 space-y-1">
                  <li>• Free cancellation up to 24 hours before session</li>
                  <li>• 50% refund for cancellations within 24 hours</li>
                  <li>• No refund for no-shows</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSession;
