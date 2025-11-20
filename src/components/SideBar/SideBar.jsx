import React, { useState, useEffect } from 'react';
import './SideBar.css';

// SVG Icons (inline for color control)
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const AccountIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const CreateIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const VaultIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const SideBar = ({
  activeKey = 'home',
  vaultItems = [],
  defaultVaultOpen = true,
  onNav,
  onOpenProgram
}) => {
  const [isVaultOpen, setIsVaultOpen] = useState(defaultVaultOpen);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile breakpoint
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992); // Bootstrap lg breakpoint
      if (window.innerWidth >= 992) {
        setIsOffcanvasOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set default vault state based on screen size
  useEffect(() => {
    if (isMobile) {
      setIsVaultOpen(false);
    } else {
      setIsVaultOpen(defaultVaultOpen);
    }
  }, [isMobile, defaultVaultOpen]);

  const handleNavClick = (key) => {
    if (onNav) {
      onNav(key);
    }
    if (isMobile) {
      setIsOffcanvasOpen(false);
    }
  };

  const handleVaultToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVaultOpen(!isVaultOpen);
    // Don't navigate to vault page - just toggle visibility
    if (isMobile) {
      setIsOffcanvasOpen(false);
    }
  };

  const handleVaultNavClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Navigate to vault page without toggling
    if (onNav) {
      onNav('vault');
    }
    if (isMobile) {
      setIsOffcanvasOpen(false);
    }
  };

  const handleChevronClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVaultOpen(!isVaultOpen);
    // Don't navigate when clicking chevron
  };

  const handleQuickLinkClick = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onOpenProgram) {
      onOpenProgram(id);
    }
    if (isMobile) {
      setIsOffcanvasOpen(false);
    }
  };

  const navItems = [
    { key: 'home', label: 'Home', icon: HomeIcon },
    { key: 'account', label: 'Account', icon: AccountIcon },
    { key: 'create', label: 'Create Jadwal', icon: CreateIcon }
  ];

  const sidebarContent = (
    <>
      <div className="sidebar__brand">
        <h2 className="mb-0">JadwalGYM</h2>
      </div>
      <hr className="sidebar__divider" />
      <nav aria-label="Primary navigation" className="sidebar__nav">
        <ul className="sidebar__list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeKey === item.key;
            return (
              <li key={item.key} className="sidebar__item-wrapper">
                <button
                  className={`sidebar__item ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleNavClick(item.key)}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`Navigate to ${item.label}`}
                >
                  <span className="sidebar__icon">
                    <Icon />
                  </span>
                  <span className="sidebar__label">{item.label}</span>
                </button>
              </li>
            );
          })}
          
          {/* Jadwals Vault Section */}
          <li className="sidebar__item-wrapper">
            <div className="sidebar__vault-header">
              <button
                className={`sidebar__item sidebar__vault-toggle ${activeKey === 'vault' ? 'is-active' : ''}`}
                onClick={handleVaultNavClick}
                aria-expanded={isVaultOpen}
                aria-controls="vault-quicklinks"
                aria-label="Navigate to Jadwals Vault"
              >
                <span className="sidebar__icon">
                  <VaultIcon />
                </span>
                <span className="sidebar__label">Jadwals Vault</span>
              </button>
              <button
                className="sidebar__chevron-btn"
                onClick={handleChevronClick}
                aria-label={isVaultOpen ? 'Hide vault programs' : 'Show vault programs'}
                aria-expanded={isVaultOpen}
                aria-controls="vault-quicklinks"
              >
                <span className="sidebar__chevron">
                  {isVaultOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </span>
              </button>
            </div>
            <ul
              id="vault-quicklinks"
              className={`sidebar__vault ${isVaultOpen ? 'is-open' : ''}`}
              role="list"
            >
              {vaultItems.length === 0 ? (
                <li className="sidebar__empty">No saved programs yet</li>
              ) : (
                vaultItems.map((item) => (
                  <li key={item.id} className="sidebar__quicklink-wrapper">
                    <button
                      className="sidebar__quicklink"
                      onClick={(e) => handleQuickLinkClick(item.id, e)}
                      aria-label={`Open ${item.title} by ${item.author}`}
                    >
                      <div className="sidebar__quicklink-content">
                        <span className="sidebar__quicklink-title">{item.title}</span>
                        <span className="sidebar__quicklink-author">{item.author}</span>
                      </div>
                      <span className="sidebar__quicklink-icon" aria-hidden="true">
                        <ExternalIcon />
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );

  // Mobile: Render as offcanvas
  if (isMobile) {
    return (
      <>
        {/* Offcanvas Toggle Button (should be placed in parent, but included for demo) */}
        <button
          className="btn btn-primary d-lg-none position-fixed top-0 start-0 m-3 z-3"
          type="button"
          onClick={() => setIsOffcanvasOpen(true)}
          aria-label="Open navigation menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {/* Offcanvas */}
        <div
          className={`offcanvas offcanvas-start sidebar sidebar--mobile ${isOffcanvasOpen ? 'show' : ''}`}
          tabIndex="-1"
          id="sidebar-offcanvas"
          aria-labelledby="sidebar-label"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="sidebar-label">
              Navigation
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setIsOffcanvasOpen(false)}
              aria-label="Close navigation"
            ></button>
          </div>
          <div className="offcanvas-body">
            {sidebarContent}
          </div>
        </div>

        {/* Backdrop */}
        {isOffcanvasOpen && (
          <div
            className="offcanvas-backdrop fade show"
            onClick={() => setIsOffcanvasOpen(false)}
            aria-hidden="true"
          ></div>
        )}
      </>
    );
  }

  // Desktop: Fixed sidebar
  return (
    <aside className="sidebar sidebar--desktop">
      {sidebarContent}
    </aside>
  );
};

export default SideBar;

