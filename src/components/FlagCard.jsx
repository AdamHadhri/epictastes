import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import '../index.css'

export default function GradientCover( {title , imgSrc}  ) {

  return (
    <Card className="drag" sx={{ height: {md: 140 , sm: 120, xs: 70 },
                width: {md: 200 ,  sm: 180 , xs: 110 },
                borderRadius: {md: 25 ,  sm: 20 , xs: 15 },
                overflow: 'hidden' }}>
      <CardCover>
        <img className="lazyload" data-src={imgSrc} alt=""/>
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 300px)',
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
