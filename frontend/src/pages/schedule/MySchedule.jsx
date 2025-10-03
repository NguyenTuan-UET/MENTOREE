import { useState } from 'react';
import { Calendar, Clock, Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { getAvailabilityByMentor } from '../../data/mockAvailability';

const MySchedule = () => {
  const { currentUser } = useApp();
  const [slots, setSlots] = useState(getAvailabilityByMentor(currentUser?.id || 0));
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [acceptingBookings, setAcceptingBookings] = useState(true);
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'list'

  const [newSlot, setNewSlot] = useState({
    date: '',
    startTime: '',
    endTime: '',
    type: 'slot', // 'slot' or 'block'
  });

  const handleAddSlot = () => {
    // TODO: Call API to add availability slot
    console.log('Add slot:', newSlot);
    setShowAddModal(false);
    setNewSlot({ date: '', startTime: '', endTime: '', type: 'slot' });
  };

  const handleDeleteSlot = (slotId) => {
    // TODO: Call API to delete availability slot
    console.log('Delete slot:', slotId);
    setSlots(slots.filter((s) => s.id !== slotId));
  };

  const handleEditSlot = (slot) => {
    setEditingSlot(slot);
  };

  const handleSaveEdit = () => {
    // TODO: Call API to update availability slot
    console.log('Update slot:', editingSlot);
    setEditingSlot(null);
  };

  const handleToggleBookings = () => {
    // TODO: Call API to toggle accepting bookings
    setAcceptingBookings(!acceptingBookings);
  };

  const groupSlotsByDate = () => {
    const grouped = {};
    slots.forEach((slot) => {
      const date = new Date(slot.startUtc).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(slot);
    });
    return grouped;
  };

  const groupedSlots = groupSlotsByDate();
  const dates = Object.keys(groupedSlots).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const getSlotColor = (type) => {
    return type === 'block' ? 'bg-error/20 border-error' : 'bg-success/20 border-success';
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-primary text-primary-content py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">My Schedule</h1>
              <p className="text-xl opacity-90">Manage your availability and time blocks</p>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer gap-3">
                <span className="label-text text-white font-semibold">Accept Bookings</span>
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  checked={acceptingBookings}
                  onChange={handleToggleBookings}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Alert */}
        {!acceptingBookings && (
          <div className="alert alert-warning mb-6">
            <span>
              You are currently not accepting new bookings. Toggle the switch above to start
              accepting bookings again.
            </span>
          </div>
        )}

        {/* Actions Bar */}
        <div className="card bg-base-100 shadow-lg mb-6">
          <div className="card-body">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="tabs tabs-boxed">
                <button
                  className={`tab ${viewMode === 'week' ? 'tab-active' : ''}`}
                  onClick={() => setViewMode('week')}
                >
                  Week View
                </button>
                <button
                  className={`tab ${viewMode === 'list' ? 'tab-active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  List View
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn btn-primary gap-2"
                >
                  <Plus size={20} />
                  Add Availability
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="stat bg-base-100 shadow-lg rounded-lg">
            <div className="stat-title">Total Slots</div>
            <div className="stat-value text-primary">
              {slots.filter((s) => s.type === 'slot').length}
            </div>
            <div className="stat-desc">Available time slots</div>
          </div>
          <div className="stat bg-base-100 shadow-lg rounded-lg">
            <div className="stat-title">Blocked Time</div>
            <div className="stat-value text-error">
              {slots.filter((s) => s.type === 'block').length}
            </div>
            <div className="stat-desc">Unavailable periods</div>
          </div>
          <div className="stat bg-base-100 shadow-lg rounded-lg">
            <div className="stat-title">This Week</div>
            <div className="stat-value text-success">
              {
                slots.filter((s) => {
                  const slotDate = new Date(s.startUtc);
                  const today = new Date();
                  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                  return slotDate >= today && slotDate <= nextWeek;
                }).length
              }
            </div>
            <div className="stat-desc">Slots available</div>
          </div>
        </div>

        {/* Schedule Display */}
        {viewMode === 'list' ? (
          <div className="space-y-6">
            {dates.map((date) => (
              <div key={date} className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title mb-4">
                    <Calendar className="text-primary" size={24} />
                    {new Date(date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </h3>
                  <div className="space-y-2">
                    {groupedSlots[date]
                      .sort((a, b) => new Date(a.startUtc) - new Date(b.startUtc))
                      .map((slot) => (
                        <div
                          key={slot.id}
                          className={`flex items-center justify-between p-4 rounded-lg border-2 ${getSlotColor(
                            slot.type
                          )}`}
                        >
                          <div className="flex items-center gap-4">
                            <Clock size={20} />
                            <div>
                              <div className="font-semibold">
                                {new Date(slot.startUtc).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}{' '}
                                -{' '}
                                {new Date(slot.endUtc).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </div>
                              <div className="text-sm text-base-content/70">
                                {slot.type === 'block' ? 'Blocked Time' : 'Available Slot'}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditSlot(slot)}
                              className="btn btn-ghost btn-sm btn-circle"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteSlot(slot.id)}
                              className="btn btn-ghost btn-sm btn-circle text-error"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
            {dates.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-2xl font-bold mb-2">No availability set</h3>
                <p className="text-base-content/70 mb-4">
                  Add your available time slots to start accepting bookings
                </p>
                <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
                  Add Availability
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <p className="text-center text-base-content/70 py-12">
                Calendar week view will be implemented here with a calendar component
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add Availability Modal */}
      {showAddModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-2xl mb-4">Add Availability</h3>

            <div className="space-y-4">
              {/* Type Selection */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Type</span>
                </label>
                <div className="flex gap-4">
                  <label className="cursor-pointer label">
                    <input
                      type="radio"
                      name="type"
                      className="radio radio-primary mr-2"
                      checked={newSlot.type === 'slot'}
                      onChange={() => setNewSlot({ ...newSlot, type: 'slot' })}
                    />
                    <span className="label-text">Available Slot</span>
                  </label>
                  <label className="cursor-pointer label">
                    <input
                      type="radio"
                      name="type"
                      className="radio radio-error mr-2"
                      checked={newSlot.type === 'block'}
                      onChange={() => setNewSlot({ ...newSlot, type: 'block' })}
                    />
                    <span className="label-text">Block Time</span>
                  </label>
                </div>
              </div>

              {/* Date */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered"
                  value={newSlot.date}
                  onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
                  required
                />
              </div>

              {/* Start Time */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Start Time</span>
                </label>
                <input
                  type="time"
                  className="input input-bordered"
                  value={newSlot.startTime}
                  onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                  required
                />
              </div>

              {/* End Time */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">End Time</span>
                </label>
                <input
                  type="time"
                  className="input input-bordered"
                  value={newSlot.endTime}
                  onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                  required
                />
              </div>

              <div className="alert alert-info">
                <span className="text-sm">
                  {newSlot.type === 'slot'
                    ? 'This time slot will be available for mentees to book.'
                    : 'This time will be blocked and unavailable for bookings.'}
                </span>
              </div>
            </div>

            <div className="modal-action">
              <button onClick={() => setShowAddModal(false)} className="btn btn-ghost">
                Cancel
              </button>
              <button onClick={handleAddSlot} className="btn btn-primary">
                Add
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setShowAddModal(false)}></div>
        </div>
      )}

      {/* Edit Slot Modal */}
      {editingSlot && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-2xl mb-4">Edit Availability</h3>
            <p className="text-base-content/70 mb-4">
              Edit functionality will be implemented with API integration
            </p>
            <div className="modal-action">
              <button onClick={() => setEditingSlot(null)} className="btn btn-ghost">
                Cancel
              </button>
              <button onClick={handleSaveEdit} className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setEditingSlot(null)}></div>
        </div>
      )}
    </div>
  );
};

export default MySchedule;
