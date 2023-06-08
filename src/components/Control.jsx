import { useMap } from "react-leaflet";

export function UpdateCenter({ center }) {
    const map = useMap();
    map.setView(center);
    return null;
  }