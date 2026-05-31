import type { ComponentType } from "react";

export type LoadingType = 'lazy' | 'eager';

export type STATUS = 'ONLINE' | 'OFFLINE';

export type SharedImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: LoadingType;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
};

export type SharedImageComponent = ComponentType<SharedImageProps>;

export type TargetAge = {
  min: number;
  max: number;
};

export type GenderOrientation = {
  gender: string;
  orientation: string;
  looking_for_gender: string[];
  looking_for_orientation: string[];
};

export type Location = {
  name: string;
  country: string;
  sensor: boolean;
  is_base_profile: boolean;
};

export type Personal = {
  profile_text: string;
  height: number;
  weight: number;
  age: number;
  spoken_languages: string[];
  beard: string;
  body_hair: string;
  body_type: string;
  ethnicity: string;
  eye_color: string;
  hair_length: string;
  hair_color: string;
  orientation: string;
  smoker: string;
  piercing: string;
  tattoo: string;
  target_age: TargetAge;
  gender_orientation: GenderOrientation;
};

export type Service = {
  rate_hour: number;
  rate_night: number;
  currency: string;
  service_locations?: string[];
  service_offerings: string[];
};

export type Sexual = {
  enabled?: boolean;
  favored_position?: string;
  anal_position?: string;
  dick_size?: string;
  concision?: string;
  dirty_sex?: string;
  sm?: string;
  fisting?: string;
  fetish?: string[];
  safer_sex?: string;
  kissing?: string;
  oral?: string;
};

export type ReviewReply = {
  id: number;
  review_id: number;
  text: string;
  updated_at: string;
};

export type Review = {
  id: string;
  comment: string;
  reviewer_id?: string;
  updated_at: string;
  is_reviewer_genuine: boolean;
  vote?: number;
  reply?: ReviewReply;
  is_reported?: boolean;
  reviewer_name?: string;
};

export type Picture = {
  id: string;
  owner_id?: string;
  url_token: string;
  width: number;
  height: number;
  rating?: string;
  comment?: string;
  is_public?: boolean;
};

export type ProfileData = {
  id: string;
  name: string;
  type: string;
  is_plus: boolean;
  online_status: STATUS;
  headline: string;
  telephone: string;
  last_login: string;
  creation_date: string;
  preview_pic: Picture;
  location: Location;
  personal: Personal;
  service: Service;
  sexual: Sexual;
  pictures: Picture[];
  reviews: Review[];
};

export type LinkComponentProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export type SharedLinkComponent =ComponentType<LinkComponentProps>;
