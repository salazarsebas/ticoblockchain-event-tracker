"use client";

import type { KeyboardEvent } from "react";
import { GRECO_FEATURES } from "../data/greco-features";
import { STANDS } from "../data/stands";
import { LOBBY_POIS } from "../data/lobby-pois";
import type { POICategory } from "../types";
import { AudienceGrid } from "./floorplan/audience";
import {
  ESC2_AUDIENCE_AREA,
  GRECO_AUDIENCE_AREA,
  PARKING_BBOX,
  RESTAURANT_BBOX,
  SHOW_ESCENARIO_2,
  VIEWBOX_HEIGHT,
  VIEWBOX_WIDTH,
  WALL_LOBBY_ESC2_Y,
} from "./floorplan/constants";
import {
  ExteriorBlock,
  ParkingStalls,
  RestaurantRoom,
  WalkingPath,
} from "./floorplan/exterior";
import {
  GrecoFeatureShape,
  LobbyPOIShape,
  StandShape,
} from "./floorplan/shapes";
import {
  ContainerOutline,
  CorridorWall,
  LobbyEsc2Wall,
  Wall,
} from "./floorplan/walls";

type FloorplanSVGProps = {
  selectedId: string | null;
  activeFilters: Set<POICategory>;
  onSelect: (id: string) => void;
};

export default function FloorplanSVG({
  selectedId,
  activeFilters,
  onSelect,
}: FloorplanSVGProps) {
  const handleKeyDown = (id: string) => (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(id);
    }
  };

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="mapa-title mapa-desc"
      className="w-full h-auto select-none"
    >
      <title id="mapa-title">Mapa de Sala Greco, Lobby, Escenario 2 y Restaurante</title>
      <desc id="mapa-desc">
        Mapa interactivo del recinto TicoBlockchain 2026 en Hotel Barceló San
        José. Sala Greco, el lobby y el Escenario 2 forman un solo espacio
        conectado, separados por paredes interiores con puertas de acceso. El
        Escenario 2 se ubica al sur del lobby y se accede por un corredor en
        el costado derecho. El restaurante está al sur del Escenario 2 y se
        conecta al recinto a través de ese mismo corredor. Incluye escenario
        principal, escenario 2, stands, check-in, servicios sanitarios, zona
        de comida, restaurante y entrada del hotel.
      </desc>

      <ContainerOutline />
      <ExteriorBlock
        bbox={PARKING_BBOX}
        iconName="local_parking"
        label="PARKING"
        decorations={<ParkingStalls bbox={PARKING_BBOX} />}
      />
      <RestaurantRoom bbox={RESTAURANT_BBOX} />
      <WalkingPath />
      <AudienceGrid area={GRECO_AUDIENCE_AREA} rows={7} />
      {SHOW_ESCENARIO_2 && <AudienceGrid area={ESC2_AUDIENCE_AREA} rows={3} />}
      <Wall />
      {SHOW_ESCENARIO_2 && <LobbyEsc2Wall />}
      {SHOW_ESCENARIO_2 && <CorridorWall />}

      {/* Greco interactive features */}
      {GRECO_FEATURES
        .filter((f) => f.interactive)
        .filter((f) => SHOW_ESCENARIO_2 || f.bbox.y < WALL_LOBBY_ESC2_Y)
        .map((feature) => (
        <GrecoFeatureShape
          key={feature.id}
          feature={feature}
          dimmed={!activeFilters.has(feature.category)}
          selected={selectedId === feature.id}
          onSelect={onSelect}
          onKeyDown={handleKeyDown(feature.id)}
        />
      ))}

      {/* Stands */}
      {STANDS.map((stand) => (
        <StandShape
          key={stand.id}
          stand={stand}
          dimmed={!activeFilters.has("stands")}
          selected={selectedId === stand.id}
          onSelect={onSelect}
          onKeyDown={handleKeyDown(stand.id)}
        />
      ))}

      {/* Lobby POIs */}
      {LOBBY_POIS.map((poi) => (
        <LobbyPOIShape
          key={poi.id}
          poi={poi}
          dimmed={!activeFilters.has(poi.category)}
          selected={selectedId === poi.id}
          onSelect={onSelect}
          onKeyDown={handleKeyDown(poi.id)}
        />
      ))}

    </svg>
  );
}
