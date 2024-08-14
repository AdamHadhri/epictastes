import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import 'lazysizes';

export default function GradientCover({ title, imgSrc }) {
  return (
    <Card className='select-none' 
    sx={{ height: { md: 280, sm: 220, xs: 200 },
          width: { md: 280, sm: 220, xs: 200 },
          borderRadius: 20,
          overflow: 'hidden' }}>
      <CardCover>
        <img className="lazyload" data-src={imgSrc} alt={title} />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography sx={{ fontSize: { sm: '1.5rem', xs: '1rem' } }} level="h2" textColor="#fff">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
