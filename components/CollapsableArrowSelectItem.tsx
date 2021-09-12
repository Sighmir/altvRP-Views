import { Button, Collapse, List, ListItem, ListItemText, Slider } from '@material-ui/core';
import { ArrowLeft, ArrowRight, ExpandLess, ExpandMore } from '@material-ui/icons';
import React from 'react';
import { ArrowSelect } from './styles';

export interface CollapsableArrowSelectItemProps {
  onClick: (...any: any) => void;
  open: boolean;
  primary: string;
  slidersFirst?: boolean;
  selects: {
    [text: string]: {
      left: (...any: any) => void;
      right: (...any: any) => void;
      index: number;
      values: string[];
      none?: string;
      disabled?: boolean;
    };
  };
  sliders?: [
    {
      value?: number;
      min?: number;
      max?: number;
      step?: number;
      default?: number;
      onChange: (...any: any) => void;
    },
  ];
}

function mapSliders(sliders: CollapsableArrowSelectItemProps['sliders']) {
  return sliders
    ? sliders.map((s, i) => (
        <ListItem key={'slider' + i}>
          <Slider
            value={s.value}
            defaultValue={s.default || ((s.max || 1) - (s.min || 0)) / 2}
            min={s.min || 0}
            max={s.max || 1}
            step={s.step || 0.1}
            onChange={s.onChange}
            aria-labelledby="continuous-slider"
          />
        </ListItem>
      ))
    : [];
}

function getValue(values: string[], index: number, none = '') {
  return values[index] ? values[index] : none;
}

function CollapsableArrowSelectItem(props: CollapsableArrowSelectItemProps): JSX.Element {
  const { onClick, open, primary, selects, sliders, slidersFirst } = props;
  return (
    <>
      <ListItem component={Button} onClick={onClick}>
        <ListItemText primary={primary} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse component="li" in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          {slidersFirst ? mapSliders(sliders) : []}
          {Object.keys(selects).map(
            (key) =>
              !selects[key].disabled && (
                <ListItem key={key}>
                  <ListItemText primary={key} />
                  <ArrowSelect variant="text" color="primary" aria-label="text primary button group">
                    <Button onClick={selects[key].left}>
                      <ArrowLeft></ArrowLeft>
                    </Button>
                    <Button disabled>{getValue(selects[key].values, selects[key].index, selects[key].none)}</Button>
                    <Button onClick={selects[key].right}>
                      <ArrowRight></ArrowRight>
                    </Button>
                  </ArrowSelect>
                </ListItem>
              ),
          )}
          {!slidersFirst ? mapSliders(sliders) : []}
        </List>
      </Collapse>
    </>
  );
}

export default CollapsableArrowSelectItem;
