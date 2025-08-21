import { Hero } from "@/components/Hero";
import { Dashboard } from "@/components/Dashboard";
import { TechSpecs } from "@/components/TechSpecs";
import { CTA } from "@/components/CTA";
import { MobileActions } from "@/components/MobileActions";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Dashboard />
      <TechSpecs />
      <CTA />
      <MobileActions />
    </div>
  );
};

export default Index;
