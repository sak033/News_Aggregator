const twoLetterISO = [
  "world",

  "ar","au","at",
  "bd","be","bw","br","bg",
  "ca","cl","cn","co","cu","cz",
  "eg","ee","et",
  "fi","fr",
  "de","gh","gr",
  "hk","hu",
  "in","id","ie","il","it",
  "jp",
  "ke","kr",
  "lv","lb","lt",
  "my","mx","ma",
  "na","nl","nz","ng","no",
  "pk","pe","ph","pl","pt",
  "ro","ru",
  "sa","sn","sg","sk","si","za","es","se","ch",
  "tw","tz","th","tr",
  "ua","ae","gb","us","ug",
  "ve","vn",
  "zw"
];



const isoCountries = {
  world: "World",

  ar: "Argentina",
  au: "Australia",
  at: "Austria",

  bd: "Bangladesh",
  be: "Belgium",
  bw: "Botswana",
  br: "Brazil",
  bg: "Bulgaria",

  ca: "Canada",
  cl: "Chile",
  cn: "China",
  co: "Colombia",
  cu: "Cuba",
  cz: "Czechia",

  eg: "Egypt",
  ee: "Estonia",
  et: "Ethiopia",

  fi: "Finland",
  fr: "France",

  de: "Germany",
  gh: "Ghana",
  gr: "Greece",

  hk: "Hong Kong",
  hu: "Hungary",

  in: "India",
  id: "Indonesia",
  ie: "Ireland",
  il: "Israel",
  it: "Italy",

  jp: "Japan",

  ke: "Kenya",
  kr: "South Korea",

  lv: "Latvia",
  lb: "Lebanon",
  lt: "Lithuania",

  my: "Malaysia",
  mx: "Mexico",
  ma: "Morocco",

  na: "Namibia",
  nl: "Netherlands",
  nz: "New Zealand",
  ng: "Nigeria",
  no: "Norway",

  pk: "Pakistan",
  pe: "Peru",
  ph: "Philippines",
  pl: "Poland",
  pt: "Portugal",

  ro: "Romania",
  ru: "Russia",

  sa: "Saudi Arabia",
  sn: "Senegal",
  sg: "Singapore",
  sk: "Slovakia",
  si: "Slovenia",
  za: "South Africa",
  es: "Spain",
  se: "Sweden",
  ch: "Switzerland",

  tw: "Taiwan",
  tz: "Tanzania",
  th: "Thailand",
  tr: "Turkey",

  ua: "Ukraine",
  ae: "United Arab Emirates",
  gb: "United Kingdom",
  us: "United States",
  ug: "Uganda",

  ve: "Venezuela",
  vn: "Vietnam",
  zw: "Zimbabwe"
};


let countries=[];
twoLetterISO.forEach(element=>{
    let obj={
        iso_2_alpha : element,
        png:`https://flagcdn.com/32*24/${element}.png`,
        countryName: getCountryName(element.toUpperCase()),
        
    }
    countries.push(obj);
})

function getCountryName(countryCode){
    if(isoCountries.hasOwnProperty(countryCode)){
        return isoCountries[countryCode];
    }
    else{
        return countryCode;
    }
}

console.log(countries);

export default countries;

