import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Campaigns } from "@/components/Campaigns";
import { KYCVerification } from "@/components/KYCVerification";
import { DonationFlow } from "@/components/DonationFlow";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("home");

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'campaigns':
        return <Campaigns />;
      case 'kyc':
        return <KYCVerification />;
      case 'donate':
        return <DonationFlow />;
      default:
        return <Hero onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header onNavigate={handleNavigate} currentSection={currentSection} />
      {renderContent()}
    </div>
  );
};

export default Index;
