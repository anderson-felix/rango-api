export type SSOResources = { id: string; token: string; expires: number };

export interface SSOData {
  google?: SSOResources;
}
