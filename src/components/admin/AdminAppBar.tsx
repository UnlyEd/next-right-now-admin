/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { AppBar } from 'react-admin';

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  spacer: {
    flex: 1,
  },
});

const AdminAppBar = (props): JSX.Element => {
  console.debug('AdminAppBar.props', props);

  const classes = useStyles();
  return (
    <AppBar {...props}>
      <Typography
        variant="h6"
        color="inherit"
        className={classes.title}
        id="react-admin-title"
      />
      <span className={classes.spacer} />
      <span
        css={css`
          a {
            color: white !important;
          }
        `}
      >
        <a
          href={'https://nrn-v1-ssr-mst-aptd-gcms-lcz-sty-c1.now.sh/'}
          target={'_blank'}
        >
          Customer 1 site
        </a>
        {' '}-{' '}
        <a
          href={'https://nrn-v1-ssr-mst-aptd-gcms-lcz-sty-c2.now.sh/'}
          target={'_blank'}
        >
          Customer 2 site
        </a>
        {' '}-{' '}
        <a
          href={'https://github.com/UnlyEd/next-right-now-admin'}
          target={'_blank'}
        >
          Github
        </a>
      </span>
    </AppBar>
  );
};

export default AdminAppBar;
