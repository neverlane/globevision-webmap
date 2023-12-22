import { style } from '@vanilla-extract/css';

export const appStyles = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'start',
  minHeight: '100vh',
  '@media': {
    'screen and (max-width: 1200px)': {
    },
  }
});