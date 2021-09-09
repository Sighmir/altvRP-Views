import { Button, Collapse, List, ListItem, ListItemText, Slider } from "@material-ui/core";
import { ArrowLeft, ArrowRight, ExpandLess, ExpandMore } from "@material-ui/icons";
import data from "data/characters.json";
import * as proxy from "modules/proxy";
import React, { ChangeEvent, FormEvent } from "react";
import { ArrowSelect, CreationNav } from "../styles";

function CharacterCreation() {
  const [fatherFace, setFatherFace] = React.useState<number>(0)
  const [fatherSkin, setFatherSkin] = React.useState<number>(0)

  const [motherFace, setMotherFace] = React.useState<number>(0)
  const [motherSkin, setMotherSkin] = React.useState<number>(0)

  const [skinMix, setSkinMix] = React.useState<number>(0.5)
  const [faceMix, setFaceMix] = React.useState<number>(0.5)
  
  const [gender, setGender] = React.useState<"m" | "f">("m")
  
  const [hairStyle, setHairstyle] = React.useState<number>(0)
  const [hairColor, setHairColor] = React.useState<number>(0)
  const [hairHighlight, setHairHighlight] = React.useState<number>(0)
  
  const [genderOpen, setGenderOpen] = React.useState(false)
  const [faceOpen, setFaceOpen] = React.useState(false)
  const [skinOpen, setSkinOpen] = React.useState(false)
  const [hairOpen, setHairOpen] = React.useState(false)

  const toggles = [setGenderOpen, setFaceOpen, setSkinOpen, setHairOpen]
  const hairStyles = {m: data.maleHairs, f: data.femaleHairs}
  const ignoredHairs = ["Night Vision"]

  const selectGender = (e: FormEvent, value: "m" | "f") => {
    e.preventDefault()
    setGender(value)
    if (value == "m" && hairStyle >= data.maleHairs.length) {
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
    proxy.view.setHairstyle(hairStyle)
  }, [hairStyle])

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

  const toggle = (toggler: React.Dispatch<React.SetStateAction<boolean>>) => {
    toggles.forEach((t) => t != toggler ? t(false) : null)
    toggler((prevOpen) => !prevOpen);
  };

  const scroll = (scroller: React.Dispatch<React.SetStateAction<number>>, values: string[], direction: number, skip: string[] = []) => {
    scroller((prevValue) => {
      prevValue = prevValue + direction;
      while (skip.includes(values[prevValue])) {
        prevValue = prevValue + direction;
      }
      if (prevValue < 0) prevValue = values.length - 1
      if (prevValue >= values.length) prevValue = 0
      return prevValue
    });
  }

  return (
      <div>
        <CreationNav>
          <List>
            <ListItem component={Button} onClick={() => toggle(setGenderOpen)}>
              <ListItemText primary={"GENDER"} />
              {genderOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse component="li" in={genderOpen} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItem component={Button} onClick={(e: any) => selectGender(e, "m")}>
                  <ListItemText primary={"Male"} />
                </ListItem>
                <ListItem component={Button} onClick={(e: any) => selectGender(e, "f")}>
                  <ListItemText primary={"Female"} />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button component={Button} onClick={() => toggle(setFaceOpen)}>
              <ListItemText primary={"FACE"} />
              {faceOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse component="li" in={faceOpen} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItem>
                  <ListItemText primary={"Father"} />
                  <ArrowSelect variant="text" color="primary" aria-label="text primary button group">
                    <Button onClick={() => scroll(setFatherFace, data.fathers, -1)}><ArrowLeft></ArrowLeft></Button>
                    <Button disabled>{data.fathers[fatherFace]}</Button>
                    <Button onClick={() => scroll(setFatherFace, data.fathers, +1)}><ArrowRight></ArrowRight></Button>
                  </ArrowSelect>
                </ListItem>
                <ListItem>
                  <ListItemText primary={"Mother"} />
                  <ArrowSelect variant="text" color="primary" aria-label="text primary button group">
                    <Button onClick={() => scroll(setMotherFace, data.mothers, -1)}><ArrowLeft></ArrowLeft></Button>
                    <Button disabled>{data.mothers[motherFace]}</Button>
                    <Button onClick={() => scroll(setMotherFace, data.mothers, +1)}><ArrowRight></ArrowRight></Button>
                  </ArrowSelect>
                </ListItem>
                <ListItem>
                  <Slider defaultValue={faceMix} min={0} max={1} step={0.1} onChange={onFaceMix} aria-labelledby="continuous-slider" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button component={Button} onClick={() => toggle(setSkinOpen)}>
              <ListItemText primary={"SKIN"} />
              {skinOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse component="li" in={skinOpen} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItem>
                  <ListItemText primary={"Father"} />
                  <ArrowSelect variant="text" color="primary" aria-label="text primary button group">
                    <Button onClick={() => scroll(setFatherSkin, data.fathers, -1)}><ArrowLeft></ArrowLeft></Button>
                    <Button disabled>{data.fathers[fatherSkin]}</Button>
                    <Button onClick={() => scroll(setFatherSkin, data.fathers, +1)}><ArrowRight></ArrowRight></Button>
                  </ArrowSelect>
                </ListItem>
                <ListItem>
                  <ListItemText primary={"Mother"} />
                  <ArrowSelect variant="text" color="primary" aria-label="text primary button group">
                    <Button onClick={() => scroll(setMotherSkin, data.mothers, -1)}><ArrowLeft></ArrowLeft></Button>
                    <Button disabled>{data.mothers[motherSkin]}</Button>
                    <Button onClick={() => scroll(setMotherSkin, data.mothers, +1)}><ArrowRight></ArrowRight></Button>
                  </ArrowSelect>
                </ListItem>
                <ListItem>
                  <Slider defaultValue={skinMix} min={0} max={1} step={0.1} onChange={onSkinMix} aria-labelledby="continuous-slider" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button component={Button} onClick={() => toggle(setHairOpen)}>
              <ListItemText primary={"HAIR"} />
              {hairOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse component="li" in={hairOpen} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItem>
                  <ListItemText primary={"Style"} />
                  <ArrowSelect variant="text" color="primary" aria-label="text primary button group">
                    <Button onClick={() => scroll(setHairstyle, hairStyles[gender], -1, ignoredHairs)}><ArrowLeft></ArrowLeft></Button>
                    <Button disabled>{hairStyles[gender][hairStyle]}</Button>
                    <Button onClick={() => scroll(setHairstyle, hairStyles[gender], +1, ignoredHairs)}><ArrowRight></ArrowRight></Button>
                  </ArrowSelect>
                </ListItem>
                <ListItem>
                  <ListItemText primary={"Color"} />
                  <ArrowSelect variant="text" color="primary" aria-label="text primary button group">
                    <Button onClick={() => scroll(setHairColor, data.hairColors, -1)}><ArrowLeft></ArrowLeft></Button>
                    <Button disabled>{data.hairColors[hairColor]}</Button>
                    <Button onClick={() => scroll(setHairColor, data.hairColors, +1)}><ArrowRight></ArrowRight></Button>
                  </ArrowSelect>
                </ListItem>
                <ListItem>
                  <ListItemText primary={"Highlights"} />
                  <ArrowSelect variant="text" color="primary" aria-label="text primary button group">
                    <Button onClick={() => scroll(setHairHighlight, data.hairColors, -1)}><ArrowLeft></ArrowLeft></Button>
                    <Button disabled>{data.hairColors[hairHighlight]}</Button>
                    <Button onClick={() => scroll(setHairHighlight, data.hairColors, +1)}><ArrowRight></ArrowRight></Button>
                  </ArrowSelect>
                </ListItem>
              </List>
            </Collapse>
          </List>
        </CreationNav>
      </div>
    // <CreationContainer container spacing={1}>
    //   <Grid xs={12} item>
    //       <Typography>Appearance</Typography>
    //   </Grid>
    //   <Grid xs={12} item>
    //     <Typography id="continuous-slider" gutterBottom>
    //       Character gender:
    //     </Typography>
    //     <ButtonGroup aria-label="outlined primary button group">
    //       <Button onClick={(e) => selectGender(e, "m")}>Male</Button>
    //       <Button onClick={(e) => selectGender(e, "f")}>Female</Button>
    //     </ButtonGroup>
    //   </Grid>
    //   <ArrowSelect title="Father's face:" values={data.fathers} current={fatherFace} setCurrent={setFatherFace} />
    //   <ArrowSelect title="Mother's face:" values={data.mothers} current={motherFace} setCurrent={setMotherFace} />
    //   <Slider defaultValue={faceMix} min={0} max={1} step={0.1} onChange={onFaceMix} aria-labelledby="continuous-slider" />
    //   <ArrowSelect title="Father's skin:" values={data.fathers} current={fatherSkin} setCurrent={setFatherSkin} />
    //   <ArrowSelect title="Mother's skin:" values={data.mothers} current={motherSkin} setCurrent={setMotherSkin} />
    //   <Slider defaultValue={skinMix} min={0} max={1} step={0.1} onChange={onSkinMix} aria-labelledby="continuous-slider" />
    //   <ArrowSelect title="Hairstyle:" skip={["Night Vision"]} values={getHairstyles()} current={hairStyle} setCurrent={setHairstyle} />
    //   <ArrowSelect title="Hair color:" values={data.hairColors} current={hairColor} setCurrent={setHairColor} />
    //   <ArrowSelect title="Hair highlight:" values={data.hairColors} current={hairHighlight} setCurrent={setHairHighlight} />
    //   <Grid xs={12} item>
    //       <Button>Next</Button>
    //   </Grid>
    // </CreationContainer>
  );
}

export default CharacterCreation;
