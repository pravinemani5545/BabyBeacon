export type NotificationSetting = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
};

export type SoundCategory = {
  id: string;
  name: string;
  icon: string;
  sounds: Sound[];
};

export type Sound = {
  id: string;
  name: string;
  duration: string;
  favorite: boolean;
};

export type MonitoringThreshold = {
  id: string;
  name: string;
  value: number;
  unit: string;
}; 