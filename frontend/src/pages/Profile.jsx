import { useState } from 'react';
import { Camera, Mail, MapPin, Award, Save, Plus, X } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const Profile = () => {
  const { currentUser, updateProfile } = useApp();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    bio: currentUser?.bio || '',
    skills: currentUser?.skills || [],
    timezone: currentUser?.timezone || 'UTC+7',
    price: currentUser?.price || 0,
    experience: currentUser?.experience || '',
    languages: currentUser?.languages || [],
  });
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim() && !formData.languages.includes(newLanguage.trim())) {
      setFormData({
        ...formData,
        languages: [...formData.languages, newLanguage.trim()],
      });
      setNewLanguage('');
    }
  };

  const handleRemoveLanguage = (langToRemove) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((lang) => lang !== langToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Call API to update profile
    await updateProfile(formData);

    setLoading(false);
    setEditing(false);
  };

  const handleAvatarChange = () => {
    // TODO: Implement avatar upload
    console.log('Upload avatar');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Header with Avatar */}
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-6">
            <div className="relative">
              <div className="avatar">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                  <img src={currentUser?.avatar} alt={currentUser?.name} />
                </div>
              </div>
              {editing && (
                <button
                  onClick={handleAvatarChange}
                  className="btn btn-circle btn-sm btn-primary absolute bottom-0 right-0"
                >
                  <Camera size={16} />
                </button>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <h1 className="text-3xl font-bold">{currentUser?.name}</h1>
                <div className={`badge badge-lg ${currentUser?.role === 'mentor' ? 'badge-primary' : 'badge-secondary'}`}>
                  {currentUser?.role}
                </div>
              </div>
              <div className="flex items-center gap-2 text-base-content/70 justify-center md:justify-start">
                <Mail size={16} />
                <span>{currentUser?.email}</span>
              </div>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="btn btn-primary btn-sm mt-4"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Bio */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Bio</span>
              </label>
              {editing ? (
                <textarea
                  name="bio"
                  className="textarea textarea-bordered h-32"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-base-content/80">{currentUser?.bio || 'No bio added yet.'}</p>
              )}
            </div>

            {/* Skills */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Skills</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.skills.map((skill) => (
                  <div key={skill} className="badge badge-primary badge-lg gap-2">
                    {skill}
                    {editing && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-error"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {editing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input input-bordered flex-1"
                    placeholder="Add a skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="btn btn-primary"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Mentor-specific fields */}
            {currentUser?.role === 'mentor' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Experience */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Experience</span>
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        name="experience"
                        className="input input-bordered"
                        placeholder="e.g., 5 years"
                        value={formData.experience}
                        onChange={handleChange}
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Award size={20} className="text-primary" />
                        <span>{currentUser?.experience}</span>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Hourly Rate ($)</span>
                    </label>
                    {editing ? (
                      <input
                        type="number"
                        name="price"
                        className="input input-bordered"
                        placeholder="50"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    ) : (
                      <span className="text-2xl font-bold text-success">
                        ${currentUser?.price}/hr
                      </span>
                    )}
                  </div>

                  {/* Timezone */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Timezone</span>
                    </label>
                    {editing ? (
                      <select
                        name="timezone"
                        className="select select-bordered"
                        value={formData.timezone}
                        onChange={handleChange}
                      >
                        <option>UTC+0</option>
                        <option>UTC+1</option>
                        <option>UTC+2</option>
                        <option>UTC+7</option>
                        <option>UTC+8</option>
                        <option>UTC+9</option>
                        <option>UTC-5</option>
                        <option>UTC-8</option>
                      </select>
                    ) : (
                      <div className="flex items-center gap-2">
                        <MapPin size={20} className="text-primary" />
                        <span>{currentUser?.timezone}</span>
                      </div>
                    )}
                  </div>

                  {/* Response Time */}
                  {!editing && (
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Response Time</span>
                      </label>
                      <span className="text-success font-semibold">
                        {currentUser?.responseTime}
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Languages */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Languages</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.languages.map((lang) => (
                  <div key={lang} className="badge badge-accent badge-lg gap-2">
                    {lang}
                    {editing && (
                      <button
                        type="button"
                        onClick={() => handleRemoveLanguage(lang)}
                        className="hover:text-error"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {editing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input input-bordered flex-1"
                    placeholder="Add a language..."
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === 'Enter' && (e.preventDefault(), handleAddLanguage())
                    }
                  />
                  <button
                    type="button"
                    onClick={handleAddLanguage}
                    className="btn btn-accent"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {editing && (
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary gap-2 ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {!loading && <Save size={20} />}
                  Save Changes
                </button>
              </div>
            )}
          </form>

          {/* Stats for Mentors */}
          {currentUser?.role === 'mentor' && !editing && (
            <div className="divider"></div>
          )}
          {currentUser?.role === 'mentor' && !editing && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="stat bg-base-200 rounded-lg">
                <div className="stat-title">Rating</div>
                <div className="stat-value text-warning">{currentUser?.rating}</div>
                <div className="stat-desc">From {currentUser?.totalReviews} reviews</div>
              </div>
              <div className="stat bg-base-200 rounded-lg">
                <div className="stat-title">Status</div>
                <div className="stat-value text-sm text-success">Active</div>
                <div className="stat-desc">Accepting bookings</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
