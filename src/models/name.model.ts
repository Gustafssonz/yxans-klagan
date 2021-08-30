export enum NameType {
  FirstName = 'FirstName',
  FamilyName = 'FamilyName',
  HomeName = 'HomeName',
  NickName = 'NickName',
}

interface WeightedName {
  weight: number
  type: NameType
}

export interface NameList {
  Male: {
    probabilites: WeightedName[]
    rawNames: readonly string[]
  }
  Female: {
    probabilites: WeightedName[]
    rawNames: readonly string[]
  }
  family?: readonly string[]
  nickName?: readonly string[]
}

export enum KinType {
  Human = 'Human',
  Elf = 'Elf',
}

export enum HumanKin {
  Alderlänning = 'Alderlänning',
  Eländer = 'Eländer',
  Aslener = 'Aslener',
}

export enum ElfKin {
  Elf = 'Elf',
}

export type Kins = {
  [KinType.Human]: HumanKin
  [KinType.Elf]: ElfKin
}

export const humanNames: { [H in Kins['Human']]: NameList } = {
  Alderlänning: {
    Male: {
      probabilites: [
        {
          type: NameType.FirstName,
          weight: 49,
        },
        {
          type: NameType.FamilyName,
          //'[name.Alderlänning.Male] [name.Alderlänning.Family]^5',
          // '[name.Alderlänning.Male] av [getHome.output]^5',
          weight: 5,
        },
        {
          type: NameType.HomeName,
          weight: 5,
        },
      ],
      rawNames: [
        'Adalbern',
        'Alaric',
        'Alboin',
        'Baldarich',
        'Baldomar',
        'Clovis',
        'Eburwin',
        'Egino',
        'Erminigild',
        'Eward',
        'Faramund',
        'Fridumar',
        'Fulco',
        'Gerulf',
        'Gislin',
        'Haimo',
        'Hardmod',
        'Hariwald',
        'Horsa',
        'Hrodger',
        'Hrolf',
        'Ivo',
        'Joscelin',
        'Karl',
        'Kuno',
        'Landebert',
        'Lanzo',
        'Leudagar',
        'Lothar',
        'Manno',
        'Meginfrid',
        'Meino',
        'Odo',
        'Odoacer',
        'Ortwin',
        'Otmar',
        'Otto',
        'Raban',
        'Radulf',
        'Ranganhar',
        'Rochus',
        'Rudesind',
        'Sigdag',
        'Siward',
        'Tancred',
        'Trancmar',
        'Waldhar',
        'Waldo',
        'Wandal',
        'Warin',
      ],
    },
    Female: {
      probabilites: [
        { type: NameType.FirstName, weight: 49 },
        { type: NameType.FamilyName, weight: 5 },
        { type: NameType.HomeName, weight: 5 },
      ],
      rawNames: [
        'Adela',
        'Adelais',
        'Adelina',
        'Aenor',
        'Alda',
        'Aldegund',
        'Amalia',
        'Amelina',
        'Auda',
        'Aveza',
        'Avila',
        'Berengaria',
        'Bertha',
        'Brunhild',
        'Brunhilde',
        'Clothildis',
        'Cunigund',
        'Ermendrud',
        'Ermingard',
        'Erminhilt',
        'Erminlinda',
        'Frida',
        'Geretrudis',
        'Gerhild',
        'Gerlind',
        'Gisila',
        'Godeliva',
        'Gunda',
        'Hadewig',
        'Hailwic',
        'Herleva',
        'Ida',
        'Ima',
        'Irma',
        'Ishild',
        'Leutgard',
        'Luitgard',
        'Lutgardis',
        'Mahthildis',
        'Oda',
        'Odila',
        'Raganhildis',
        'Roslindis',
        'Rosmunda',
        'Rothad',
        'Roza',
        'Saxa',
        'Sigilind',
        'Waldeburg',
        'Waldedrudis',
      ],
    },
    family: [
      'Adogit',
      'Aelvaeones',
      'Batini',
      'Bergio',
      'Braemi',
      'Bui',
      'Chali',
      'Danduti',
      'Dani',
      'Eunixi',
      'Evagres',
      'Favonae ',
      'Fosi',
      'Grannii',
      'Hallin',
      'Hasdingi',
      'Helissi',
      'Heruli',
      'Hilleviones',
      'Ingriones',
      'Lemovii',
      'Levoni',
      'Manimi',
      'Mattiaci',
      'Naharvali',
      'Nemetes',
      'Njars',
      'Otingis',
      'Pharodini',
      'Quadi',
      'Racatae',
      'Racatriae',
      'Salii',
      'Scirii',
      'Segni',
      'Sigulones',
      'Suevi',
      'Taetel',
      'Teutons',
      'Thervingi',
      'Theustes',
      'Tubanti',
      'Ubi',
      'Vagoth',
      'Vangiones',
      'Varini',
      'Vinoiloth ',
      'Viruni',
      'Vispi ',
      'Zumi',
    ],
  },
  Aslener: {
    Male: {
      probabilites: [
        {
          type: NameType.FirstName,
          weight: 49,
        },
        {
          type: NameType.NickName,
          weight: 5,
        },
      ],
      rawNames: [
        'Agis',
        'Agler',
        'Alceus',
        'Altair',
        'Anker ',
        'Ares',
        'Arsene',
        'Atemas',
        'Avel',
        'Balasi',
        'Baruch',
        'Cassander',
        'Cimon',
        'Cletus',
        'Cyrus',
        'Damen',
        'Dinos',
        'Dion',
        'Dorian',
        'Dunixi',
        'Eneas',
        'Etor',
        'Feodor',
        'Gilos',
        'Gorka',
        'Guilios',
        'Hali',
        'Hesiod',
        'Hippias',
        'Kai',
        'Kuiril',
        'Kyros',
        'Leander',
        'Meletios',
        'Mentor',
        'Milos',
        'Nestor',
        'Orestes',
        'Peder',
        'Poul',
        'Preben',
        'Solon',
        'Spyridon',
        'Thanos',
        'Titos',
        'Todor',
        'Vasileous',
        'Vasilis',
        'Zeno',
        'Zorba',
      ],
    },
    Female: {
      probabilites: [
        {
          type: NameType.FirstName,
          weight: 49,
        },
        {
          type: NameType.NickName,
          weight: 5,
        },
      ],
      rawNames: [
        'Adara',
        'Alena',
        'Arete',
        'Asta',
        'Callia',
        'Cassia',
        'Charis',
        'Cyma',
        'Damia',
        'Delbin',
        'Doria',
        'Eleni',
        'Elna',
        'Evadne',
        'Evania',
        'Evanthe',
        'Filia',
        'Helia',
        'Hesper',
        'Io',
        'Iona',
        'Ionia',
        'Isaura',
        'Ismini',
        'Kaia',
        'Kama',
        'Kepa',
        'Kolete',
        'Lana',
        'Lelia',
        'Lenore',
        'Melania',
        'Melita',
        'Metea',
        'Mona',
        'Nora',
        'Nyssa',
        'Odele',
        'Pallas',
        'Panthea',
        'Pelegia',
        'Perrine',
        'Philippa',
        'Rhea',
        'Rita',
        'Sappho',
        'Sonia',
        'Tessa',
        'Vania',
        'Zenobia',
      ],
    },
    nickName: [
      'Äventyrlige',
      'Arge',
      'Skallige',
      'Blodige',
      'Djärve',
      'Noggranne',
      'Slarvige',
      'Försiktig',
      'Duktige',
      'Förvirrade',
      'Grymme',
      'Direkte',
      'Energiske',
      'Tjocka',
      'Varsamme',
      'Gode',
      'Hårige',
      'Stilige',
      'Lycklige',
      'Hoppfulle',
      'Muntra',
      'Glad',
      'Mäktige',
      'Lindriga',
      'Vilseledne',
      'Dystere',
      'Gamle',
      'Skarpsynte',
      'Stolte',
      'Snabbe',
      'Pålitlige',
      'Ledsne',
      'Kloke',
      'Korte',
      'Sömnig',
      'Långsamme',
      'Kraftige',
      'Starke',
      'Rejäle',
      'Snabbe',
      'Pratsamme',
      'Långe',
      'Fruktansvärde',
      'Tunne',
      'Fule',
      'Fåfänglige',
      'Svage',
      'Kloke',
      'Unge',
    ],
  },
  Eländer: {
    Male: {
      probabilites: [
        {
          type: NameType.FirstName,
          weight: 49,
        },
        {
          type: NameType.FamilyName,
          weight: 10,
        },
        {
          type: NameType.HomeName,
          weight: 10,
        },
      ],
      rawNames: [
        'Alvgar',
        'Ahlred',
        'Atheric',
        'Baldred',
        'Beocca',
        'Beorn',
        'Bosa',
        'Brid',
        'Cadwallon',
        'Ceol',
        'Cuthred',
        'Cuthwulf',
        'Cynric',
        'Daela',
        'Dunn',
        'Dunstan',
        'Eadgar',
        'Eadhun',
        'Ealread',
        'Earnwulf',
        'Eohric',
        'Frithstan',
        'Guthere',
        'Guthlaf',
        'Gyric',
        'Haefoc',
        'Hrothgar',
        'Ithamar',
        'Leofgar',
        'Liofa',
        'Morchaer',
        'Odda',
        'Ordgar',
        'Osgar',
        'Osred',
        'Praen',
        'Raedwald',
        'Sidrac',
        'Sigulf',
        'Sithric',
        'Teothic',
        'Tobias',
        'Uhtred',
        'Ulf',
        'Waldere',
        'Wulfgar',
        'Wulfmaer',
        'Wulfric',
        'Wulfwig',
        'Wynstan',
      ],
    },
    Female: {
      probabilites: [
        {
          type: NameType.FirstName,
          weight: 49,
        },
        {
          type: NameType.FamilyName,
          weight: 10,
        },
        {
          type: NameType.HomeName,
          weight: 10,
        },
      ],
      rawNames: [
        'Aebbe',
        'Aedwen',
        'Alvhild',
        'Alvlaed',
        'Alvswith',
        'Alvswith',
        'Alvwyn',
        'Aethelith',
        'Aethelwyn',
        'Ailred',
        'Bebbe ',
        'Bucge',
        'Ceolburh',
        'Cuthburh',
        'Cuthswith',
        'Cyneberg',
        'Eadburg',
        'Eadgifu',
        'Ealhild',
        'Eanflaed',
        'Eangyth',
        'Eanith',
        'Eawyn',
        'Edwyn',
        'Frithwyn',
        'Gytha',
        'Heiu',
        'Helelufu',
        'Hild',
        'Hilda',
        'Inga',
        'Leofrun',
        'Maethild',
        'Mathilda',
        'Osgyth',
        'Oshild',
        'Osswith',
        'Ricola',
        'Saegyth',
        'Saehild',
        'Saeith',
        'Saewyn',
        'Saewyn',
        'Siflaed',
        'Waerburh',
        'Withith',
        'Wulfwaru',
        'Wulfwyn',
        'Wynflaed',
        'Ymma',
      ],
    },

    family: [
      'Adlard',
      'Almer',
      'Alston',
      'Alvar',
      'Balston',
      'Brunger',
      'Brunwin',
      'Burch',
      'Burward',
      'Cobbald',
      'Dewdney',
      'Eddols',
      'Elphee',
      'Elvey',
      'Erwin',
      'Frewer',
      'Frewin',
      'Goldbard',
      'Goldhawk',
      'Hulbert',
      'Isgar',
      'Kenway',
      'Kerrich',
      'Kerrich',
      'Lambrick',
      'Leavins',
      'Leavold',
      'Lewin',
      'Litwin',
      'Litwin',
      'Medwin',
      'Orrick',
      'Osmer',
      'Othen',
      'Quenell',
      'Seavers',
      'Siggers',
      'Sirett',
      'Stannard',
      'Wackrill',
      'Walwin',
      'Wennell',
      'Whatman',
      'Winbolt',
      'Winbow',
      'Woolgar',
      'Wyard',
      'Wyberg',
      'Wymer',
      'Yonwin',
    ],
  },
}

export interface VillageNameModel {
  prefix: readonly string[]
  suffix: readonly string[]
}

export const villageNames: VillageNameModel = {
  prefix: [
    'Bärnsten',
    'Ängel',
    'Själ',
    'Bäck',
    'Vik',
    'Kittel',
    'Pil',
    'Höst',
    'Kal',
    'Fjärd',
    'Strand',
    'Björn',
    'Klock',
    'Svart',
    'Dyster',
    'Blind',
    'Ben',
    'Block',
    'Bro',
    'Gryt',
    'Skör',
    'Brons',
    'Borg',
    'Grott',
    'Kyl',
    'Ler',
    'Klar',
    'Klipp',
    'Moln',
    'Kall',
    'Häll',
    'Kråk',
    'Kristall',
    'Fördömda',
    'Mörk',
    'Gryning',
    'Död',
    'Djup',
    'Rådjurs',
    'Demon',
    'Dagg',
    'Dunkel',
    'Öde',
    'Smuts',
    'Hund',
    'Drak',
    'Torr',
    'Skymnings',
    'Damm',
    'Örn',
    'Jord',
    'Öst',
    'Brun',
    'Kant',
    'Äldre',
    'Gammel',
    'Glöd',
    'Eviga',
    'Rättvisa',
    'Fall',
    'Falsk',
    'Fager',
    'Bortre',
    'Fe',
    'Fruktans',
    'Flamm',
    'Platt',
    'Frej',
    'Frost',
    'Spöke',
    'Glimm',
    'Dunkel',
    'Guld',
    'Gräs',
    'Grå',
    'Grön',
    'Dyster',
    'Smuts',
    'Hassel',
    'Hjärt',
    'Hög',
    'Dov',
    'Honungs',
    'Hund',
    'Is',
    'Järn',
    'Kil',
    'Riddar',
    'Sjö',
    'Sista',
    'Ljus',
    'Kalk',
    'Liten',
    'Förlorade',
    'Galen',
    'Magiker',
    'Lönn',
    'Mitt',
    'Makt',
    'Kvarn',
    'Dimm',
    'Mån',
    'Moss',
    'Ler',
    'Stum',
    'Myt',
    'Aldrig',
    'Ny',
    'Natt',
    'Norr',
    'Ek',
    'Hav',
    'Gammal',
    'Ox',
    'Pärl',
    'Tall',
    'Damm',
    'Ren',
    'Snabb',
    'Vredes',
    'Korp',
    'Röd',
    'Rimfrost',
    'Flod',
    'Sten',
    'Skälm',
    'Ros',
    'Rost',
    'Salt',
    'Sand',
    'Bränn',
    'Skydd',
    'Skugg',
    'Skimmer',
    'Slöj',
    'Tyst',
    'Silkes',
    'Silver',
    'Slät',
    'Slask',
    'Lömsk',
    'Små',
    'Lill',
    'Slät',
    'Orm',
    'Snö',
    'Söder',
    'Vår',
    'Hjort',
    'Stjärn',
    'Imm',
    'Stål',
    'Brant',
    'Stilla',
    'Sten',
    'Storm',
    'Sommar',
    'Sol',
    'Kärr',
    'Svan',
    'Snabb',
    'Törne',
    'Timmer',
    'Handel',
    'Väst',
    'Val',
    'Dugg',
    'Vit',
    'Vild',
    'Vilda',
    'Vind',
    'Vinter',
    'Varg',
  ],
  suffix: [
    'tunnland',
    'band',
    'kärr',
    'vik',
    'klocka',
    'född',
    'städ',
    'born',
    'brott',
    'bryt',
    'bäck',
    'fäste',
    'bränna',
    'grav',
    'röse',
    'kalla',
    'kyla',
    'klippa',
    'kust',
    'krön',
    'korsning',
    'dal',
    'gryt',
    'driva',
    'klar',
    'falla',
    'falls',
    'fälla',
    'fält',
    'ved',
    'skog',
    'fort',
    'front',
    'frost',
    'garde',
    'port',
    'dalgång',
    'brott',
    'grav',
    'lund',
    'vakt',
    'klyfta',
    'bukt',
    'hall',
    'helga',
    'tuna',
    'hand',
    'hamn',
    'tillflykt',
    'roder',
    'kulle',
    'fäste',
    'holde',
    'sänka',
    'horn',
    'värd',
    'torn',
    'landa',
    'ljus',
    'gap',
    'äng',
    'ren',
    'myr',
    'vall',
    'hed',
    'Mer',
    'pik',
    'mun',
    'passage',
    'topp',
    'platts',
    'damm',
    'hamn',
    'post',
    'ände',
    'vila',
    'sten',
    'springa',
    'ärr',
    'skugga',
    'klippa',
    'skal',
    'skydda',
    'strand',
    'fylke',
    'sida',
    'stava',
    'spira',
    'by',
    'häx',
    'helga',
    'stjärna',
    'storm',
    'strå',
    'toppen',
    'flod',
    'sta',
    'dal',
    'dala',
    'valv',
    'ådra',
    'utsikt',
    'bya',
    'mur',
    'tumla',
    'Skydd',
    'Utsikt',
    'vatten',
    'brunn',
    'brygga',
    'veke',
    'vind',
    'trä',
    'gård',
  ],
}
