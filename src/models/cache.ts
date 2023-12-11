export type Cache = {
  id: number;
  type: string;
  expires_at: Date;
  is_expired: boolean;
  value: string;
};
