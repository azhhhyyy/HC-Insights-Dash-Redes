import { useState } from "react";
import { Stepper } from "../../components/auth/Stepper";
import { UserDetailsStep } from "./steps/UserDetailsStep";
import { OrganizationDetailsStep } from "./steps/OrganizationDetailsStep";
import { NetworkAssociationStep } from "./steps/NetworkAssociationStep";
import { useNavigate } from "react-router";

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOrgType, setSelectedOrgType] = useState<"dpc" | "network" | null>(null);
  const navigate = useNavigate();

  const ONBOARDING_STEPS = selectedOrgType === "network" 
    ? ["User Details", "Organization Details"] 
    : ["User Details", "Organization Details", "Network Association"];

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Finish onboarding
      navigate("/");
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-200">
      <div className="w-full max-w-[600px] mb-16">
        <Stepper steps={ONBOARDING_STEPS} currentStep={currentStep} />
      </div>

      <div className="w-full max-w-[600px] bg-card text-card-foreground rounded-xl shadow-sm border border-border p-8 sm:p-10 min-h-[500px] flex flex-col relative overflow-hidden transition-colors duration-200">
        {currentStep === 1 && <UserDetailsStep onNext={handleNext} />}
        {currentStep === 2 && (
          <OrganizationDetailsStep 
            selectedType={selectedOrgType}
            onTypeChange={setSelectedOrgType}
            onNext={handleNext} 
            onPrev={handlePrev} 
          />
        )}
        {currentStep === 3 && <NetworkAssociationStep onNext={handleNext} onPrev={handlePrev} />}
      </div>
    </div>
  );
}
