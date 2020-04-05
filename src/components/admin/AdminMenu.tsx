import { useMediaQuery } from '@material-ui/core';
import LabelIcon from '@material-ui/icons/Label';
import React, { createElement } from 'react';
import { getResources, MenuItemLink } from 'react-admin';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

const AdminMenu = (props): JSX.Element => {
  // XXX Not used yet
  console.debug('AdminMenu.props', props);

  const { onMenuClick, logout } = props;
  const isXSmall = useMediaQuery((theme: any) => theme.breakpoints.down('xs'));
  const open = useSelector(state => state.admin.ui.sidebarOpen);
  const resources = useSelector(getResources);

  return (
    <div>
      {resources.map(resource => (
        <MenuItemLink
          key={resource.name}
          to={`/${resource.name}`}
          primaryText={resource.options && resource.options.label || resource.name}
          leftIcon={createElement(resource.icon)}
          onClick={onMenuClick}
          sidebarIsOpen={open}
        />
      ))}
      <MenuItemLink
        to="/custom-route"
        primaryText="Miscellaneous"
        leftIcon={<LabelIcon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
      />
      {isXSmall && logout}
    </div>
  );
};

export default withRouter(AdminMenu);
