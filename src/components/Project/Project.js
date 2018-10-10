import React, { Component } from 'react';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import AppService from '../../services/AppService';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  card: {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    margin: '0px auto',
    marginTop: '100px',
    textAlign: 'left',
    transition: '0.3s',
    padding: '10px',
    '&:hover': {
      boxShadow: ' 0 8px 16px 0 rgba(0,0,0,0.2)',
    },
  },
  title: {
    fontSize: '1.75rem !important',
    letterSpacing: '0.25px !important',
    marginBottom: '20px !important',
    textAlign: 'center !important',
    color: '#9f5afd!important',
  },
  description: {
    marginTop: '25px !important',
    marginBottom: '35px !important',
  },
  linksContainer: {
    margin: '20px 0px !important',
    textAlign: 'center',
  },
  linkItem: {
    margin: '0px 5px',
    textDecoration: 'none',
    padding: '2px 12px',
    borderRadius: '50px',
    border: '1px solid gray',
    color: '#512da8',
    '&:hover': {
      color: '#3700b7',
    },
  },
  Website: {
    border: '2px solid #ff9478',
    '&:hover': {
      border: '3px solid #ff9478',
    },
  },
  Repo: {
    border: '2px solid #f64747',
    '&:hover': {
      border: '3px solid #f64747',
    },
  },
  Chat: {
    border: '2px solid #f03434',
    '&:hover': {
      border: '3px solid #f03434',
    },
  },
  chipDivider: {
    margin: '10px 0px !important',
  },
  techContainer: {
    margin: '20px 0px !important',
  },
  resourcesContainer: {
    margin: '20px 0px !important',
  },
  techTitle: {
    color: '#231e1e !important',
    fontWeight: '500 !important',
    fontSize: '0.975rem !important',
    textTransform: 'uppercase',
    wordSpacing: '1px',
    letterSpacing: '0.25px',
  },
  resourcesTitle: {
    color: '#231e1e !important',
    fontWeight: '500 !important',
    fontSize: '0.975rem !important',
    textTransform: 'uppercase',
    wordSpacing: '1px',
    letterSpacing: '0.25px',
  },
});


const getLinkElement = (linkName, linkValue, classObj) => {
  if (linkValue !== '') {
    return (
      <a
        className={`${classObj.linkItem} ${classObj[linkName]}`}
        href={linkValue}
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkName}
      </a>
    );
  }
};

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = { project: null };
  }

  componentDidMount() {
    this.getProjectData();
  }

  async getProjectData() {
    const { match } = this.props;
    const { name } = match.params;
    const project = await AppService.getProjectByName(name);
    this.setState({ project });
  }

  render() {
    const { project } = this.state;
    const { classes } = this.props;

    return (
      <Grid container spacing={0}>
        <Grid item container xs={12} spacing={0}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} variant="title" component="h1">
                {project ? project.name : ''}
              </Typography>
              <Typography className={classes.linksContainer} component="div">
                {getLinkElement('Website', project && project.link ? project.link : '', classes)}
                {getLinkElement('Repo', project && project.repoLink ? project.repoLink : '', classes)}
                {getLinkElement('Chat', project && project.chatLink ? project.chatLink : '', classes)}
              </Typography>
              <Typography className={classes.description} component="p">
                {project ? project.description : ''}
              </Typography>
              <Typography className={classes.techContainer} component="div">
                <Typography className={classes.techTitle} component="h2">
                  {'Tech Stack'}
                </Typography>
                {project && project.tech.split(',').map(data => (
                  <Chip
                    key={data}
                    label={data}
                    color="secondary"
                    className={classes.chip}
                  />
                ))}
              </Typography>
              <Typography className={classes.resourcesContainer} component="div">
                <Typography className={classes.resourcesTitle} component="h2">
                  {'Resources Needed'}
                </Typography>
                <div className={classes.resourceItems}>
                  <Chip
                    label={project && project.partners ? project.partners : ''}
                    className={classes.chipDivider}
                    color="primary"
                  />
                </div>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Project);
