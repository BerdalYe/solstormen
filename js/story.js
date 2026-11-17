'use strict';
// The story: every scene, its text, stats, items and choices.

// ══════════════════════════════════════════════════
//  STORY DATA
// ══════════════════════════════════════════════════
const STORY={

  // ────────────────────────────────────────────────
  // ACT 1 — NATTEN DET BEGYNTE
  // ────────────────────────────────────────────────
  start:{
    shortName:'OPPVÅKNING',
    img:'start',
    time:'23:59:59',rad:0,
    title:'SOLSTORMEN',isTitle:true,
    intercept:null,
    text:`<p>Klokken er 02:17. Søvnen knekker som glass. Et skingrende nødvarsel fyller rommet med blodrødt lys — telefonen, nattbordet, taket.</p>
<em>«KRISEVARSEL: Solstorm kategori X99 bekreftet av 14 internasjonale observatorier. Estimert treffpunkt: 24 timer. Dødelig strålingsdose garantert i åpent terreng. Fjellbunkeren ved Gaustablikk åpner umiddelbart. Kapasitet 50 000. Evakuer nå.»</em>
<p>Utenfor våkner motorer til liv. En nabo skriker noe usammenhengende i trappeoppgangen. En lyskaster feier gjennom persiennene — ikke fra en tilfeldig bil, men fra noe som allerede ventet der nede.</p>
<p>Én detalj slår deg: varselet kom tolv sekunder for tidlig. Klokken din hadde ikke rukket å vise 02:17 da lyden traff. <strong>Hva gjør du?</strong></p>`,
    stats:{frykt:{d:+22,label:'FRYKT'}},
    items:[],
    choices:[
      {text:'Hopp i bilen. Kjør alt du har mot fjellbunkeren ved Gaustablikk.',target:'motorvei_start'},
      {text:'Lås alle dørene. Start laptopen. Verifiser varselet på Dark Web.',target:'hacking_start'},
      {text:'Glem myndighetene. Løp ned i byens forlatte T-banenett.',target:'tbane_start'},
      {text:'Ring naboen — kanskje noen vet mer enn deg.',target:'naboen'},
    ]
  },

  naboen:{
    shortName:'NABOEN',
    img:'naboen',
    time:'23:30:00',rad:0,
    title:'NABOENS HEMMELIGHET',
    intercept:'AVLYTTET SMS — «De er på vei. Ikke åpne for noen. Stol ikke på varselet. — H»',
    text:`<p>Han svarer på tredje ring. Stemmen er anspent og hviskende, som om han snakker med hånden over munnen. <em>«Ikke dra til bunkeren. Hør på meg. Gjør det ikke.»</em></p>
<p>Du rekker ikke å spørre. Bak stemmen hans: tre kraftige slag mot en dør, rop på et fremmed språk — ikke norsk, ikke engelsk. En kort, kvalt lyd. Deretter fullstendig stillhet.</p>
<em>Linjen blinker ut. Ingen opptattsignal, ingen tone. Bare ingenting.</em>
<p>Gjennom veggen hører du ingenting fra leiligheten ved siden av — og naboen din er typen som alltid har TV på. Du har minutter på deg. Kanskje færre.</p>`,
    stats:{frykt:{d:+30,label:'FRYKT'},kunnskap:{d:+20,label:'KUNNSKAP'}},
    choices:[
      {text:'Den advarselen var nok. Hack Dark Web — finn ut hva som skjer.',target:'hacking_start'},
      {text:'Naboen kan ha feil. Kjør til bunkeren, men vær på vakt.',target:'motorvei_start'},
      {text:'Stol på magefølelsen. Løp ned i T-banen og gjøm deg.',target:'tbane_start'},
    ]
  },

  // ────────────────────────────────────────────────
  // RUTE A: MOTORVEIEN
  // ────────────────────────────────────────────────
  motorvei_start:{
    shortName:'MOTORVEI',
    img:'motorvei_start',
    time:'20:00:00',rad:5,
    title:'TRAFIKKORKEN',
    intercept:null,
    text:`<p>E18 er en stillestående grå streng av metall og panikk, bil mot bil mot horisont. Du har sittet her i to og en halv time. Motoren er slukket for lenge siden.</p>
<em>«Hold dere i kjøretøyene. Militæret klargjør evakueringskorridor på vei 47 og 18. Klaring: ukjent tidshorisont.»</em>
<p>Himmelen i nordøst har fått en farge som ikke finnes på noe kart — et dypt oransje som presser seg inn under skydekket som om solen er i ferd med å implodere. Folk vandrer mellom bilene. En mann tre rekker foran deg setter fyr på sin egen Volvo, ser på flammene i fem sekunder, og går.</p>
<p>Det svir svakt i ansiktet. Huden. Mobilsignalet er helt borte. Og den militære helikopterstøyen fra sør har blitt tettere de siste tjue minuttene.</p>`,
    stats:{frykt:{d:+18,label:'FRYKT'},rad:{d:+8,label:'STRÅLING'}},
    choices:[
      {text:'Forlat bilen. Ta beina fatt og gå inn i skogen vest for veien.',target:'bensinstasjon'},
      {text:'Stol på myndighetene. Lås deg inne og vent.',target:'sorte_van'},
      {text:'Kjemp deg frem. Bruk veiskulderen og kollisjonsbarrieren.',target:'veiskulder'},
      {text:'Snu. Dra til sentrum — Nationaltheatret-trikken har en gammel radiomann.',target:'trikken'},
    ]
  },

  veiskulder:{
    shortName:'VEISKULDER',
    img:'veiskulder',
    time:'18:30:00',rad:9,
    title:'VEGKRIGEREN',
    text:`<p>Du trekker opp på veiskulderen og presser gassen ned. To hjul over kantsteinen, to på asfalten. Folk hopper unna — noen slår på taket av bilen din mens du passerer. Et militærhelikopter henger seg på over deg og låser et hvitt lysbelte rett ned i frontruten.</p>
<em>Høyttaler fra helikopteret: «STOPP KJØRETØYET ØYEBLIKKELIG. NØDREGULERING §17 ER GJELDENDE. NESTE ADVARSEL ER IKKE VERBAL.»</em>
<p>Rundingen i veien avslører veisperringen. Tre pansrede kjøretøy i vifteformasjon over begge felt og skulderen. Soldater med rifler i anleggsposisjon. Lyskastere som gjør natt til middag. Mellom deg og dem: femti meter asfalt.</p>`,
    stats:{mot:{d:+20,label:'MOT'},frykt:{d:+25,label:'FRYKT'}},
    choices:[
      {text:'Bråstopp. Hopp ut av bilen og løp inn i skogen til høyre.',target:'bensinstasjon'},
      {text:'Ram gjennom sperringa. På andre siden: en svart van venter allerede.',target:'sorte_van'},
      {text:'Stopp frivillig. Vis presse-ID og be om passasje.',target:'checkpoint', requires:{item:'presseID'}},
    ]
  },

  sorte_van:{
    shortName:'SORT VAN',
    img:'sorte_van',
    time:'18:00:00',rad:8,
    title:'DEN SVARTE VANEN',
    intercept:'KLASSIFISERT LOGG — «Subjekt-gruppen Delta er sikret på motorveien. Fase 2 iverksettes. Ingen unntak.»',
    text:`<p>En langstrakt, svart varebil uten kjennemerker glir opp bak deg. Tre menn med refleksvester og blank rustning åpner bagasjedøren. Ingen uniformer. Ingen ID-numre.</p>
<em>«Vi er her for å hjelpe. Det er plass til deg. Følg med oss til sikkerhetsstedet.»</em>
<p>En av dem løfter et kamera mot deg og trykker på en knapp. En skjerm i vanen viser bildet ditt med en rød etikett: <strong>PROSJEKT SOLNEDGANG — SUBJEKT #4471 — REGISTRERT.</strong></p>
<p>Det er noe fundamentalt galt med disse mennene.</p>`,
    stats:{frykt:{d:+30,label:'FRYKT'},kunnskap:{d:+20,label:'KUNNSKAP'}},
    choices:[
      {text:'Noe er voldsomt galt. Spill villig, men se etter rømningsvei.',target:'inne_vanen'},
      {text:'Dette er fellen. Ignorer alt og løp inn i skogen.',target:'bensinstasjon'},
    ]
  },

  inne_vanen:{
    shortName:'INNE VAN',
    img:'inne_vanen',
    time:'16:00:00',rad:5,
    title:'INNSIDEN',
    text:`<p>Innsiden er et mobilt overvåkingsrom. Seks skjermer viser satellittbilder av norske byer: Oslo, Bergen, Trondheim, Tromsø. Over hvert bilde blinker en rød prikk og teksten <strong>«SUBJEKT SIKRET — SEKTOR [X]»</strong>. Hundrevis av dem.</p>
<em>På den midterste skjermen: et detaljert kart over fjellbunkeren ved Gaustablikk. Alle fire inngangene er merket med grønn hake. Utgangene har en annen etikett — rød, med ett ord: PERMANENT.</em>
<p>En av mennene vrir seg mot panelet og taster en kode med ryggen til deg. Syv sekunder. På bordet mellom dere: et laminert ID-kort med bilde av noen du ikke kjenner igjen, og en USB-stikk med en hvit etikett: <strong>SANNHETEN</strong>. Teksten er håndskrevet.</p>`,
    stats:{kunnskap:{d:+30,label:'KUNNSKAP'}},
    items:['hacktool'],
    choices:[
      {text:'Grip USB-stikken og identitetskortet. Hopp ut av vanen mens den bremser.',target:'etter_flukt'},
      {text:'Vent og observer. Det er mer informasjon å hente her.',target:'vanen_dypere'},
    ]
  },

  vanen_dypere:{
    shortName:'VANENS HEM.',
    img:'vanen_dypere',
    time:'14:00:00',rad:7,
    title:'PROSJEKT SOLNEDGANG',
    intercept:'KRYPTERT MELDING BRUTT: «Alle 47 bunkere forsegles 06:00 lokal tid. Ingen unntak. Prosjektleder godkjenner Fase 3.»',
    text:`<p>Du henter alt du kan fra skjermene. Prosjekt Solnedgang. Initialisert 2019. Finansiert av en koalisjon av åtte vestlige regjeringer. Solstormen er ikke falsk — den er ekte. Men overdrevet til det tifoldige for å drive befolkningene inn i pre-konstruerte kontrollsoner.</p>
<em>«Strålingen er reell, men ikke dødelig i åpent terreng. Dødelig bare over 200 timer med direkte eksponering. Bunkerne er kontrollfasiliteter for permanent reorganisering av samfunnsstrukturen.»</em>
<p>Du har alt du trenger. Vanen bremser ved et veikryss. Det er nå.</p>`,
    stats:{kunnskap:{d:+35,label:'KUNNSKAP'},mot:{d:+15,label:'MOT'}},
    items:['minnepenn','presseID'],
    choices:[
      {text:'Hopp ut nå. Du vet mer enn nok. Gå til journalistene.',target:'etter_flukt'},
      {text:'Sett USB-stikken i systemet og last ned alt du kan. Hopp ut etter.',target:'etter_flukt'},
    ]
  },

  etter_flukt:{
    shortName:'ETTER FLUKT',
    img:'etter_flukt',
    time:'13:30:00',rad:6,
    title:'FORLATT STASJON',
    text:`<p>Du slår skulderen mot asfalten og ruller tre meter inn i grøften. Vanen kjører rett forbi uten å bremse — de tror du er sikret inne, ikke ute. Du lar deg ligge et par sekunder og henter pust.</p>
<p>Femti meter fremme: en forlatt bensinstasjon. Lyset over pumpen blinker ustabilt. En pickup med motoren i gang og dørene åpne — som om eieren løp fra den midt i tankingen.</p>
<em>Over en gammel utendørs høyttaler på taket: «…til alle frie journalister: vi sender bevis fra Prosjekt Solnedgang live til server 7. Koordinater: 59.9°N 10.7°Ø. Kom nå.»</em>
<p>Koordinatene. Et kjent redaksjonsbygg i Oslo sentrum. Sirener i det fjerne — og de nærmer seg.</p>`,
    stats:{mot:{d:+12,label:'MOT'}},
    items:['adgangskort'],
    choices:[
      {text:'Stjel pickupen. Kjør mot redaksjonsbygget.',target:'nyhetshuset'},
      {text:'For risikabelt med bil. Løp inn i skogen til fots.',target:'skogens_inngang'},
      {text:'Koordinatene kan være en felle. Gjøm deg i bensinstasjonen.',target:'bensinstasjon_gjemt'},
    ]
  },

  bensinstasjon_gjemt:{
    shortName:'GJEMT',
    img:'bensinstasjon_gjemt',
    time:'12:00:00',rad:4,
    title:'LAGERET',
    text:`<p>I det bakre lageret finner du noe uventet: en åpen laptop koblet til et lokalt nettverk, og en eske med gasmasker stablet bak en vegg av tomme oljefat.</p>
<em>Laptopen viser en åpen chatkanal: «Er noen der? Vi er fire i sykehuskjelleren. Har en forsker med oss som vet alt. Trenger hjelp til å sende signal.»</em>
<p>Sykehuset er to kilometer nord. Du ser helikopterlys sirkulere over byens sentrum.</p>`,
    stats:{kunnskap:{d:+15,label:'KUNNSKAP'}},
    items:['gasmaske'],
    choices:[
      {text:'Svar på chatten. Finn forskeren på sykehuset.',target:'sykehuset'},
      {text:'Ta gasmasken og kjør til nyhetsbygget.',target:'nyhetshuset'},
    ]
  },

  bensinstasjon:{
    shortName:'BENSINSTASJON',
    img:'bensinstasjon',
    time:'16:00:00',rad:5,
    title:'FORLATT STASJON',
    text:`<p>En forlatt bensinstasjon. En bil med motoren i gang og dørene åpne. En hund som løper i sirkler på parkeringsplassen.</p>
<em>På passasjersetet: et VIP-adgangskort til nyhetsbygget, en plastmappe merket «TOPPHEMMELIG — KLARERING 7», og en håndskrevet lapp: «Ikke stol på bunkeren.»</em>
<p>Helikopterlyd i det fjerne, men ingen er her. Du har noen minutter.</p>`,
    stats:{mot:{d:+10,label:'MOT'}},
    items:['adgangskort','bunkerkart'],
    choices:[
      {text:'Stjel bilen og kjør til nyhetsbygget med bevisene.',target:'nyhetshuset'},
      {text:'Forlat veien. Gå til fots inn i skogen.',target:'skogens_inngang'},
      {text:'Sykehuset to kilometer nord hadde en merkelig radio-melding...',target:'sykehuset', requires:{statMin:{kunnskap:25}}},
      {text:'Apoteket ved siden av — det var noe i kjølerommet.',target:'apoteket'},
    ]
  },

  // ────────────────────────────────────────────────
  // RUTE B: HACKING
  // ────────────────────────────────────────────────
  hacking_start:{
    shortName:'HACKING',
    img:'hacking_start',
    time:'21:30:00',rad:0,
    title:'PROSJEKT SOLNEDGANG',
    intercept:'SERVER-LOGG 03:14: «Uautorisert tilgang forsøkt — Brukerprofil: UKJENT — IP: MASKERT — HANDLING: OVERVÅKE»',
    text:`<p>Du bruker tolv minutter på å bryte deg gjennom tre krypteringslag. En statlig server. Mappen er merket: <strong>PROSJEKT SOLNEDGANG — KLARERING NIVÅ 7 — INGEN KOPIERING.</strong></p>
<em>Det tar deg tretti sekunder å forstå hva du leser. Solstormen er ikke falsk — men den er voldsomt overdrevet. Strålingen er reell, men ikke dødelig utendørs. Dødelig bare over 200 timer. Bunkerne er kontrollfasiliteter.</em>
<p>Du laster ned alt du kan på en USB-stikk. Tre minutters tid. Så vises det på skjermen: <strong>«TILGANG OPPDAGET. POSISJON SPORET. TIDSESTIMAT: 8 MINUTTER.»</strong></p>
<p>Åtte minutter til de er her.</p>`,
    stats:{kunnskap:{d:+35,label:'KUNNSKAP'},mot:{d:+10,label:'MOT'},frykt:{d:+20,label:'FRYKT'}},
    items:['minnepenn','hacktool'],
    choices:[
      {text:'Kontakt hackeren som lekket databasen. Avtal møte.',target:'informant_møte'},
      {text:'Ring pressen direkte. Du har åtte minutter til de er her.',target:'presse_ring'},
      {text:'Slett sporene og løp. Gå mot T-banestasjonen.',target:'tbane_start'},
      {text:'Dypt inne i filene er det en koordinat. Sykehuset.',target:'sykehuset', requires:{statMin:{kunnskap:35}}},
      {text:'Ambassaden på Bygdøy allé — nøytral grunn, sikker sending.',target:'ambassaden', requires:{statMin:{kunnskap:40}}},
    ]
  },

  presse_ring:{
    shortName:'PRESSE-RING',
    img:'presse_ring',
    time:'21:00:00',rad:0,
    title:'JOURNALISTEN',
    text:`<p>Journalisten svarer på første ring. Stemmen er hes og klar — hun er allerede våken. <em>«Vi vet. Vi har visst i to dager. Men vi trenger bevis som kan stå i retten. Alt vi publiserer uten dem, brukes mot oss som desinformasjon.»</em></p>
<p>Du hører banking på din egen dør. Tre harde slag. Ingen sier noe. Fire slag til.</p>
<em>Hun sier lavt: «Kom til nyhetsbygget. Bruk baksideinngang. Presse-ID gjelder som pass. Ikke ta E18.»</em>`,
    stats:{kunnskap:{d:+15,label:'KUNNSKAP'},mot:{d:+20,label:'MOT'}},
    items:['presseID'],
    choices:[
      {text:'Smug deg ut bakdøren nå. Nyhetsbygget.',target:'nyhetshuset'},
      {text:'Gjennom vinduet og ned branntrappen. T-banen.',target:'tbane_start'},
    ]
  },

  informant_møte:{
    shortName:'INFORMANT',
    img:'informant_møte',
    time:'17:00:00',rad:3,
    title:'SMUGET',
    intercept:'AVLYTTET: «Informantens posisjon bekreftet. Send team.»',
    text:`<p>Et trangt smug ved nedre Grünerløkka. Mørkt og fuktig. En smal mann i hettegenser stopper deg med tre rappe bevegelser og presser noe hardt inn i hånden din.</p>
<em>«Alt er her. Navn. Kontoer. Ordre. Det er nok til å stoppe alt — men bare om det når riktig kanal.» Han hvisker det som om det er den viktigste setningen han noen gang har sagt.</em>
<p>Blendende hvite lys. Laserprikker danser over brystet hans. Over ditt. Uniformerte menn uten tegn eller ID.</p>
<p>Han skriker: <strong>«LØØØP!»</strong></p>`,
    stats:{frykt:{d:+28,label:'FRYKT'},mot:{d:+18,label:'MOT'},kunnskap:{d:+22,label:'KUNNSKAP'}},
    items:['minnepenn'],
    choices:[
      {text:'Spurt mot nyhetsbygget. Bevisene må ut.',target:'nyhetshuset'},
      {text:'Ned i det nærmeste kumlokket. Kloakken.',target:'kloakken'},
      {text:'Informanten nevnte en forsker — sykehuset.',target:'sykehuset', requires:{statMin:{kunnskap:50}}},
      {text:'«P4, garasjen ved Stortinget» — det siste han rakk å si. Løp dit.',target:'garasjen'},
    ]
  },

  // ────────────────────────────────────────────────
  // RUTE C: T-BANE
  // ────────────────────────────────────────────────
  tbane_start:{
    shortName:'T-BANE',
    img:'tbane_start',
    time:'22:00:00',rad:2,
    title:'UNDER BAKKEN',
    intercept:null,
    text:`<p>Tunnelens mørke er ikke stillhet — det er en annen type kaos. Du hører løping, hulking og merkelig stillhet et sted langt bak deg. Ekkoer fra gammel betong.</p>
<em>Langs nordveggen: en forlatt nødhjelps-koffert merket «SERUM TYPE B — STRÅLINGSVERN MIDLERTIDIG».</em>
<p>En rød lyktestråle leter systematisk gjennom tunnelen tjue meter unna. Noen gjennomsøker dette nettet etasje for etasje. De er grundige.</p>`,
    stats:{frykt:{d:+12,label:'FRYKT'},mot:{d:+6,label:'MOT'}},
    items:['serum'],
    choices:[
      {text:'Gå mot lykten. Kanskje det er overlevende som skjuler seg her.',target:'undergrunn_møte'},
      {text:'Gjøm deg dypere. Kloakksjaktene.',target:'kloakken'},
      {text:'Du så en nødutgang mot nord. Ta med serumet og løp.',target:'skogens_inngang'},
      {text:'Det er en forlatt politistasjon på denne linjen. Gå dit.',target:'politistasjon', requires:{statMin:{mot:40}}},
      {text:'Tre stasjoner ned er det noe på kartet merket KNS-2.',target:'tunnelens_dyp', requires:{statMin:{kunnskap:35}}},
    ]
  },

  politistasjon:{
    shortName:'POLITI',
    img:'politistasjon',
    time:'20:00:00',rad:3,
    title:'FORLATT POLITISTASJON',
    text:`<p>Stasjonsbygningen er tom. Dørene stod åpne, skjermene svarte. Men radionettet er fortsatt aktivt — en nødfrekvens blinker grønt på panelet.</p>
<em>På veggen: en kryptert melding på politinettet — «Alle enheter trekkes inn til sikringsoppdrag ved bunker. Stasjonene forlates. God vakt.»</em>
<p>Bordet med politiutstyr er halvtømt. Men i det låste beslagsrommet henger et sett med identifikasjonsdokumenter og en liten plastkasse med en rød etikett: <strong>EMP-LADNING — TAKTISK BRUK</strong>.</p>`,
    stats:{kunnskap:{d:+20,label:'KUNNSKAP'},mot:{d:+15,label:'MOT'}},
    items:['sprengkap','presseID'],
    choices:[
      {text:'Bruk radionettet. Søk kontakt med andre frie enheter.',target:'undergrunn_møte'},
      {text:'Ta EMP-ladningen og nødpapirene. Gå til sykehuset.',target:'sykehuset'},
      {text:'En sivil stemme bryter inn på politiradioen: «Nettverket samles i P4 ved Stortinget.» Gå dit.',target:'garasjen'},
    ]
  },

  undergrunn_møte:{
    shortName:'UNDERGRUNNEN',
    img:'undergrunn_møte',
    time:'19:00:00',rad:5,
    title:'MOTSTANDEN',
    text:`<p>De er fem. En prosessoperatør fra Equinor med oljetilsølte hender. En tidligere PST-offiser med et kjeveparti som sier at han ikke har sovet på lenge. En sykepleier som fortsatt har hansker på. To studenter med laptoper som aldri slutter å prosessere data.</p>
<em>Offiseren snakker lavt og presist: «Bunkerdørene forsegles om under fire timer. Vi kan bevise alt — men ingen tror på beviser de ikke kan se med egne øyne. Vi trenger enten et kringkastingssignal, eller vi kutter strøm til låsesystemene og åpner dem på vid gaffel.»</em>
<p>De ser på deg som om du er den siste brikken i et puslespill de har holdt på med hele natten. Klokken er 04:22.</p>`,
    stats:{mot:{d:+22,label:'MOT'},kunnskap:{d:+18,label:'KUNNSKAP'}},
    choices:[
      {text:'Ta ansvaret for strømsabotasjen. Gå til sentralen.',target:'stromsentralen'},
      {text:'Du har bevisene de trenger. Gå til nyhetsbygget.',target:'nyhetshuset', requires:{item:'minnepenn'}},
      {text:'Foreslå radiomasten i stedet for sprengstoff.',target:'skogens_inngang', requires:{statMin:{kunnskap:40}}},
      {text:'Sykehuset — det er noen der som kanskje kan hjelpe oss alle.',target:'sykehuset'},
    ]
  },

  // ────────────────────────────────────────────────
  // MIDTPUNKTER — SYKEHUSET
  // ────────────────────────────────────────────────
  sykehuset:{
    shortName:'SYKEHUSET',
    img:'sykehuset',
    time:'15:00:00',rad:4,
    title:'DET FORLATTE SYKEHUSET',
    intercept:'KRYPTERT SIGNAL OPPDAGET: «Dr. Elstad er i kjelleren. Frisk. Har alt vi trenger. Finn ham.»',
    text:`<p>Nødlys i limegrønt. Tomt akuttmottak. Rullestoler skjøvet til side. Et kateter som drypper i et rom ingen er i. Noe veldig voldsomt har skjedd her for en times tid siden.</p>
<em>Fra kjellertrappa: et svakt blått lys og lyden av en gammel skriver som printer uavbrutt.</em>
<p>Dr. Elstad er 63 år, tidligere WHO-forsker og nå tilsynelatende den eneste personen på jorda som har vært klar over Prosjekt Solnedgang siden 2021. Han har en harddisk full av bevismateriale — og han vet nøyaktig hva som skal til for å stoppe det.</p>`,
    stats:{kunnskap:{d:+30,label:'KUNNSKAP'},mot:{d:+15,label:'MOT'}},
    items:['minnepenn'],
    choices:[
      {text:'Ta med Dr. Elstad til nyhetsbygget — bevisene må sendes live.',target:'nyhetshuset'},
      {text:'Elstad kjenner til en militærbase i nærheten med satellittutstyr.',target:'militaerbase'},
      {text:'Han nevner en havn og en ubåt — en siste utvei om alt annet feiler.',target:'havnen'},
    ]
  },

  // ────────────────────────────────────────────────
  // MILITÆRBASE
  // ────────────────────────────────────────────────
  militaerbase:{
    shortName:'MILITÆRBASE',
    img:'militaerbase',
    time:'12:00:00',rad:6,
    title:'MILITÆRBASEN',
    intercept:'AVLYTTET RADIOSAMBAND: «Sektor 7 melder: sivil observert ved perimeteren. Sender team.»',
    text:`<p>Elstad guider deg gjennom en uoffisiell inngang bak et nedfalt gjerde. Basen er delvis operativ — halvparten av personellet er sendt til bunkerprosjektet. De som er igjen, virker desorienterte og usikre.</p>
<em>I kommunikasjonsbygget: et fullskala satellitt-uplink-system. I stand til å sende kryptert data til samtlige norske mobiltelefoner samtidig. En nasjonal varselbeskjed. Fra innsiden.</em>
<p>Vakten foran kontrollrommet ser på klokken. Han ser bort. Ser på deg. Han er ung og virker trett.</p>`,
    stats:{mot:{d:+20,label:'MOT'},frykt:{d:+22,label:'FRYKT'}},
    choices:[
      {text:'Gå rett mot kontrollrommet. Vakten er ung og usikker.',target:'kontrollrom'},
      {text:'Finn en annen inngang. Strømsabotasje er mer pålitelig.',target:'stromsentralen', requires:{item:'sprengkap'}},
      {text:'Spre Elstads data via baseens interne nett. Lavrisiko.',target:'base_intern', requires:{item:'hacktool'}},
    ]
  },

  base_intern:{
    shortName:'BASE-NETT',
    img:'base_intern',
    time:'10:00:00',rad:5,
    title:'INTERNT NETT',
    text:`<p>Du kobler hack-toolet inn i en nettverksplugg i en tom kantine. Elstad styrer dataoverføringen. Seks minutter. Alt går sømløst.</p>
<em>Men det er noe galt — interne nettverk er lukket. Dataene når basemannskapet, men ikke omverdenen. Ikke nok.</em>
<p>Du trenger en ekstern antenne. Enten kontrollrommet på taket — eller satellittmasten utenfor.</p>`,
    stats:{kunnskap:{d:+20,label:'KUNNSKAP'}},
    items:['radiokode'],
    choices:[
      {text:'Opp til kontrollrommet. Den eksterne antennen.',target:'kontrollrom'},
      {text:'Satellittmasten utenfor perimeteren.',target:'radiomasten'},
    ]
  },

  kontrollrom:{
    shortName:'KONTROLLROM',
    img:'kontrollrom',
    time:'08:00:00',rad:7,
    title:'KONTROLLROMMET',
    text:`<p>Rommet er dunkelt og fullt av blinkende skjermer. Du har koblet deg til. Elstad gir deg instruksjoner over headsettet.</p>
<em>Systemet gir tilgang til nødvarselsystemet for hele Norden. En enkelt melding kan nå 14 millioner telefoner innen 90 sekunder.</em>
<p>Basen vibrerer. Alarmen går. Noen har oppdaget deg. Dørene til kontrollrommet er ikke låsbare fra innsiden. Og du er 60 sekunder fra å trykke SEND.</p>`,
    stats:{frykt:{d:+30,label:'FRYKT'},mot:{d:+25,label:'MOT'}},
    choices:[
      {text:'Hold posisjonen. 60 sekunder er ingenting.',target:'slutt2'},
      {text:'Alarmen er for kraftig. Sprengkapselen kan kjøpe deg tid.',target:'kontrollrom_eps', requires:{item:'sprengkap'}},
      {text:'Du klarer det ikke alene. Trekk deg.',target:'slutt1'},
    ]
  },

  kontrollrom_eps:{
    shortName:'EMP-BOOST',
    img:'kontrollrom_eps',
    time:'07:00:00',rad:8,
    title:'SISTE 30 SEKUNDER',
    text:`<p>Du utløser sprengkapselen i korridoren utenfor. Et lynraskt elektromagnetisk blink smelter låssystemene og stanser de innkommende vaktene i spor. Tretti sekunder.</p>
<em>Elstad sier rolig, nesten stille: «Det er klart. Trykk.»</em>
<p>Meldingen er klar. 14 millioner telefoner. Bevisene. Videoene. Koordinatene til nødutgangene i alle bunkere. Alt.</p>`,
    stats:{mot:{d:+30,label:'MOT'}},
    choices:[
      {text:'TRYKK SEND.',target:'slutt2'},
    ]
  },

  // ────────────────────────────────────────────────
  // KLOAKKEN
  // ────────────────────────────────────────────────
  kloakken:{
    shortName:'KLOAKK',
    img:'kloakken',
    time:'15:00:00',rad:12,
    title:'KLOAKKLABYRINTEN',
    text:`<p>Kloakkvann til knærne. Lukten av betongrust, råte og noe svakt kjemisk — som gammel strålingsskjerming. Pusten din lager hvite tykke skyer i lommelyktas stråle.</p>
<em>Noen har vært her nylig. Spraymalt på veggen med selvlysende grønn maling: to piler. Én mot det ukjente — én mot en sirkel: «HAVN — 2 KM».</em>
<p>Geigertelleren i jakkelomma tikker jevnt fortere. Strålingsnivåene er merkbart høyere her nede. Uten gasmaske har du én time, kanskje to, før det begynner å gjøre skade.</p>`,
    stats:{rad:{d:+15,label:'STRÅLING'},frykt:{d:+12,label:'FRYKT'}},
    choices:[
      {text:'Følg de grønne pilene. Finn de andre.',target:'undergrunn_møte'},
      {text:'Havnen. 2 km. Det er raskeste vei ut.',target:'havnen', requires:{item:'gasmaske'}},
      {text:'Redd deg selv. Krabb ut av avløpsrøret mot villmarken.',target:'slutt3'},
      {text:'Du har bunkerkart — her er et hemmelig punkt.',target:'bunker_nod', requires:{item:'bunkerkart'}},
    ]
  },

  bunker_nod:{
    shortName:'BUNKER-ØY',
    img:'bunker_nod',
    time:'10:00:00',rad:6,
    title:'BUNKERNS NØDUTGANG',
    intercept:'HEMMELIG KART-NOTAT: «Nødutgang NE-7 er ikke forseglet. Vedlikeholdsfeil 2022. Aldri fikset.»',
    text:`<p>Kartet er ikke en vei inn — det er en vei ut. Nødutgangen NE-7, aldri forseglet etter et vedlikeholdsavvik i 2022. Du finner den bak en falsk betongvegg merket med en liten orange firkant i bunnen.</p>
<em>På innsiden av nødutgangen: en komplett kringkastingsrigg. Emergency Broadcast System Type 4. Koblet til alle norske TV- og radiokanaler — opprinnelig ment for evakueringsinstrukser fra myndighetene.</em>
<p>Det er tomt her inne. Alle ble sendt andre steder i kaoset. Du er alene med en sender ingen vet om.</p>`,
    stats:{kunnskap:{d:+35,label:'KUNNSKAP'},mot:{d:+25,label:'MOT'}},
    choices:[
      {text:'Kringkast på alle kanaler. Alt du vet. Nå.',target:'slutt_hemmelig'},
      {text:'Du trenger bevisene først. Gå ut og hent dem.',target:'undergrunn_møte'},
    ]
  },

  // ────────────────────────────────────────────────
  // HAVNEN
  // ────────────────────────────────────────────────
  havnen:{
    shortName:'HAVNEN',
    img:'havnen',
    time:'11:00:00',rad:8,
    title:'HAVNEN',
    text:`<p>Havnen er underlig tom og stille, bortsett fra bølgelyd og fjernlys fra en ankret oljeplattform-forsyningsbåt. Et kaiarbeiderrom med åpen dør. Kaffekanne fremdeles varm.</p>
<em>En håndskrevet melding på tavlen inne i rommet: «UBÅT KNM UREDD — KAIPLASS 7 — AVGÅR 06:00 UANSETT HVA.»</em>
<p>KNM Uredd er en norsk ubåt. Den er ikke registrert i noen offisiell base-oversikt du noen gang har sett. Kaiplass 7 er to hundre meter herfra.</p>`,
    stats:{kunnskap:{d:+20,label:'KUNNSKAP'},frykt:{d:+15,label:'FRYKT'}},
    items:['ubatkode'],
    choices:[
      {text:'Gå mot kaiplass 7. Finn ubåten.',target:'ubaten'},
      {text:'Havnens radio — send nødsignal til alle skip.',target:'havn_radio'},
      {text:'Fyrtårnet ved Oscarsborg — AM-sender som når en million mennesker.',target:'fyrtarnet', requires:{statMin:{mot:50}}},
    ]
  },

  havn_radio:{
    shortName:'HAVNE-RADIO',
    img:'havn_radio',
    time:'09:00:00',rad:6,
    title:'MARINE VHF',
    text:`<p>Havneradioen er aktiv. VHF kanal 16 — internasjonal nødfrekvens. Du sender meldingen på engelsk, norsk og improvisert tysk: fullt navn på alle involverte, full beskrivelse av Prosjekt Solnedgang.</p>
<em>Etter 40 sekunder: et svar på gebrokkent norsk med finsk aksent. «Vi hørte deg. Vi sender videre. Gå til internett via satellitt i 20 minutter.»</em>
<p>Det er noe. Men er det nok?</p>`,
    stats:{mot:{d:+25,label:'MOT'},kunnskap:{d:+10,label:'KUNNSKAP'}},
    choices:[
      {text:'Nok. Vent her. Vent og se.',target:'slutt3'},
      {text:'Ikke nok. Finn ubåten — de kan sende sterkere signal.',target:'ubaten'},
      {text:'Ikke nok. Nyhetsbygget. Nå.',target:'nyhetshuset'},
    ]
  },

  ubaten:{
    shortName:'UBÅTEN',
    img:'ubaten',
    time:'08:00:00',rad:5,
    title:'KNM UREDD',
    intercept:'NAVAL KRYPTERT: «KNM Uredd avgår 06:00 uansett ordre. Kaptein Lie nekter å forsegle passasjerene.»',
    text:`<p>Ubåten er kortere enn du forestilte deg. Kapteinen — en 58 år gammel kvinne med grå flette og et ansiktsuttrykk som forteller deg at hun ikke har sovet på to dager — møter deg på kaidekket.</p>
<em>«Jeg har sett ordrene. Jeg nekter å gjennomføre dem. Men jeg kan ikke alene stoppe hva som skjer på land. Hvis du har bevisene og koden fra havnekontoret, har jeg en satellittsender med global rekkevidde.»</em>
<p>Ubåten er det sikreste stedet i Norge akkurat nå. Men å gå om bord er en vei som ikke enkelt reverseres.</p>`,
    stats:{mot:{d:+30,label:'MOT'},kunnskap:{d:+15,label:'KUNNSKAP'}},
    choices:[
      {text:'Gå om bord. Bruk ubåtens satellittsender til å sende bevisene globalt.',target:'ubat_sender', requires:{item:'minnepenn',item2:'ubatkode'}},
      {text:'Kapteinen er en ressurs. Ta henne med til nyhetsbygget.',target:'nyhetshuset'},
    ]
  },

  ubat_sender:{
    shortName:'SENDER',
    img:'ubaten',
    time:'06:30:00',rad:3,
    title:'GLOBAL SENDING',
    text:`<p>Ubåtens kommunikasjonssystem rekker over hele kloden. Kapteinen setter deg opp direkte mot fem internasjonale pressebyråer, Interpol og tre uavhengige norske journalister på den krypterte listen.</p>
<em>Overføringen tar seks minutter. Minnepennen tømmes. Alt sendes.</em>
<p>Seks minutter. Du holder pusten. Kapteinen holder pusten. Ubåten skjelver svakt av sine egne systemer.</p>`,
    stats:{mot:{d:+20,label:'MOT'}},
    choices:[
      {text:'Vent på bekreftelse. Ikke beveg deg.',target:'slutt2'},
    ]
  },

  // ────────────────────────────────────────────────
  // SKOGEN / RADIOMASTEN
  // ────────────────────────────────────────────────
  skogens_inngang:{
    shortName:'SKOGEN',
    img:'skogens_inngang',
    time:'12:00:00',rad:5,
    title:'SKOGSTIEN',
    text:`<p>Skogen tar imot deg uten spørsmål. Tett granskog og fuktig mørke. Borte fra asfalt, lys og menneskemasser synker strålingsnivåene merkbart — her er det betong og metall som trekker til seg det meste.</p>
<p>To kilometer inn: en inngjerdet militær radiomast tegner seg mot himmelen, og en forlatt skogshytte med røyk fra pipa. <em>Noen er her inne.</em></p>`,
    stats:{rad:{d:-18,label:'STRÅLING REDUSERT'},mot:{d:+15,label:'MOT'}},
    choices:[
      {text:'Radiomasten. Snik deg inn og send sannheten.',target:'radiomasten'},
      {text:'Skogshytten. Hvem er inni?',target:'hytten'},
    ]
  },

  hytten:{
    shortName:'HYTTEN',
    img:'hytten',
    time:'10:00:00',rad:3,
    title:'HYTTEN I SKOGEN',
    text:`<p>En eldre mann med tykt skjegg og en bærbar satellittlaptop. Han ser ikke overrasket ut. <em>«Jeg ventet på noen. Visste at noen ville komme denne veien.»</em></p>
<p>Han er journalist. Pensjonert. Har fulgt Prosjekt Solnedgang siden 2020 uten å ha bevis nok til å publisere. Han har direkte linje til fem internasjonale redaksjoner. Han trenger bare én ting: bevis.</p>`,
    stats:{kunnskap:{d:+25,label:'KUNNSKAP'},mot:{d:+10,label:'MOT'}},
    items:['radiokode'],
    choices:[
      {text:'Del alt du har med ham. Han sender internasjonalt.',target:'slutt2', requires:{item:'minnepenn'}},
      {text:'Bruk hans radiokode til å kringkaste på nødfrekvensen.',target:'radiomasten'},
      {text:'Ingen bevis ennå — gå til radiomasten og kringkast uansett.',target:'radiomasten'},
    ]
  },

  radiomasten:{
    shortName:'RADIOMASTEN',
    img:'radiomasten',
    time:'05:00:00',rad:8,
    title:'NASJONAL NØDKANAL',
    intercept:'MILITÆR KRYPTERT: «Masten er kompromittert. Send to team. Klargjør for lockdown.»',
    text:`<p>Du er inne. Kontrollpanelet lyser opp som en cockpit. Utenfor: vaktene oppdager deg innen minuttet — du hørte radioen deres.</p>
<em>Skjermen: «NASJONAL NØDKANAL — KLAR TIL KRINGKASTING — KREVER AUTENTISERING ELLER MANUELL OVERSTYRING (90 SEK)»</em>
<p>Dørene er solide. Vaktene banker. Radiokoden sparer deg 90 sekunder. Uten den: det er 90 sekunder du kanskje ikke har.</p>`,
    stats:{frykt:{d:+28,label:'FRYKT'},mot:{d:+22,label:'MOT'}},
    choices:[
      {text:'Bruk radiokoden. Send nå — umiddelbart.',target:'slutt2', requires:{item:'radiokode'}},
      {text:'Aktiver manuell overstyring. 90 sekunder. Hold ut.',target:'radiomasten_hard'},
      {text:'Panikk. Gjøm deg under bordet.',target:'slutt1'},
    ]
  },

  radiomasten_hard:{
    shortName:'90 SEK',
    img:'radiomasten',
    time:'04:00:00',rad:10,
    title:'90 SEKUNDER',
    text:`<p>Fremdriftslinjen kryper. <strong>28%.</strong> En riflekolbe treffer ytterdøren med et smell som ryster veggen. <strong>55%.</strong> Et panel knekker. <strong>79%.</strong> Lyden av metall mot metall i korridoren.</p>
<em>En arm tvinger seg gjennom det sprukne panelet. Griper rundt skulderen din og drar. <strong>92%.</strong></em>
<p>Tre sekunder til fullstendig overføring. Og én arm som holder deg fast. Du kan ikke gjøre begge deler. <strong>Det er ett valg igjen.</strong></p>`,
    stats:{mot:{d:+35,label:'MOT'},frykt:{d:+30,label:'FRYKT'}},
    choices:[
      {text:'HOLD. IKKE SLIPP. KJØP DE SISTE SEKUNDENE.',target:'slutt2'},
      {text:'Gi etter. Overgi deg.',target:'slutt1'},
    ]
  },

  // ────────────────────────────────────────────────
  // NYHETSBYGGET
  // ────────────────────────────────────────────────
  nyhetshuset:{
    shortName:'NYHETER',
    img:'nyhetshuset',
    time:'09:00:00',rad:4,
    title:'NYHETSREDAKSJONEN',
    text:`<p>Du er inne. VIP-kortet åpner sideinngang B uten alarm. Bygningen er halvtom — de fleste ansatte dro hjem da nødvarselet kom. Men noen ble. Journalister med bærbare, ansiktsmasker og kaffe.</p>
<em>En ung journalist griper armen din: «Vi har ventet. Er det deg med bevisene? Vi har et direktesendingsvindu på seks minutter — om tjue minutter er det borte.»</em>
<p>Serverrommet i kjelleren. Sendestudio i andre etasje. To veier. Én sjanse.</p>`,
    stats:{mot:{d:+10,label:'MOT'}},
    choices:[
      {text:'Serverrommet. Last opp alt. Spred det digitalt.',target:'serverrommet'},
      {text:'Sendestudioet. Gå live på TV — nå.',target:'sendestudio', requires:{statMin:{mot:55}}},
      {text:'Begge — Dr. Elstad tar serveren, du tar studioet.',target:'sendestudio_double', requires:{item:'minnepenn',statMin:{mot:60}}},
      {text:'Overgi deg. Hender i været.',target:'slutt1'},
    ]
  },

  sendestudio:{
    shortName:'STUDIO',
    img:'sendestudio',
    time:'06:00:00',rad:2,
    title:'DIREKTE SENDING',
    text:`<p>Du sparker inn studiodøren. Nyhetsankeret spretter til side. Det røde kameraet blinker: <strong>PÅ LUFTA.</strong></p>
<em>Millioner av seere. Noen i bilen. Noen i kø foran bunkeren. Noen allerede innenfor — med sine telefoner.</em>
<p>Fingrene rister. Kameraet venter. Hele landet venter.</p>`,
    stats:{frykt:{d:+35,label:'FRYKT'},mot:{d:+30,label:'MOT'}},
    choices:[
      {text:'Snakk. Alt du vet. Ord for ord. Direkte til nasjonen.',target:'slutt2'},
      {text:'Fryser til. Vaktene er allerede i korridoren.',target:'slutt1'},
    ]
  },

  sendestudio_double:{
    shortName:'DOBBEL',
    img:'sendestudio_double',
    time:'05:30:00',rad:2,
    title:'SIMULTANAKSJON',
    text:`<p>Elstad løper ned. Du løper opp. Dere deler alt på to fronter i samme øyeblikk.</p>
<em>TV-sendingens røde lys blinker. Serveropplastingen bekreftes med en grønn pling på telefonen din.</em>
<p>Det digitale og det analoge. Samtidig. Det er ikke ett hull å plugge — det er to flammer å slukke.</p>`,
    stats:{mot:{d:+35,label:'MOT'},kunnskap:{d:+20,label:'KUNNSKAP'}},
    choices:[
      {text:'SEND BEGGE. Nå. Ingenting kan stoppe dette.',target:'slutt2'},
    ]
  },

  serverrommet:{
    shortName:'SERVER',
    img:'base_intern',
    time:'06:00:00',rad:5,
    title:'SERVERROMMET',
    text:`<p>Kjølerommet suser. Grønne lamper overalt. Du finner riktig rack. Kobler inn. Skjermen blinker: <strong>MANUELL OVERSTYRING PÅKREVD.</strong></p>
<em>Utenfor sager vaktene gjennom ståldøren. Gnistoransje elektriske buer. Lyden av metall mot metall.</em>
<p>VIP-kortet kan omgå ett krypteringslag. Minnepennen kan levere dataen. Du trenger begge.</p>`,
    stats:{mot:{d:+15,label:'MOT'}},
    choices:[
      {text:'Bruk kortet og pennen. Last opp ALT — nå.',target:'slutt2', requires:{item:'adgangskort',item2:'minnepenn'}},
      {text:'Bare pennen. Ta sjansen uten kortet.',target:'server_uten_kort', requires:{item:'minnepenn'}},
      {text:'Legg deg på gulvet. Det er over.',target:'slutt1'},
    ]
  },

  server_uten_kort:{
    shortName:'RISIKO',
    img:'server_uten_kort',
    time:'05:00:00',rad:6,
    title:'UTEN ADGANGSKORT',
    text:`<p>Du overstyrer krypteringen manuelt. Det tar to minutters tid du ikke egentlig har. Dørene holder på å gi.</p>
<em>Opplasting: 45%... 67%... 89%...</em>
<p>Vakten er gjennom sprekken i dørkarmen. Griper etter deg.</p>`,
    stats:{frykt:{d:+30,label:'FRYKT'},mot:{d:+25,label:'MOT'}},
    choices:[
      {text:'HOLD INNE. IKKE GI DEG NÅ.',target:'slutt2'},
      {text:'Det er over. Slipp.',target:'slutt1'},
    ]
  },

  // ────────────────────────────────────────────────
  // STRØMSENTRALEN
  // ────────────────────────────────────────────────
  stromsentralen:{
    shortName:'STRØM',
    img:'stromsentralen',
    time:'04:00:00',rad:10,
    title:'STRØMSENTRALEN',
    text:`<p>Dere stormer inn. Fire av dere. Tre politienheter i bakhold. Røde laserprikker over brystet ditt.</p>
<em>Hovedbryteren er 1,8 meter foran deg. Én ting skiller deg fra den: vilje.</em>
<p>Politioffiseren roper: «Legg dere ned! LEGG DEG NED!»</p>`,
    stats:{frykt:{d:+38,label:'FRYKT'},mot:{d:+28,label:'MOT'}},
    choices:[
      {text:'IGNORER ALT. KAST DEG MOT BRYTEREN.',target:'slutt2'},
      {text:'Sprengkapselen — EMP — kjøper et sekund.',target:'stromsentralen_eps', requires:{item:'sprengkap'}},
      {text:'Hendene opp. Overgi deg.',target:'slutt1'},
    ]
  },

  stromsentralen_eps:{
    shortName:'EMP-BRYTEREN',
    img:'kontrollrom_eps',
    time:'03:30:00',rad:10,
    title:'ELEKTROMAGNETISK PULS',
    text:`<p>Du løser ut kapselen. Et blendende hvitt blink. Alle lysene i rommet slukner i 1,4 sekunder. Laservåpnene slukner. Uniformene dimmer.</p>
<em>I det ene sekundet er du allerede i bevegelse.</em>
<p>Du er ved bryteren.</p>`,
    stats:{mot:{d:+40,label:'MOT'}},
    choices:[
      {text:'BRYT NED. BUNKERENE MISTER STRØM.',target:'slutt2'},
    ]
  },

  // ══════════════════════════════════════════════════
  // ── NYE SCENER — ACT 2/3 UTVIDELSE ──
  // ══════════════════════════════════════════════════

  checkpoint:{
    shortName:'KONTROLLPOST',
    img:'checkpoint',
    time:'17:00:00',rad:10,
    title:'VEIKONTROLLPOST',
    intercept:'RADIOSAMBAND AVLYTTET: «Kontrollpost Sierra rapporterer: sivil nekter å stoppe. Sender bil.»',
    text:`<p>En improvisert veisperring av betongblokker og piggtråd tvers over E18. Seks soldater uten gjenkjennelige merker. En sivil ID-skanner som lyser grønt og rødt på bilister foran deg.</p>
<em>En av soldatene plasserer hånden på taket av kjøretøyet ditt og møter blikket ditt gjennom vinduet: «Alle reiser til bunkeren må autoriseres. Stå i kø.»</em>
<p>Fra posisjonen din ser du en rød Volvo to biler foran bli eskortert ut til siden. Sjåføren protesterer. Ingen lytter. Du har sekunder til å bestemme deg.</p>`,
    stats:{frykt:{d:+28,label:'FRYKT'},rad:{d:+5,label:'STRÅLING'}},
    choices:[
      {text:'Bruk presse-ID. Krev pressefrihet og passasje.',target:'checkpoint_passert', requires:{item:'presseID'}},
      {text:'Snu rundt. Finn en gåsti gjennom skogen.',target:'skogens_inngang'},
      {text:'Overgi kjøretøyet og bli med til bunkeren. Se hva som skjer.',target:'bunker_ankomst'},
    ]
  },

  checkpoint_passert:{
    shortName:'PASSERT',
    img:'checkpoint',
    time:'15:30:00',rad:8,
    title:'GJENNOM LINJENE',
    text:`<p>Soldaten ser på kortet ditt. Ser på deg. To lange sekunder. Deretter vinker han deg gjennom uten å si et ord — men han noterer registreringsnummeret ditt på en liten blokk.</p>
<em>Du er gjennom. For nå.</em>
<p>Fra bilradioen: et svakt signal fra en piratfrekvens. En stemme du kjenner igjen — en journalist som jobbet for NRK frem til 2022, da han ble «frivillig» pensjonert. Han gir koordinater til et møtepunkt i Oslo sentrum.</p>`,
    stats:{mot:{d:+18,label:'MOT'},kunnskap:{d:+12,label:'KUNNSKAP'}},
    items:['radiokode'],
    choices:[
      {text:'Følg koordinatene. Journalisten vet noe.',target:'hemmelig_møte'},
      {text:'Rett til nyhetsbygget. Ingen avsporinger.',target:'nyhetshuset'},
    ]
  },

  bunker_ankomst:{
    shortName:'BUNKERDØREN',
    img:'bunker_ankomst',
    time:'14:00:00',rad:6,
    title:'INNGANGEN',
    intercept:'KLASSIFISERT — BUNKERADMIN: «Kapasitetsgrensen nådd. Sekundering: ingen avvikere. Portene stenger kl. 06:00. Underskrift: Prosjektleder Solnedgang»',
    text:`<p>Bunkerporten er gigantisk — en stålskive på tre meter med hydraulisk åpningsmekanisme. Køen av folk strekker seg tre kilometer. Mange kjenner på den truende frykten for at porten stenger før de kommer frem.</p>
<em>Men noe er galt: folk som kommer ut igjen fra innsiden, ser ikke lettet ut. De ser forvirret ut. Desorienterte.</em>
<p>En eldre kvinne griper armen din: «De tar telefonene. Alle telefonene. Inni der er man avskåret fra alt.»</p>`,
    stats:{frykt:{d:+22,label:'FRYKT'},kunnskap:{d:+25,label:'KUNNSKAP'}},
    choices:[
      {text:'Ikke gå inn. Forsvinn fra køen og finn en annen vei.',target:'skogens_inngang'},
      {text:'Gå inn og se selv. Du trenger bevis fra innsiden.',target:'bunker_innsiden'},
    ]
  },

  bunker_innsiden:{
    shortName:'INNI BUNKER',
    img:'bunker_nod',
    time:'12:00:00',rad:3,
    title:'BAK STÅLDØREN',
    text:`<p>Innsiden lukter betong og desinfeksjonsmiddel. Lange hvite ganger. Folk i like, grå drakter. Ingen snakker høyt. Vakter ved hvert kryss.</p>
<em>Du skjønner det umiddelbart: dette er ikke en bunker. Det er et fengsel uten sprinkler. En styrt karantene der ingen kommer ut igjen frivillig.</em>
<p>Det er ett faktum som er viktigere enn alle andre: du fant bunkerkart-enheten som lå ved inngangen — uoffisielt, ment for personell. Den viser nødutganger som <strong>ikke er på det offisielle kartet</strong>.</p>`,
    stats:{kunnskap:{d:+40,label:'KUNNSKAP'},frykt:{d:+20,label:'FRYKT'}},
    items:['bunkerkart'],
    choices:[
      {text:'Bruk nødutgangen NE-7. Forlat bunkeren og gå til nyhetsbygget.',target:'nyhetshuset'},
      {text:'Finn andre fanger og organiser en masseutgang.',target:'bunker_opprør'},
    ]
  },

  bunker_opprør:{
    shortName:'OPPRØRET',
    img:'bunker_opprør',
    time:'08:00:00',rad:4,
    title:'MASSEUTGANG',
    text:`<p>Du finner seks andre som tenker som deg. En tidligere advokat, en lege, to lærere og to unge menn med ingeniørbakgrunn. Ingen har gitt opp ennå.</p>
<em>Legen hvisker: «NE-7-utgangen leder ut i en tunnel som ender 400 meter nord for perimeteren. Hvis bunkerkartenheten er ekte, kan vi gå. Men vi trenger noen til å holde vakten opptatt.»</em>
<p>Syv mennesker. Én sjanse. Mørket er din beste alliert — bunkeren slukker lyset i fem minutter kl. 03:00 for å spare strøm.</p>`,
    stats:{mot:{d:+35,label:'MOT'},kunnskap:{d:+15,label:'KUNNSKAP'}},
    choices:[
      {text:'Kl. 03:00 — ALLE LØPER. Mot NE-7.',target:'slutt2', requires:{item:'bunkerkart'}},
      {text:'Bare du stikker av. Raskere og tryggere alene.',target:'slutt3'},
    ]
  },

  hemmelig_møte:{
    shortName:'MØTEPUNKT',
    img:'hemmelig_møte',
    time:'16:00:00',rad:5,
    title:'BAKGATEN',
    text:`<p>En forlatt bar i bakgaten bak Grønland torg. Vinduene tapet med avispapir. Elleve bærbare datamaskiner på vaklevorne bord. Journalisten — Kjetil, 56 år — tar deg i hånden som om han har ventet i årevis.</p>
<em>«Jeg har prøvd å publisere dette siden 2021. Ingen trodde meg. Nå tror alle meg — men nå er de alle redde for livet.»</em>
<p>Han har et fungerende direktesendings-oppsett. Nok båndbredde til å sende til fire internasjonale kanaler. Men det er kortvarig — nettforbindelsen vil bli kuttet innen en time.</p>`,
    stats:{kunnskap:{d:+30,label:'KUNNSKAP'},mot:{d:+20,label:'MOT'}},
    items:['presseID'],
    choices:[
      {text:'Send alt du har via hans oppsett — nå.',target:'slutt2', requires:{item:'minnepenn'}},
      {text:'Hans bevis alene er ikke nok. Dra til nyhetsbygget med ham.',target:'nyhetshuset'},
      {text:'Del det via hans satellittkanal — ingen trenger å vite hvem du er.',target:'slutt_hemmelig', requires:{item:'minnepenn',statMin:{kunnskap:65}}},
    ]
  },

  fyrtarnet:{
    shortName:'FYRTÅRNET',
    img:'fyrtarnet',
    time:'11:00:00',rad:8,
    title:'FYRTÅRNET',
    intercept:'SJØFART VHF CH16: «Alle fartøy: kystlinjen er stengt. Ingen sivil ferdsel tillatt. Avvik vil bli håndtert med makt.»',
    text:`<p>Fyrtårnet ved Oscarsborg er ikke bemannet lenger — men sendesystemet er fortsatt aktivt. VHF-radioen her rekker ut til alle skip og kystvaktsstasjoner i Oslofjorden, og derfra via reléstasjoner til Storbritannia.</p>
<em>En gammel logg på skrivebordet: «Frekvens 156.8 MHz — nødkanal — ingen kryptering — ingen filtrering.»</em>
<p>Du er fem minutter unna å nå en million mennesker. Men trappene skjelver — noen klatrer opp nedenfor deg.</p>`,
    stats:{frykt:{d:+25,label:'FRYKT'},rad:{d:+6,label:'STRÅLING'}},
    choices:[
      {text:'Send på nødkanalen. Nå — før de kommer opp.',target:'slutt2'},
      {text:'For risikabelt. Trekk deg via vinduet og ned langs tårnveggen.',target:'havnen'},
    ]
  },

  tunnelens_dyp:{
    shortName:'DYPET',
    img:'politistasjon',
    time:'17:00:00',rad:14,
    title:'TUNNELENS HJERTE',
    text:`<p>Tre kilometer inn i T-banenettet er det en underjordisk stasjon som ikke er på noe kart. En dør merket VEDLIKEHOLD — men bak den: ren betong, brede korridorer og belysning som ikke er slukket.</p>
<em>Et metallskilt: «SIVILT KRISESENTER — OSLO KNS-2 — KAPASITET: 12 000 — BEREDSKAP: AKTIV»</em>
<p>Dette er det andre bunkersystemet. Det offisielle, ikke-klassifiserte. Ingen har blitt fortalt om det — fordi myndighetene ønsket at alle skulle samles i de klassifiserte. Kontroll krever konsentrasjon.</p>`,
    stats:{kunnskap:{d:+45,label:'KUNNSKAP'},rad:{d:+8,label:'STRÅLING'}},
    choices:[
      {text:'Hent folk fra den lange køen til det offisielle systemet hit.',target:'slutt2', requires:{statMin:{mot:60}}},
      {text:'Bruk bunkerens kommunikasjonssystem til å kringkaste sannheten.',target:'slutt2'},
      {text:'Du er alene og strålingen er for høy. Løp ut.',target:'skogens_inngang'},
    ]
  },

  apoteket:{
    shortName:'APOTEKET',
    img:'apoteket',
    time:'20:00:00',rad:15,
    title:'PLYNDRET APOTEK',
    text:`<p>Vinduet er slått inn. Halvparten av hyllene er tømt, men de visste ikke hva de så etter. Bak skranken, i kjølerommet: forseglet kasse merket <strong>«STRÅLINGSVERN — TIL MEDISINSK PERSONELL»</strong>. Inneholder tre ampuller Serum Type A — sterkere variant enn B.</p>
<em>Et grønt lys blinker fra en batteri-TV bak disken. Et nyhetsanker leser opp, likblek: «...Norsk meteorologisk institutt nekter å kommentere ryktene om at strålingsdosene er overvurdert med faktor ti...»</em>
<p>Ti ganger overdrevet. Hvis det er sant, er solstormen farlig — men ikke dødelig. I dager, ikke timer.</p>`,
    stats:{kunnskap:{d:+35,label:'KUNNSKAP'},rad:{d:-25,label:'STRÅLING BEHANDLET'}},
    items:['serum'],
    choices:[
      {text:'Dette endrer alt. Gå til radiomasten og kringkast denne nyheten.',target:'radiomasten'},
      {text:'Overdrivelsen er selve beviset. Gå til nyhetsbygget med dette.',target:'nyhetshuset'},
      {text:'Å behandle strålingen er det viktigste nå. Gå til skogen og hvil.',target:'skogens_inngang'},
    ]
  },

  ambassaden:{
    shortName:'AMBASSADEN',
    img:'ambassaden',
    time:'13:00:00',rad:4,
    title:'SVEITSISK AMBASSADE',
    intercept:'DIPLOMATISK KRYPTERT — BERN: «Oslo-stasjonen bekrefter: Prosjekt Solnedgang involverer ikke sveitsiske interesser. Vi er nøytrale. Tilbyr beskyttelse til whistleblowere. — Ambassadør Frei»',
    text:`<p>Ambassadebygget på Bygdøy allé er den eneste bygningen i Oslo med lys i alle vinduene. Et sveitsisk flagg henger rolig i stille luft. En diplomat i 50-årsalderen åpner porten og ser på deg med et blikk som sier: <em>«Jeg ventet på deg.»</em></p>
<p>Ambassaden er nøytral grunn. Her kan du ikke arresteres. Her finnes en sikker kommunikasjonslinje direkte til internasjonale medier og FN-etater.</p>`,
    stats:{mot:{d:+25,label:'MOT'},kunnskap:{d:+15,label:'KUNNSKAP'}},
    choices:[
      {text:'Overfør alt via ambassadens sikre linje. Be dem spre det internasjonalt.',target:'slutt2', requires:{item:'minnepenn'}},
      {text:'Be om diplomatisk eskorte til nyhetsbygget — bevisene trenger norsk publikum.',target:'nyhetshuset'},
      {text:'Be ambassaden huse deg mens du koordinerer med motstanden.',target:'undergrunn_møte'},
    ]
  },

  garasjen:{
    shortName:'GARASJEN',
    img:'garasjen',
    time:'18:00:00',rad:5,
    title:'PARKERINGSGARASJEN',
    text:`<p>Underetasje P4 i et parkeringshus ved Stortinget. Motoren på en hvit furgon tikker ned. En ung mann sitter på baklemmen og spiser en smeltet sjokoladebit.</p>
<em>Han ser opp: «Er du fra nettverket? Vi har ventet siden 04:30. Vi har Elstads kontaktliste, tre modifiserte droner og en mobilsender som kan nå 300 meters radius.»</em>
<p>En improvisert operasjonsbase. Amatørmessig, men desperat og ekte. De trodde på sannheten lenge nok til å forberede seg på å kjempe for den.</p>`,
    stats:{mot:{d:+20,label:'MOT'},kunnskap:{d:+18,label:'KUNNSKAP'}},
    items:['hacktool'],
    choices:[
      {text:'Send dronene med minnepennen over bunkerinnfartene. Spred varselet.',target:'slutt2', requires:{item:'minnepenn'}},
      {text:'Bruk mobilsenderen og koordiner med undergrunnsnettverket.',target:'undergrunn_møte'},
      {text:'Dra til sykehuset med Elstads kontaktliste.',target:'sykehuset'},
    ]
  },

  trikken:{
    shortName:'TRIKKEN',
    img:'trikken',
    time:'21:00:00',rad:6,
    title:'DEN FORLATTE TRIKKEN',
    intercept:'AM-SIGNAL FANGET — 612 kHz: «...til alle som hører dette: elektrisiteten er ennå ikke kuttet. Dere har et vindu. Bruk det.»',
    text:`<p>En gammel trikk står stille på skinnene ved Nationaltheatret. Dørene åpne. Motoren av. Men inni: sju mennesker som valgte den tredje muligheten — verken bunker eller flukt. Bare her.</p>
<em>En eldre ingeniørpensjonist har koblet opp et gammeldags AM-radiosystem via trikkens strømskinne. Han sier rolig: «Den når alle bilradioer i en radius på ti kilometer. Gammel teknologi. Ingen kan blokkere den raskt nok.»</em>
<p>Det er noe uventet beroligende med dette rommet. Noen mennesker som bare nekter å la seg styre av frykt.</p>`,
    stats:{mot:{d:+28,label:'MOT'},frykt:{d:-15,label:'FRYKT REDUSERT'}},
    choices:[
      {text:'Send AM-kringkasting. Sannheten på alle bilradioer.',target:'slutt2', requires:{item:'radiokode'}},
      {text:'Bli her en time og hvil. Noe er viktigere enn å haste.',target:'trikken_hvil'},
      {text:'Ta ingeniøren med til radiomasten. Han vet hva han gjør.',target:'radiomasten'},
    ]
  },

  trikken_hvil:{
    shortName:'HVILEN',
    img:'trikken',
    time:'19:30:00',rad:4,
    title:'ET ØYEBLIKK',
    text:`<p>Du sover i 47 minutter. Det er det. 47 minutter med virkelig søvn i et kaos-fylt univers. Noen dekker deg med en jakke. Noen holder vakt.</p>
<em>Når du våkner, er ingeniøren ferdig med oppkoblingen. Han plasserer mikrofonen foran deg og sier stille: «Tre millioner bilradioer. De er dine. Si det du vet.»</em>
<p>Du er klar. For første gang hele natten: faktisk klar.</p>`,
    stats:{mot:{d:+35,label:'MOT'},frykt:{d:-30,label:'FRYKT REDUSERT'},rad:{d:-8,label:'HVILE'}},
    choices:[
      {text:'SEND. Fortell Norge sannheten — ord for ord.',target:'slutt2'},
    ]
  },

  // ══════════════════════════════════════════════════
  // ── ENDINGS ──
  // ══════════════════════════════════════════════════

  slutt_rad:{
    shortName:'STRÅLING',
    img:'slutt_rad',
    time:'00:00:00',rad:0,
    title:'STRÅLINGSDOSE',
    ending:'rad',
    endingLabel:'SLUTT 5 — STRÅLINGENS OFFER',
    endingDesc:'Strålingsdosen nådde 100. Du overlevde ikke.',
    text:`<p>Du merker det gradvis. Kvalmen er den første. Deretter synet — en merkelig rødoransje glød rundt alle kanter. Så hendene.</p>
<em>Du visste at serumet hadde grenser. Du ventet for lenge i åpent terreng. Det er ikke en dramatisk slutt — bare en langsom, uunngåelig slukning.</em>
<p>Sannheten du bar med deg, dør med deg. Bunkerdørene forsegles. Ingen vet hva du vet. Men kanskje — kanskje noen andre tar den samme veien etter deg.</p>`,
    choices:[]
  },

  slutt1:{
    shortName:'FANGET',
    img:'slutt1',
    time:'00:00:00',rad:0,
    title:'FASE TO',
    ending:'bad',
    endingLabel:'SLUTT 1 — SYSTEMETS FANGE',
    endingDesc:'Du ga opp, stolte på feil mennesker, eller handlet for seint.',
    text:`<p>Klokken tikker til null. Ingen varmebølge. Ingen katastrofe. En stillhet som trekker ut i minutter, timer — du vet ikke lenger.</p>
<p>Noe stikker i nakken. Raskt, presist, fra noe du ikke så. Verden dimmer som et TV-apparat som mister signalet. Du våkner fastspent til en metallstol. Hvite vegger uten vinduer. Intet ur. Ingen lyd bortsett fra klimaanlegget.</p>
<em>En stemme fra et sted du ikke kan lokalisere: «Subjekt 4471 sikret og registrert. Fase To initieres. Permanent observasjonskategori A.»</em>
<p>Du visste noe ingen andre visste. Men du handlet for sent, stolte feil, eller slapp taket i det avgjørende øyeblikket. Nå er du et datapunkt. Prosjekt Solnedgang fortsetter med deg som en del av det.</p>`,
    choices:[]
  },

  slutt2:{
    shortName:'HELTEN',
    img:'slutt2',
    time:'00:00:00',rad:0,
    title:'AVSLØRT',
    ending:'good',
    endingLabel:'SLUTT 2 — BYENS HELT',
    endingDesc:'Du ofret alt og holdt ut til siste sekund.',
    intercept:'SISTE AVLYTTEDE MELDING — PROSJEKTLEDER: «Det er over. Trekk alle team ut. Prosjekt Solnedgang er kompromittert. Gjenta: kompromittert.»',
    text:`<p>Signalet sprer seg. Innen tre minutter er det på alle radiokanaler og i alle norske telefoner. Innen seks er bunkerdørene i teknisk trøbbel — låssystemene kjenner ikke koden lenger. Innen ti minutter er tre av dem åpne på vidt gap.</p>
<p>Folkemassene snur sin kollektive panikk mot en annen retning. Mot bunkerdørene. Mot sannheten. Mot menneskene som planla dette. Innen soloppgang er seks prosjektledere pågrepet etter ordre fra fire uavhengige internasjonale domstoler.</p>
<em>«En ukjent person — anslagsvis alene, sier en kilde i PST — handlet i en smal tidsluke og reddet 50 000 mennesker fra permanent internering.»</em>
<p>De fant deg aldri. Du forsvant rolig inn i den første lyse morgenen på lenge. Ingen vet hvem du er. Det er mer enn nok.</p>`,
    choices:[]
  },

  slutt3:{
    shortName:'ALENE',
    img:'slutt3',
    time:'00:00:00',rad:0,
    title:'HORISONTEN',
    ending:'solo',
    endingLabel:'SLUTT 3 — DEN ENSOMME OVERLEVENDE',
    endingDesc:'Du overlevde. Men til hvilken pris?',
    text:`<p>Du er fri. Frisk luft. Graner og taushet. Ingen solstorm treffer deg. Du hadde rett om alt.</p>
<p>Men reiseradioen din plukker opp en nyhetssending som aldri slutter: lyder av massive ståldører. Reportere som gråter. Titusenvis forseglet inne for godt.</p>
<em>Du visste. Du hadde muligheten. Du valgte deg selv.</em>
<p>Det er ikke straff — det er bare konsekvens. Du lever med frisk luft og det stilleste av alle skrik inni deg. For alltid.</p>`,
    choices:[]
  },

  slutt_hemmelig:{
    shortName:'SIGNAL X',
    img:'slutt_hemmelig',
    time:'00:00:00',rad:0,
    title:'SIGNAL X',
    ending:'secret',
    endingLabel:'SKJULT SLUTT — SIGNAL X',
    endingDesc:'Du fant veien ingen andre fant. Du tok kontroll over alt.',
    text:`<p>Du sender ikke til én kanal. Du overtar alle 47 norske kringkastere samtidig. Og gjennom det statlige nødnettet når signalet mobiltelefoner i Sverige, Danmark og Finland innen ni minutter.</p>
<em>Dokumenter. Videoer. Lydopptak. Regjeringens interne kommunikasjon. Satellittbilder av bunkernes konstruksjon. Alt — til alle — uten filter.</em>
<p>Innen elleve minutter trakk statsministeren seg. Prosjekt Solnedgang ble bekreftet av tre uavhengige departementer som presset hverandre. Bunkerdørene åpnet seg.</p>
<p>Du ble aldri funnet. Signal X ble et symbol — et anonymt navn på alle som nekter å la systemet vinne.</p>
<p>Men det er bare du som vet at det var ett menneske. Alene. I mørket. Med skjelvende fingre over en knapp.</p>`,
    choices:[]
  },
};
