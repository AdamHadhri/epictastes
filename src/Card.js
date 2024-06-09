import React, { useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import './index.css'


export default function BasicCard({ title = "Default Title", imgSrc = "default.jpg" }) {
    const [loved,setLoved] = useState(false)
    function love() { setLoved(!loved) }

    function replace(str) {
        if (str.length > 36) {
          return str.slice(0, 32) + '...';
        }
        return str;
      }
      console.log({imgSrc} )
  return (
    <Card variant="outlined" sx={{ width: 320, height: 290 }}>
      <CardOverflow>
        <AspectRatio  ratio="4/3">
          <img
            src={imgSrc}
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <IconButton  onClick={love}
          aria-label="Like minimal photography"
          size="lg"
          variant="solid"
          color="danger"
          sx={{
            position: 'absolute',
            zIndex: 2,
            borderRadius: '50%',
            right: '1rem',
            bottom: 0,
            transform: 'translateY(50%)',
          }}
        >
             {loved ? <FavoriteIcon/> : <FavoriteBorderIcon/> }
        </IconButton>
      </CardOverflow>
      <CardContent>
      <Typography className="title">
          <Link href="#multiple-actions" overlay underline="none">
              {replace(title)}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}