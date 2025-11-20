import React, { useState, useMemo } from 'react';
import ProgramCard from './ProgramCard';
import CategoryTile from './CategoryTile';
import './GuestHome.css';

// Search Icon SVG
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

// Theme Toggle Icons
const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const GuestHome = ({
  popularPrograms = [],
  categories = [],
  onSearch,
  onOpenProgram,
  onCategoryClick,
  onThemeToggle,
  currentTheme = 'dark',
  onLoginClick,
  onSignUpClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter programs based on search query
  const filteredPrograms = useMemo(() => {
    if (!searchQuery.trim()) {
      return popularPrograms;
    }
    const query = searchQuery.toLowerCase().trim();
    return popularPrograms.filter(program => 
      program.title.toLowerCase().includes(query) ||
      program.author.toLowerCase().includes(query) ||
      program.summary.toLowerCase().includes(query)
    );
  }, [popularPrograms, searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Real-time search - filter happens automatically via useMemo
  };

  return (
    <section className="guest-home">
      <div className="container">
        {/* Search Row */}
        <div className="guest-home__search-row">
          <form
            className="guest-home__search-form"
            role="search"
            onSubmit={handleSearchSubmit}
            aria-label="Search programs"
          >
            <label htmlFor="program-search" className="visually-hidden">
              Search for workout programs
            </label>
            <div className="input-group guest-home__search-input-group">
              <span className="input-group-text guest-home__search-icon" aria-hidden="true">
                <SearchIcon />
              </span>
              <input
                type="search"
                id="program-search"
                className="form-control form-control-lg guest-home__search-input"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={handleSearchChange}
                aria-label="Search for workout programs"
              />
            </div>
          </form>
          <div className="guest-home__auth-buttons">
            <button
              type="button"
              className="btn btn-outline-primary btn-lg guest-home__theme-toggle"
              onClick={onThemeToggle}
              aria-label="Toggle theme"
              title="Toggle dark/light mode"
            >
              {currentTheme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              type="button"
              className="btn btn-outline-primary btn-lg guest-home__auth-btn"
              aria-label="Login to your account"
              onClick={onLoginClick}
            >
              Login
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg guest-home__auth-btn"
              aria-label="Sign up for a new account"
              onClick={onSignUpClick}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Popular Programs Section */}
        <section className="guest-home__section" aria-labelledby="popular-programs-heading">
          <h2 id="popular-programs-heading" className="guest-home__section-heading">
            Popular Programs
          </h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((program) => (
                <div key={program.id} className="col">
                  <ProgramCard
                    program={program}
                    onClick={onOpenProgram}
                  />
                </div>
              ))
            ) : (
              <div className="col-12">
                <p className="text-center text-muted">No programs found matching your search.</p>
              </div>
            )}
          </div>
        </section>

        {/* Categories Section */}
        <section className="guest-home__section" aria-labelledby="categories-heading">
          <h2 id="categories-heading" className="guest-home__section-heading">
            Categories
          </h2>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
            {categories.map((category) => (
              <div key={category.id} className="col">
                <CategoryTile
                  category={category}
                  onClick={onCategoryClick}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default GuestHome;

