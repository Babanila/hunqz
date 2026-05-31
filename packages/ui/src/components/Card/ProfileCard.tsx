import type { ComponentType } from 'react';

import {
  formatLabel,
  renderArray,
  renderBoolean,
  renderCurrency,
  renderNumber,
  renderTargetAge,
  renderValue,
} from '../../lib/formatters';
import type {
  Location,
  Personal,
  ProfileData,
  LoadingType,
  Service,
  Sexual,
  SharedImageProps,
} from '../../types';
import { Avatar } from '../Avatar';
import { InfoItem } from '../InfoItem';
import { Section } from '../Section';
import { StatusBadge } from '../StatusBadge';

import { ReviewCard } from './ReviewCard';

export type ProfileCardProps = {
  profile: ProfileData;
  loadingType: LoadingType;
  ImageComponent?: ComponentType<SharedImageProps>;
  getImageUrlPath: (x: string) => string;
};

export function ProfileCard({
  profile,
  loadingType,
  ImageComponent,
  getImageUrlPath,
}: ProfileCardProps) {
  return (
    <div className="group rounded-2xl border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="flex gap-4">
        <div className="min-w-0 flex-1 space-y-4 py-1">
          <Section title="Picture">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
              {profile.preview_pic.url_token ? (
                <Avatar
                  key={profile.preview_pic.id}
                  srcToken={profile.preview_pic.url_token}
                  alt={profile.name}
                  size="lg"
                  loadingType={loadingType}
                  ImageComponent={ImageComponent}
                  getImageUrlPath={getImageUrlPath}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-gray-400">
                  {profile.name.charAt(0)}
                </div>
              )}
            </div>
          </Section>

          <Section title="Basic">
            <InfoItem label="Name" value={profile.name} />
            <InfoItem label="Telephone" value={profile.telephone} />
            <InfoItem label="Creation date" value={profile.creation_date} />
            <InfoItem label="Last login" value={profile.last_login} />
            <InfoItem label="Online" value={<StatusBadge status={profile.online_status} />} />
          </Section>

          <Section title="Location">
            <LocationInfo location={profile.location} />
          </Section>

          <Section title="Personal">
            <PersonalInfo personal={profile.personal} />
          </Section>

          <Section title="Service">
            <ServiceInfo service={profile.service} />
          </Section>

          <Section title="Sexual">
            <SexualInfo sexual={profile.sexual} />
          </Section>

          <Section title="Pictures">
            {profile.pictures.map((picture) => (
              <Avatar
                key={picture.id}
                srcToken={profile.preview_pic.url_token}
                alt={profile.name}
                size="md"
                loadingType={loadingType}
                ImageComponent={ImageComponent}
                getImageUrlPath={getImageUrlPath}
              />
            ))}
          </Section>

          <Section title="Reviews">
            {profile.reviews.map((review) => (
              <ReviewCard review={review} key={review.id} />
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
}

interface LocationProps {
  location: Location;
}

export function LocationInfo({ location }: LocationProps) {
  const items = [
    {
      label: 'City',
      value: location.name || null,
    },
    {
      label: 'Country',
      value: location.country || null,
    },
    {
      label: 'Sensor Enabled',
      value: renderBoolean(location.sensor),
    },
    {
      label: 'Base Profile',
      value: renderBoolean(location.is_base_profile),
    },
  ].filter((item) => item.value !== null && item.value !== undefined && item.value !== '');

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <InfoItem key={item.label} label={item.label} value={item.value} />
      ))}
    </div>
  );
}

interface PersonalInfoProps {
  personal: Personal;
}

export function PersonalInfo({ personal }: PersonalInfoProps) {
  const items = [
    {
      label: 'Age',
      value: renderNumber(personal.age) || null,
    },
    {
      label: 'Height',
      value: renderNumber(personal.height, 'cm') || null,
    },
    {
      label: 'Weight',
      value: renderNumber(personal.weight, 'kg') || null,
    },
    {
      label: 'Spoken Languages',
      value: renderArray(personal.spoken_languages) || null,
    },
    {
      label: 'Beard',
      value: formatLabel(personal.beard) || null,
    },
    {
      label: 'Body Hair',
      value: formatLabel(personal.body_hair) || null,
    },
    {
      label: 'Body Type',
      value: formatLabel(personal.body_type) || null,
    },
    {
      label: 'Ethnicity',
      value: formatLabel(personal.ethnicity) || null,
    },
    {
      label: 'Eye Color',
      value: formatLabel(personal.eye_color) || null,
    },
    {
      label: 'Hair Length',
      value: formatLabel(personal.hair_length) || null,
    },
    {
      label: 'Hair Color',
      value: formatLabel(personal.hair_color) || null,
    },
    {
      label: 'Orientation',
      value: formatLabel(personal.orientation) || null,
    },
    {
      label: 'Smoker',
      value: formatLabel(personal.smoker) || null,
    },
    {
      label: 'Piercing',
      value: formatLabel(personal.piercing) || null,
    },
    {
      label: 'Tattoo',
      value: formatLabel(personal.tattoo) || null,
    },
    {
      label: 'Target Age',
      value: renderTargetAge(personal.target_age?.min, personal.target_age?.max) || null,
    },
    {
      label: 'Gender',
      value: formatLabel(personal.gender_orientation?.gender) || null,
    },
    {
      label: 'Gender Orientation',
      value: formatLabel(personal.gender_orientation?.orientation) || null,
    },
    {
      label: 'Looking For Gender',
      value: renderArray(personal.gender_orientation?.looking_for_gender) || null,
    },
    {
      label: 'Looking For Orientation',
      value: renderArray(personal.gender_orientation?.looking_for_orientation) || null,
    },
  ].filter((item) => item.value !== null && item.value !== undefined && item.value !== '');

  return (
    <div className="space-y-8">
      {personal.profile_text && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">About</h3>
          <p className="leading-7 wrap-break-word text-gray-700">{personal.profile_text}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <InfoItem key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
}

interface ServiceInfoProps {
  service: Service;
}

export function ServiceInfo({ service }: ServiceInfoProps) {
  const items = [
    {
      label: 'Hourly Rate',
      value: renderCurrency(service.rate_hour, service.currency),
    },
    {
      label: 'Night Rate',
      value: renderCurrency(service.rate_night, service.currency),
    },
    {
      label: 'Currency',
      value: service.currency || null,
    },
    {
      label: 'Service Locations',
      value: renderArray(service.service_locations),
    },
    {
      label: 'Service Offerings',
      value: renderArray(service.service_offerings),
    },
  ].filter((item) => item.value !== null && item.value !== undefined && item.value !== '');

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <InfoItem key={item.label} label={item.label} value={item.value} />
      ))}
    </div>
  );
}

interface SexualInfoProps {
  sexual: Sexual;
}

export function SexualInfo({ sexual }: SexualInfoProps) {
  const items = [
    {
      label: 'Enabled',
      value: renderValue(sexual.enabled),
    },
    {
      label: 'Favored Position',
      value: renderValue(sexual.favored_position),
    },
    {
      label: 'Anal Position',
      value: renderValue(sexual.anal_position),
    },
    {
      label: 'Dick Size',
      value: renderValue(sexual.dick_size),
    },
    {
      label: 'Concision',
      value: renderValue(sexual.concision),
    },
    {
      label: 'Dirty Sex',
      value: renderValue(sexual.dirty_sex),
    },
    {
      label: 'SM',
      value: renderValue(sexual.sm),
    },
    {
      label: 'Fisting',
      value: renderValue(sexual.fisting),
    },
    {
      label: 'Fetish',
      value: renderValue(sexual.fetish),
    },
    {
      label: 'Safer Sex',
      value: renderValue(sexual.safer_sex),
    },
    {
      label: 'Kissing',
      value: renderValue(sexual.kissing),
    },
    {
      label: 'Oral',
      value: renderValue(sexual.oral),
    },
  ].filter((item) => item.value !== null);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <InfoItem key={item.label} label={item.label} value={item.value} />
      ))}
    </div>
  );
}
