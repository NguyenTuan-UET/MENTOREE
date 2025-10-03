import { useState } from 'react';
import { Bell, Check, Trash2, Calendar, Star, AlertCircle, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { getNotificationsByUser } from '../data/mockNotifications.js';
import { getUserById } from '../data/mockUsers.js';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState(
    getNotificationsByUser(currentUser?.id || 0)
  );

  const unreadNotifications = notifications.filter((n) => !n.read);
  const readNotifications = notifications.filter((n) => n.read);

  const getNotificationsByTab = () => {
    switch (activeTab) {
      case 'unread':
        return unreadNotifications;
      case 'read':
        return readNotifications;
      default:
        return notifications;
    }
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(
      notifications.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleDelete = (notificationId) => {
    setNotifications(notifications.filter((n) => n.id !== notificationId));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking_created':
      case 'booking_accepted':
      case 'booking_rejected':
        return Calendar;
      case 'review_received':
        return Star;
      case 'reminder':
        return AlertCircle;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'booking_accepted':
        return 'text-success';
      case 'booking_rejected':
        return 'text-error';
      case 'reminder':
        return 'text-warning';
      case 'review_received':
        return 'text-accent';
      default:
        return 'text-primary';
    }
  };

  const NotificationCard = ({ notification }) => {
    const Icon = getNotificationIcon(notification.type);
    const relatedUser = notification.payload?.userId
      ? getUserById(notification.payload.userId)
      : null;

    return (
      <div
        className={`card bg-base-100 shadow-lg hover:shadow-xl transition ${
          !notification.read ? 'border-l-4 border-primary' : ''
        }`}
      >
        <div className="card-body p-4">
          <div className="flex gap-4">
            {/* Icon */}
            <div className={`${getNotificationColor(notification.type)}`}>
              <Icon size={24} />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{notification.title}</h3>
                  <p className="text-sm text-base-content/70">
                    {new Date(notification.sentAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {!notification.read && (
                  <div className="badge badge-primary badge-sm">New</div>
                )}
              </div>

              <p className="text-base-content/80 mb-3">{notification.message}</p>

              {/* Related User */}
              {relatedUser && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img src={relatedUser.avatar} alt={relatedUser.name} />
                    </div>
                  </div>
                  <span className="text-sm font-semibold">{relatedUser.name}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 mt-3">
                {notification.payload?.bookingId && (
                  <Link
                    to={`/bookings/${notification.payload.bookingId}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                )}
                {!notification.read && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="btn btn-ghost btn-sm gap-2"
                  >
                    <Check size={16} />
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(notification.id)}
                  className="btn btn-ghost btn-sm btn-circle text-error ml-auto"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
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
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Bell size={32} />
                <h1 className="text-4xl font-bold">Notifications</h1>
              </div>
              <p className="text-xl opacity-90">Stay updated with your activities</p>
            </div>
            {unreadNotifications.length > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="btn btn-accent gap-2"
              >
                <CheckCircle size={20} />
                Mark All as Read
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="tabs tabs-boxed mb-6 bg-base-100 shadow-lg p-2">
          <button
            className={`tab tab-lg ${activeTab === 'all' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All ({notifications.length})
          </button>
          <button
            className={`tab tab-lg ${activeTab === 'unread' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('unread')}
          >
            Unread ({unreadNotifications.length})
          </button>
          <button
            className={`tab tab-lg ${activeTab === 'read' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('read')}
          >
            Read ({readNotifications.length})
          </button>
        </div>

        {/* Stats */}
        {activeTab === 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="stat bg-base-100 shadow-lg rounded-lg">
              <div className="stat-title">Total Notifications</div>
              <div className="stat-value text-primary">{notifications.length}</div>
            </div>
            <div className="stat bg-base-100 shadow-lg rounded-lg">
              <div className="stat-title">Unread</div>
              <div className="stat-value text-warning">{unreadNotifications.length}</div>
            </div>
            <div className="stat bg-base-100 shadow-lg rounded-lg">
              <div className="stat-title">Read</div>
              <div className="stat-value text-success">{readNotifications.length}</div>
            </div>
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-4">
          {getNotificationsByTab()
            .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt))
            .map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
        </div>

        {/* Empty State */}
        {getNotificationsByTab().length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-2xl font-bold mb-2">
              No {activeTab === 'all' ? '' : activeTab} notifications
            </h3>
            <p className="text-base-content/70">
              {activeTab === 'unread'
                ? "You're all caught up! No unread notifications."
                : activeTab === 'read'
                ? 'No read notifications to show.'
                : "You don't have any notifications yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
