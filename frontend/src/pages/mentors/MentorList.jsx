import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, DollarSign, Clock, MapPin, MessageCircle } from 'lucide-react';
import { getMentors } from '../../data/mockUsers.js';

const MentorList = () => {
  const allMentors = getMentors();
  const [searchInput, setSearchInput] = useState(''); // Input value
  const [searchTerm, setSearchTerm] = useState(''); // Actual search term for filtering
  const [filters, setFilters] = useState({
    skills: [],
    minPrice: 0,
    maxPrice: 100,
    minRating: 0,
    experience: '',
    timezone: '',
  });
  const [tempFilters, setTempFilters] = useState({
    skills: [],
    minPrice: 0,
    maxPrice: 100,
    minRating: 0,
    experience: '',
    timezone: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Get unique skills from all mentors
  const allSkills = [...new Set(allMentors.flatMap((mentor) => mentor.skills))];

  // Filter mentors based on search and filters
  const filteredMentors = allMentors.filter((mentor) => {
    // Search term filter
    const matchesSearch =
      searchTerm === '' ||
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    // Skills filter
    const matchesSkills =
      filters.skills.length === 0 ||
      filters.skills.some((skill) => mentor.skills.includes(skill));

    // Price filter
    const matchesPrice = mentor.price >= filters.minPrice && mentor.price <= filters.maxPrice;

    // Rating filter
    const matchesRating = mentor.rating >= filters.minRating;

    // Experience filter
    const matchesExperience =
      filters.experience === '' || mentor.experience.includes(filters.experience);

    // Timezone filter
    const matchesTimezone =
      filters.timezone === '' || mentor.timezone === filters.timezone;

    return (
      matchesSearch &&
      matchesSkills &&
      matchesPrice &&
      matchesRating &&
      matchesExperience &&
      matchesTimezone
    );
  });

  const handleSkillToggle = (skill) => {
    setTempFilters({
      ...tempFilters,
      skills: tempFilters.skills.includes(skill)
        ? tempFilters.skills.filter((s) => s !== skill)
        : [...tempFilters.skills, skill],
    });
  };

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setSearchTerm(searchInput);
    setFilters({ ...tempFilters }); // Apply temp filters to actual filters
    setIsSearching(false);
    // TODO: Replace with actual API call
    // const results = await searchMentorsAPI({ searchTerm: searchInput, filters: tempFilters });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearFilters = () => {
    const emptyFilters = {
      skills: [],
      minPrice: 0,
      maxPrice: 100,
      minRating: 0,
      experience: '',
      timezone: '',
    };
    setFilters(emptyFilters);
    setTempFilters(emptyFilters);
    setSearchInput('');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-primary text-primary-content py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Mentor</h1>
          <p className="text-xl opacity-90">
            Browse through {allMentors.length} expert mentors and accelerate your career growth
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="card bg-base-100 shadow-lg mb-6">
          <div className="card-body">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input with Search Button */}
              <div className="flex flex-1 gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={20} className="text-base-content/40" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name, skills, or expertise..."
                    className="input input-bordered w-full pl-10 pr-4"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="btn btn-primary gap-2 min-w-[120px]"
                >
                  {isSearching ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search size={20} />
                      Search
                    </>
                  )}
                </button>
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`btn ${showFilters ? 'btn-primary' : 'btn-outline'} gap-2`}
              >
                <Filter size={20} />
                Filters
                {(filters.skills.length > 0 ||
                  filters.minRating > 0 ||
                  filters.experience ||
                  filters.timezone) && (
                  <div className="badge badge-secondary">
                    {filters.skills.length +
                      (filters.minRating > 0 ? 1 : 0) +
                      (filters.experience ? 1 : 0) +
                      (filters.timezone ? 1 : 0)}
                  </div>
                )}
              </button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-base-300 space-y-6">
                {/* Skills Filter */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Skills</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {allSkills.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => handleSkillToggle(skill)}
                        className={`badge badge-lg ${
                          tempFilters.skills.includes(skill)
                            ? 'badge-primary'
                            : 'badge-outline'
                        } cursor-pointer`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Price Range */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Max Price: ${tempFilters.maxPrice}/hr
                      </span>
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={tempFilters.maxPrice}
                        onChange={(e) =>
                          setTempFilters({ 
                            ...tempFilters, 
                            maxPrice: Number(e.target.value),
                            minPrice: 0
                          })
                        }
                        className="range range-primary range-xs w-full"
                      />
                      {/* Range indicators */}
                      <div className="flex justify-between text-xs text-base-content/50">
                        <span>$10</span>
                        <span>$30</span>
                        <span>$50</span>
                        <span>$70</span>
                        <span>$100+</span>
                      </div>
                    </div>
                  </div>

                  {/* Minimum Rating */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Minimum Rating</span>
                    </label>
                    <select
                      className="select select-bordered select-sm"
                      value={tempFilters.minRating}
                      onChange={(e) =>
                        setTempFilters({ ...tempFilters, minRating: Number(e.target.value) })
                      }
                    >
                      <option value={0}>All Ratings</option>
                      <option value={4}>4+ Stars</option>
                      <option value={4.5}>4.5+ Stars</option>
                      <option value={4.8}>4.8+ Stars</option>
                    </select>
                  </div>

                  {/* Timezone */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Timezone</span>
                    </label>
                    <select
                      className="select select-bordered select-sm"
                      value={tempFilters.timezone}
                      onChange={(e) => setTempFilters({ ...tempFilters, timezone: e.target.value })}
                    >
                      <option value="">All Timezones</option>
                      <option value="UTC+0">UTC+0</option>
                      <option value="UTC+7">UTC+7</option>
                      <option value="UTC+8">UTC+8</option>
                      <option value="UTC+9">UTC+9</option>
                    </select>
                  </div>
                </div>

                {/* Filter Actions */}
                <div className="flex justify-between items-center">
                  <button onClick={clearFilters} className="btn btn-ghost btn-sm">
                    Clear All Filters
                  </button>
                  <button 
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="btn btn-primary gap-2"
                  >
                    {isSearching ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search size={16} />
                        Apply Filters
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-base-content/70">
            Showing <span className="font-semibold text-primary">{filteredMentors.length}</span>{' '}
            mentor{filteredMentors.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Mentor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition">
              <div className="card-body">
                {/* Avatar and Basic Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={mentor.avatar} alt={mentor.name} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="card-title text-lg mb-1">{mentor.name}</h3>
                    <div className="flex items-center gap-1 text-warning text-sm">
                      <Star size={14} fill="currentColor" />
                      <span className="font-semibold">{mentor.rating}</span>
                      <span className="text-base-content/70">({mentor.totalReviews})</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-base-content/70 mb-4 line-clamp-3">{mentor.bio}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.skills.slice(0, 4).map((skill) => (
                    <div key={skill} className="badge badge-primary badge-sm">
                      {skill}
                    </div>
                  ))}
                  {mentor.skills.length > 4 && (
                    <div className="badge badge-ghost badge-sm">
                      +{mentor.skills.length - 4} more
                    </div>
                  )}
                </div>

                {/* Info Row */}
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div className="flex items-center gap-1 text-base-content/70">
                    <DollarSign size={14} />
                    <span className="font-semibold text-success">${mentor.price}/hr</span>
                  </div>
                  <div className="flex items-center gap-1 text-base-content/70">
                    <Clock size={14} />
                    <span>{mentor.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-base-content/70">
                    <MapPin size={14} />
                    <span>{mentor.timezone}</span>
                  </div>
                  <div className="flex items-center gap-1 text-base-content/70">
                    <MessageCircle size={14} />
                    <span>{mentor.experience}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="card-actions justify-end">
                  <Link
                    to={`/mentors/${mentor.id}`}
                    className="btn btn-primary btn-sm btn-block"
                  >
                    View Profile & Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No mentors found</h3>
            <p className="text-base-content/70 mb-4">
              Try adjusting your filters or search terms
            </p>
            <button onClick={clearFilters} className="btn btn-primary">
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorList;
