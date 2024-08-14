import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import 'lazysizes';

export default function GradientCover( {title , imgSrc}  ) {

  return (
<Card 
  align="center"
  sx={{
    width: { lg: 200, md: 150,  sm: 120, xs: 100 },
    height: { lg: 200, md: 150,  sm: 120, xs: 100  },
    borderRadius: 140,
    overflow: 'hidden'
  }}
>      <CardCover>
        <img src={imgSrc} className="lazyload" alt=""/>
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.2), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="title-lg" textColor="#fff">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
