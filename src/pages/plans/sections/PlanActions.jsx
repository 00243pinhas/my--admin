import { useAuth } from "../../../auth/useAuth";
import {
  activatePlan,
  deactivatePlan,
} from "../../../api/plansApi";

export default function PlanActions({ plan, onReload }) {
  const { token } = useAuth();

  async function toggle() {
    try {
      if (plan.active) {
        await deactivatePlan(token, plan.id);
      } else {
        await activatePlan(token, plan.id);
      }
      onReload();
    } catch (err) {
      console.error("Failed to toggle plan", err);
      alert("Failed to update plan");
    }
  }

  return (
    <button
      className={`btn btn-sm ${
        plan.active
          ? "btn-outline-secondary"
          : "btn-outline-success"
      }`}
      onClick={toggle}
    >
      {plan.active ? "Deactivate" : "Activate"}
    </button>
  );
}
