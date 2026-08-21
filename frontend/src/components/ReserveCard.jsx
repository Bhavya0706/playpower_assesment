import React, { useState } from 'react';
import { Star, ChevronDown } from 'lucide-react';
import './ReserveCard.css';

export default function ReserveCard({ pricing, rating, reviewCount, offer }) {
  const [guests, setGuests] = useState(1);
  const [isClaimed, setIsClaimed] = useState(false);

  const basePrice = pricing?.perNight || 5699;
  const nights = pricing?.nights || 5;
  const subtotal = basePrice * nights;
  const cleaningFee = pricing?.cleaningFee || 1200;
  const serviceFee = pricing?.serviceFee || 2500;
  const discount = isClaimed ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + cleaningFee + serviceFee - discount;

  return (
    <div className="reserve-card-container" id="reserve-card-box">
      {/* Special Offer Banner if present */}
      {offer && (
        <div className="offer-banner-card">
          <div className="offer-text">
            <span className="offer-badge">10% OFF</span>
            <span>{offer.title}</span>
          </div>
          <button 
            className={`claim-btn ${isClaimed ? 'claimed' : ''}`}
            onClick={() => setIsClaimed(!isClaimed)}
          >
            {isClaimed ? 'Claimed' : 'Claim'}
          </button>
        </div>
      )}

      {/* Main Reserve Box */}
      <div className="reserve-box">
        {/* Header Price & Rating */}
        <div className="reserve-header">
          <div className="reserve-price">
            <span className="price-num">₹{basePrice.toLocaleString('en-IN')}</span>
            <span className="price-unit"> night</span>
          </div>
          <div className="reserve-rating">
            <Star size={14} fill="#222222" color="#222222" />
            <span className="rating-val">{rating || '4.95'}</span>
            <span className="dot">·</span>
            <span className="reviews-link">{reviewCount || '19'} reviews</span>
          </div>
        </div>

        {/* Date & Guests Selection Grid */}
        <div className="picker-container">
          <div className="dates-row">
            <div className="date-input-box checkin">
              <label>CHECK-IN</label>
              <div className="date-val">10/18/2026</div>
            </div>
            <div className="date-input-box checkout">
              <label>CHECKOUT</label>
              <div className="date-val">10/23/2026</div>
            </div>
          </div>
          <div className="guests-select-box">
            <div className="guests-info">
              <label>GUESTS</label>
              <div className="guests-val">{guests} guest{guests > 1 ? 's' : ''}</div>
            </div>
            <ChevronDown size={18} color="#222222" />
          </div>
        </div>

        {/* Reserve Action */}
        <button className="btn-primary reserve-action-btn">
          Reserve
        </button>

        <p className="no-charge-text">You won't be charged yet</p>

        {/* Price Breakdown */}
        <div className="price-breakdown">
          <div className="breakdown-row">
            <span className="underline-item">₹{basePrice.toLocaleString('en-IN')} x {nights} nights</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="breakdown-row">
            <span className="underline-item">Cleaning fee</span>
            <span>₹{cleaningFee.toLocaleString('en-IN')}</span>
          </div>
          <div className="breakdown-row">
            <span className="underline-item">Airbnb service fee</span>
            <span>₹{serviceFee.toLocaleString('en-IN')}</span>
          </div>
          {isClaimed && (
            <div className="breakdown-row discount-row">
              <span>Special offer discount</span>
              <span className="discount-val">-₹{discount.toLocaleString('en-IN')}</span>
            </div>
          )}
        </div>

        <div className="total-divider"></div>

        {/* Total Price */}
        <div className="total-price-row">
          <span>Total before taxes</span>
          <span>₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
}
