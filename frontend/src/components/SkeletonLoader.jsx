import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Skeleton,
  Box
} from '@mui/material';

const FileCardSkeleton = () => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Skeleton variant="circular" width={48} height={48} />
        <Skeleton variant="text" width="80%" height={30} />
        <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 3 }} />
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="70%" height={20} />
      </Box>
    </CardContent>
    <CardActions>
      <Skeleton variant="rectangular" width="100%" height={36} sx={{ borderRadius: 2 }} />
    </CardActions>
  </Card>
);

const SkeletonLoader = ({ count = 6 }) => {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <FileCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonLoader;