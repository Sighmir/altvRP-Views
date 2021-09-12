import { List } from '@material-ui/core';
import CollapsableArrowSelectItem from 'components/CollapsableArrowSelectItem';
import CollapsableButtonsItem from 'components/CollapsableButtonsItem';
import data from 'data/characters';
import * as proxy from 'modules/proxy';
import React, { ChangeEvent, FormEvent } from 'react';
import { CreationNav } from '../styles';

function CharacterCreation(): JSX.Element {
  const enableMakeup = false;

  const [fatherFace, setFatherFace] = React.useState<number>(0);
  const [motherFace, setMotherFace] = React.useState<number>(0);
  const [faceMix, setFaceMix] = React.useState<number>(0.5);
  const [faceOpen, setFaceOpen] = React.useState(false);

  const [fatherSkin, setFatherSkin] = React.useState<number>(0);
  const [motherSkin, setMotherSkin] = React.useState<number>(0);
  const [skinMix, setSkinMix] = React.useState<number>(0.5);
  const [skinOpen, setSkinOpen] = React.useState(false);

  const [gender, setGender] = React.useState<'m' | 'f'>('m');
  const [genderOpen, setGenderOpen] = React.useState(false);

  const hairStyles = { m: data.hair.male, f: data.hair.female };
  const [hairStyle, setHairstyle] = React.useState<number>(0);
  const [hairColor, setHairColor] = React.useState<number>(0);
  const [hairHighlight, setHairHighlight] = React.useState<number>(0);
  const [hairOpen, setHairOpen] = React.useState(false);
  const ignoredHairs = ['Night Vision'];

  const [overlayOpen, setOverlayOpen] = React.useState(false);
  const [blemishes, setBlemishes] = React.useState<number>(255);
  const [blemishesOpacity, setBlemishesOpacity] = React.useState<number>(1.0);
  const [ageing, setAgeing] = React.useState<number>(255);
  const [ageingOpacity, setAgeingOpacity] = React.useState<number>(1.0);
  const [makeup, setMakeup] = React.useState<number>(255);
  const [makeupOpacity, setMakeupOpacity] = React.useState<number>(1.0);
  const [complexion, setComplexion] = React.useState<number>(255);
  const [complexionOpacity, setComplexionOpacity] = React.useState<number>(1.0);
  const [sunDamage, setSunDamage] = React.useState<number>(255);
  const [sunDamageOpacity, setSunDamageOpacity] = React.useState<number>(1.0);
  const [molesFreckles, setMolesFreckles] = React.useState<number>(255);
  const [molesFrecklesOpacity, setMolesFrecklesOpacity] = React.useState<number>(1.0);
  const [bodyBlemishes, setBodyBlemishes] = React.useState<number>(255);
  const [bodyBlemishesOpacity, setBodyBlemishesOpacity] = React.useState<number>(1.0);
  const [lastChangedOverlay, setLastChangedOverlay] = React.useState<number>(0);
  const [opacitySlider, setOpacitySlider] = React.useState<number>(0);

  const [facialHairOpen, setFacialHairOpen] = React.useState(false);
  const [facialHair, setFacialHair] = React.useState<number>(255);
  const [facialHairOpacity, setFacialHairOpacity] = React.useState<number>(1.0);
  const [facialHairColor, setFacialHairColor] = React.useState<number>(0);
  const [facialHairHighlight, setFacialHairHighlight] = React.useState<number>(0);

  const [eyebrowsOpen, setEyebrowsOpen] = React.useState(false);
  const [eyebrows, setEyebrows] = React.useState<number>(255);
  const [eyebrowsOpacity, setEyebrowsOpacity] = React.useState<number>(1.0);
  const [eyebrowsColor, setEyebrowsColor] = React.useState<number>(0);
  const [eyebrowsHighlight, setEyebrowsHighlight] = React.useState<number>(0);

  const [blushOpen, setBlushOpen] = React.useState(false);
  const [blush, setBlush] = React.useState<number>(255);
  const [blushOpacity, setBlushOpacity] = React.useState<number>(1.0);
  const [blushColor, setBlushColor] = React.useState<number>(0);
  const [blushHighlight, setBlushHighlight] = React.useState<number>(0);

  const [lipstickOpen, setLipstickOpen] = React.useState(false);
  const [lipstick, setLipstick] = React.useState<number>(255);
  const [lipstickOpacity, setLipstickOpacity] = React.useState<number>(1.0);
  const [lipstickColor, setLipstickColor] = React.useState<number>(0);
  const [lipstickHighlight, setLipstickHighlight] = React.useState<number>(0);

  const [chestHairOpen, setChestHairOpen] = React.useState(false);
  const [chestHair, setChestHair] = React.useState<number>(255);
  const [chestHairOpacity, setChestHairOpacity] = React.useState<number>(1.0);
  const [chestHairColor, setChestHairColor] = React.useState<number>(0);
  const [chestHairHighlight, setChestHairHighlight] = React.useState<number>(0);

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

  const toggles = [
    setFaceOpen,
    setSkinOpen,
    setGenderOpen,
    setHairOpen,
    setOverlayOpen,
    setFacialHairOpen,
    setEyebrowsOpen,
    setBlushOpen,
    setLipstickOpen,
    setChestHairOpen,
  ];

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

  const onOverlayOpacity = (e: ChangeEvent, value: number | number[], overlay?: number) => {
    e.preventDefault();
    if (overlay) {
      opacitySetters[overlay](value as number);
    } else {
      opacitySetters[lastChangedOverlay](value as number);
    }
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
    if (data.overlay.blemishes[blemishes] == 'None') {
      proxy.view.setHeadOverlay(0, 255, 0);
    }
    proxy.view.setHeadOverlay(0, blemishes, blemishesOpacity);
  }, [blemishes, blemishesOpacity]);

  React.useEffect(() => {
    setLastChangedOverlay(1);
    setOpacitySlider(facialHairOpacity);
    if (data.overlay.facialHair[facialHair] == 'None') {
      proxy.view.setHeadOverlay(1, 255, 0);
    }
    proxy.view.setHeadOverlay(1, facialHair, facialHairOpacity, facialHairColor, facialHairHighlight);
  }, [facialHair, facialHairOpacity, facialHairColor, facialHairHighlight]);

  React.useEffect(() => {
    setLastChangedOverlay(2);
    setOpacitySlider(eyebrowsOpacity);
    if (data.overlay.eyebrows[eyebrows] == 'None') {
      proxy.view.setHeadOverlay(2, 255, 0);
    }
    proxy.view.setHeadOverlay(2, eyebrows, eyebrowsOpacity, eyebrowsColor, eyebrowsHighlight);
  }, [eyebrows, eyebrowsOpacity, eyebrowsColor, eyebrowsHighlight]);

  React.useEffect(() => {
    setLastChangedOverlay(3);
    setOpacitySlider(ageingOpacity);
    if (data.overlay.ageing[ageing] == 'None') {
      proxy.view.setHeadOverlay(3, 255, 0);
    }
    proxy.view.setHeadOverlay(3, ageing, ageingOpacity);
  }, [ageing, ageingOpacity]);

  React.useEffect(() => {
    setLastChangedOverlay(4);
    setOpacitySlider(makeupOpacity);
    if (data.overlay.makeup[makeup] == 'None') {
      proxy.view.setHeadOverlay(4, 255, 0);
    }
    proxy.view.setHeadOverlay(4, makeup, makeupOpacity);
  }, [makeup, makeupOpacity]);

  React.useEffect(() => {
    setLastChangedOverlay(5);
    setOpacitySlider(blushOpacity);
    if (data.overlay.blush[blush] == 'None') {
      proxy.view.setHeadOverlay(5, 255, 0);
    }
    proxy.view.setHeadOverlay(5, blush, blushOpacity, blushColor, blushHighlight);
  }, [blush, blushOpacity, blushColor, blushHighlight]);

  React.useEffect(() => {
    setLastChangedOverlay(6);
    setOpacitySlider(complexionOpacity);
    if (data.overlay.complexion[complexion] == 'None') {
      proxy.view.setHeadOverlay(6, 255, 0);
    }
    proxy.view.setHeadOverlay(6, complexion, complexionOpacity);
  }, [complexion, complexionOpacity]);

  React.useEffect(() => {
    setLastChangedOverlay(7);
    setOpacitySlider(sunDamageOpacity);
    if (data.overlay.sunDamage[sunDamage] == 'None') {
      proxy.view.setHeadOverlay(7, 255, 0);
    }
    proxy.view.setHeadOverlay(7, sunDamage, sunDamageOpacity);
  }, [sunDamage, sunDamageOpacity]);

  React.useEffect(() => {
    setLastChangedOverlay(8);
    setOpacitySlider(lipstickOpacity);
    if (data.overlay.lipstick[lipstick] == 'None') {
      proxy.view.setHeadOverlay(8, 255, 0);
    }
    proxy.view.setHeadOverlay(8, lipstick, lipstickOpacity, lipstickColor, lipstickHighlight);
  }, [lipstick, lipstickOpacity, lipstickColor, lipstickHighlight]);

  React.useEffect(() => {
    setLastChangedOverlay(9);
    setOpacitySlider(molesFrecklesOpacity);
    if (data.overlay.molesFreckles[molesFreckles] == 'None') {
      proxy.view.setHeadOverlay(9, 255, 0);
    }
    proxy.view.setHeadOverlay(9, molesFreckles, molesFrecklesOpacity);
  }, [molesFreckles, molesFrecklesOpacity]);

  React.useEffect(() => {
    setLastChangedOverlay(10);
    setOpacitySlider(chestHairOpacity);
    if (data.overlay.chestHair[chestHair] == 'None') {
      proxy.view.setHeadOverlay(10, 255, 0);
    }
    proxy.view.setHeadOverlay(10, chestHair, chestHairOpacity, chestHairColor, chestHairHighlight);
  }, [chestHair, chestHairOpacity, chestHairColor, chestHairHighlight]);

  React.useEffect(() => {
    setLastChangedOverlay(11);
    setOpacitySlider(bodyBlemishesOpacity);
    if (data.overlay.bodyBlemishes[bodyBlemishes] == 'None') {
      proxy.view.setHeadOverlay(11, 255, 0);
    }
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
                left: () => scroll(setHairColor, data.colors, -1),
                right: () => scroll(setHairColor, data.colors, +1),
                values: data.colors,
                index: hairColor,
              },
              Highlights: {
                left: () => scroll(setHairHighlight, data.colors, -1),
                right: () => scroll(setHairHighlight, data.colors, +1),
                values: data.colors,
                index: hairHighlight,
              },
            }}
          />
          <CollapsableArrowSelectItem
            primary={'OVERLAY'}
            onClick={() => toggle(setOverlayOpen)}
            open={overlayOpen}
            slidersFirst={true}
            selects={{
              Blemishes: {
                left: () => scroll(setBlemishes, data.overlay.blemishes, -1),
                right: () => scroll(setBlemishes, data.overlay.blemishes, +1),
                values: data.overlay.blemishes,
                index: blemishes,
                none: 'None',
              },
              Ageing: {
                left: () => scroll(setAgeing, data.overlay.ageing, -1),
                right: () => scroll(setAgeing, data.overlay.ageing, +1),
                values: data.overlay.ageing,
                index: ageing,
                none: 'None',
              },
              Makeup: {
                left: () => scroll(setMakeup, data.overlay.makeup, -1),
                right: () => scroll(setMakeup, data.overlay.makeup, +1),
                values: data.overlay.makeup,
                index: makeup,
                none: 'None',
                disabled: !enableMakeup,
              },
              Complexion: {
                left: () => scroll(setComplexion, data.overlay.complexion, -1),
                right: () => scroll(setComplexion, data.overlay.complexion, +1),
                values: data.overlay.complexion,
                index: complexion,
                none: 'None',
              },
              'Sun Damage': {
                left: () => scroll(setSunDamage, data.overlay.sunDamage, -1),
                right: () => scroll(setSunDamage, data.overlay.sunDamage, +1),
                values: data.overlay.sunDamage,
                index: sunDamage,
                none: 'None',
              },
              'Moles & Freckles': {
                left: () => scroll(setMolesFreckles, data.overlay.molesFreckles, -1),
                right: () => scroll(setMolesFreckles, data.overlay.molesFreckles, +1),
                values: data.overlay.molesFreckles,
                index: molesFreckles,
                none: 'None',
              },
              'Body Blemishes': {
                left: () => scroll(setBodyBlemishes, data.overlay.bodyBlemishes, -1),
                right: () => scroll(setBodyBlemishes, data.overlay.bodyBlemishes, +1),
                values: data.overlay.bodyBlemishes,
                index: bodyBlemishes,
                none: 'None',
              },
            }}
            sliders={[{ onChange: onOverlayOpacity, value: opacitySlider }]}
          />
          <CollapsableArrowSelectItem
            primary={'FACIAL HAIR'}
            onClick={() => toggle(setFacialHairOpen)}
            open={facialHairOpen}
            slidersFirst={true}
            selects={{
              Style: {
                left: () => scroll(setFacialHair, data.overlay.facialHair, -1),
                right: () => scroll(setFacialHair, data.overlay.facialHair, +1),
                values: data.overlay.facialHair,
                index: facialHair,
                none: 'None',
              },
              Color: {
                left: () => scroll(setFacialHairColor, data.colors, -1),
                right: () => scroll(setFacialHairColor, data.colors, +1),
                values: data.colors,
                index: facialHairColor,
              },
              Highlight: {
                left: () => scroll(setFacialHairHighlight, data.colors, -1),
                right: () => scroll(setFacialHairHighlight, data.colors, +1),
                values: data.colors,
                index: facialHairHighlight,
              },
            }}
            sliders={[{ onChange: (e, v) => onOverlayOpacity(e, v, 1), value: facialHairOpacity }]}
          />
          <CollapsableArrowSelectItem
            primary={'EYEBROWS'}
            onClick={() => toggle(setEyebrowsOpen)}
            open={eyebrowsOpen}
            slidersFirst={true}
            selects={{
              Style: {
                left: () => scroll(setEyebrows, data.overlay.eyebrows, -1),
                right: () => scroll(setEyebrows, data.overlay.eyebrows, +1),
                values: data.overlay.eyebrows,
                index: eyebrows,
                none: 'None',
              },
              Color: {
                left: () => scroll(setEyebrowsColor, data.colors, -1),
                right: () => scroll(setEyebrowsColor, data.colors, +1),
                values: data.colors,
                index: eyebrowsColor,
              },
              Highlight: {
                left: () => scroll(setEyebrowsHighlight, data.colors, -1),
                right: () => scroll(setEyebrowsHighlight, data.colors, +1),
                values: data.colors,
                index: eyebrowsHighlight,
              },
            }}
            sliders={[{ onChange: (e, v) => onOverlayOpacity(e, v, 2), value: eyebrowsOpacity }]}
          />
          {enableMakeup && (
            <CollapsableArrowSelectItem
              primary={'BLUSH'}
              onClick={() => toggle(setBlushOpen)}
              open={blushOpen}
              slidersFirst={true}
              selects={{
                Style: {
                  left: () => scroll(setBlush, data.overlay.blush, -1),
                  right: () => scroll(setBlush, data.overlay.blush, +1),
                  values: data.overlay.blush,
                  index: blush,
                  none: 'None',
                },
                Color: {
                  left: () => scroll(setBlushColor, data.colors, -1),
                  right: () => scroll(setBlushColor, data.colors, +1),
                  values: data.colors,
                  index: blushColor,
                },
                Highlight: {
                  left: () => scroll(setBlushHighlight, data.colors, -1),
                  right: () => scroll(setBlushHighlight, data.colors, +1),
                  values: data.colors,
                  index: blushHighlight,
                },
              }}
              sliders={[{ onChange: (e, v) => onOverlayOpacity(e, v, 5), value: blushOpacity }]}
            />
          )}
          {enableMakeup && (
            <CollapsableArrowSelectItem
              primary={'LIPSTICK'}
              onClick={() => toggle(setLipstickOpen)}
              open={lipstickOpen}
              slidersFirst={true}
              selects={{
                Style: {
                  left: () => scroll(setLipstick, data.overlay.lipstick, -1),
                  right: () => scroll(setLipstick, data.overlay.lipstick, +1),
                  values: data.overlay.lipstick,
                  index: lipstick,
                  none: 'None',
                },
                Color: {
                  left: () => scroll(setLipstickColor, data.colors, -1),
                  right: () => scroll(setLipstickColor, data.colors, +1),
                  values: data.colors,
                  index: lipstickColor,
                },
                Highlight: {
                  left: () => scroll(setLipstickHighlight, data.colors, -1),
                  right: () => scroll(setLipstickHighlight, data.colors, +1),
                  values: data.colors,
                  index: lipstickHighlight,
                },
              }}
              sliders={[{ onChange: (e, v) => onOverlayOpacity(e, v, 8), value: lipstickOpacity }]}
            />
          )}
          <CollapsableArrowSelectItem
            primary={'CHEST HAIR'}
            onClick={() => toggle(setChestHairOpen)}
            open={chestHairOpen}
            slidersFirst={true}
            selects={{
              Style: {
                left: () => scroll(setChestHair, data.overlay.chestHair, -1),
                right: () => scroll(setChestHair, data.overlay.chestHair, +1),
                values: data.overlay.chestHair,
                index: chestHair,
                none: 'None',
              },
              Color: {
                left: () => scroll(setChestHairColor, data.colors, -1),
                right: () => scroll(setChestHairColor, data.colors, +1),
                values: data.colors,
                index: chestHairColor,
              },
              Highlight: {
                left: () => scroll(setChestHairHighlight, data.colors, -1),
                right: () => scroll(setChestHairHighlight, data.colors, +1),
                values: data.colors,
                index: chestHairHighlight,
              },
            }}
            sliders={[{ onChange: (e, v) => onOverlayOpacity(e, v, 10), value: chestHairOpacity }]}
          />
        </List>
      </CreationNav>
    </div>
  );
}

export default CharacterCreation;
