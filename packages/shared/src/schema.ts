import { z } from "zod";

export const OnlineStatusSchema = z.enum(["OFFLINE", "ONLINE", "AWAY"]);
export const ProfileTypeSchema = z.enum(["ESCORT"]);
export const PictureRatingSchema = z.enum(["NEUTRAL", "EROTIC", "APP_SAFE"]);

export const BeardTypeSchema = z.enum(["MOUSTACHE", "BEARD", "CLEAN_SHAVEN", "NO_ENTRY"]);
export const BodyHairTypeSchema = z.enum(["SHAVED", "TRIMMED", "NATURAL", "NO_ENTRY"]);
export const BodyTypeSchema = z.enum(["SLIM", "ATHLETIC", "AVERAGE", "CURVY", "MUSCULAR", "BBW", "NO_ENTRY"]);
export const EthnicitySchema = z.enum(["NO_ENTRY", "CAUCASIAN", "BLACK", "ASIAN", "LATIN", "MIXED"]);

export const EyeColorSchema = z.enum(["BLUE", "GREEN", "BROWN", "HAZEL", "GREY", "NO_ENTRY"]);
export const HairLengthSchema = z.enum(["SHORT", "AVERAGE", "LONG", "SHAVED", "NO_ENTRY"]);
export const HairColorSchema = z.enum(["BLACK", "BROWN", "LIGHT_BROWN", "BLONDE", "RED", "GREY", "NO_ENTRY"]);

export const OrientationSchema = z.enum(["GAY", "BISEXUAL", "STRAIGHT", "OTHER", "NO_ENTRY"]);
export const SmokerStatusSchema = z.enum(["YES", "NO", "OCCASIONALLY", "NO_ENTRY"]);
export const PiercingStatusSchema = z.enum(["NONE", "SOME", "A_LOT", "NO_ENTRY", "YES", "NO"]);
export const TattooStatusSchema = z.enum(["NONE", "SOME", "A_LOT", "NO_ENTRY", "YES", "NO",]);

export const GenderSchema = z.enum(["MAN", "WOMAN", "TRANS_MAN", "TRANS_WOMAN", "NON_BINARY", "OTHER"]);
export const LookingForGenderSchema = z.enum(["MAN", "WOMAN", "TRANS_MAN", "TRANS_WOMAN", "NON_BINARY", "OTHER"]);
export const LookingForOrientationSchema = z.enum(["GAY", "BISEXUAL", "STRAIGHT", "OTHER", "NO_ENTRY"]);
export const CurrencySchema = z.enum(["USD", "EUR", "GBP"]);
export const ServiceLocationSchema = z.enum(["MY_PLACE", "YOUR_PLACE", "HOTEL", "NO_ENTRY"]);

export const FavoredPositionSchema = z.enum(["TOP_ONLY", "BOTTOM_ONLY", "VERSATILE", "NO_ENTRY"]);
export const AnalPositionSchema = z.enum(["TOP", "BOTTOM", "VERSATILE", "NO_ENTRY"]);
export const DickSizeSchema = z.enum(["SMALL", "AVERAGE", "LARGE", "XL", "XXL", "NO_ENTRY"]);

export const ConcisionSchema = z.enum(["YES", "NO", "NO_ENTRY"]);
export const DirtySexSchema = z.enum(["YES", "NO", "NO_ENTRY"]);
export const SMStatusSchema = z.enum(["YES", "NO", "NO_ENTRY"]);
export const FistingStatusSchema = z.enum(["YES", "NO", "NO_ENTRY"]);
export const SaferSexSchema = z.enum(["YES", "NO", "NO_ENTRY"]);
export const KissingStatusSchema = z.enum(["YES", "NO", "NO_ENTRY"]);
export const OralStatusSchema = z.enum(["YES", "NO", "NO_ENTRY"]);
export const FetishSchema = z.enum(["SKATER", "LEATHER", "LATEX", "FOOT_FETISH", "BDSM", "ROLEPLAY", "NO_ENTRY"]);

export const PictureSchema = z.object({
  id: z.string(),
  owner_id: z.string(),
  url_token: z.string(),
  width: z.number(),
  height: z.number(),
  rating: PictureRatingSchema,
  comment: z.string().optional(),
  is_public: z.boolean(),
});

export const LocationSchema = z.object({
  name: z.string(),
  country: z.string(),
  sensor: z.boolean(),
  is_base_profile: z.boolean(),
});

export const TargetAgeSchema = z.object({
  min: z.number(),
  max: z.number(),
});

export const GenderOrientationSchema = z.object({
  gender: GenderSchema,
  orientation: OrientationSchema,
  looking_for_gender: z.array(LookingForGenderSchema),
  looking_for_orientation: z.array(LookingForOrientationSchema),
});

export const PersonalSchema = z.object({
  profile_text: z.string(),
  height: z.number(),
  weight: z.number(),
  target_age: TargetAgeSchema,
  spoken_languages: z.array(z.string()),
  beard: BeardTypeSchema,
  body_hair: BodyHairTypeSchema,
  body_type: BodyTypeSchema,
  ethnicity: EthnicitySchema,
  eye_color: EyeColorSchema,
  hair_length: HairLengthSchema,
  hair_color: HairColorSchema,
  orientation: OrientationSchema,
  smoker: SmokerStatusSchema,
  piercing: PiercingStatusSchema,
  tattoo: TattooStatusSchema,
  gender_orientation: GenderOrientationSchema,
  age: z.number(),
});

export const ServiceSchema = z.object({
  rate_hour: z.number(),
  rate_night: z.number(),
  currency: CurrencySchema,
  service_locations: z.array(ServiceLocationSchema),
  service_offerings: z.array(z.string()),
});

export const SexualSchema = z.object({
  enabled: z.boolean(),
  favored_position: FavoredPositionSchema,
  anal_position: AnalPositionSchema,
  dick_size: DickSizeSchema,
  concision: ConcisionSchema,
  dirty_sex: DirtySexSchema,
  sm: SMStatusSchema,
  fisting: FistingStatusSchema,
  fetish: z.array(FetishSchema),
  safer_sex: SaferSexSchema,
  kissing: KissingStatusSchema,
  oral: OralStatusSchema,
});

export const ReviewReplySchema = z.object({
  id: z.number(),
  review_id: z.number(),
  text: z.string(),
  updated_at: z.string(),
});

export const ReviewSchema = z.object({
  id: z.string(),
  comment: z.string(),
  updated_at: z.string(),
  is_reviewer_genuine: z.boolean(),
  vote: z.number().optional(),
  reply: ReviewReplySchema.optional(),
  is_reported: z.boolean(),
  reviewer_id: z.string().optional(),
  reviewer_name: z.string().optional(),
});


export const ProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: ProfileTypeSchema,
  is_plus: z.boolean(),
  online_status: OnlineStatusSchema,
  preview_pic: PictureSchema,
  headline: z.string(),
  last_login: z.string(),
  location: LocationSchema,
  personal: PersonalSchema,
  service: ServiceSchema,
  sexual: SexualSchema,
  telephone: z.string(),
  pictures: z.array(PictureSchema),
  reviews: z.array(ReviewSchema),
  travel_locations: z.array(z.string()),
  social_links: z.array(z.string()),
  is_public: z.boolean(),
  is_new: z.boolean(),
  creation_date: z.string(),
});
