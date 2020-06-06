import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Skeleton from '@material-ui/lab/Skeleton';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import MicroFrontend from './../components/MicroFrontend';

import {
  GridList,
  Paper,
  GridListTile,
  GridListTileBar,
  Link,
} from '@material-ui/core';

import { Container, createMuiTheme, ThemeProvider } from '@material-ui/core';
import {
  makeStyles,
  responsiveFontSizes,
  useTheme,
} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function Main(props) {
  let themeMui = createMuiTheme({
    overrides: {
      MuiContainer: {
        root: {
          backgroundColor: 'lightblue',
        },
      },
    },
  });
  themeMui = responsiveFontSizes(themeMui);
  const getClasses = makeStyles((theme) => ({
    container: {
      flexGrow: 1,
      height: 'inherit',
      minHeight: 'inherit',
    },
    //  CAROUSEL
    carousel: {
      marginBottom: theme.spacing(2),
    },
    // RECOMMENDATION
    recommRoot: {
      padding: '1rem',
      marginBottom: theme.spacing(2),
    },
    gridRoot: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    recommList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    recommTileFrame: {
      width: 'auto !important',
    },
    recommTile: {
      width: '180px',
      height: '180px',
      [theme.breakpoints.down('xs')]: {
        width: '120px',
        height: '120px',
      },
    },
    gridTitle: {
      color: theme.palette.primary.light,
    },
    // CATEGORIES
    catRoot: {
      padding: '1rem',
      marginBottom: theme.spacing(2),
    },
    catTileFrame: {
      justifyContent: 'flex-start',
      width: 'auto !important',
    },
    catTile: {
      width: '180px',
      height: '180px',
      [theme.breakpoints.down('xs')]: {
        width: '120px',
        height: '120px',
      },
    },
  }));
  const classes = getClasses();
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  let recommNo = 4.5;
  let isSmall = false;
  let recomms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (useMediaQuery(useTheme().breakpoints.down('md'))) {
    recommNo = 3.5;
    recomms = [1, 2, 3, 4, 5, 6, 7, 8];
  }
  if (useMediaQuery(useTheme().breakpoints.down('sm'))) {
    recommNo = 2.5;
    recomms = [1, 2, 3, 4, 5, 6];
  }
  if (useMediaQuery(useTheme().breakpoints.down('xs'))) {
    isSmall = true;
    recommNo = 1.5;
    recomms = [1, 2, 3, 4];
  }
  let cats = [...recomms];

  return (
    <ThemeProvider theme={themeMui}>
      <Container maxWidth="lg" className={classes.container}>
        <p>Container</p>
        <MicroFrontend host="http://localhost:4000" name="Menu" />
        <Carousel
          className={classes.carousel}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          infiniteLoop={true}
        >
          {[1, 2, 3, 4].map((promo) => (
            <div key={promo}>
              <img
                src={`https://via.placeholder.com/960x240.png?text=Promo${promo}`}
                alt={promo}
              />
            </div>
          ))}
        </Carousel>
        <Paper className={classes.recommRoot}>
          <Typography variant="subtitle1">Recommended for you...</Typography>
          <GridList
            className={classes.recommList}
            cols={recommNo}
            cellHeight={isSmall ? 120 : 180}
          >
            {recomms.map((tile) => (
              <GridListTile
                key={tile}
                classes={{
                  root: classes.recommTileFrame,
                  tile: classes.recommTile,
                }}
              >
                {loading ? (
                  <Skeleton
                    variant="rect"
                    width={isSmall ? 120 : 180}
                    height={isSmall ? 120 : 180}
                  />
                ) : (
                  <img
                    src={`https://via.placeholder.com/${isSmall ? 120 : 180}x${
                      isSmall ? 120 : 180
                    }.png?text=Recomm${tile}`}
                    alt={tile}
                  />
                )}
                <GridListTileBar
                  title={
                    <Typography variant="caption">{`Buy now only for $1.00`}</Typography>
                  }
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${tile.title}`}
                      style={{
                        color: 'rgba(255, 255, 255, 0.54)',
                      }}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </Paper>
        <Paper className={classes.catRoot}>
          <Typography variant="subtitle1">Other categories...</Typography>
          <GridList
            cols={recommNo}
            rows={2}
            cellHeight={isSmall ? 120 : 180}
            className={classes.catTileFrame}
          >
            {cats.map((tile) => (
              <GridListTile
                key={tile}
                classes={{
                  root: classes.catTileFrame,
                  tile: classes.catTile,
                }}
              >
                <img
                  src={`https://via.placeholder.com/${isSmall ? 120 : 180}x${
                    isSmall ? 120 : 180
                  }.png?text=Cat${tile}`}
                  alt={tile}
                />
                <GridListTileBar
                  title={
                    <Typography variant="caption">{`Click to browse Cat${tile}s!`}</Typography>
                  }
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${tile.title}`}
                      style={{
                        color: 'rgba(255, 255, 255, 0.54)',
                      }}
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
          <Typography variant="subtitle2" align="right">
            <Link href="#" color="inherit">{`Click to browse more...`}</Link>
          </Typography>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
