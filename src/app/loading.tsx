import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Loading() {
  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      

      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="rectangular"  height={100} />
      <Skeleton variant="rounded"  height={100} />
    </Stack>
  );
}
