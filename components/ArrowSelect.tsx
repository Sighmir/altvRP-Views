import { Button, Grid, Typography } from "@material-ui/core";
import React, { FormEvent } from "react";

interface ArrowSelectProps {
  title: string
  values: string[]
  current: number
  setCurrentValue: React.Dispatch<React.SetStateAction<number>>
}

function ArrowSelect(props: ArrowSelectProps) {
  const { title, values, current, setCurrentValue } = props;

  const onClickLeft = (e: FormEvent) => {
    e.preventDefault()
    setCurrentValue((prevCurrent) => {
      let newCurrent = prevCurrent - 1;
      if (newCurrent < 0) newCurrent = values.length - 1;
      return newCurrent;
    })
  }

  const onClickRight = (e: FormEvent) => {
    e.preventDefault()
    setCurrentValue((prevCurrent) => {
      let newCurrent = prevCurrent + 1;
      if (newCurrent >= values.length) newCurrent = 0;
      return newCurrent;
    })
  }

  return (
    <Grid container spacing={1}>
      <Grid xs={12} item>
        <Typography id="continuous-slider" gutterBottom>
          {title}
        </Typography>
      </Grid>
      <Grid xs={4} item>
          <Button onClick={onClickLeft}>&lt;</Button>
      </Grid>
      <Grid xs={4} item>
          <Typography>{values[current]}</Typography>
      </Grid>
      <Grid xs={4} item>
          <Button onClick={onClickRight}>&gt;</Button>
      </Grid>
    </Grid>
  )
}

export default ArrowSelect;