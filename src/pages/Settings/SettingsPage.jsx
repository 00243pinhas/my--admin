import PlatformInfoCard from "./sections/PlatformInfoCard";
import FeatureFlagsCard from "./sections/FeatureFlagsCard";
import SecurityCard from "./sections/SecurityCard";
import ModerationDefaultsCard from "./sections/ModerationDefaultsCard";
import SystemMetaCard from "./sections/SystemMetaCard";

export default function SettingsPage() {
  return (
    <div className="container-fluid p-5">

      <div className="mb-4">
        <h3>Settings</h3>
        <p className="text-muted">
          Platform-level configuration and system behavior.
          Some settings are read-only in this version.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-12">
          <PlatformInfoCard />
        </div>

        <div className="col-12">
          <FeatureFlagsCard />
        </div>

        <div className="col-12">
          <SecurityCard />
        </div>

        <div className="col-12">
          <ModerationDefaultsCard />
        </div>

        <div className="col-12">
          <SystemMetaCard />
        </div>
      </div>

    </div>
  );
}
