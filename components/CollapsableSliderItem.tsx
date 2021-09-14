import { Button, Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import React from 'react';
import { SliderItem } from './styles';

export interface CollapsableArrowSelectItemProps {
  onClick: (...any: any) => void;
  open: boolean;
  primary: string;
  sliders: {
    [text: string]: {
      disabled?: boolean;
      value?: number;
      min?: number;
      max?: number;
      step?: number;
      default?: number;
      onChange: (...any: any) => void;
    };
  };
}

function CollapsableArrowSelectItem(props: CollapsableArrowSelectItemProps): JSX.Element {
  const { onClick, open, primary, sliders } = props;
  return (
    <>
      <ListItem component={Button} onClick={onClick}>
        <ListItemText primary={primary} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse component="li" in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          {Object.keys(sliders).map(
            (key) =>
              !sliders[key].disabled && (
                <ListItem key={key}>
                  <ListItemText primary={key} />
                  <SliderItem
                    value={sliders[key].value}
                    defaultValue={sliders[key].default || ((sliders[key].max || 1) + (sliders[key].min || 0)) / 2}
                    min={sliders[key].min || 0}
                    max={sliders[key].max || 1}
                    step={sliders[key].step || 0.1}
                    onChange={sliders[key].onChange}
                    aria-labelledby="continuous-slider"
                  />
                </ListItem>
              ),
          )}
        </List>
      </Collapse>
    </>
  );
}

export default CollapsableArrowSelectItem;
