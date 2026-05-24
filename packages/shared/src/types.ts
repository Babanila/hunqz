import z from "zod";

import {
  AnalPositionSchema, BeardTypeSchema, BodyHairTypeSchema, BodyTypeSchema, ConcisionSchema,
  CurrencySchema, DickSizeSchema, DirtySexSchema, EthnicitySchema, EyeColorSchema, 
  FavoredPositionSchema, FetishSchema, FistingStatusSchema, GenderOrientationSchema, GenderSchema,
  HairColorSchema, HairLengthSchema, KissingStatusSchema, LocationSchema, LookingForGenderSchema,
  LookingForOrientationSchema, OnlineStatusSchema, OralStatusSchema, OrientationSchema,
  PersonalSchema, PictureRatingSchema, PictureSchema, PiercingStatusSchema, ProfileSchema,
  ProfileTypeSchema, ReviewReplySchema, ReviewSchema, SaferSexSchema, ServiceLocationSchema,
  ServiceSchema, SexualSchema, SmokerStatusSchema, SMStatusSchema, TargetAgeSchema, TattooStatusSchema
} from "./schema";

export type Picture = z.infer<typeof PictureSchema>;
export type Location = z.infer<typeof LocationSchema>;
export type TargetAge = z.infer<typeof TargetAgeSchema>;
export type GenderOrientation = z.infer<typeof GenderOrientationSchema>;
export type Personal = z.infer<typeof PersonalSchema>;
export type Service = z.infer<typeof ServiceSchema>;
export type Sexual = z.infer<typeof SexualSchema>;
export type ReviewReply = z.infer<typeof ReviewReplySchema>;
export type Review = z.infer<typeof ReviewSchema>;
export type Profile = z.infer<typeof ProfileSchema>;

export type OnlineStatus = z.infer<typeof OnlineStatusSchema>;
export type ProfileType = z.infer<typeof ProfileTypeSchema>;
export type PictureRating = z.infer<typeof PictureRatingSchema>;
export type BeardType = z.infer<typeof BeardTypeSchema>;
export type BodyHairType = z.infer<typeof BodyHairTypeSchema>;
export type BodyType = z.infer<typeof BodyTypeSchema>;
export type Ethnicity = z.infer<typeof EthnicitySchema>;
export type EyeColor = z.infer<typeof EyeColorSchema>;
export type HairLength = z.infer<typeof HairLengthSchema>;
export type HairColor = z.infer<typeof HairColorSchema>;
export type Orientation = z.infer<typeof OrientationSchema>;
export type SmokerStatus = z.infer<typeof SmokerStatusSchema>;
export type PiercingStatus = z.infer<typeof PiercingStatusSchema>;
export type TattooStatus = z.infer<typeof TattooStatusSchema>;
export type Gender = z.infer<typeof GenderSchema>;
export type LookingForGender = z.infer<typeof LookingForGenderSchema>;
export type LookingForOrientation = z.infer<typeof LookingForOrientationSchema>;
export type Currency = z.infer<typeof CurrencySchema>;
export type ServiceLocation = z.infer<typeof ServiceLocationSchema>;
export type FavoredPosition = z.infer<typeof FavoredPositionSchema>;
export type AnalPosition = z.infer<typeof AnalPositionSchema>;
export type DickSize = z.infer<typeof DickSizeSchema>;
export type Concision = z.infer<typeof ConcisionSchema>;
export type DirtySex = z.infer<typeof DirtySexSchema>;
export type SMStatus = z.infer<typeof SMStatusSchema>;
export type FistingStatus = z.infer<typeof FistingStatusSchema>;
export type SaferSex = z.infer<typeof SaferSexSchema>;
export type KissingStatus = z.infer<typeof KissingStatusSchema>;
export type OralStatus = z.infer<typeof OralStatusSchema>;
export type Fetish = z.infer<typeof FetishSchema>;

export type PictureWithUrl<T extends Picture = Picture> = T & { url: string };

export interface UrlServiceConfig {
  baseUrl: string;
  apiPath: string;
  imagePath: string;
}
