import { useState } from 'react';
import {
  Users,
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  Download,
} from 'lucide-react';
import { mockDashboardStats, mockMonthlyStats, mockTopMentors, mockRecentActivity } from '../../data/mockStats.js';
import { mockUsers } from '../../data/mockUsers.js';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-primary text-primary-content py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-xl opacity-90">Platform overview and management</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="tabs tabs-boxed bg-base-100 shadow-lg mb-6 p-2">
          <a
            className={`tab ${selectedTab === 'overview' ? 'tab-active' : ''}`}
            onClick={() => setSelectedTab('overview')}
          >
            Overview
          </a>
          <a
            className={`tab ${selectedTab === 'users' ? 'tab-active' : ''}`}
            onClick={() => setSelectedTab('users')}
          >
            Users
          </a>
          <a
            className={`tab ${selectedTab === 'bookings' ? 'tab-active' : ''}`}
            onClick={() => setSelectedTab('bookings')}
          >
            Bookings
          </a>
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-base-content/70 text-sm mb-1">Total Users</div>
                      <div className="text-3xl font-bold text-primary">
                        {mockDashboardStats.totalUsers}
                      </div>
                    </div>
                    <div className="bg-primary/10 text-primary p-4 rounded-full">
                      <Users size={32} />
                    </div>
                  </div>
                  <div className="text-success text-sm">+12 this month</div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-base-content/70 text-sm mb-1">Total Bookings</div>
                      <div className="text-3xl font-bold text-secondary">
                        {mockDashboardStats.totalBookings}
                      </div>
                    </div>
                    <div className="bg-secondary/10 text-secondary p-4 rounded-full">
                      <Calendar size={32} />
                    </div>
                  </div>
                  <div className="text-success text-sm">+91 this month</div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-base-content/70 text-sm mb-1">Revenue</div>
                      <div className="text-3xl font-bold text-accent">
                        ${mockDashboardStats.totalRevenue}
                      </div>
                    </div>
                    <div className="bg-accent/10 text-accent p-4 rounded-full">
                      <DollarSign size={32} />
                    </div>
                  </div>
                  <div className="text-success text-sm">+$4,550 this month</div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-base-content/70 text-sm mb-1">Avg Rating</div>
                      <div className="text-3xl font-bold text-warning">
                        {mockDashboardStats.avgRating}
                      </div>
                    </div>
                    <div className="bg-warning/10 text-warning p-4 rounded-full">
                      <Star size={32} />
                    </div>
                  </div>
                  <div className="text-base-content/70 text-sm">From {mockDashboardStats.totalReviews} reviews</div>
                </div>
              </div>
            </div>

            {/* Charts and Top Mentors */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Monthly Stats */}
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h2 className="card-title mb-4">Monthly Growth</h2>
                  <div className="space-y-2">
                    {mockMonthlyStats.map((stat) => (
                      <div key={stat.month} className="flex items-center justify-between">
                        <span className="font-semibold">{stat.month}</span>
                        <div className="flex gap-4 text-sm">
                          <span className="text-primary">{stat.bookings} bookings</span>
                          <span className="text-success">${stat.revenue}</span>
                          <span className="text-info">{stat.users} users</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Mentors */}
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h2 className="card-title mb-4">Top Mentors</h2>
                  <div className="space-y-4">
                    {mockTopMentors.map((mentor, index) => (
                      <div key={mentor.id} className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-primary w-8">{index + 1}</div>
                        <div className="avatar">
                          <div className="w-12 rounded-full">
                            <img src={mentor.avatar} alt={mentor.name} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{mentor.name}</div>
                          <div className="text-sm text-base-content/70">
                            {mentor.totalSessions} sessions • ${mentor.revenue}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-warning">
                          <Star size={16} fill="currentColor" />
                          <span className="font-semibold">{mentor.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {mockRecentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between py-2 border-b border-base-300 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="badge badge-primary">{activity.type.replace('_', ' ')}</div>
                        <span>
                          <span className="font-semibold">{activity.user}</span>{' '}
                          {activity.action}{' '}
                          <span className="font-semibold">{activity.target}</span>
                        </span>
                      </div>
                      <span className="text-sm text-base-content/70">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Users Tab */}
        {selectedTab === 'users' && (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex justify-between items-center mb-6">
                <h2 className="card-title">User Management</h2>
                <button className="btn btn-primary gap-2">
                  <Download size={20} />
                  Export CSV
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="w-10 rounded-full">
                                <img src={user.avatar} alt={user.name} />
                              </div>
                            </div>
                            <div className="font-semibold">{user.name}</div>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <div className={`badge ${user.role === 'mentor' ? 'badge-primary' : user.role === 'admin' ? 'badge-secondary' : 'badge-accent'}`}>
                            {user.role}
                          </div>
                        </td>
                        <td>
                          <div className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                            {user.status}
                          </div>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button className="btn btn-sm btn-ghost">
                              <UserCheck size={16} />
                            </button>
                            <button className="btn btn-sm btn-ghost text-error">
                              <UserX size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {selectedTab === 'bookings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-warning">Pending</h3>
                <div className="text-4xl font-bold">{mockDashboardStats.pendingBookings}</div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-success">Confirmed</h3>
                <div className="text-4xl font-bold">{mockDashboardStats.confirmedBookings}</div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-info">Completed</h3>
                <div className="text-4xl font-bold">{mockDashboardStats.completedBookings}</div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-error">Rejected</h3>
                <div className="text-4xl font-bold">{mockDashboardStats.rejectedBookings}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
