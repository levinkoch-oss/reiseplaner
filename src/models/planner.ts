export const activityOptions = [
  { key: "hiking", label: "Wandern" },
  { key: "sightseeing", label: "Sightseeing" },
  { key: "beach", label: "Strand" },
  { key: "skiing", label: "Skifahren" },
  { key: "swimming", label: "Schwimmen" },
  { key: "biking", label: "Radfahren" },
] as const;

export const weatherOptions = [
  { value: "sunny", label: "Sonnig" },
  { value: "rainy", label: "Regnerisch" },
  { value: "cloudy", label: "Bewölkt" },
  { value: "snowy", label: "Schneereich" },
] as const;

export const transportOptions = [
  { value: "car", label: "Auto" },
  { value: "plane", label: "Flugzeug" },
  { value: "train", label: "Zug" },
] as const;

export type ActivityKey = (typeof activityOptions)[number]["key"];
export type WeatherType = (typeof weatherOptions)[number]["value"];
export type TransportType = (typeof transportOptions)[number]["value"];

export type Activities = Record<ActivityKey, boolean>;

export type TripData = {
  name: string;
  destination: string;
  duration: number;
  weather: WeatherType;
  activities: Activities;
  transport: TransportType;
};

export type PackingItem = {
  id: string;
  label: string;
  packed: boolean;
};

export function createEmptyActivities(): Activities {
  return {
    hiking: false,
    sightseeing: false,
    beach: false,
    skiing: false,
    swimming: false,
    biking: false,
  };
}

export function createEmptyTrip(): TripData {
  return {
    name: "",
    destination: "",
    duration: 3,
    weather: "sunny",
    activities: createEmptyActivities(),
    transport: "car",
  };
}

export function weatherLabel(weather: WeatherType): string {
  return weatherOptions.find((option) => option.value === weather)?.label ?? weather;
}

export function transportLabel(transport: TransportType): string {
  return (
    transportOptions.find((option) => option.value === transport)?.label ?? transport
  );
}
