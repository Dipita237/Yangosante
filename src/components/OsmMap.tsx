import React, { useMemo, useState } from 'react';
import {
  Image,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

export type MapCoordinate = {
  latitude: number;
  longitude: number;
};

type OsmMapMarker = {
  coordinate: MapCoordinate;
  key: string;
  node: React.ReactNode;
};

type OsmMapProps = {
  center: MapCoordinate;
  markers?: OsmMapMarker[];
  route?: MapCoordinate[];
  routeColor?: string;
  style?: StyleProp<ViewStyle>;
  zoom?: number;
};

const TILE_SIZE = 256;

const latLngToPixel = (coordinate: MapCoordinate, zoom: number) => {
  const sinLatitude = Math.sin((coordinate.latitude * Math.PI) / 180);
  const scale = TILE_SIZE * 2 ** zoom;

  return {
    x: ((coordinate.longitude + 180) / 360) * scale,
    y:
      (0.5 -
        Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI)) *
      scale,
  };
};

const normalizeTileX = (x: number, zoom: number) => {
  const tileCount = 2 ** zoom;
  return ((x % tileCount) + tileCount) % tileCount;
};

const OsmMap = ({
  center,
  markers = [],
  route,
  routeColor = '#FF6B35',
  style,
  zoom = 14,
}: OsmMapProps) => {
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const centerPixel = useMemo(() => latLngToPixel(center, zoom), [center, zoom]);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  };

  const tiles = useMemo(() => {
    if (!layout.width || !layout.height) {
      return [];
    }

    const centerTileX = Math.floor(centerPixel.x / TILE_SIZE);
    const centerTileY = Math.floor(centerPixel.y / TILE_SIZE);
    const horizontalRadius = Math.ceil(layout.width / TILE_SIZE / 2) + 1;
    const verticalRadius = Math.ceil(layout.height / TILE_SIZE / 2) + 1;
    const nextTiles = [];

    for (let x = centerTileX - horizontalRadius; x <= centerTileX + horizontalRadius; x += 1) {
      for (let y = centerTileY - verticalRadius; y <= centerTileY + verticalRadius; y += 1) {
        nextTiles.push({ x, y });
      }
    }

    return nextTiles;
  }, [centerPixel.x, centerPixel.y, layout.height, layout.width]);

  const toScreenPoint = (coordinate: MapCoordinate) => {
    const pixel = latLngToPixel(coordinate, zoom);
    return {
      x: layout.width / 2 + pixel.x - centerPixel.x,
      y: layout.height / 2 + pixel.y - centerPixel.y,
    };
  };

  return (
    <View onLayout={onLayout} style={[styles.map, style]}>
      {tiles.map(tile => {
        const left = layout.width / 2 + tile.x * TILE_SIZE - centerPixel.x;
        const top = layout.height / 2 + tile.y * TILE_SIZE - centerPixel.y;
        const normalizedX = normalizeTileX(tile.x, zoom);

        return (
          <Image
            key={`${tile.x}-${tile.y}`}
            source={{
              uri: `https://tile.openstreetmap.org/${zoom}/${normalizedX}/${tile.y}.png`,
            }}
            style={[styles.tile, { left, top }]}
          />
        );
      })}

      {route?.slice(0, -1).map((point, index) => {
        const start = toScreenPoint(point);
        const end = toScreenPoint(route[index + 1]);
        const distance = Math.hypot(end.x - start.x, end.y - start.y);
        const angle = `${Math.atan2(end.y - start.y, end.x - start.x)}rad`;

        return (
          <View
            key={`${point.latitude}-${point.longitude}-${index}`}
            style={[
              styles.routeSegment,
              {
                backgroundColor: routeColor,
                left: (start.x + end.x) / 2 - distance / 2,
                top: (start.y + end.y) / 2 - 2.5,
                transform: [{ rotate: angle }],
                width: distance,
              },
            ]}
          />
        );
      })}

      {markers.map(marker => {
        const point = toScreenPoint(marker.coordinate);

        return (
          <View
            key={marker.key}
            pointerEvents="none"
            style={[styles.marker, { left: point.x - 40, top: point.y - 40 }]}>
            {marker.node}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    backgroundColor: '#E8E3DF',
    overflow: 'hidden',
  },
  marker: {
    alignItems: 'center',
    height: 80,
    justifyContent: 'center',
    position: 'absolute',
    width: 80,
  },
  routeSegment: {
    borderRadius: 999,
    height: 5,
    position: 'absolute',
  },
  tile: {
    height: TILE_SIZE,
    position: 'absolute',
    width: TILE_SIZE,
  },
});

export default OsmMap;
