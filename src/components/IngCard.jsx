import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import "../index.css"

export default function GradientCover( {title , imgSrc}  ) {

  return (
    <>
    <Card sx={{ width: { lg: 150, md: 130,  sm: 120, xs: 100 },
                height: { lg: 150, md: 130,  sm: 120, xs: 100  },
                borderRadius: 20,
                overflow: 'hidden' }}>
      <CardCover>
        <img  className="lazyload" data-src={imgSrc}  alt=""/>
      </CardCover>
      <CardCover/>
    </Card>
      <CardContent sx={{ alignItems: 'center', width: { lg: 200, md: 150,  sm: 120, xs: 100 }, mt: 1 }}>
        <Typography  level="title-lg" textColor="#000">
        {title}
        </Typography>
      </CardContent>
          
    </>
  );
}
