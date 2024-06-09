import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import BlurImageLoader from 'react-blur-image-loader';

export default function GradientCover( {title , imgSrc}  ) {

  return (
    <Card sx={{ minHeight: '280px', width: 320, borderRadius: 20, overflow: 'hidden' }}>
      <CardCover>
        <BlurImageLoader loading="lazy" src={imgSrc}
                        preview={"tiny-picture.jpg"} 
                        fullCover={true}
                        maxBlurLevel={10}
                        transitionTime={400}/>
                        
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
