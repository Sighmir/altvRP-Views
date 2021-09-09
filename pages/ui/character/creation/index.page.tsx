import { List } from '@material-ui/core';
import CollapsableArrowSelectItem from 'components/CollapsableArrowSelectItem';
import CollapsableButtonsItem from 'components/CollapsableButtonsItem';
import data from 'data/characters';
import * as proxy from 'modules/proxy';
import React, { ChangeEvent, FormEvent } from 'react';
import { CreationNav } from '../styles';

function CharacterCreation(): JSX.Element {
  const [fatherFace, setFatherFace] = React.useState<number>(0);
  const [motherFace, setMotherFace] = React.useState<number>(0);
  const [faceMix, setFaceMix] = React.useState<number>(1.0);
  const [faceOpen, setFaceOpen] = React.useState(false);

  const [fatherSkin, setFatherSkin] = React.useState<number>(0);
  const [motherSkin, setMotherSkin] = React.useState<number>(0);
  const [skinMix, setSkinMix] = React.useState<number>(1.0);
  const [skinOpen, setSkinOpen] = React.useState(false);

  const [gender, setGender] = React.useState<'m' | 'f'>('m');
  const [genderOpen, setGenderOpen] = React.useState(false);

  const hairStyles = { m: data.hair.male, f: data.hair.female };
  const [hairStyle, setHairstyle] = React.useState<number>(0);
  const [hairColor, setHairColor] = React.useState<number>(0);
  const [hairHighlight, setHairHighlight] = React.useState<number>(0);
  const [hairOpen, setHairOpen] = React.useState(false);
  const ignoredHairs = ['Night Vision'];

  const [overlaysOpen, setOverlaysOpen] = React.useState(false);
  const [blemishes, setBlemishes] = React.useState<number>(0);
  const [blemishesOpacity, setBlemishesOpacity] = React.useState<number>(1.0);
  const [facialHair, setFacialHair] = React.useState<number>(0);
  const [facialHairOpacity, setFacialHairOpacity] = React.useState<number>(1.0);
  const [eyebrows, setEyebrows] = React.useState<number>(0);
  const [eyebrowsOpacity, setEyebrowsOpacity] = React.useState<number>(1.0);
  const [ageing, setAgeing] = React.useState<number>(0);
  const [ageingOpacity, setAgeingOpacity] = React.useState<number>(1.0);
  const [makeup, setMakeup] = React.useState<number>(0);
  const [makeupOpacity, setMakeupOpacity] = React.useState<number>(1.0);
  const [blush, setBlush] = React.useState<number>(0);
  const [blushOpacity, setBlushOpacity] = React.useState<number>(1.0);
  const [complexion, setComplexion] = React.useState<number>(0);
  const [complexionOpacity, setComplexionOpacity] = React.useState<number>(1.0);
  const [sunDamage, setSunDamage] = React.useState<number>(0);
  const [sunDamageOpacity, setSunDamageOpacity] = React.useState<number>(1.0);
  const [lipstick, setLipstick] = React.useState<number>(0);
  const [lipstickOpacity, setLipstickOpacity] = React.useState<number>(1.0);
  const [molesFreckles, setMolesFreckles] = React.useState<number>(0);
  const [molesFrecklesOpacity, setMolesFrecklesOpacity] = React.useState<number>(1.0);
  const [chestHair, setChestHair] = React.useState<number>(0);
  const [chestHairOpacity, setChestHairOpacity] = React.useState<number>(1.0);
  const [bodyBlemishes, setBodyBlemishes] = React.useState<number>(0);
  const [bodyBlemishesOpacity, setBodyBlemishesOpacity] = React.useState<number>(1.0);
  const [lastChangedOverlay, setLastChangedOverlay] = React.useState<number>(0);
  const [opacitySlider, setOpacitySlider] = React.useState<number>(0);

  const opacitySetters = [
    setBlemishesOpacity,
    setFacialHairOpacity,
    setEyebrowsOpacity,
    setAgeingOpacity,
    setMakeupOpacity,
    setBlushOpacity,
    setComplexionOpacity,
    setSunDamageOpacity,
    setLipstickOpacity,
    setMolesFrecklesOpacity,
    setChestHairOpacity,
    setBodyBlemishesOpacity,
  ];

  const toggles = [setFaceOpen, setSkinOpen, setGenderOpen, setHairOpen, setOverlaysOpen];

  const selectGender = (e: FormEvent, value: 'm' | 'f') => {
    e.preventDefault();
    setGender(value);
    if (value == 'm' && hairStyle >= data.hair.male.length) {
      setHairstyle(data.hair.male.length - 1);
    }
  };

  const onSkinMix = (e: ChangeEvent, value: number | number[]) => {
    e.preventDefault();
    setSkinMix(value as number);
  };

  const onFaceMix = (e: ChangeEvent, value: number | number[]) => {
    e.preventDefault();
    setFaceMix(value as number);
  };

  const toggle = (toggler: React.Dispatch<React.SetStateAction<boolean>>) => {
    toggles.forEach((t) => (t != toggler ? t(false) : null));
    toggler((prevOpen) => !prevOpen);
  };

  const scroll = (
    scroller: React.Dispatch<React.SetStateAction<number>>,
    values: string[],
    direction: number,
    skip: string[] = [],
  ) => {
    scroller((prevValue) => {
      prevValue = prevValue + direction;
      while (skip.includes(values[prevValue])) {
        prevValue = prevValue + direction;
      }
      if (prevValue < 0) prevValue = values.length - 1;
      if (prevValue >= values.length) prevValue = 0;
      return prevValue;
    });
  };

  const onOverlayOpacity = (e: ChangeEvent, value: number | number[]) => {
    e.preventDefault();
    opacitySetters[lastChangedOverlay](value as number);
  };

  React.useEffect(() => {
    proxy.view.setGender(gender);
  }, [gender]);

  React.useEffect(() => {
    proxy.view.setHairstyle(hairStyle);
  }, [hairStyle]);

  React.useEffect(() => {
    proxy.view.setHairColor(hairColor, hairHighlight);
  }, [hairColor, hairHighlight]);

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
    });
  }, [fatherFace, fatherSkin, motherFace, motherSkin, faceMix, skinMix]);

  React.useEffect(() => {
    setLastChangedOverlay(0);
    setOpacitySlider(blemishesOpacity);
    proxy.view.setHeadOverlay(0, blemishes, blemishesOpacity);
  }, [blemishes, blemishesOpacity]);

  React.useEffect(() => {
    setLastChangedOverlay(1);
    setOpacitySlider(facialHairOpacity);
    proxy.view.setHeadOverlay(1, facialHair, facialHairOpacity);
  }, [facialHair, facialHairOpacity]);

  React.useEffect(() => {
    setLastChangedOverlay(2);
    setOpacitySlider(eyebrowsOpacity);
    proxy.view.setHeadOverlay(2, eyebrows, eyebrowsOpacity);
  }, [eyebrows, eyebrowsOpacity]);

  React.useEffect(() => {
    setLastChangedOverlay(3);
    setOpacitySlider(ageingOpacity);
    proxy.view.setHeadOverlay(3, ageing, ageingOpacity);
  }, [ageing, ageingOpacity]);

  React.useEffect(() => {
    setLastChangedOverlay(4);
    setOpacitySlider(makeupOpacity);
    proxy.view.setHeadOverlay(4, makeup, makeupOpacity);
  }, [makeup, makeupOpacity]);

  React.useEffect(() => {
    setLastChangedOverlay(5);
    setOpacitySlider(blushOpacity);
    proxy.view.setHeadOverlay(5, blush, blushOpacity);
  }, [blush, blushOpacity]);

  React.useEffect(() => {
    setLastChangedOverlay(6);
    setOpacitySlider(complexionOpacity);
    proxy.view.setHeadOverlay(6, complexion, complexionOpacity);
  }, [complexion, complexionOpacity]);

  React.useEffect(() => {
    setLastChangedOverlay(7);
    setOpacitySlider(sunDamageOpacity);
    proxy.view.setHeadOverlay(7, sunDamage, sunDamageOpacity);
  }, [sunDamage, sunDamageOpacity]);

  React.useEffect(() => {
    setLastChangedOverlay(8);
    setOpacitySlider(lipstickOpacity);
    proxy.view.setHeadOverlay(8, lipstick, lipstickOpacity);
  }, [lipstick, lipstickOpacity]);

  React.useEffect(() => {
    setLastChangedOverlay(9);
    setOpacitySlider(molesFrecklesOpacity);
    proxy.view.setHeadOverlay(9, molesFreckles, molesFrecklesOpacity);
  }, [molesFreckles, molesFrecklesOpacity]);

  React.useEffect(() => {
    setLastChangedOverlay(10);
    setOpacitySlider(chestHairOpacity);
    proxy.view.setHeadOverlay(10, chestHair, chestHairOpacity);
  }, [chestHair, chestHairOpacity]);

  React.useEffect(() => {
    setLastChangedOverlay(11);
    setOpacitySlider(bodyBlemishesOpacity);
    proxy.view.setHeadOverlay(11, bodyBlemishes, bodyBlemishesOpacity);
  }, [bodyBlemishes, bodyBlemishesOpacity]);

  return (
    <div>
      <CreationNav>
        <List>
          <CollapsableButtonsItem
            primary={'GENDER'}
            onClick={() => toggle(setGenderOpen)}
            open={genderOpen}
            buttons={{
              Male: (e: any) => selectGender(e, 'm'),
              Female: (e: any) => selectGender(e, 'f'),
            }}
          />
          <CollapsableArrowSelectItem
            primary={'FACE'}
            onClick={() => toggle(setFaceOpen)}
            open={faceOpen}
            selects={{
              Father: {
                left: () => scroll(setFatherFace, data.fathers, -1),
                right: () => scroll(setFatherFace, data.fathers, +1),
                values: data.fathers,
                index: fatherFace,
              },
              Mother: {
                left: () => scroll(setMotherFace, data.mothers, -1),
                right: () => scroll(setMotherFace, data.mothers, +1),
                values: data.mothers,
                index: motherFace,
              },
            }}
            sliders={[{ onChange: onFaceMix }]}
          />
          <CollapsableArrowSelectItem
            primary={'SKIN'}
            onClick={() => toggle(setSkinOpen)}
            open={skinOpen}
            selects={{
              Father: {
                left: () => scroll(setFatherSkin, data.fathers, -1),
                right: () => scroll(setFatherSkin, data.fathers, +1),
                values: data.fathers,
                index: fatherSkin,
              },
              Mother: {
                left: () => scroll(setMotherSkin, data.mothers, -1),
                right: () => scroll(setMotherSkin, data.mothers, +1),
                values: data.mothers,
                index: motherSkin,
              },
            }}
            sliders={[{ onChange: onSkinMix }]}
          />
          <CollapsableArrowSelectItem
            primary={'HAIR'}
            onClick={() => toggle(setHairOpen)}
            open={hairOpen}
            selects={{
              Style: {
                left: () => scroll(setHairstyle, hairStyles[gender], -1, ignoredHairs),
                right: () => scroll(setHairstyle, hairStyles[gender], +1, ignoredHairs),
                values: hairStyles[gender],
                index: hairStyle,
              },
              Color: {
                left: () => scroll(setHairColor, data.hair.colors, -1),
                right: () => scroll(setHairColor, data.hair.colors, +1),
                values: data.hair.colors,
                index: hairColor,
              },
              Highlights: {
                left: () => scroll(setHairHighlight, data.hair.colors, -1),
                right: () => scroll(setHairHighlight, data.hair.colors, +1),
                values: data.hair.colors,
                index: hairHighlight,
              },
            }}
          />
          <CollapsableArrowSelectItem
            primary={'OVERLAYS'}
            onClick={() => toggle(setOverlaysOpen)}
            open={overlaysOpen}
            slidersFirst={true}
            selects={{
              Blemishes: {
                left: () => scroll(setBlemishes, data.overlay.blemishes, -1),
                right: () => scroll(setBlemishes, data.overlay.blemishes, +1),
                values: data.overlay.blemishes,
                index: blemishes,
              },
              'Facial Hair': {
                left: () => scroll(setFacialHair, data.overlay.facialHair, -1),
                right: () => scroll(setFacialHair, data.overlay.facialHair, +1),
                values: data.overlay.facialHair,
                index: facialHair,
              },
              Eyebrows: {
                left: () => scroll(setEyebrows, data.overlay.eyebrows, -1),
                right: () => scroll(setEyebrows, data.overlay.eyebrows, +1),
                values: data.overlay.eyebrows,
                index: eyebrows,
              },
              Ageing: {
                left: () => scroll(setAgeing, data.overlay.ageing, -1),
                right: () => scroll(setAgeing, data.overlay.ageing, +1),
                values: data.overlay.ageing,
                index: ageing,
              },
              Makeup: {
                left: () => scroll(setMakeup, data.overlay.makeup, -1),
                right: () => scroll(setMakeup, data.overlay.makeup, +1),
                values: data.overlay.makeup,
                index: makeup,
              },
              Blush: {
                left: () => scroll(setBlush, data.overlay.blush, -1),
                right: () => scroll(setBlush, data.overlay.blush, +1),
                values: data.overlay.blush,
                index: blush,
              },
              Complexion: {
                left: () => scroll(setComplexion, data.overlay.complexion, -1),
                right: () => scroll(setComplexion, data.overlay.complexion, +1),
                values: data.overlay.complexion,
                index: complexion,
              },
              'Sun Damage': {
                left: () => scroll(setSunDamage, data.overlay.sunDamage, -1),
                right: () => scroll(setSunDamage, data.overlay.sunDamage, +1),
                values: data.overlay.sunDamage,
                index: sunDamage,
              },
              Lipstick: {
                left: () => scroll(setLipstick, data.overlay.lipstick, -1),
                right: () => scroll(setLipstick, data.overlay.lipstick, +1),
                values: data.overlay.lipstick,
                index: lipstick,
              },
              'Moles & Freckles': {
                left: () => scroll(setMolesFreckles, data.overlay.molesFreckles, -1),
                right: () => scroll(setMolesFreckles, data.overlay.molesFreckles, +1),
                values: data.overlay.molesFreckles,
                index: molesFreckles,
              },
              'Chest Hair': {
                left: () => scroll(setChestHair, data.overlay.chestHair, -1),
                right: () => scroll(setChestHair, data.overlay.chestHair, +1),
                values: data.overlay.chestHair,
                index: chestHair,
              },
              'Body Blemishes': {
                left: () => scroll(setBodyBlemishes, data.overlay.bodyBlemishes, -1),
                right: () => scroll(setBodyBlemishes, data.overlay.bodyBlemishes, +1),
                values: data.overlay.bodyBlemishes,
                index: bodyBlemishes,
              },
            }}
            sliders={[{ onChange: onOverlayOpacity, value: opacitySlider }]}
          />
        </List>
      </CreationNav>
    </div>
  );
}

export default CharacterCreation;
