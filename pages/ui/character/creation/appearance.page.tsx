import { Button, ButtonGroup, Grid, Slider, Typography } from "@material-ui/core";
import ArrowSelect from "components/ArrowSelect";
import data from "data/characters.json";
import * as proxy from "modules/proxy";
import React, { ChangeEvent, FormEvent } from "react";
import { CreationContainer } from "../styles";

function CharacterCreation() {
  const [fatherFace, setFatherFace] = React.useState<number>(0)
  const [fatherSkin, setFatherSkin] = React.useState<number>(0)

  const [motherFace, setMotherFace] = React.useState<number>(0)
  const [motherSkin, setMotherSkin] = React.useState<number>(0)

  const [skinMix, setSkinMix] = React.useState<number>(0.5)
  const [faceMix, setFaceMix] = React.useState<number>(0.5)
  
  const [gender, setGender] = React.useState<string>("m")
  
  const [hairstyle, setHairstyle] = React.useState<number>(0)
  const [hairColor, setHairColor] = React.useState<number>(0)
  const [hairHighlight, setHairHighlight] = React.useState<number>(0)

  const selectGender = (e: FormEvent, value: "m" | "f") => {
    e.preventDefault()
    setGender(value)
    if (value == "m" && hairstyle >= data.maleHairs.length) {
      setHairstyle(data.maleHairs.length - 1)
    }
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

  React.useEffect(() => {
    proxy.view.setHairstyle(hairstyle)
  }, [hairstyle])

  React.useEffect(() => {
    proxy.view.setHairColor(hairColor, hairHighlight)
  }, [hairColor, hairHighlight])

  const onSkinMix = (e: ChangeEvent<{}>, value: number | number[]) => {
    e.preventDefault()
    setSkinMix(value as number)
  }

  const onFaceMix = (e: ChangeEvent<{}>, value: number | number[]) => {
    e.preventDefault()
    setFaceMix(value as number)
  }

  const getHairstyles = () => {
    if (gender == "m") return data.maleHairs
    else return data.femaleHairs
  }

  return (
    <CreationContainer container spacing={1}>
      <Grid xs={12} item>
          <Typography>Appearance</Typography>
      </Grid>
      <Grid xs={12} item>
        <Typography id="continuous-slider" gutterBottom>
          Character gender:
        </Typography>
        <ButtonGroup aria-label="outlined primary button group">
          <Button onClick={(e) => selectGender(e, "m")}>Male</Button>
          <Button onClick={(e) => selectGender(e, "f")}>Female</Button>
        </ButtonGroup>
      </Grid>
      <ArrowSelect title="Father's face:" values={data.fathers} current={fatherFace} setCurrent={setFatherFace} />
      <ArrowSelect title="Mother's face:" values={data.mothers} current={motherFace} setCurrent={setMotherFace} />
      <Slider defaultValue={faceMix} min={0} max={1} step={0.1} onChange={onFaceMix} aria-labelledby="continuous-slider" />
      <ArrowSelect title="Father's skin:" values={data.fathers} current={fatherSkin} setCurrent={setFatherSkin} />
      <ArrowSelect title="Mother's skin:" values={data.mothers} current={motherSkin} setCurrent={setMotherSkin} />
      <Slider defaultValue={skinMix} min={0} max={1} step={0.1} onChange={onSkinMix} aria-labelledby="continuous-slider" />
      <ArrowSelect title="Hairstyle:" skip={["Night Vision"]} values={getHairstyles()} current={hairstyle} setCurrent={setHairstyle} />
      <ArrowSelect title="Hair color:" values={data.hairColors} current={hairColor} setCurrent={setHairColor} />
      <ArrowSelect title="Hair highlight:" values={data.hairColors} current={hairHighlight} setCurrent={setHairHighlight} />
      <Grid xs={12} item>
          <Button>Next</Button>
      </Grid>
    </CreationContainer>
  );
}

export default CharacterCreation;
