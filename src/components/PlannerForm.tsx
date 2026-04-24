import { useState } from "react";
import {
  activityOptions,
  createEmptyTrip,
  transportOptions,
  weatherOptions,
} from "../models/planner";
import type { ActivityKey, TripData } from "../models/planner";

type PlannerFormProps = {
  onCreateTrip: (trip: TripData) => void;
};

function PlannerForm({ onCreateTrip }: PlannerFormProps) {
  const [trip, setTrip] = useState<TripData>(createEmptyTrip());

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;

    setTrip((currentTrip) => ({
      ...currentTrip,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleActivityChange = (activity: ActivityKey) => {
    setTrip((currentTrip) => ({
      ...currentTrip,
      activities: {
        ...currentTrip.activities,
        [activity]: !currentTrip.activities[activity],
      },
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreateTrip({
      ...trip,
      duration: Math.max(1, trip.duration),
    });
  };

  const handleReset = () => {
    setTrip(createEmptyTrip());
  };

  return (
    <section className="planner-panel">
      <div className="panel-heading">
        <p className="panel-kicker">Reisedaten</p>
        <h2>Eine Reise eintragen</h2>
        <p>
          Bitte fülle das Formular vollständig mit deinen Reisedaten aus.
        </p>
      </div>

      <form className="planner-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="field">
            <span>Name</span>
            <input
              name="name"
              value={trip.name}
              onChange={handleChange}
              placeholder="z.B. Mia Keller"
              required
            />
          </label>

          <label className="field">
            <span>Zielort</span>
            <input
              name="destination"
              value={trip.destination}
              onChange={handleChange}
              placeholder="z.B. Paris"
              required
            />
          </label>

          <label className="field">
            <span>Dauer in Tagen</span>
            <input
              name="duration"
              type="number"
              min={1}
              value={trip.duration}
              onChange={handleChange}
              required
            />
          </label>

          <label className="field">
            <span>Wetter</span>
            <select name="weather" value={trip.weather} onChange={handleChange}>
              {weatherOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field field-full">
            <span>Transport</span>
            <select name="transport" value={trip.transport} onChange={handleChange}>
              {transportOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="activity-selector">
          <span className="field-label">Aktivitäten</span>
          <div className="activity-grid">
            {activityOptions.map((activity) => (
              <label key={activity.key} className="activity-chip">
                <input
                  type="checkbox"
                  checked={trip.activities[activity.key]}
                  onChange={() => handleActivityChange(activity.key)}
                />
                <span>{activity.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={handleReset}>
            Formular leeren
          </button>
          <button type="submit" className="btn-primary">
            Packliste erstellen
          </button>
        </div>
      </form>
    </section>
  );
}

export default PlannerForm;
