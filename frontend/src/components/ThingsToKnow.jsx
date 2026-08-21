import React, { useState, useMemo } from 'react';
import { Calendar, Key, Shield, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import './ThingsToKnow.css';

const CARDS_PER_PAGE = 5;

export default function ThingsToKnow({ thingsToKnow, nearbyStays }) {
  const [page, setPage] = useState(0);

  const totalPages = useMemo(
    () => nearbyStays && nearbyStays.length > 0
      ? Math.ceil(nearbyStays.length / CARDS_PER_PAGE)
      : 1,
    [nearbyStays]
  );

  const visibleStays = useMemo(() => {
    if (!nearbyStays) return [];
    return nearbyStays.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);
  }, [nearbyStays, page]);

  const goNext = () => setPage((p) => Math.min(p + 1, totalPages - 1));
  const goPrev = () => setPage((p) => Math.max(p - 1, 0));

  return (
    <div className="things-to-know-container">
      <div className="section-divider"></div>
      <h2 className="things-title">Things to know</h2>

      <div className="things-grid">
        {/* Cancellation Policy */}
        <div className="things-col">
          <Calendar size={22} color="#222222" className="col-icon" />
          <h4 className="col-heading">Cancellation policy</h4>
          <p className="col-desc">
            Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.
          </p>
          <p className="col-subdesc">Review this host's full policy for details.</p>
          <button className="underline-link-btn">Learn more</button>
        </div>

        {/* House Rules */}
        <div className="things-col">
          <Key size={22} color="#222222" className="col-icon" />
          <h4 className="col-heading">House rules</h4>
          <ul className="col-list">
            <li>Check-in after 2:00 pm</li>
            <li>Checkout before 11:00 am</li>
            <li>3 guests maximum</li>
          </ul>
          <button className="underline-link-btn">Learn more</button>
        </div>

        {/* Safety & Property */}
        <div className="things-col">
          <Shield size={22} color="#222222" className="col-icon" />
          <h4 className="col-heading">Safety &amp; property</h4>
          <ul className="col-list">
            <li>Carbon monoxide alarm not reported</li>
            <li>Smoke alarm not reported</li>
            <li>Exterior security cameras on property</li>
          </ul>
          <button className="underline-link-btn">Learn more</button>
        </div>
      </div>

      <div className="section-divider"></div>

      {/* More Stays Nearby */}
      {nearbyStays && nearbyStays.length > 0 && (
        <div className="nearby-stays-section">
          <div className="nearby-header">
            <h2>More stays nearby</h2>
            <div className="pagination-ctrls">
              <span className="page-indicator">{page + 1} / {totalPages}</span>
              <button
                className="circle-arrow-btn"
                onClick={goPrev}
                disabled={page === 0}
                aria-label="Previous page"
              >
                <ChevronLeft size={16} color={page === 0 ? '#b0b0b0' : '#222222'} />
              </button>
              <button
                className="circle-arrow-btn"
                onClick={goNext}
                disabled={page === totalPages - 1}
                aria-label="Next page"
              >
                <ChevronRight size={16} color={page === totalPages - 1 ? '#b0b0b0' : '#222222'} />
              </button>
            </div>
          </div>

          {/* Slider Track */}
          <div className="nearby-slider-viewport">
            <div
              className="nearby-slider-track"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {/* Render pages side-by-side in the track */}
              {Array.from({ length: totalPages }).map((_, pageIdx) => (
                <div className="nearby-slider-page" key={pageIdx}>
                  {nearbyStays
                    .slice(pageIdx * CARDS_PER_PAGE, pageIdx * CARDS_PER_PAGE + CARDS_PER_PAGE)
                    .map((stay) => (
                      <div key={stay.id} className="nearby-card">
                        <div className="nearby-img-wrapper">
                          <img src={stay.image} alt={stay.title} loading="lazy" />
                        </div>
                        <h4 className="nearby-card-title">{stay.title}</h4>
                        <div className="nearby-card-meta">
                          {stay.price && <span className="nearby-price">{stay.price}</span>}
                          {stay.rating && (
                            <span className="nearby-rating">
                              <Star size={12} fill="#222222" color="#222222" />
                              {stay.rating}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
