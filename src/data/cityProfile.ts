import type { FactGroup, TimelineItem } from './types';

export const pillars = [
  {
    "title": "Social development",
    "description": "Health, education, social welfare, housing, and services for the poor, disadvantaged, and marginalized."
  },
  {
    "title": "Economic development",
    "description": "Trade, commerce, agriculture, tourism, and an enabling environment for business and investment."
  },
  {
    "title": "Environmental management",
    "description": "Solid waste, coastal and upland protection, disaster resilience, and sustainable land use."
  },
  {
    "title": "Administrative governance",
    "description": "Transparency, accountability, responsive service delivery, and strong institutional capacity."
  }
];

export const factGroups: FactGroup[] = [
  {
    "title": "Geography and climate",
    "facts": [
      {
        "label": "Land area",
        "value": "102.72 km²",
        "note": "Published figures differ: PSA/PhilAtlas report 102.72 km², the city reports 105.26 km², and the provincial profile reports 106.88 km²."
      },
      {
        "label": "Population density",
        "value": "About 12 people per hectare",
        "note": "PSA 2024"
      },
      {
        "label": "Terrain",
        "value": "Predominantly hilly",
        "note": "Coastal plain rising to upland barangays"
      },
      {
        "label": "Climate",
        "value": "Type I — dry and wet seasons",
        "note": "Wet from mid-May to end of October; dry from December to early May"
      },
      {
        "label": "Boundaries",
        "value": "San Juan to the north, Bauang to the south, Bagulin and Naguilian to the east, West Philippine Sea to the west"
      },
      {
        "label": "Barangay profile",
        "value": "34 rural, 25 urban",
        "note": "14 coastal, 31 inland, 14 upland"
      }
    ]
  },
  {
    "title": "People",
    "facts": [
      {
        "label": "Population (2024)",
        "value": "124,809",
        "note": "2024 Census of Population"
      },
      {
        "label": "Population (2020)",
        "value": "125,640",
        "note": "2020 Census of Population"
      },
      {
        "label": "Growth rate",
        "value": "-0.16%",
        "note": "PSA 2024"
      },
      {
        "label": "Households (2024)",
        "value": "35,351",
        "note": "Average household size of 3.5"
      },
      {
        "label": "Functional literacy",
        "value": "71.5%",
        "note": "FLEMMS, PSA 2024"
      },
      {
        "label": "Languages",
        "value": "Ilokano, Bisaya, Bicol, Ilonggo, Cebuano, Chinese, and Bago",
        "note": "Languages listed in the City Government's profile; English is not included in that source list."
      }
    ]
  },
  {
    "title": "Economy and finance",
    "facts": [
      {
        "label": "Classification",
        "value": "2nd class component city",
        "note": "Regional and administrative capital of Region I"
      },
      {
        "label": "Poverty incidence",
        "value": "8.7%",
        "note": "PSA 2023"
      },
      {
        "label": "City revenue (2024)",
        "value": "₱1,314,010,175.24"
      },
      {
        "label": "City expenditures (2024)",
        "value": "₱1,021,576,106.43"
      },
      {
        "label": "Banks",
        "value": "28 universal and commercial, 9 thrift and savings, 11 rural",
        "note": "Plus 57 non-bank financial institutions (CMCI 2024)"
      },
      {
        "label": "Cooperatives",
        "value": "48",
        "note": "Cooperative data as of 2025"
      }
    ]
  },
  {
    "title": "Agriculture and food",
    "facts": [
      {
        "label": "Rice sufficiency",
        "value": "31.91%"
      },
      {
        "label": "Corn sufficiency",
        "value": "47%"
      },
      {
        "label": "Root crops sufficiency",
        "value": "87.73%"
      },
      {
        "label": "Legumes sufficiency",
        "value": "106.75%"
      },
      {
        "label": "Vegetables sufficiency",
        "value": "127.55%"
      },
      {
        "label": "Fruits sufficiency",
        "value": "60.49%"
      },
      {
        "label": "Livestock production",
        "value": "Hog 3,584 kg, cattle 2,266 kg, carabao 1,545 kg, goat 2,060 kg, chicken 21,644 heads",
        "note": "Annual production"
      }
    ]
  },
  {
    "title": "Infrastructure and utilities",
    "facts": [
      {
        "label": "Road network",
        "value": "237.4168 km"
      },
      {
        "label": "Airport",
        "value": "1 domestic",
        "note": "Between Barangay Canaoay and Barangay San Francisco; private and chartered flights"
      },
      {
        "label": "Seaport",
        "value": "1 international",
        "note": "Primarily cargo; accommodates private vessels and yachts"
      },
      {
        "label": "Power",
        "value": "All barangays electrified"
      },
      {
        "label": "Water",
        "value": "1 water district"
      },
      {
        "label": "Telecommunications",
        "value": "4 telecom companies and mobile service providers"
      }
    ]
  },
  {
    "title": "Health and education",
    "facts": [
      {
        "label": "Hospitals",
        "value": "1 public, 4 private",
        "note": "Includes the Ilocos Training and Regional Medical Center (ITRMC)"
      },
      {
        "label": "Clinics",
        "value": "115 public, 118 private"
      },
      {
        "label": "Tertiary schools",
        "value": "2 public, 10 private"
      },
      {
        "label": "Technical-vocational schools",
        "value": "3 public, 32 private"
      },
      {
        "label": "Secondary schools",
        "value": "18 public, 32 private"
      },
      {
        "label": "Elementary schools",
        "value": "24 public, 21 private"
      },
      {
        "label": "Preschools",
        "value": "21 public, 26 private"
      },
      {
        "label": "Day care centers",
        "value": "64 public"
      }
    ]
  }
];

export const history: TimelineItem[] = [
  {
    "year": "1572",
    "title": "Spanish regime",
    "text": "Juan de Salcedo, nephew of Miguel Lopez de Legazpi, was sent north of Manila. He reached Agoo, then continued north and entered a large river the Ilocanos called Purao. The first Ilocano blood was shed in the refusal to pay tribute, and the river was renamed Darigayos — where blood flowed."
  },
  {
    "year": "1759",
    "title": "Early settlements",
    "text": "Headhunting Igorots attacked San Guillermo de Dalangdang whenever the fire trees bloomed, while Moro pirates plundered the coastal village of San Vicente de Balanac. Augustinian priest Father Jose Torres convinced the survivors of both villages to gather for their common protection."
  },
  {
    "year": "1762–1831",
    "title": "The birth of Pindangan and San Fernando",
    "text": "Pindangan — from pindang, the Ilocano word for dried fish — was born in 1762. Don Santiago Olarte became its first gobernadorcillo in 1764. On May 6, 1786, Father Fernando Rey founded Ministerio de San Fernando in honor of King Ferdinand of Spain, and in 1831 Father Juan Soralla became its first resident priest."
  },
  {
    "year": "1850",
    "title": "The birth of a capital",
    "text": "San Fernando was declared the Cabecera, or capital, of the newly created Province of La Union on March 2, 1850."
  },
  {
    "year": "1896–1898",
    "title": "The Philippine Revolution",
    "text": "Two weeks after the Cry of Pugadlawin in September 1896, an alleged conspiracy against Spain was discovered in San Fernando and local leaders were arrested. On July 31, 1898, the Spanish surrender was signed in the Actas de Capitulaciones; San Fernando was the 13th of 29 towns to witness it. For the first time since 1850, a Filipino ascended the Casa Real."
  },
  {
    "year": "1899–1901",
    "title": "American regime",
    "text": "The US merchant steamer Saturmus was captured by revolutionary forces in August 1899, and US Navy ships bombarded the town in retaliation. General Samuel M. B. Young invaded on November 21, 1899, marking the American occupation of La Union."
  },
  {
    "year": "1901",
    "title": "Civil government",
    "text": "Governor General William Howard Taft arrived in San Fernando in August 1901, and Don Joaquin Ortega of San Fernando was declared the first Civil Governor of La Union on August 17, 1901. Agriculture and education thrived under American teachers."
  },
  {
    "year": "1941–1945",
    "title": "Japanese regime",
    "text": "Japanese planes bombed San Fernando on December 8, 1941, beginning the occupation. The Battle of Bacsil Ridge on March 19, 1945 preceded the complete liberation of the town on March 21, 1945."
  },
  {
    "year": "1946–1979",
    "title": "Post-war administration",
    "text": "Francisco I. Ortega became Speaker Pro-Tempore of the First Congress, and Mayor Lorenzo Dacanay led the reconstruction of public buildings, roads, and bridges. The town hall, designed by Architect Felipe Mendoza, was completed under Mayor Dacanay, while Mayor Antonio T. Feraren focused on roads and bridges."
  },
  {
    "year": "1980–1997",
    "title": "Local leadership",
    "text": "Judge Justo O. Orros Jr. became the first town mayor unanimously selected as Most Outstanding Mayor of Region I for three consecutive years. In 1988, Col. Manuel C. Ortega became the first elected mayor after the OIC period."
  },
  {
    "year": "1998",
    "title": "Cityhood",
    "text": "House Bill 7594 converted the municipality into a city. Republic Act 8509 was signed by President Fidel V. Ramos on February 13, 1998, and ratified in a plebiscite on March 20, 1998 — the city's Foundation Day. Manuel C. Ortega became the first city mayor and last municipal mayor, followed by Mayor Mary Jane C. Ortega, the first elected city mayor."
  }
];

export const mapLinks = [
  {
    "label": "Existing land use map",
    "url": "https://www.sanfernandocity.gov.ph/wp-content/uploads/2019/06/SFC-Existing-Land-Use-Map-Final.jpg"
  },
  {
    "label": "Flood and landslide map",
    "url": "https://www.sanfernandocity.gov.ph/wp-content/uploads/2019/08/flood-landslide-map.jpg"
  },
  {
    "label": "Rain-induced landslide map",
    "url": "https://www.sanfernandocity.gov.ph/wp-content/uploads/2019/08/rain-induced-landslide.jpg"
  },
  {
    "label": "Storm surge map",
    "url": "https://www.sanfernandocity.gov.ph/wp-content/uploads/2019/08/storm-surge.jpg"
  },
  {
    "label": "Ground shaking map",
    "url": "https://www.sanfernandocity.gov.ph/wp-content/uploads/2019/08/ground-shaking-1.jpg"
  },
  {
    "label": "Barangay boundaries map",
    "url": "https://www.sanfernandocity.gov.ph/wp-content/uploads/2019/08/brgybdry.jpg"
  },
  {
    "label": "Proposed road network",
    "url": "https://www.sanfernandocity.gov.ph/wp-content/uploads/2019/08/proposed-road-network.jpg"
  },
  {
    "label": "Sanitary landfill map",
    "url": "https://www.sanfernandocity.gov.ph/wp-content/uploads/2019/08/sanitary-landfill.jpg"
  }
];
