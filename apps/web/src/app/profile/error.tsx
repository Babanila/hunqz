'use client';

import { DisplayMessage } from '@repo/ui/server';

export default function Error({ error }: { error: Error }) {
  return (
    <DisplayMessage variant="danger" title="Something went wrong" description={error.message} />
  );
}
