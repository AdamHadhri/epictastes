import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import BlurImageLoader from 'react-blur-image-loader';
import "../index.css"

export default function GradientCover( {title , imgSrc}  ) {

  return (
    <>
    <Card sx={{ height: 180, width: 180, borderRadius: 20, overflow: 'hidden' }}>
      <CardCover>
        <BlurImageLoader src={imgSrc}
                        preview={"tiny-picture.jpg"} 
                        fullCover={true}
                        maxBlurLevel={10}
                        transitionTime={400}/>
      </CardCover>
      <CardCover
        // sx={{
        //   background:
        //     'linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.2), rgba(0,0,0,0) 300px)',
        // }}
      />
    </Card>
      <CardContent sx={{ alignItems: 'center', width: 180, mt: 1 }}>
        <Typography level="title-lg" textColor="#000">
        {title}
        </Typography>
      </CardContent>
          
    </>
  );
}
