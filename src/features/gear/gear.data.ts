import { Supply, SupplyViewModel, supplyLabelDict } from '../../models/supply'
import { Talent } from '../../models/talent.model'
import { Time, timeLabelDict } from '../../models/time.model'
import { RawMaterial } from '../../models/material.model'
import { Weight } from '../../models/weight.model'
import { TranslationKey } from '../../store/translations/translation.model'
import { Tool } from '../../models/tool.model'

export type GearId =
  | 'backpack'
  | 'bandages'
  | 'barrel'
  | 'bearTrap'
  | 'blanket'
  | 'cauldron'
  | 'chalk'
  | 'chest'
  | 'clayJug'
  | 'clayPot'
  | 'crystalBall'
  | 'drum'
  | 'fieldKitchen'
  | 'fieldRation'
  | 'fishingHookAndLine'
  | 'fishingNet'
  | 'flintAndSteel'
  | 'flute'
  | 'foodKnife'
  | 'grapplingHook'
  | 'hallucinogenicPoisonOrAntidote'
  | 'harp'
  | 'holySymbol'
  | 'horn'
  | 'hourglass'
  | 'inkAndQuill'
  | 'knapsack'
  | 'lampOil'
  | 'lantern'
  | 'largeTent'
  | 'lethalPoisonOrAntidote'
  | 'lockpicks'
  | 'lyre'
  | 'magnifyingGlass'
  | 'map'
  | 'metalChalice'
  | 'metalPlate'
  | 'oilLamp'
  | 'paralyzingPoisonOrAntidote'
  | 'parchment'
  | 'quiver'
  | 'ropeTenMeters'
  | 'scales'
  | 'sleepingFur'
  | 'sleepingPoisonOrAntidote'
  | 'smallTent'
  | 'snares'
  | 'spoon'
  | 'spyglass'
  | 'tallowCandle'
  | 'tankard'
  | 'threeArrowsIronHead'
  | 'threeArrowsWoodenHead'
  | 'torches'
  | 'waterskin'

export type InstantPrice = {
  _type: 'instant'
  copper: number
}

export type PriceRange = {
  _type: 'range'
  min: number
  max: number
}

export type TieredPrice = {
  _type: 'tiered'
  tiers: { tier: number; copper: number }[]
}

export type Price = InstantPrice | PriceRange | TieredPrice

export const priceComparator = (a: Price, b: Price) => {
  if (a._type === 'instant' && b._type === 'instant') {
    return a.copper - b.copper
  }

  if (a._type === 'instant' && b._type === 'range') {
    return a.copper - b.min
  }

  if (a._type === 'instant' && b._type === 'tiered') {
    return a.copper - b.tiers[0].copper
  }

  if (a._type === 'range' && b._type === 'instant') {
    return a.min - b.copper
  }

  if (a._type === 'range' && b._type === 'range') {
    return a.min - b.min
  }

  if (a._type === 'range' && b._type === 'tiered') {
    return a.min - b.tiers[0].copper
  }

  if (a._type === 'tiered' && b._type === 'instant') {
    return a.tiers[0].copper - b.copper
  }

  if (a._type === 'tiered' && b._type === 'range') {
    return a.tiers[0].copper - b.min
  }

  if (a._type === 'tiered' && b._type === 'tiered') {
    return a.tiers[0].copper - b.tiers[0].copper
  }

  return 0
}

export const pricePredicate =
  (predicate: (copper: number) => boolean) =>
  (p: Price): boolean => {
    if (p._type === 'instant') {
      return predicate(p.copper)
    }

    if (p._type === 'range') {
      return predicate(p.min) || predicate(p.max)
    }

    if (p._type === 'tiered') {
      return p.tiers.some((tier) => predicate(tier.copper))
    }

    return false
  }

export const maxPricePredicate = (max: number) =>
  pricePredicate((copper) => copper <= max)

export type MarketType =
  | 'dailyLiving'
  | 'tradeGoods'
  | 'luxuryGoods'
  | 'war'
  | 'food'

export type GearEffect = {
  label: TranslationKey<'gear'>
}

export type Gear = {
  name: {
    id: GearId
    label: TranslationKey<'gear'>
  }
  price: Price
  supply: Supply
  weight: Weight
  rawMaterials: RawMaterial[]
  time: Time
  talents: Talent[]
  tools: Tool[]
  effects: GearEffect
  marketType: MarketType
}

export type GearViewModel = Omit<Gear, 'name' | 'supply' | 'time'> & {
  name: {
    id: GearId
    label: TranslationKey<'gear'>
    translation: string
  }
  supply: SupplyViewModel
  time: TranslationKey<'common'>
}

export const gearViewModel = (
  gear: Gear,
  translation: string,
  supplyAmount: number | undefined,
): GearViewModel => ({
  ...gear,
  name: {
    ...gear.name,
    translation,
  },
  supply: {
    label: supplyLabelDict[gear.supply],
    amount: supplyAmount,
    supply: gear.supply,
  },
  time: timeLabelDict[gear.time],
})

export const gear: Gear[] = [
  {
    name: { id: 'chalk', label: 'gear:Gear.Chalk.name' },
    price: {
      _type: 'instant',
      copper: 2,
    },
    supply: 'common',
    weight: 'tiny',
    rawMaterials: [
      {
        material: 'stone',
        value: 0.25,
      },
    ],
    time: 'quarterDay',
    talents: [],
    tools: [],
    effects: { label: 'gear:Gear.Chalk.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'flintAndSteel', label: 'gear:Gear.FlintAndSteel.name' },
    price: {
      _type: 'instant',
      copper: 2,
    },
    supply: 'common',
    weight: 'tiny',
    rawMaterials: [
      {
        material: 'iron',
        value: 0.1,
      },
      {
        material: 'stone',
        value: 0.25,
      },
    ],
    time: 'quarterDay',
    talents: [],
    tools: [],
    effects: { label: 'gear:Gear.FlintAndSteel.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'lampOil', label: 'gear:Gear.LampOil.name' },
    price: {
      _type: 'instant',
      copper: 2,
    },
    supply: 'common',
    weight: 'light',
    rawMaterials: [
      {
        material: 'tallow',
        value: 0.25,
      },
    ],
    time: 'quarterDay',
    talents: ['tanner'],
    tools: ['fire'],
    effects: { label: 'gear:Gear.LampOil.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'tankard', label: 'gear:Gear.Tankard.name' },
    price: {
      _type: 'instant',
      copper: 2,
    },
    supply: 'common',
    weight: 'light',
    rawMaterials: [
      {
        material: 'wood',
        value: 0.5,
      },
    ],
    time: 'quarterDay',
    talents: [],
    tools: [],
    effects: { label: 'gear:Gear.Tankard.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: {
      id: 'fishingHookAndLine',
      label: 'gear:Gear.FishingHookAndLine.name',
    },
    price: {
      _type: 'instant',
      copper: 4,
    },
    supply: 'common',
    weight: 'light',
    rawMaterials: [
      {
        material: 'iron',
        value: 0.1,
      },
      {
        material: 'cloth',
        value: 0.1,
      },
    ],
    time: 'quarterDay',
    talents: ['smith', 'tailor'],
    tools: ['hammer', 'forge'],
    effects: { label: 'gear:Gear.FishingHookAndLine.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'clayPot', label: 'gear:Gear.ClayPot.name' },
    price: {
      _type: 'instant',
      copper: 4,
    },
    supply: 'common',
    weight: 'none',
    rawMaterials: [
      {
        material: 'stone',
        value: 0.5,
      },
    ],
    time: 'quarterDay',
    talents: [],
    tools: ['fire'],
    effects: { label: 'gear:Gear.ClayPot.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'clayJug', label: 'gear:Gear.ClayJug.name' },
    price: {
      _type: 'instant',
      copper: 5,
    },
    supply: 'common',
    weight: 'light',
    rawMaterials: [
      {
        material: 'stone',
        value: 1,
      },
    ],
    time: 'day',
    talents: [],
    tools: ['fire'],
    effects: { label: 'gear:Gear.ClayJug.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'oilLamp', label: 'gear:Gear.OilLamp.name' },
    price: {
      _type: 'instant',
      copper: 5,
    },
    supply: 'common',
    weight: 'light',
    rawMaterials: [
      {
        material: 'stone',
        value: 1,
      },
    ],
    time: 'day',
    talents: [],
    tools: ['fire'],
    effects: { label: 'gear:Gear.OilLamp.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'torches', label: 'gear:Gear.Torches.name' },
    price: {
      _type: 'instant',
      copper: 5,
    },
    supply: 'common',
    weight: 'normal',
    rawMaterials: [
      {
        material: 'wood',
        value: 1,
      },
    ],
    time: 'quarterDay',
    talents: [],
    tools: ['knifeOrAxe'],
    effects: { label: 'gear:Gear.Torches.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: {
      id: 'threeArrowsWoodenHead',
      label: 'gear:Gear.ThreeArrowsWoodenHead.name',
    },
    price: {
      _type: 'instant',
      copper: 6,
    },
    supply: 'common',
    weight: 'normal',
    rawMaterials: [
      {
        material: 'wood',
        value: 1,
      },
    ],
    time: 'quarterDay',
    talents: ['bowyer'],
    tools: ['knife'],
    effects: { label: 'gear:Gear.ThreeArrowsWoodenHead.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'foodKnife', label: 'gear:Gear.FoodKnife.name' },
    price: {
      _type: 'instant',
      copper: 6,
    },
    supply: 'common',
    weight: 'tiny',
    rawMaterials: [
      {
        material: 'iron',
        value: 0.25,
      },
    ],
    time: 'quarterDay',
    talents: ['smith'],
    tools: ['forge'],
    effects: { label: 'gear:Gear.FoodKnife.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'tallowCandle', label: 'gear:Gear.TallowCandle.name' },
    price: {
      _type: 'instant',
      copper: 6,
    },
    supply: 'common',
    weight: 'tiny',
    rawMaterials: [
      {
        material: 'cloth',
        value: 0.1,
      },
      {
        material: 'tallow',
        value: 0.25,
      },
    ],
    time: 'quarterDay',
    talents: [],
    tools: ['fire'],
    effects: { label: 'gear:Gear.TallowCandle.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'blanket', label: 'gear:Gear.Blanket.name' },
    price: {
      _type: 'instant',
      copper: 7,
    },
    supply: 'common',
    weight: 'light',
    rawMaterials: [
      {
        material: 'cloth',
        value: 0.5,
      },
    ],
    time: 'quarterDay',
    talents: ['tailor'],
    tools: ['knife'],
    effects: { label: 'gear:Gear.Blanket.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'metalChalice', label: 'gear:Gear.MetalChalice.name' },
    price: {
      _type: 'instant',
      copper: 7,
    },
    supply: 'uncommon',
    weight: 'light',
    rawMaterials: [
      {
        material: 'iron',
        value: 0.5,
      },
    ],
    time: 'day',
    talents: ['smith'],
    tools: ['forge'],
    effects: { label: 'gear:Gear.MetalChalice.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'barrel', label: 'gear:Gear.Barrel.name' },
    price: {
      _type: 'instant',
      copper: 8,
    },
    supply: 'common',
    weight: 'heavy',
    rawMaterials: [
      {
        material: 'wood',
        value: 2,
      },
    ],
    time: 'day',
    talents: [],
    tools: ['saw', 'hammer'],
    effects: { label: 'gear:Gear.Barrel.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'quiver', label: 'gear:Gear.Quiver.name' },
    price: {
      _type: 'instant',
      copper: 8,
    },
    supply: 'common',
    weight: 'none',
    rawMaterials: [
      {
        material: 'leather',
        value: 0.5,
      },
    ],
    time: 'quarterDay',
    talents: ['tanner'],
    tools: ['knife'],
    effects: { label: 'gear:Gear.Quiver.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'chest', label: 'gear:Gear.Chest.name' },
    price: {
      _type: 'instant',
      copper: 10,
    },
    supply: 'common',
    weight: 'heavy',
    rawMaterials: [
      {
        material: 'wood',
        value: 2,
      },
    ],
    time: 'day',
    talents: [],
    tools: ['saw', 'hammer'],
    effects: { label: 'gear:Gear.Chest.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'fishingNet', label: 'gear:Gear.FishingNet.name' },
    price: {
      _type: 'instant',
      copper: 10,
    },
    supply: 'common',
    weight: 'normal',
    rawMaterials: [
      {
        material: 'cloth',
        value: 1,
      },
    ],
    time: 'day',
    talents: ['tailor'],
    tools: ['knife'],
    effects: { label: 'gear:Gear.FishingNet.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'snares', label: 'gear:Gear.Snares.name' },
    price: {
      _type: 'instant',
      copper: 10,
    },
    supply: 'common',
    weight: 'light',
    rawMaterials: [
      {
        material: 'cloth',
        value: 0.5,
      },
    ],
    time: 'quarterDay',
    talents: ['masterOfTheHunt'],
    tools: ['knife'],
    effects: { label: 'gear:Gear.Snares.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'cauldron', label: 'gear:Gear.Cauldron.name' },
    price: {
      _type: 'instant',
      copper: 18,
    },
    supply: 'common',
    weight: 'normal',
    rawMaterials: [
      {
        material: 'iron',
        value: 1,
      },
    ],
    time: 'day',
    talents: ['chef', 'smith'],
    tools: ['forge'],
    effects: { label: 'gear:Gear.Cauldron.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'lantern', label: 'gear:Gear.Lantern.name' },
    price: {
      _type: 'instant',
      copper: 20,
    },
    supply: 'common',
    weight: 'light',
    rawMaterials: [
      {
        material: 'iron',
        value: 1,
      },
    ],
    time: 'day',
    talents: ['smith'],
    tools: ['forge'],
    effects: { label: 'gear:Gear.Lantern.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'ropeTenMeters', label: 'gear:Gear.RopeTenMeters.name' },
    price: {
      _type: 'instant',
      copper: 20,
    },
    supply: 'common',
    weight: 'normal',
    rawMaterials: [
      {
        material: 'cloth',
        value: 1,
      },
    ],
    time: 'quarterDay',
    talents: ['tailor'],
    tools: ['knife'],
    effects: { label: 'gear:Gear.RopeTenMeters.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'smallTent', label: 'gear:Gear.SmallTent.name' },
    price: {
      _type: 'instant',
      copper: 20,
    },
    supply: 'common',
    weight: 'normal',
    rawMaterials: [
      {
        material: 'cloth',
        value: 1,
      },
    ],
    time: 'quarterDay',
    talents: ['tailorOrTanner'],
    tools: ['knife', 'needleAndThread'],
    effects: { label: 'gear:Gear.SmallTent.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'sleepingFur', label: 'gear:Gear.SleepingFur.name' },
    price: {
      _type: 'instant',
      copper: 30,
    },
    supply: 'common',
    weight: 'normal',
    rawMaterials: [
      {
        material: 'pelt',
        value: 2,
      },
    ],
    time: 'quarterDay',
    talents: ['tanner'],
    tools: ['knife'],
    effects: { label: 'gear:Gear.SleepingFur.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'waterskin', label: 'gear:Gear.Waterskin.name' },
    price: {
      _type: 'instant',
      copper: 30,
    },
    supply: 'common',
    weight: 'none',
    rawMaterials: [
      {
        material: 'leather',
        value: 1,
      },
    ],
    time: 'quarterDay',
    talents: ['tanner'],
    tools: ['needleAndThread'],
    effects: { label: 'gear:Gear.Waterskin.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'grapplingHook', label: 'gear:Gear.GrapplingHook.name' },
    price: {
      _type: 'instant',
      copper: 30,
    },
    supply: 'uncommon',
    weight: 'normal',
    rawMaterials: [
      {
        material: 'iron',
        value: 1,
      },
    ],
    time: 'quarterDay',
    talents: ['smith'],
    tools: ['forge'],
    effects: { label: 'gear:Gear.GrapplingHook.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'scales', label: 'gear:Gear.Scales.name' },
    price: {
      _type: 'instant',
      copper: 30,
    },
    supply: 'uncommon',
    weight: 'normal',
    rawMaterials: [
      {
        material: 'iron',
        value: 0.5,
      },
    ],
    time: 'day',
    talents: ['smith'],
    tools: ['forge'],
    effects: { label: 'gear:Gear.Scales.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'backpack', label: 'gear:Gear.Backpack.name' },
    price: {
      _type: 'instant',
      copper: 40,
    },
    supply: 'common',
    weight: 'none',
    rawMaterials: [
      {
        material: 'cloth',
        value: 2,
      },
    ],
    time: 'quarterDay',
    talents: ['tailor'],
    tools: ['knife', 'needleAndThread'],
    effects: { label: 'gear:Gear.Backpack.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'fieldKitchen', label: 'gear:Gear.FieldKitchen.name' },
    price: {
      _type: 'instant',
      copper: 40,
    },
    supply: 'uncommon',
    weight: 'heavy',
    rawMaterials: [
      {
        material: 'iron',
        value: 2,
      },
    ],
    time: 'day',
    talents: ['chef', 'smith'],
    tools: ['forge'],
    effects: { label: 'gear:Gear.FieldKitchen.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'map', label: 'gear:Gear.Map.name' },
    price: {
      _type: 'instant',
      copper: 40,
    },
    supply: 'uncommon',
    weight: 'tiny',
    rawMaterials: [
      {
        material: 'parchment',
        value: 1,
      },
    ],
    time: 'day',
    talents: ['pathfinder'],
    tools: ['inkAndQuill'],
    effects: { label: 'gear:Gear.Map.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'bearTrap', label: 'gear:Gear.BearTrap.name' },
    price: {
      _type: 'instant',
      copper: 50,
    },
    supply: 'common',
    weight: 'normal',
    rawMaterials: [
      {
        material: 'iron',
        value: 1,
      },
    ],
    time: 'day',
    talents: ['smith'],
    tools: ['forge'],
    effects: { label: 'gear:Gear.BearTrap.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'largeTent', label: 'gear:Gear.LargeTent.name' },
    price: {
      _type: 'instant',
      copper: 50,
    },
    supply: 'uncommon',
    weight: 'heavy',
    rawMaterials: [
      {
        material: 'cloth',
        value: 2,
      },
    ],
    time: 'day',
    talents: ['tailorOrTanner'],
    tools: ['knife', 'needleAndThread'],
    effects: { label: 'gear:Gear.LargeTent.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'magnifyingGlass', label: 'gear:Gear.MagnifyingGlass.name' },
    price: {
      _type: 'instant',
      copper: 300,
    },
    supply: 'rare',
    weight: 'tiny',
    rawMaterials: [
      {
        material: 'iron',
        value: 0.25,
      },
      {
        material: 'glass',
        value: 0.5,
      },
    ],
    time: 'week',
    talents: ['builder', 'smith'],
    tools: ['forge'],
    effects: { label: 'gear:Gear.MagnifyingGlass.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'spyglass', label: 'gear:Gear.Spyglass.name' },
    price: {
      _type: 'instant',
      copper: 300,
    },
    supply: 'rare',
    weight: 'normal',
    rawMaterials: [
      {
        material: 'iron',
        value: 0.25,
      },
    ],
    time: 'twoWeeks',
    talents: ['smith', 'builder'],
    tools: ['forge'],
    effects: { label: 'gear:Gear.Spyglass.effect' },
    marketType: 'dailyLiving',
  },
  {
    name: { id: 'fieldRation', label: 'gear:Gear.FieldRation.name' },
    price: {
      _type: 'instant',
      copper: 3,
    },
    supply: 'common',
    weight: 'normal',
    rawMaterials: [
      {
        material: 'meatOrFishOrVegetables',
        value: 1,
      },
    ],
    time: 'quarterDay',
    talents: ['chef'],
    tools: ['fire'],
    effects: { label: 'gear:Gear.FieldRation.effect' },
    marketType: 'food',
  },
  {
    name: { id: 'parchment', label: 'gear:Gear.Parchment.name' },
    price: {
      _type: 'instant',
      copper: 6,
    },
    supply: 'uncommon',
    weight: 'tiny',
    rawMaterials: [
      {
        material: 'leather',
        value: 0.25,
      },
    ],
    time: 'quarterDay',
    talents: ['tanner'],
    tools: ['knife'],
    effects: { label: 'gear:Gear.Parchment.effect' },
    marketType: 'luxuryGoods',
  },
  {
    name: { id: 'metalPlate', label: 'gear:Gear.MetalPlate.name' },
    price: {
      _type: 'instant',
      copper: 8,
    },
    supply: 'uncommon',
    weight: 'light',
    rawMaterials: [
      {
        material: 'iron',
        value: 0.5,
      },
    ],
    time: 'day',
    talents: ['smith'],
    tools: ['forge'],
    effects: { label: 'gear:Gear.MetalPlate.effect' },
    marketType: 'luxuryGoods',
  },
  {
    name: { id: 'spoon', label: 'gear:Gear.Spoon.name' },
    price: {
      _type: 'instant',
      copper: 8,
    },
    supply: 'uncommon',
    weight: 'tiny',
    rawMaterials: [
      {
        material: 'iron',
        value: 0.25,
      },
    ],
    time: 'day',
    talents: ['smith'],
    tools: ['forge'],
    effects: { label: 'gear:Gear.Spoon.effect' },
    marketType: 'luxuryGoods',
  },
  {
    name: { id: 'holySymbol', label: 'gear:Gear.HolySymbol.name' },
    price: {
      _type: 'instant',
      copper: 10,
    },
    supply: 'uncommon',
    weight: 'tiny',
    rawMaterials: [
      {
        material: 'iron',
        value: 0.5,
      },
    ],
    time: 'day',
    talents: ['smith'],
    tools: ['forge'],
    effects: { label: 'gear:Gear.HolySymbol.effect' },
    marketType: 'luxuryGoods',
  },
  {
    name: { id: 'flute', label: 'gear:Gear.Flute.name' },
    price: {
      _type: 'instant',
      copper: 15,
    },
    supply: 'common',
    weight: 'light',
    rawMaterials: [
      {
        material: 'wood',
        value: 0.5,
      },
    ],
    time: 'day',
    talents: ['pathOfTheSong'],
    tools: ['knife'],
    effects: { label: 'gear:Gear.Flute.effect' },
    marketType: 'luxuryGoods',
  },
  {
    name: { id: 'drum', label: 'gear:Gear.Drum.name' },
    price: {
      _type: 'instant',
      copper: 18,
    },
    supply: 'common',
    weight: 'normal',
    rawMaterials: [
      {
        material: 'wood',
        value: 1,
      },
      {
        material: 'leather',
        value: 0.5,
      },
    ],
    time: 'day',
    talents: ['pathOfTheSong'],
    tools: ['knife'],
    effects: { label: 'gear:Gear.Drum.effect' },
    marketType: 'luxuryGoods',
  },
  {
    name: { id: 'horn', label: 'gear:Gear.Horn.name' },
    price: {
      _type: 'instant',
      copper: 30,
    },
    supply: 'common',
    weight: 'normal',
    rawMaterials: [
      {
        material: 'wood',
        value: 1,
      },
    ],
    time: 'day',
    talents: ['pathOfTheSong'],
    tools: ['knife'],
    effects: { label: 'gear:Gear.Horn.effect' },
    marketType: 'luxuryGoods',
  },
  {
    name: { id: 'inkAndQuill', label: 'gear:Gear.InkAndQuill.name' },
    price: {
      _type: 'instant',
      copper: 30,
    },
    supply: 'uncommon',
    weight: 'tiny',
    rawMaterials: [
      {
        material: 'feather',
        value: 1,
      },
      {
        material: 'iron',
        value: 0.1,
      },
    ],
    time: 'quarterDay',
    talents: ['tanner'],
    tools: ['knife', 'fire'],
    effects: { label: 'gear:Gear.InkAndQuill.effect' },
    marketType: 'luxuryGoods',
  },
  {
    name: { id: 'lyre', label: 'gear:Gear.Lyre.name' },
    price: {
      _type: 'instant',
      copper: 50,
    },
    supply: 'uncommon',
    weight: 'normal',
    rawMaterials: [
      {
        material: 'wood',
        value: 1,
      },
      {
        material: 'leather',
        value: 0.25,
      },
    ],
    time: 'week',
    talents: ['pathOfTheSong'],
    tools: ['knife'],
    effects: { label: 'gear:Gear.Lyre.effect' },
    marketType: 'luxuryGoods',
  },
  {
    name: { id: 'crystalBall', label: 'gear:Gear.CrystalBall.name' },
    price: {
      _type: 'instant',
      copper: 60,
    },
    supply: 'uncommon',
    weight: 'normal',
    rawMaterials: [
      {
        material: 'glass',
        value: 1,
      },
    ],
    time: 'day',
    talents: ['smith'],
    tools: ['forge'],
    effects: { label: 'gear:Gear.CrystalBall.effect' },
    marketType: 'luxuryGoods',
  },
  {
    name: { id: 'harp', label: 'gear:Gear.Harp.name' },
    price: {
      _type: 'instant',
      copper: 80,
    },
    supply: 'rare',
    weight: 'heavy',
    rawMaterials: [
      {
        material: 'wood',
        value: 2,
      },
      {
        material: 'leather',
        value: 0.5,
      },
    ],
    time: 'twoWeeks',
    talents: ['pathOfTheSong'],
    tools: ['knife'],
    effects: { label: 'gear:Gear.Harp.effect' },
    marketType: 'luxuryGoods',
  },
  {
    name: { id: 'hourglass', label: 'gear:Gear.Hourglass.name' },
    price: {
      _type: 'instant',
      copper: 120,
    },
    supply: 'rare',
    weight: 'light',
    rawMaterials: [
      {
        material: 'wood',
        value: 1,
      },
      {
        material: 'glass',
        value: 0.5,
      },
    ],
    time: 'week',
    talents: ['builder'],
    tools: ['forge'],
    effects: { label: 'gear:Gear.Hourglass.effect' },
    marketType: 'luxuryGoods',
  },
  {
    name: { id: 'bandages', label: 'gear:Gear.Bandages.name' },
    price: {
      _type: 'instant',
      copper: 6,
    },
    supply: 'common',
    weight: 'light',
    rawMaterials: [
      {
        material: 'cloth',
        value: 0.5,
      },
    ],
    time: 'quarterDay',
    talents: ['tailor'],
    tools: ['knife'],
    effects: { label: 'gear:Gear.Bandages.effect' },
    marketType: 'war',
  },
  {
    name: {
      id: 'threeArrowsIronHead',
      label: 'gear:Gear.ThreeArrowsIronHead.name',
    },
    price: {
      _type: 'instant',
      copper: 12,
    },
    supply: 'common',
    weight: 'normal',
    rawMaterials: [
      {
        material: 'iron',
        value: 0.5,
      },
      {
        material: 'wood',
        value: 1,
      },
    ],
    time: 'quarterDay',
    talents: ['smith', 'bowyer'],
    tools: ['forge', 'knife'],
    effects: { label: 'gear:Gear.ThreeArrowsIronHead.effect' },
    marketType: 'war',
  },
  {
    name: {
      id: 'sleepingPoisonOrAntidote',
      label: 'gear:Gear.SleepingPoisonOrAntidote.name',
    },
    price: {
      _type: 'instant',
      copper: 30,
    },
    supply: 'rare',
    weight: 'tiny',
    rawMaterials: [
      {
        material: 'herbs',
        value: 1,
      },
    ],
    time: 'quarterDay',
    talents: ['poisoner'],
    tools: ['cauldron', 'fire'],
    effects: { label: 'gear:Gear.SleepingPoisonOrAntidote.effect' },
    marketType: 'war',
  },
  {
    name: {
      id: 'hallucinogenicPoisonOrAntidote',
      label: 'gear:Gear.HallucinogenicPoisonOrAntidote.name',
    },
    price: {
      _type: 'instant',
      copper: 40,
    },
    supply: 'rare',
    weight: 'tiny',
    rawMaterials: [
      {
        material: 'herbs',
        value: 1,
      },
    ],
    time: 'quarterDay',
    talents: ['poisoner'],
    tools: ['cauldron', 'fire'],
    effects: { label: 'gear:Gear.HallucinogenicPoisonOrAntidote.effect' },
    marketType: 'war',
  },
  {
    name: {
      id: 'paralyzingPoisonOrAntidote',
      label: 'gear:Gear.ParalyzingPoisonOrAntidote.name',
    },
    price: {
      _type: 'instant',
      copper: 40,
    },
    supply: 'rare',
    weight: 'tiny',
    rawMaterials: [
      {
        material: 'herbs',
        value: 1,
      },
    ],
    time: 'quarterDay',
    talents: ['poisoner'],
    tools: ['cauldron', 'fire'],
    effects: { label: 'gear:Gear.ParalyzingPoisonOrAntidote.effect' },
    marketType: 'war',
  },
  {
    name: {
      id: 'lethalPoisonOrAntidote',
      label: 'gear:Gear.LethalPoisonOrAntidote.name',
    },
    price: {
      _type: 'instant',
      copper: 50,
    },
    supply: 'rare',
    weight: 'tiny',
    rawMaterials: [
      {
        material: 'herbs',
        value: 1,
      },
    ],
    time: 'quarterDay',
    talents: ['poisoner'],
    tools: ['cauldron', 'fire'],
    effects: { label: 'gear:Gear.LethalPoisonOrAntidote.effect' },
    marketType: 'war',
  },
  {
    name: { id: 'lockpicks', label: 'gear:Gear.Lockpicks.name' },
    price: {
      _type: 'instant',
      copper: 100,
    },
    supply: 'uncommon',
    weight: 'tiny',
    rawMaterials: [
      {
        material: 'iron',
        value: 0.25,
      },
    ],
    time: 'day',
    talents: ['smith', 'lockpicker'],
    tools: ['forge'],
    effects: { label: 'gear:Gear.Lockpicks.effect' },
    marketType: 'war',
  },
]