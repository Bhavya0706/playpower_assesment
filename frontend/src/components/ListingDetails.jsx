import React from 'react';
import { Star, Key, MapPin, Sparkles, Tv, Wind, Waves, ShieldCheck } from 'lucide-react';
import ReserveCard from './ReserveCard';
import './ListingDetails.css';

const OCTOBER_2026 = [
  '', '', '', '', '1', '2', '3',
  '4', '5', '6', '7', '8', '9', '10',
  '11', '12', '13', '14', '15', '16', '17',
  '18', '19', '20', '21', '22', '23', '24',
  '25', '26', '27', '28', '29', '30', '31',
];

const NOVEMBER_2026 = [
  '1', '2', '3', '4', '5', '6', '7',
  '8', '9', '10', '11', '12', '13', '14',
  '15', '16', '17', '18', '19', '20', '21',
  '22', '23', '24', '25', '26', '27', '28',
  '29', '30', '', '', '', '', '',
];

function StaticMonth({ label, days, selectedStart, selectedEnd, mutedDays = [] }) {
  return (
    <div className="static-month" aria-label={label}>
      <h4>{label}</h4>
      <div className="calendar-weekdays" aria-hidden="true">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
      </div>
      <div className="calendar-days">
        {days.map((day, index) => {
          const isSelected = day === selectedStart || day === selectedEnd;
          const isInRange = Number(day) > Number(selectedStart) && Number(day) < Number(selectedEnd) && label === 'October 2026';
          return (
            <span
              key={`${day || 'empty'}-${index}`}
              className={`calendar-day ${isSelected ? 'selected' : ''} ${isInRange ? 'in-range' : ''} ${mutedDays.includes(day) ? 'muted' : ''}`}
            >
              {day}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function ListingDetails({ listingData, onOpenAmenities }) {
  if (!listingData) return null;

  const { propertyType, capacity, host, rating, reviewCount, pricing, offer } = listingData;

  return (
    <div className="listing-details-container">
      <div className="details-grid">
        {/* Left Main Information Column */}
        <div className="details-left-col">
          {/* Main Title & Capacity Info */}
          <div className="property-summary-header">
            <h2>{propertyType || "Entire serviced apartment in Candolim, India"}</h2>
            <p className="capacity-line">
              {capacity?.guests || 5} guests · {capacity?.bedrooms || 1} bedroom · {capacity?.beds || 1} bed · {capacity?.bathrooms || 1} bathroom
            </p>
            <div className="rating-badge-inline">
              <Star size={14} fill="#222222" color="#222222" />
              <span className="rating-num">{rating || 4.95}</span>
              <span className="dot">·</span>
              <span className="review-count">{reviewCount || 19} reviews</span>
            </div>
          </div>

          <div className="section-divider"></div>

          {/* Host Intro Banner */}
          <div className="host-intro-banner">
            <img 
              src={host?.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"} 
              alt={host?.name || "Host"} 
              className="host-avatar-large"
            />
            <div className="host-intro-text">
              <h3>Hosted by {host?.name || "Mirashya Homes"}</h3>
              <p className="host-badge-text">{host?.badge || "Superhost"} · {host?.yearsHosting || 2} years hosting</p>
            </div>
          </div>

          <div className="section-divider"></div>

          {/* Property Highlights */}
          <div className="property-highlights">
            <div className="highlight-item">
              <Sparkles size={24} color="#222222" />
              <div>
                <h4>Private Jacuzzi</h4>
                <p>Relax and unwind in your private indoor jacuzzi pool.</p>
              </div>
            </div>
            <div className="highlight-item">
              <Key size={24} color="#222222" />
              <div>
                <h4>Self check-in</h4>
                <p>Check yourself in with the building staff / keypad.</p>
              </div>
            </div>
            <div className="highlight-item">
              <MapPin size={24} color="#222222" />
              <div>
                <h4>Great location</h4>
                <p>95% of recent guests gave the location a 5-star rating.</p>
              </div>
            </div>
          </div>

          <div className="section-divider"></div>

          {/* Property Description */}
          <div className="property-description">
            <p>
              Welcome to <strong>Romantic Jacuzzi 1BHK Candolim</strong> hosted by Mirashya Homes! 
              Located in the heart of Candolim, Goa, this apartment offers a peaceful stay with easy 
              access to beaches, popular cafés, and night markets.
            </p>
            <p className="desc-paragraph">
              Features a spacious living area, fully equipped kitchen, high-speed Wi-Fi, air conditioning, 
              and a private jacuzzi tub to relax after a day exploring Goa.
            </p>
          </div>

          <div className="section-divider"></div>

          {/* Sleeping arrangements are informational cards, not gallery controls. */}
          <section className="sleeping-arrangements-section" aria-labelledby="sleeping-arrangements-title">
            <h3 id="sleeping-arrangements-title">Where you'll sleep</h3>
            <div className="sleeping-cards">
              <article className="sleeping-card">
                <img src={listingData.photos?.[3]?.url || listingData.photos?.[0]?.url} alt="Bedroom" />
                <h4>Bedroom</h4>
                <p>1 double bed</p>
              </article>
           
            </div>
          </section>

          <div className="section-divider"></div>

          {/* Amenities Section */}
          <div className="amenities-summary-section">
            <h3 id="amenities-section">What this place offers</h3>
            <div className="amenities-grid">
              <div className="amenity-item">
                <Waves size={22} color="#222222" />
                <span>Private Jacuzzi & Pool</span>
              </div>
              <div className="amenity-item">
                <Wind size={22} color="#222222" />
                <span>Air conditioning & Ceiling fan</span>
              </div>
              <div className="amenity-item">
                <Tv size={22} color="#222222" />
                <span>55" HDTV with cable</span>
              </div>
              <div className="amenity-item">
                <ShieldCheck size={22} color="#222222" />
                <span>Exterior security cameras</span>
              </div>
            </div>

            <button 
              className="btn-outline-lg show-amenities-btn"
              onClick={onOpenAmenities}
            >
              Show all 20 amenities
            </button>
          </div>

          <div className="section-divider"></div>

          <section className="availability-calendar" aria-labelledby="availability-calendar-title">
            <h3 id="availability-calendar-title">5 nights in Candolim</h3>
            <p className="calendar-date-range">18 Oct 2026 - 23 Oct 2026</p>
            <div className="calendar-months">
              <StaticMonth label="October 2026" days={OCTOBER_2026} selectedStart="18" selectedEnd="23" />
              <StaticMonth label="November 2026" days={NOVEMBER_2026} selectedStart="" selectedEnd="" mutedDays={['18', '19', '20', '21', '22', '23', '24', '29', '30']} />
            </div>
            <div className="calendar-footer">
              <span className="calendar-key" aria-hidden="true"></span>
              <span>Selected dates</span>
              <span className="calendar-clear">Clear dates</span>
            </div>
          </section>
        </div>

        {/* Right Sticky Reserve Card Column */}
        <div className="details-right-col">
          <ReserveCard 
            pricing={pricing}
            rating={rating}
            reviewCount={reviewCount}
            offer={offer}
          />
        </div>
      </div>
    </div>
  );
}
