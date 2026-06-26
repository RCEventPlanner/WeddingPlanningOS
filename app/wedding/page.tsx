import { WeddingInfoForm } from "../../components/WeddingInfoForm";
import { WeddingProfileCard } from "../../components/WeddingProfileCard";
import { WeddingTabs } from "../../components/WeddingTabs";

export default function WeddingPage() {
  return (
    <div className="p-8 sm:p-10">
      <WeddingProfileCard />
      <WeddingTabs />
      <WeddingInfoForm />
    </div>
  );
}
