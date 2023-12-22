import { style } from '@vanilla-extract/css'; 

export const wrapperStyles = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  '@media': {
    'screen and (max-width: 1200px)': {
    }
  }
});

export const containerStyles = style({
  position: 'relative',
  margin: '0 auto',
});

export const mapStyles = style({
  aspectRatio: 1,
});

export const playerStyles = style({
  display: 'block',
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  minWidth: '10px',
  minHeight: '10px',
  width: '1.5%',
  height: '1.5%',
  borderRadius: '50%',
  border: '1px solid black',
});