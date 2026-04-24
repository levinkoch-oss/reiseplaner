import { useState } from "react";
import PlannerDisplay from "./PlannerDisplay";
import PlannerForm from "./PlannerForm";
import { weatherLabel } from "../models/planner";
import type { PackingItem, TripData } from "../models/planner";

function createPackingList(trip: TripData): PackingItem[] {
  const suggestions: string[] = [
    "Ausweis oder Reisepass",
    "Portemonnaie",
    `Kleidung fuer ${trip.duration} Tage`,
    "Unterwaesche",
    "Socken",
    "Zahnbuerste und Zahnpasta",
    "Handy und Ladekabel",
  ];

  if (trip.weather === "sunny") {
    suggestions.push("Sonnencreme", "Sonnenbrille");
  }

  if (trip.weather === "rainy") {
    suggestions.push("Regenjacke", "Regenschirm");
  }

  if (trip.weather === "cloudy") {
    suggestions.push("Leichte Jacke");
  }

  if (trip.weather === "snowy") {
    suggestions.push("Winterjacke", "Handschuhe", "Schal");
  }

  if (trip.activities.hiking) {
    suggestions.push("Wanderschuhe", "Kleiner Rucksack");
  }

  if (trip.activities.sightseeing) {
    suggestions.push("Wasserflasche");
  }

  if (trip.activities.beach || trip.activities.swimming) {
    suggestions.push("Badesachen", "Badetuch");
  }

  if (trip.activities.skiing) {
    suggestions.push("Skibrille", "Thermowaesche");
  }

  if (trip.activities.biking) {
    suggestions.push("Fahrradhelm");
  }

  if (trip.transport === "plane") {
    suggestions.push("Flugtickets oder Boardingpass");
  }

  if (trip.transport === "train") {
    suggestions.push("Zugtickets");
  }

  if (trip.transport === "car") {
    suggestions.push("Fuehrerschein");
  }

  return [...new Set(suggestions)].map((label) => ({
    id: crypto.randomUUID(),
    label,
    packed: false,
  }));
}

function PlannerPage() {
  const [trip, setTrip] = useState<TripData | null>(null);
  const [packingList, setPackingList] = useState<PackingItem[]>([]);
  const [formKey, setFormKey] = useState(0);

  const handleCreateTrip = (newTrip: TripData) => {
    setTrip(newTrip);
    setPackingList(createPackingList(newTrip));
  };

  const handleToggleItem = (itemId: string) => {
    setPackingList((currentList) =>
      currentList.map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item,
      ),
    );
  };

  const handleDeleteItem = (itemId: string) => {
    setPackingList((currentList) =>
      currentList.filter((item) => item.id !== itemId),
    );
  };

  const handleClearTrip = () => {
    setTrip(null);
    setPackingList([]);
    setFormKey((currentKey) => currentKey + 1);
  };

  const packedItems = packingList.filter((item) => item.packed).length;

  return (
    <div className="planner-page">
      <section className="planner-hero">
        <div className="planner-hero__content">
          <p className="planner-hero__kicker">Einfacher Reiseplaner</p>
          <h1>Eine Reise eingeben und sofort eine Packliste erhalten</h1>
        </div>

        <div className="planner-hero__stats">
          <div className="hero-stat">
            <span className="hero-stat__value">
              {trip ? trip.destination : "-"}
            </span>
            <span className="hero-stat__label">Reiseziel</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat__value">{packingList.length}</span>
            <span className="hero-stat__label">Packeinträge</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat__value">{packedItems}</span>
            <span className="hero-stat__label">Abgehakt</span>
          </div>
          <div className="hero-stat hero-stat-muted">
            <span className="hero-stat__value">
              {trip ? weatherLabel(trip.weather) : "-"}
            </span>
            <span className="hero-stat__label">Wetter</span>
          </div>
        </div>
      </section>

      <div className="planner-layout">
        <PlannerForm key={formKey} onCreateTrip={handleCreateTrip} />
        <PlannerDisplay
          trip={trip}
          packingList={packingList}
          onToggleItem={handleToggleItem}
          onDeleteItem={handleDeleteItem}
          onClearTrip={handleClearTrip}
        />
      </div>
    </div>
  );
}

export default PlannerPage;
