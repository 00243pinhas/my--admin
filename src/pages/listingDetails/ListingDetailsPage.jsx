import ListingHeader from "./ListingHeader";
import BaseListingCard from "./BaseListingCard";
import ListingTypeCard from "./ListingTypeCard";
import TypeDetailsRenderer from "./TypeDetailsRenderer";
import ListingFilesCard from "./ListingFilesCard";
import OwnerInfoCard from "./OwnerInfoCard";
import ModerationActionsCard from "./ModerationActionsCard";
import ActivityTimeline from "./ActivityTimeline";

export default function ListingDetailsPage() {
  return (
    <div className="container-fluid py-4">

      {/* Sticky Admin Header */}
      <ListingHeader />

      {/* Content */}
      <div className="row g-4 mt-1">

        <div className="col-12">
          <BaseListingCard />
        </div>

        <div className="col-12">
          <ListingTypeCard />
        </div>

        <div className="col-12">
          <TypeDetailsRenderer />
        </div>

        <div className="col-12">
          <ListingFilesCard />
        </div>

        <div className="col-12">
          <OwnerInfoCard />
        </div>

        <div className="col-12">
          <ModerationActionsCard />
        </div>

        <div className="col-12">
          <ActivityTimeline />
        </div>

      </div>
    </div>
  );
}
