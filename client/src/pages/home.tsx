import HeroSection from "../components/hero-section";
import AcademyGallery from "../components/academy-gallery";
import PromotionBanner from "../components/promotion-banner";
import GraduandosGallery from "../components/graduandos-gallery";
import RegistrationForm from "../components/registration-form";
import InstructorProfile from "../components/instructor-profile";
import WhatsAppContact from "../components/whatsapp-contact";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className="w-full max-w-sm mx-auto bg-white min-h-screen">
      <HeroSection />
      <AcademyGallery />
      <PromotionBanner />
      <GraduandosGallery />
      <RegistrationForm />
      <InstructorProfile />
      <WhatsAppContact />
      <Footer />
    </div>
  );
}
