import React from 'react';
import { ShieldCheck, Award, GraduationCap, Clock } from 'lucide-react';
import './HostSection.css';

export default function HostSection({ host }) {
  if (!host) return null;

  return (
    <div className="host-section-container">
      <div className="section-divider"></div>
      <h2 className="host-section-title">Meet your host</h2>

      <div className="host-content-grid">
        {/* Left Host Badge Profile Card */}
        <div className="host-profile-card">
          <div className="card-top-avatar-box">
            <div className="avatar-wrapper">
              <img src={host.avatar} alt={host.name} className="host-card-avatar" />
              <div className="verified-badge-icon" title="Identity verified">
                <ShieldCheck size={16} color="#ffffff" fill="#FF385C" />
              </div>
            </div>
            <h3 className="host-card-name">{host.name}</h3>
            <p className="host-card-role">Host</p>
          </div>

          <div className="card-stats-grid">
            <div className="stat-box">
              <span className="stat-number">{host.reviewCount?.toLocaleString('en-IN') || '1,463'}</span>
              <span className="stat-label">Reviews</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-box">
              <span className="stat-number">{host.rating || '4.68'}★</span>
              <span className="stat-label">Rating</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-box">
              <span className="stat-number">{host.yearsHosting || 2}</span>
              <span className="stat-label">Years hosting</span>
            </div>
          </div>
        </div>

        {/* Right Co-Hosts & Host Details */}
        <div className="host-details-col">
          {/* Co-Hosts List */}
          {host.coHosts && host.coHosts.length > 0 && (
            <div className="co-hosts-section">
              <h4 className="co-hosts-title">Co-Hosts</h4>
              <div className="co-hosts-grid">
                {host.coHosts.map((coHost, i) => (
                  <div key={i} className="co-host-item">
                    <img src={coHost.avatar} alt={coHost.name} className="co-host-avatar" />
                    <span>{coHost.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Host Info Bullets */}
          <div className="host-info-bullets">
            <h4 className="host-info-heading">Host details</h4>
            <div className="info-bullet">
              <Award size={20} color="#222222" />
              <span>Born in the 80s</span>
            </div>
            <div className="info-bullet">
              <GraduationCap size={20} color="#222222" />
              <span>Where I went to school: NICMAR GOA</span>
            </div>
            <div className="info-bullet">
              <Clock size={20} color="#222222" />
              <span>Response rate: {host.responseRate || '100%'}</span>
            </div>
            <div className="info-bullet">
              <span>{host.responseTime || 'Responds within an hour'}</span>
            </div>
          </div>

          <button className="btn-secondary message-host-btn">
            Message host
          </button>
        </div>
      </div>
    </div>
  );
}
