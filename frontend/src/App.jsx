import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroHeader from './components/HeroHeader';
import PhotoGallery from './components/PhotoGallery';
import StickySubNav from './components/StickySubNav';
import ListingDetails from './components/ListingDetails';
import ReviewsSection from './components/ReviewsSection';
import HostSection from './components/HostSection';
import LocationSection from './components/LocationSection';
import ThingsToKnow from './components/ThingsToKnow';
import Footer from './components/Footer';

import AmenitiesModal from './components/AmenitiesModal';
import PhotoTourModal from './components/PhotoTourModal';
import LightboxModal from './components/LightboxModal';

// Fallback listing data in case backend API is connecting
const FALLBACK_LISTING_DATA = {
  id: "mirashya-ug10",
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  location: "Candolim, Goa, India",
  propertyType: "Entire serviced apartment in Candolim, India",
  capacity: { guests: 5, bedrooms: 1, beds: 1, bathrooms: 1 },
  rating: 4.95,
  reviewCount: 19,
  isGuestFavorite: true,
  pricing: { perNight: 5699, nights: 5, total: 28499, cleaningFee: 1200, serviceFee: 2500, currency: "₹" },
  offer: { title: "Get 10% off your next stay.", subtitle: "Terms apply.", claimable: true },
  photos: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      caption: "Living room 1",
      subtext: "Sofa · Air conditioning · Ceiling fan · TV"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
      caption: "Living room 2"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
      caption: "Full kitchen"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      caption: "Bedroom"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      caption: "Full bathroom"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
      caption: "Jacuzzi & Pool"
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      caption: "Exterior view"
    }
  ],
  ratingBreakdown: { cleanliness: 5.0, accuracy: 5.0, checkIn: 5.0, communication: 5.0, location: 4.8, value: 4.8 },
  reviewTags: [
    { name: "Comfort", count: 6 },
    { name: "Accuracy", count: 5 },
    { name: "Hot tub", count: 5 },
    { name: "Condition", count: 4 },
    { name: "Hospitality", count: 8 },
    { name: "Cleanliness", count: 4 },
    { name: "Amenities", count: 2 }
  ],
  reviews: [
    {
      id: 1,
      author: "Amit",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      timeOnAirbnb: "2 months on Airbnb",
      date: "1 week ago",
      comment: "Very helpful and responsive team. Safe and peaceful stay. Loved everything about the property."
    },
    {
      id: 2,
      author: "Aheesh",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
      timeOnAirbnb: "3 years on Airbnb",
      date: "2 weeks ago",
      comment: "We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again."
    },
    {
      id: 3,
      author: "Samiksha",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      timeOnAirbnb: "8 months on Airbnb",
      date: "May 2026",
      comment: "the host nitish was really great help"
    },
    {
      id: 4,
      author: "Vedant",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      timeOnAirbnb: "4 years on Airbnb",
      date: "May 2026",
      comment: "We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine."
    },
    {
      id: 5,
      author: "Vaibhav S",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
      timeOnAirbnb: "3 years on Airbnb",
      date: "May 2026",
      comment: "Great great experience living out there, can't expect more, will always look for it in the future and will recommend my friends too."
    },
    {
      id: 6,
      author: "Mohd",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      timeOnAirbnb: "5 years on Airbnb",
      date: "May 2026",
      comment: "Great place. Exactly as described in the listing."
    }
  ],
  host: {
    name: "Mirashya Homes",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
    badge: "Superhost",
    reviewCount: 1463,
    rating: 4.68,
    yearsHosting: 2,
    responseRate: "100%",
    responseTime: "Responds within an hour",
    coHosts: [
      { name: "Sharath", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" },
      { name: "Aman Dev Pahwa", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" },
      { name: "Maria Karen Priyanka", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" },
      { name: "Simran", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" },
      { name: "Pallavi", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&q=80" },
      { name: "Sanyukta", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&q=80" },
      { name: "Shruti", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
      { name: "Amisha", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=100&q=80" }
    ]
  },
  amenities: [
    { category: "Bathroom", items: ["Hot water", "Hair dryer", "Shampoo", "Body soap", "Hot tub / Jacuzzi"] },
    { category: "Bedroom and laundry", items: ["Bed linens", "Extra pillows and blankets", "Iron", "Hangers"] },
    { category: "Entertainment", items: ["TV with standard cable", "High-speed Wi-Fi"] },
    { category: "Heating and cooling", items: ["Air conditioning", "Ceiling fan"] },
    { category: "Home safety", items: ["Exterior security cameras on property", "First aid kit"] },
    { category: "Kitchen and dining", items: ["Full kitchen", "Refrigerator", "Microwave", "Cooking basics"] }
  ],
  nearbyStays: [
    { id: 101, title: "Beautiful Studio with a view to die for", price: "₹23,600", rating: 4.91, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80" },
    { id: 102, title: "NAQAB - 1bhk with private pool", price: "₹42,218", rating: 4.95, image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80" },
    { id: 103, title: "Greentique Luxury Flat with plunge pool, Calangute", price: "₹44,506", rating: 4.94, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80" },
    { id: 104, title: "The Tropical Studio | 5 mins to Beach", price: "₹22,824", rating: 4.96, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80" },
    { id: 105, title: "Luxury Casa Bella 1BHK with plunge pool, Calangute", price: "₹39,942", rating: 4.95, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80" },
    { id: 106, title: "Kanso by Earthen Window | Jacuzzi | Terrace | Pool", price: "₹45,648", rating: 5.0, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80" },
    { id: 107, title: "Luxury Apt | Private Pool | 6 Mins from Beach", price: "₹48,786", rating: 4.93, image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=400&q=80" },
    { id: 108, title: "Serendipity Cottage - Calm Stay in Calangute-Baga.", price: "₹22,824", rating: 4.92, image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=400&q=80" },
    { id: 109, title: "Beachside Bliss | Steps to Baga | Private Terrace", price: "₹35,000", rating: 4.89, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80" },
    { id: 110, title: "Serene Garden Villa with Pool | Calangute", price: "₹52,000", rating: 4.97, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80" },
    { id: 111, title: "Cozy Sea-View Apartment | North Goa", price: "₹18,500", rating: 4.88, image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=400&q=80" },
    { id: 112, title: "Modern Loft with Rooftop | Panjim City", price: "₹27,800", rating: 4.90, image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=400&q=80" },
    { id: 113, title: "Jungle Retreat | Private Pool | Assagao", price: "₹61,000", rating: 4.98, image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=400&q=80" },
    { id: 114, title: "Bohemian Beach Cottage | Vagator", price: "₹14,200", rating: 4.85, image: "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=400&q=80" },
    { id: 115, title: "Heritage Portuguese Villa | Fontainhas", price: "₹38,500", rating: 4.94, image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=400&q=80" }
  ]
};

export default function App() {
  const [listingData, setListingData] = useState(FALLBACK_LISTING_DATA);
  const [isSaved, setIsSaved] = useState(false);

  // Modal States
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [photoTourStartIndex, setPhotoTourStartIndex] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxPhotos, setLightboxPhotos] = useState([]);

  // Fetch API data from Express backend if running
  useEffect(() => {
    fetch('http://localhost:5000/api/listing')
      .then(res => {
        if (!res.ok) throw new Error('API network response error');
        return res.json();
      })
      .then(data => setListingData(data))
      .catch(err => {
        console.warn('Backend API offline, using fallback dataset:', err);
      });
  }, []);

  const handleToggleSave = () => {
    setIsSaved(prev => !prev);
  };

  const handleOpenLightbox = (index, photoSet = listingData.photos) => {
    setLightboxPhotos(photoSet);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleOpenPhotoTour = (photoIndex = null) => {
    setPhotoTourStartIndex(photoIndex);
    setIsPhotoTourOpen(true);
  };

  return (
    <div className="airbnb-app-root">
      {/* 1. Main Navbar */}
      <Navbar />

      {/* Main Page Container */}
      <main className="container">
        {/* 2. Hero Header (Title & Share/Save) */}
        <HeroHeader 
          title={listingData.title}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
        />

        {/* 3. Photo Gallery Grid */}
        <PhotoGallery 
          photos={listingData.photos}
          onOpenLightbox={handleOpenLightbox}
          onOpenPhotoTour={handleOpenPhotoTour}
        />

        {/* Section navigation: follows the gallery, then sticks at the viewport top. */}
        <StickySubNav
          pricing={listingData.pricing}
          rating={listingData.rating}
          reviewCount={listingData.reviewCount}
        />

        {/* 4. Listing Main Details & Sticky Reserve Card */}
        <ListingDetails 
          listingData={listingData}
          onOpenAmenities={() => setIsAmenitiesOpen(true)}
        />

        {/* 5. Reviews Section */}
        <ReviewsSection 
          ratingBreakdown={listingData.ratingBreakdown}
          reviewTags={listingData.reviewTags}
          reviews={listingData.reviews}
        />

        {/* 6. Location Map Section */}
        <LocationSection location={listingData.location} />

        {/* 7. Meet Your Host Section */}
        <HostSection host={listingData.host} />

        {/* 8. Things To Know & Nearby Stays */}
        <ThingsToKnow 
          thingsToKnow={listingData.thingsToKnow}
          nearbyStays={listingData.nearbyStays}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <AmenitiesModal 
        isOpen={isAmenitiesOpen}
        onClose={() => setIsAmenitiesOpen(false)}
        amenities={listingData.amenities}
      />

      <PhotoTourModal 
        isOpen={isPhotoTourOpen}
        onClose={() => {
          setIsPhotoTourOpen(false);
          setPhotoTourStartIndex(null);
        }}
        photos={listingData.photos}
        initialPhotoIndex={photoTourStartIndex}
        onOpenLightbox={handleOpenLightbox}
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
      />

      <LightboxModal 
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        photos={lightboxPhotos}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
      />
    </div>
  );
}
