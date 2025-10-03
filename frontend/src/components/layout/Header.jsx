import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Bell, 
  User, 
  LogOut,
  Menu,
} from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { getUnreadNotifications } from '../../data/mockNotifications.js';

const Header = () => {
  const { currentUser, logout } = useApp();
  const location = useLocation();
  const unreadCount = getUnreadNotifications(currentUser?.id || 0).length;

  return (
    <div className="navbar bg-primary text-primary-content shadow-lg sticky top-0 z-50 h-20">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden hover:bg-primary-focus">
            <Menu size={24} />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 text-base-content rounded-box w-52"
          >
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active bg-primary text-primary-content' : ''}>
                Home
              </Link>
            </li>
            {(!currentUser || currentUser?.role === 'mentee') && (
              <>
                <li>
                  <Link to="/mentors" className={location.pathname === '/mentors' ? 'active bg-primary text-primary-content' : ''}>
                    Find Mentors
                  </Link>
                </li>
                <li>
                  <Link to="/my-bookings" className={location.pathname === '/my-bookings' ? 'active bg-primary text-primary-content' : ''}>
                    My Bookings
                  </Link>
                </li>
                <li>
                  <Link to="/ai-tools" className={location.pathname.startsWith('/ai-tools') ? 'active bg-primary text-primary-content' : ''}>
                    AI Tools
                  </Link>
                </li>
              </>
            )}
            {currentUser?.role === 'mentor' && (
              <>
                <li>
                  <Link to="/my-schedule" className={location.pathname === '/my-schedule' ? 'active bg-primary text-primary-content' : ''}>
                    My Schedule
                  </Link>
                </li>
                <li>
                  <Link to="/mentor-bookings" className={location.pathname === '/mentor-bookings' ? 'active bg-primary text-primary-content' : ''}>
                    Bookings
                  </Link>
                </li>
              </>
            )}
            {currentUser?.role === 'admin' && (
              <li>
                <Link to="/admin" className={location.pathname.startsWith('/admin') ? 'active bg-primary text-primary-content' : ''}>
                  Admin Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold hover:bg-primary-focus transition-all">
          <BookOpen className="mr-2" size={32} />
          <span className="hidden sm:inline">Mentoree</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-3">
          <li>
            <Link 
              to="/" 
              className={`text-base font-semibold transition-all ${
                location.pathname === '/' 
                  ? 'bg-white/20 text-white' 
                  : 'hover:bg-white/10'
              }`}
            >
              Home
            </Link>
          </li>
          {/* Show mentee menu for both logged in mentees and guests */}
          {(!currentUser || currentUser?.role === 'mentee') && (
            <>
              <li>
                <Link 
                  to="/mentors"
                  className={`text-base font-semibold transition-all ${
                    location.pathname === '/mentors' 
                      ? 'bg-white/20 text-white' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  Find Mentors
                </Link>
              </li>
              <li>
                <Link 
                  to="/my-bookings"
                  className={`text-base font-semibold transition-all ${
                    location.pathname === '/my-bookings' 
                      ? 'bg-white/20 text-white' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  My Bookings
                </Link>
              </li>
              <li>
                <Link 
                  to="/ai-tools"
                  className={`text-base font-semibold transition-all ${
                    location.pathname.startsWith('/ai-tools') 
                      ? 'bg-white/20 text-white' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  AI Tools
                </Link>
              </li>
            </>
          )}
          {currentUser?.role === 'mentor' && (
            <>
              <li>
                <Link 
                  to="/my-schedule"
                  className={`text-base font-semibold transition-all ${
                    location.pathname === '/my-schedule' 
                      ? 'bg-white/20 text-white' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  My Schedule
                </Link>
              </li>
              <li>
                <Link 
                  to="/mentor-bookings"
                  className={`text-base font-semibold transition-all ${
                    location.pathname === '/mentor-bookings' 
                      ? 'bg-white/20 text-white' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  Bookings
                </Link>
              </li>
            </>
          )}
          {currentUser?.role === 'admin' && (
            <li>
              <Link 
                to="/admin"
                className={`text-base font-semibold transition-all ${
                  location.pathname.startsWith('/admin') 
                    ? 'bg-white/20 text-white' 
                    : 'hover:bg-white/10'
                }`}
              >
                Admin Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end gap-4 mr-2">
        {currentUser ? (
          <>
            {/* Notifications */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle hover:bg-primary-focus transition-all">
                <div className="indicator">
                  <Bell size={22} />
                  {unreadCount > 0 && (
                    <span className="badge badge-sm badge-secondary indicator-item">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-80 bg-base-100 text-base-content shadow-xl"
              >
                <div className="card-body">
                  <h3 className="font-bold text-lg">Notifications</h3>
                  <p className="text-sm text-base-content/70">
                    You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                  </p>
                  <div className="card-actions">
                    <Link to="/notifications" className="btn btn-primary btn-block btn-sm">
                      View All
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* User Menu */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar hover:bg-primary-focus transition-all">
                <div className="w-11 rounded-full ring-2 ring-white/50 ring-offset-primary ring-offset-2">
                  <img src={currentUser?.avatar || 'https://i.pravatar.cc/150?img=0'} alt={currentUser?.name} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 z-[1] p-4 shadow-xl bg-base-100 text-base-content rounded-box w-64"
              >
                <li className="px-3 py-3 bg-base-200 rounded-lg mb-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-base font-bold text-base-content">{currentUser?.name}</span>
                    <span className="text-xs capitalize badge badge-primary badge-sm w-fit">{currentUser?.role}</span>
                  </div>
                </li>
                <li className="mt-2">
                  <Link to="/profile" className="text-base py-3 hover:bg-primary hover:text-primary-content transition-all">
                    <User size={18} />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <a onClick={logout} className="text-base py-3 hover:bg-error hover:text-error-content transition-all">
                    <LogOut size={18} />
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <Link 
            to="/login" 
            className="btn btn-secondary gap-2 px-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all font-semibold text-base"
          >
            <User size={18} />
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
