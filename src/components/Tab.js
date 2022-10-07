import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto({ grid, tabs, tabPanel }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          scrollButtons="auto"
          centered
        >
          {tabs.map((tab, i) => (
            <Tab
              key={'a'.concat(i)}
              label={tab.description}
              index={i}
/*               disabled={tab.disabled} */
              {...a11yProps(i)}
            />
          ))}
        </Tabs>
      </AppBar>
      {tabPanel.map((tab, i) => (
        <TabPanel value={value} index={i} key={'b'.concat(i)}>
          {grid
          ?
            <Grid
              container
              justifyContent="center"
              spacing={1}
              alignItems="center"
            >
              {tab}
            </Grid>
            : tab}
        </TabPanel>
      ))}
    </div>
  );
}
ScrollableTabsButtonAuto.propTypes = {
  grid: PropTypes.bool,
  tabs: PropTypes.array,
  tabPanel: PropTypes.array
};
