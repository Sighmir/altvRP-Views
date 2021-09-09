import { Button, Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import React from 'react';

export interface CollapsableButtonsItemProps {
  onClick: (...any: any) => void;
  open: boolean;
  primary: string;
  buttons: { [text: string]: (...any: any) => void };
}

function CollapsableButtonsItem(props: CollapsableButtonsItemProps): JSX.Element {
  const { onClick, open, primary, buttons } = props;
  return (
    <>
      <ListItem component={Button} onClick={onClick}>
        <ListItemText primary={primary} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse component="li" in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          {Object.keys(buttons).map((key) => (
            <ListItem key={key} component={Button} onClick={buttons[key]}>
              <ListItemText primary={key} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default CollapsableButtonsItem;
