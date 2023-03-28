import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { WhatsApp, Instagram, Facebook, YouTube } from '@material-ui/icons';

function renderSocialMediaList() {
  const socialMediaLinks = {
    whatsapp: 'https://api.whatsapp.com/send?phone=5587981148453',
    instagram: 'https://www.instagram.com/JobasFernandes/',
    facebook: 'https://www.facebook.com/SEU_NOME_DE_USUARIO/',
    youtube: 'https://www.youtube.com/channel/SEU_ID_DO_CANAL/'
  };

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item>
        <IconButton aria-label="whatsapp" href={socialMediaLinks.whatsapp} target="_blank">
          <WhatsApp style={{ color: '#25d366' }} />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton aria-label="instagram" href={socialMediaLinks.instagram} target="_blank">
          <Instagram style={{ color: '#e1306c' }} />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton aria-label="facebook" href={socialMediaLinks.facebook} target="_blank">
          <Facebook style={{ color: '#1877f2' }} />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton aria-label="youtube" href={socialMediaLinks.youtube} target="_blank">
          <YouTube style={{ color: '#ff0000' }} />
        </IconButton>
      </Grid>
    </Grid>
  );
}

function SocialMediaList() {
  return (
    <div>
      {renderSocialMediaList()}
    </div>
  );
}

export default SocialMediaList;
