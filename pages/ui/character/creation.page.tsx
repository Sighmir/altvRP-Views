import { Button, ButtonGroup, FormControl, Grid, Input, Slider, Typography } from '@material-ui/core';
import ArrowSelect from 'components/ArrowSelect';
import * as proxy from 'modules/proxy';
import React, { ChangeEvent, FormEvent } from 'react';
import { CreationContainer } from './styles';

function CharacterCreation() {
  const fathers = ["Benjamin", "Daniel", "Joshua", "Noah", "Andrew", "Joan", "Alex", "Isaac", "Evan", "Ethan", "Vincent", "Angel", "Diego", "Adrian", "Gabriel", "Michael", "Santiago", "Kevin", "Louis", "Samuel", "Anthony", "John", "Niko", "Claude"]
  const mothers = ["Hannah", "Audrey", "Jasmine", "Giselle", "Amelia", "Isabella", "Zoe", "Ava", "Camilla", "Violet", "Sophia", "Eveline", "Nicole", "Ashley", "Grace", "Brianna", "Natalie", "Olivia", "Elizabeth", "Charlotte", "Emma", "Misty"]
  const [fatherFace, setFatherFace] = React.useState<number>(0)
  const [fatherSkin, setFatherSkin] = React.useState<number>(0)
  const [motherFace, setMotherFace] = React.useState<number>(0)
  const [motherSkin, setMotherSkin] = React.useState<number>(0)
  const [skinMix, setSkinMix] = React.useState<number>(0.5)
  const [faceMix, setFaceMix] = React.useState<number>(0.5)
  const [gender, setGender] = React.useState<string>("m")

  const selectGender = (e: FormEvent, value: "m" | "f") => {
    e.preventDefault()
    setGender(value)
  }

  React.useEffect(() => {
    proxy.view.setGender(gender)
  }, [gender])

  React.useEffect(() => {
    proxy.view.setAppearance({
      faceMix,
      skinMix,
      father: {
        face: fatherFace,
        skin: fatherSkin,
      },
      mother: {
        face: motherFace,
        skin: motherSkin,
      },
    })
  }, [fatherFace, fatherSkin, motherFace, motherSkin, faceMix, skinMix])

  const onSkinMix = (e: ChangeEvent<{}>, value: number | number[]) => {
    e.preventDefault()
    setSkinMix(value as number)
  }

  const onFaceMix = (e: ChangeEvent<{}>, value: number | number[]) => {
    e.preventDefault()
    setFaceMix(value as number)
  }

  return (
    <CreationContainer container spacing={1}>
      <Grid xs={12} item>
        <Typography id="continuous-slider" gutterBottom>
          Character name:
        </Typography>
        <FormControl>
          <Input id="my-input" placeholder="John Doe" />
        </FormControl>
      </Grid>
      <Grid xs={12} item>
        <Typography id="continuous-slider" gutterBottom>
          Character gender:
        </Typography>
        <ButtonGroup aria-label="outlined primary button group">
          <Button onClick={(e) => selectGender(e, 'm')}>Male</Button>
          <Button onClick={(e) => selectGender(e, 'f')}>Female</Button>
        </ButtonGroup>
      </Grid>
      <ArrowSelect title="Father's face:" values={fathers} current={fatherFace} setCurrentValue={setFatherFace} />
      <ArrowSelect title="Mother's face:" values={mothers} current={motherFace} setCurrentValue={setMotherFace} />
      <Slider defaultValue={faceMix} min={0} max={1} step={0.01} onChange={onSkinMix} aria-labelledby="continuous-slider" />
      <ArrowSelect title="Father's skin:" values={fathers} current={fatherSkin} setCurrentValue={setFatherSkin} />
      <ArrowSelect title="Mother's skin:" values={mothers} current={motherSkin} setCurrentValue={setMotherSkin} />
      <Slider defaultValue={skinMix} min={0} max={1} step={0.01} onChange={onFaceMix} aria-labelledby="continuous-slider" />
    </CreationContainer>
  );
}

export default CharacterCreation;
