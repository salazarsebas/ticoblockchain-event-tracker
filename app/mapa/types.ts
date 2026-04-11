export type BBox = { x: number; y: number; width: number; height: number };

export type POICategory =
  | "stage"
  | "stands"
  | "food"
  | "toilet"
  | "checkin"
  | "entrance"
  | "tables";

export type Zone = {
  id: "greco" | "lobby";
  label: string;
  bbox: BBox;
};

export type GrecoFeatureKind =
  | "stage"
  | "mesas-regalo"
  | "mesas-transmision"
  | "check-in"
  | "audience"
  | "entry-door";

export type GrecoFeature = {
  id: string;
  kind: GrecoFeatureKind;
  label: string;
  shortLabel?: string;
  bbox: BBox;
  category: POICategory;
  interactive: boolean;
  description?: string;
};

export type StandNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Stand = {
  id: `stand-${StandNumber}`;
  number: StandNumber;
  wall: "left" | "right";
  bbox: BBox;
  sponsorName?: string;
  sponsorUrl?: string;
};

export type LobbyPOI = {
  id: "hotel-entrance" | "food-coffee" | "toilets";
  label: string;
  shortLabel?: string;
  category: POICategory;
  bbox: BBox;
  iconName: string;
  description?: string;
};

export type SelectableFeature =
  | { kind: "greco-feature"; data: GrecoFeature }
  | { kind: "stand"; data: Stand }
  | { kind: "lobby-poi"; data: LobbyPOI };
