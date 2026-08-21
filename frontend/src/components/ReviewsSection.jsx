import React from 'react';
import { Star, ShieldCheck, CheckCircle2, Key, MessageSquare, MapPin, Tag } from 'lucide-react';
import './ReviewsSection.css';

export default function ReviewsSection({ ratingBreakdown, reviewTags, reviews }) {
  return (
    <div className="reviews-section-container">
      <div className="section-divider"></div>

      {/* Guest Favourite Big Rating Header */}
      <div className="guest-favorite-header" id="reviews-section">
        <div className="rating-laurel-wrapper">
          <span className="laurel-leaf left">🌿</span>
          <span className="big-rating-score">4.95</span>
          <span className="laurel-leaf right">🌿</span>
        </div>
        <h2 className="guest-favorite-title">Guest favourite</h2>
        <p className="guest-favorite-subtext">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <button className="underline-link-btn">How reviews work</button>
      </div>

      {/* Rating Breakdown Grid */}
      <div className="rating-breakdown-grid">
        <div className="breakdown-col overall-bar-col">
          <span className="breakdown-label">Overall rating</span>
          <div className="stars-bar-stack">
            <div className="bar-row"><span>5</span><div className="fill-bar"><div className="bar-inner" style={{width: '95%'}}></div></div></div>
            <div className="bar-row"><span>4</span><div className="fill-bar"><div className="bar-inner" style={{width: '5%'}}></div></div></div>
            <div className="bar-row"><span>3</span><div className="fill-bar"></div></div>
            <div className="bar-row"><span>2</span><div className="fill-bar"></div></div>
            <div className="bar-row"><span>1</span><div className="fill-bar"></div></div>
          </div>
        </div>

        <div className="breakdown-col">
          <span className="breakdown-label">Cleanliness</span>
          <span className="breakdown-score">5.0</span>
          <ShieldCheck size={28} color="#222222" className="breakdown-icon" />
        </div>

        <div className="breakdown-col">
          <span className="breakdown-label">Accuracy</span>
          <span className="breakdown-score">5.0</span>
          <CheckCircle2 size={28} color="#222222" className="breakdown-icon" />
        </div>

        <div className="breakdown-col">
          <span className="breakdown-label">Check-in</span>
          <span className="breakdown-score">5.0</span>
          <Key size={28} color="#222222" className="breakdown-icon" />
        </div>

        <div className="breakdown-col">
          <span className="breakdown-label">Communication</span>
          <span className="breakdown-score">5.0</span>
          <MessageSquare size={28} color="#222222" className="breakdown-icon" />
        </div>

        <div className="breakdown-col">
          <span className="breakdown-label">Location</span>
          <span className="breakdown-score">4.8</span>
          <MapPin size={28} color="#222222" className="breakdown-icon" />
        </div>

        <div className="breakdown-col">
          <span className="breakdown-label">Value</span>
          <span className="breakdown-score">4.8</span>
          <Tag size={28} color="#222222" className="breakdown-icon" />
        </div>
      </div>

      {/* Review Tag Filter Pills */}
      <div className="review-tags-scroll">
        {reviewTags && reviewTags.map((tag, idx) => (
          <div key={idx} className="tag-pill">
            <span>{tag.name}</span>
            <span className="tag-count">{tag.count}</span>
          </div>
        ))}
      </div>

      {/* Guest Reviews Grid (2 Columns) */}
      <div className="reviews-cards-grid">
        {reviews && reviews.map((rev) => (
          <div key={rev.id} className="review-card">
            <div className="review-user-header">
              <img src={rev.avatar} alt={rev.author} className="review-avatar" />
              <div>
                <h4 className="review-author-name">{rev.author}</h4>
                <p className="review-user-meta">{rev.timeOnAirbnb}</p>
              </div>
            </div>
            <div className="review-stars-date">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="#222222" color="#222222" />
                ))}
              </div>
              <span className="dot">·</span>
              <span className="review-date">{rev.date}</span>
            </div>
            <p className="review-comment-text">{rev.comment}</p>
            {rev.comment.length > 150 && (
              <button className="underline-link-btn show-more-btn">Show more</button>
            )}
          </div>
        ))}
      </div>

      <button type="button" className="show-all-reviews-btn">
        Show all 19 reviews
      </button>
    </div>
  );
}
