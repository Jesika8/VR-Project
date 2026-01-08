export interface InterestPointData {
  id: string;
  position: [number, number, number];
  name: string;
  description: string;
  has360: boolean;
  image360?: string;
}

export interface AppState {
  activePointId: string | null;
  is360Mode: boolean;
  current360Image: string | null;
}
