import {
  activityOptions,
  transportLabel,
  weatherLabel,
} from "../models/planner";
import type { PackingItem, TripData } from "../models/planner";

type PlannerDisplayProps = {
  trip: TripData | null;
  packingList: PackingItem[];
  onToggleItem: (itemId: string) => void;
  onDeleteItem: (itemId: string) => void;
  onClearTrip: () => void;
};

function PlannerDisplay({
  trip,
  packingList,
  onToggleItem,
  onDeleteItem,
  onClearTrip,
}: PlannerDisplayProps) {
  if (!trip) {
    return (
      <section className="planner-panel">
        <div className="panel-heading">
          <p className="panel-kicker">Packliste</p>
          <h2>Noch keine Reise vorhanden</h2>
          <p>
            Fülle links das Formular aus. Danach erscheint hier automatisch deine
            Packliste.
          </p>
        </div>
      </section>
    );
  }

  const activeActivities = activityOptions
    .filter((activity) => trip.activities[activity.key])
    .map((activity) => activity.label);

  const packedItems = packingList.filter((item) => item.packed).length;

  return (
    <section className="planner-panel">
      <div className="panel-heading">
        <p className="panel-kicker">Deine Reise</p>
        <h2>{trip.destination}</h2>
        <p>
          Deine Reise ({trip.name}) dauert {trip.duration} Tage, du reist mit dem&nbsp;
          {transportLabel(trip.transport)}. Wetter: {weatherLabel(trip.weather)}.
        </p>
      </div>

      <div className="trip-meta">
        <span>{trip.duration} Tage</span>
        <span>{weatherLabel(trip.weather)}</span>
        <span>{transportLabel(trip.transport)}</span>
        <span>
          {packedItems}/{packingList.length} gepackt
        </span>
      </div>

      <div className="trip-activities">
        {activeActivities.length > 0 ? (
          activeActivities.map((activity) => (
            <span key={activity} className="trip-activity">
              {activity}
            </span>
          ))
        ) : (
          <span className="trip-activity trip-activity-muted">
            Keine Aktivitäten ausgewählt
          </span>
        )}
      </div>

      <div className="trip-card__actions">
        <button type="button" className="btn-danger" onClick={onClearTrip}>
          Reise entfernen
        </button>
      </div>

      <div className="packing-simple">
        <h3>Packliste</h3>

        <ul className="packing-list">
          {packingList.map((item) => (
            <li key={item.id} className="packing-item">
              <label className="packing-item__toggle">
                <input
                  type="checkbox"
                  checked={item.packed}
                  onChange={() => onToggleItem(item.id)}
                />
                <span
                  className={
                    item.packed
                      ? "packing-item__label is-packed"
                      : "packing-item__label"
                  }
                >
                  {item.label}
                </span>
              </label>

              <button
                type="button"
                className="btn-inline btn-inline-danger"
                onClick={() => onDeleteItem(item.id)}
              >
                Löschen
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default PlannerDisplay;
