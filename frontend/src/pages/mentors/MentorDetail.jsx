import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  DollarSign,
  Clock,
  MapPin,
  Award,
  MessageCircle,
  Calendar,
  Languages,
} from 'lucide-react';
import { getUserById } from '../../data/mockUsers.js';
import { getReviewsByMentor } from '../../data/mockReviews';
import { getAvailabilityByMentor } from '../../data/mockAvailability';

const MentorDetail = () => {
  const { id } = useParams();
  const mentor = getUserById(Number(id));
  const reviews = getReviewsByMentor(Number(id));
  const availability = getAvailabilityByMentor(Number(id));
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (!mentor) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Mentor not found</h2>
        <Link to="/mentors" className="btn btn-primary">
          Back to Mentors
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-white ring-offset-base-100 ring-offset-4">
                <img src={mentor.avatar} alt={mentor.name} />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{mentor.name}</h1>
              <div className="flex items-center gap-4 justify-center md:justify-start mb-4 flex-wrap">
                <div className="flex items-center gap-1">
                  <Star size={20} fill="currentColor" className="text-warning" />
                  <span className="font-semibold text-xl">{mentor.rating}</span>
                  <span className="opacity-90">({mentor.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award size={20} />
                  <span>{mentor.experience}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={20} />
                  <span>{mentor.responseTime}</span>
                </div>
              </div>
              <div className="text-3xl font-bold mb-4">
                <DollarSign size={24} className="inline" />
                {mentor.price}/hour
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowBookingModal(true)}
                className="btn btn-accent btn-lg gap-2"
              >
                <Calendar size={20} />
                Book a Session
              </button>
              <button className="btn btn-outline border-white text-white hover:bg-white hover:text-primary">
                <MessageCircle size={20} />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">About Me</h2>
                <p className="text-base-content/80 leading-relaxed">{mentor.bio}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Skills & Expertise</h2>
                <div className="flex flex-wrap gap-3">
                  {mentor.skills.map((skill) => (
                    <div key={skill} className="badge badge-primary badge-lg">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  Reviews ({reviews.length})
                </h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-base-300 last:border-0 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-warning">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              fill={i < review.rating ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-base-content/70">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-base-content/80">{review.comment}</p>
                    </div>
                  ))}
                  {reviews.length === 0 && (
                    <p className="text-base-content/70 text-center py-8">
                      No reviews yet. Be the first to review!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-primary" />
                    <div>
                      <div className="text-sm text-base-content/70">Timezone</div>
                      <div className="font-semibold">{mentor.timezone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Languages size={20} className="text-primary" />
                    <div>
                      <div className="text-sm text-base-content/70">Languages</div>
                      <div className="font-semibold">{mentor.languages.join(', ')}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-primary" />
                    <div>
                      <div className="text-sm text-base-content/70">Response Time</div>
                      <div className="font-semibold text-success">{mentor.responseTime}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Overview */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title mb-4">Availability</h3>
                <p className="text-base-content/70 text-sm mb-4">
                  {availability.length} time slots available this week
                </p>
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="btn btn-primary btn-block"
                >
                  View Calendar & Book
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title mb-4">Stats</h3>
                <div className="stats stats-vertical shadow">
                  <div className="stat">
                    <div className="stat-title">Total Sessions</div>
                    <div className="stat-value text-primary">{mentor.totalReviews}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Response Rate</div>
                    <div className="stat-value text-success text-2xl">100%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-2xl mb-4">Book a Session with {mentor.name}</h3>
            <p className="text-base-content/70 mb-6">
              This is a placeholder for the booking calendar. In the full implementation, you can
              select available time slots and book a session.
            </p>
            
            <div className="alert alert-info mb-4">
              <span>See the full booking calendar in the dedicated booking page.</span>
            </div>

            <div className="modal-action">
              <button onClick={() => setShowBookingModal(false)} className="btn btn-ghost">
                Close
              </button>
              <Link
                to={`/book/${mentor.id}`}
                className="btn btn-primary"
                onClick={() => setShowBookingModal(false)}
              >
                Go to Booking Page
              </Link>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setShowBookingModal(false)}></div>
        </div>
      )}
    </div>
  );
};

export default MentorDetail;
