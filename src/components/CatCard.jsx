import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import 'lazysizes';

export default function GradientCover( {title , imgSrc}  ) {

  return (
    <Card sx={{ width: { lg: 320, md: 300,  sm: 200, xs: 150 },
                height: { lg: 280, md: 250,  sm: 170, xs: 120 },
                borderRadius: { lg: 20, md: 18,  sm: 17, xs: 15 },
                 overflow: 'hidden' }}>
      <CardCover>
      <img className="lazyload" data-src={imgSrc} alt=""/>
                        
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
