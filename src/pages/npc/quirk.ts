const quirks = [
  'FamilyDream',
  'SkillGambler',
  'HauntedByDream',
  'ChewingNarcotics',
  'HasTreasureMap',
  'AlderSpy',
  'TooSensitive',
  'Squeamish',
  'ObsessedWithMonster',
  'Cultist',
  'SleepsBad',
  'LegendaryPickpocket',
  'OnlySurvivor',
  'WorshipsGodInTheDeep',
  'PossessedByDemon',
  'AvengeParent',
  'Bankrupt',
  'HatesCompetitor',
  'HidesSecret',
  'WillDoAnything',
  'ExpensiveHabits',
  'LikesToScare',
  'BelievesToBeRoyal',
  'WantsRevenge',
  'InterestedPoetry',
  'Cheater',
  'Gossips',
  'Doubter',
  'DreamsOfKilling',
  'Touchy',
  'Storyteller',
  'WillTakeOver',
  'CravingBeer',
  'BelievesToBeFolllowed',
  'Swears',
  'TheoryOfWorld',
] as const

export type Quirk = typeof quirks[number]
export const getQuirk = () => [...quirks]
