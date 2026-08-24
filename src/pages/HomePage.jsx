import React, { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";

// Layout components
import AnnouncementBar from "../components/layout/AnnouncementBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import MobileStickyCTA from "../components/layout/MobileStickyCTA";
import LoadingScreen from "../components/layout/LoadingScreen";
import CustomCursor from "../components/layout/CustomCursor";

// Section components
import Hero from "../components/sections/Hero";
import BrandIntro from "../components/sections/BrandIntro";
import GamingSection from "../components/sections/GamingSection";
import CafeExperience from "../components/sections/CafeExperience";
import MenuSection from "../components/sections/MenuSection";
import ComboSection from "../components/sections/ComboSection";
import MembershipSection from "../components/sections/MembershipSection";
import EventsSection from "../components/sections/EventsSection";
import WhyVisitBento from "../components/sections/WhyVisitBento";
import GallerySection from "../components/sections/GallerySection";
import CommunitySection from "../components/sections/CommunitySection";
import StatsCounter from "../components/sections/StatsCounter";
import ReviewsSection from "../components/sections/ReviewsSection";
import SocialSection from "../components/sections/SocialSection";
import ReservationSection from "../components/sections/ReservationSection";
import LocationSection from "../components/sections/LocationSection";
import FinalCTA from "../components/sections/FinalCTA";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [bookingType, setBookingType] = useState("table");

  const scrollToReserve = useCallback((type) => {
    setBookingType(type);
    const el = document.getElementById("reserve");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const onBook = () => scrollToReserve("table");
  const onBookGaming = () => scrollToReserve("gaming");

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black font-body text-white [scroll-behavior:smooth]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Sora', ui-sans-serif, system-ui, sans-serif; }
        .font-body { font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif; }
        html { scroll-behavior: smooth; }
        ::selection { background: #7c3aed; color: white; }
        a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible {
          outline: 2px solid #a78bfa;
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <CustomCursor />

      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <AnnouncementBar />
          <Navbar onBook={onBook} onBookGaming={onBookGaming} />
          <main>
            <Hero onBook={onBook} />
            <BrandIntro />
            <GamingSection onBookGaming={onBookGaming} />
            <CafeExperience />
            <MenuSection />
            <ComboSection onBook={onBook} />
            <MembershipSection />
            <EventsSection />
            <WhyVisitBento />
            <GallerySection />
            <CommunitySection />
            <StatsCounter />
            <ReviewsSection />
            <SocialSection />
            <ReservationSection bookingType={bookingType} setBookingType={setBookingType} />
            <LocationSection />
            <FinalCTA onBook={onBook} />
          </main>
          <Footer />
          <MobileStickyCTA onBook={onBook} onBookGaming={onBookGaming} />
        </>
      )}
    </div>
  );
}