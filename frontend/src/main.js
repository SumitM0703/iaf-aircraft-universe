import "./aircraft3d.js";

const API_URL =  "https://iaf-aircraft-universe.onrender.com/api/chat";
const QUIZ_API = "https://iaf-aircraft-universe.onrender.com/api/quiz";

// ================= AIRCRAFT DATA =================

const aircraft = [
  {
    id: "rafale", name: "Dassault Rafale", category: "Fighter",
    status: "In service", role: "Multirole combat aircraft",
    manufacturer: "Dassault Aviation", origin: "France",
    engine: "2 × Safran M88 turbofans", crew: "1 or 2",
    speed: "Approx. Mach 1.8",
    ceiling: "Approx. 50,000 ft",
    range: "Approx. 3,700 km (ferry range)",
    avionics: "RBE2 AESA radar; integrated electronic warfare suite",
    refuelling: "Air-to-air refuelling capable",
    strength: "Multirole capability and advanced sensor integration",
    image: "/images/rafale.jpg",
    description: "A twin-engine multirole fighter designed for air defence, interception and precision strike missions.",
    facts: ["Uses a delta wing and close-coupled canards.", "Designed for multiple mission types.", "India operates single-seat and two-seat variants."],
    systems: {
      "Delta wing": "The triangular wing contributes to lift and high-speed performance.",
      "Canards": "Forward control surfaces that help manage pitch.",
      "Engines": "Two turbofan engines generate thrust.",
      "Cockpit": "Flight displays and mission controls help the pilot operate the aircraft."
    }
  },
  {
    id: "su30", name: "Sukhoi Su-30MKI", category: "Fighter",
    status: "In service", role: "Air superiority / multirole",
    manufacturer: "Sukhoi / HAL", origin: "Russia / India",
    engine: "2 × AL-31FP series turbofans", crew: "2",
    speed: "Approx. Mach 2",
ceiling: "Approx. 56,800 ft",
range: "Approx. 3,000 km (ferry range)",
avionics: "Radar and avionics vary by aircraft upgrade and configuration",
refuelling: "Air-to-air refuelling capable",
strength: "Long endurance, twin-engine design and high manoeuvrability",
    image: "/images/su30mki.jpg",
    description: "A long-range, twin-engine fighter developed for India's requirements.",
    facts: ["Has thrust-vectoring capability.", "Has two crew positions.", "HAL participates in its licensed production in India."],
    systems: {
      "Canards": "Forward aerodynamic control surfaces.",
      "Twin engines": "Generate thrust for flight and manoeuvring.",
      "Cockpit": "Two crew members share flying and mission duties.",
      "Radar": "Detects and tracks targets; capability depends on configuration."
    }
  },
  {
    id: "tejas", name: "HAL Tejas", category: "Fighter",
    status: "In service; variants differ", role: "Light multirole fighter",
    manufacturer: "Hindustan Aeronautics Limited", origin: "India",
    engine: "Single turbofan; variant dependent", crew: "1 or 2",
    image: "/images/tejas.jpg",
    description: "An Indian-developed lightweight combat aircraft designed for air defence and multirole operations.",
    facts: ["Developed in India.", "Uses a tailless compound-delta wing.", "Has single-seat and trainer variants."],
    systems: {
      "Composite structures": "Composite materials can reduce structural weight.",
      "Delta wing": "Provides the aircraft's aerodynamic layout.",
      "Flight controls": "Fly-by-wire systems assist aircraft control.",
      "Cockpit": "Modern displays provide flight and mission information."
    }
  },
  
{
  id: "mirage2000",
  name: "Dassault Mirage 2000",
  category: "Fighter",
  status: "In service",
  role: "Multirole fighter",
  manufacturer: "Dassault Aviation",
  origin: "France",
  engine: "Single SNECMA M53-P2 turbofan",
  crew: "1 or 2",
  image: "/images/mirage2000.jpg",
  description: "A delta-wing fighter operated by the Indian Air Force for air defence and precision strike missions.",
  facts: [
    "Features a delta-wing design.",
    "Capable of supersonic flight.",
    "Indian aircraft have received avionics and weapons upgrades."
  ],
  systems: {
    "Delta wing": "Provides the aircraft with its distinctive aerodynamic configuration.",
    "Flight controls": "Digital flight-control systems assist aircraft handling.",
    "Radar": "Supports target detection and interception.",
    "Cockpit": "Displays flight, navigation and mission information."
  }
},

  {
    id: "mig29", name: "MiG-29UPG", category: "Fighter",
    status: "In service; fleet status can change", role: "Air defence / multirole fighter",
    manufacturer: "Mikoyan", origin: "Russia / Soviet Union",
    engine: "2 × RD-33 series turbofans", crew: "1",
    image: "/images/mig29.jpg",
    description: "An upgraded fighter used for air defence and other combat missions.",
    facts: ["Twin-engine fighter design.", "UPG denotes an upgraded configuration.", "Designed for demanding air combat roles."],
    systems: {
      "Air intakes": "Direct incoming air to the engines.",
      "Wings": "Generate lift and support manoeuvring.",
      "Engines": "Two turbofans generate thrust.",
      "Cockpit": "Provides controls and flight information."
    }
  },
  {
    id: "jaguar", name: "SEPECAT Jaguar", category: "Fighter",
    status: "In service; fleet status can change", role: "Strike aircraft",
    manufacturer: "SEPECAT", origin: "United Kingdom / France",
    engine: "2 × Rolls-Royce Turbomeca Adour", crew: "1 or 2",
    image: "/images/jaguar.jpg",
    description: "A twin-engine aircraft developed for strike missions, including low-level attack roles.",
    facts: ["Developed through British-French cooperation.", "Associated with strike missions.", "Operated in single-seat and trainer versions."],
    systems: {
      "Wings": "Provide lift and support manoeuvring.",
      "Twin engines": "Provide thrust.",
      "Cockpit": "Houses flight and mission controls.",
      "Landing gear": "Supports takeoff and landing."
    }
  },
  {
    id: "hawk", name: "BAE Systems Hawk", category: "Trainer",
    status: "In service; fleet status can change", role: "Advanced jet trainer",
    manufacturer: "BAE Systems / HAL", origin: "United Kingdom / India",
    engine: "Single Rolls-Royce Adour turbofan", crew: "Usually 2",
    image: "/images/hawk.jpg",
    description: "An advanced jet trainer used to prepare pilots for high-performance jet operations.",
    facts: ["Supports advanced flying instruction.", "Trainer versions have tandem seating.", "Helps pilots progress to operational jets."],
    systems: {
      "Tandem cockpit": "Instructor and trainee sit one behind the other.",
      "Engine": "A single turbofan provides thrust.",
      "Flight instruments": "Support training and monitoring.",
      "Control surfaces": "Help the aircraft change direction."
    }
  },
  {
    id: "mig21", name: "MiG-21 Bison", category: "Historical",
    status: "Retired from IAF service in 2025", role: "Historical interceptor / fighter",
    manufacturer: "Mikoyan", origin: "Soviet Union",
    engine: "Single Tumansky R-25 series turbojet", crew: "1",
    image: "/images/mig21.jpg",
    description: "A historically significant supersonic fighter that served India for decades before retirement.",
    facts: ["One of India's most recognisable historical fighters.", "Originated in the Soviet Union.", "The IAF retired its MiG-21 fleet in September 2025."],
    systems: {
      "Delta wing": "Supports high-speed flight.",
      "Intake": "Supplies air to the engine.",
      "Turbojet": "Produces thrust by accelerating exhaust gases.",
      "Cockpit": "Contains pilot controls and instruments."
    }
  },
  {
    id: "c17", name: "Boeing C-17 Globemaster III", category: "Transport",
    status: "In service; fleet status can change", role: "Heavy strategic airlift",
    manufacturer: "Boeing", origin: "United States",
    engine: "4 × Pratt & Whitney F117 turbofans", crew: "Normally 3",
    image: "/images/C17globemaster.jpg",
    description: "A heavy transport aircraft used for strategic airlift, equipment movement and humanitarian assistance.",
    facts: ["Has four turbofan engines.", "Carries large cargo loads.", "Supports long-distance transport and relief operations."],
    systems: {
      "Cargo hold": "Carries equipment, vehicles and personnel.",
      "Four engines": "Provide thrust for heavy transport.",
      "Rear ramp": "Supports cargo loading and unloading.",
      "Landing gear": "Supports ground handling and landing."
    }
  },
  {
    id: "c130j", name: "C-130J Super Hercules", category: "Transport",
    status: "In service; fleet status can change", role: "Tactical transport",
    manufacturer: "Lockheed Martin", origin: "United States",
    engine: "4 × Rolls-Royce AE 2100D3 turboprops", crew: "Typically 3",
    image:  "/images/c130j.jpg",
    description: "A tactical transport aircraft designed to carry personnel and cargo for military and relief tasks.",
    facts: ["Uses four turboprop engines.", "Designed for tactical airlift.", "Supports humanitarian assistance and evacuation."],
    systems: {
      "Turboprop engines": "Drive propellers to generate thrust.",
      "Cargo bay": "Carries personnel and supplies.",
      "Loading ramp": "Supports cargo operations.",
      "Flight deck": "Houses the pilots' controls and displays."
    }
  },
  {
    id: "c295", name: "Airbus C-295", category: "Transport",
    status: "Induction and fleet status may change", role: "Tactical transport",
    manufacturer: "Airbus", origin: "Spain / India",
    engine: "2 × Pratt & Whitney Canada PW127G turboprops", crew: "Mission dependent",
    image: "/images/c295.jpg",
    description: "A twin-engine tactical transport aircraft intended for personnel, cargo and support duties.",
    facts: ["Uses two turboprop engines.", "Designed for tactical transport.", "India has a C-295 manufacturing programme."],
    systems: {
      "Turboprop engines": "Use turbines to drive propellers.",
      "Cargo cabin": "Carries people and equipment.",
      "Avionics": "Provide navigation and flight information.",
      "Landing gear": "Supports ground operations."
    }
  },
  {
    id: "dornier", name: "Dornier 228", category: "Transport",
    status: "In service; fleet status can change", role: "Utility / light transport",
    manufacturer: "Dornier / HAL", origin: "Germany / India",
    engine: "2 × Honeywell TPE331 turboprops", crew: "Mission dependent",
    image: "/images/Dornier.jpeg",
    description: "A light utility aircraft used for transport, liaison and other support duties.",
    facts: ["Twin-engine turboprop design.", "Suitable for various utility roles.", "The aircraft family has been produced in India."],
    systems: {
      "Propellers": "Generate thrust using turboprop engines.",
      "Cabin": "Carries passengers or equipment.",
      "Cockpit": "Provides navigation and flight controls.",
      "Landing gear": "Supports takeoff and landing."
    }
  },
  {
    id: "apache", name: "AH-64E Apache", category: "Helicopter",
    status: "In service; fleet status can change", role: "Attack helicopter",
    manufacturer: "Boeing", origin: "United States",
    engine: "2 × General Electric T700 turboshafts", crew: "2",
    image: "/images/apache.jpg",
    description: "An attack helicopter designed for armed reconnaissance and battlefield support.",
    facts: ["Two crew members sit in tandem.", "Uses two turboshaft engines.", "Designed for day and night operations."],
    systems: {
      "Main rotor": "Generates lift and supports flight control.",
      "Tandem cockpit": "Pilot and co-pilot/gunner sit one behind the other.",
      "Turboshaft engines": "Provide power to the rotor system.",
      "Sensors": "Support observation and target detection."
    }
  },
  {
    id: "chinook", name: "CH-47F Chinook", category: "Helicopter",
    status: "In service; fleet status can change", role: "Heavy-lift helicopter",
    manufacturer: "Boeing", origin: "United States",
    engine: "2 × Honeywell T55 turboshafts", crew: "Typically 3",
    image: "/images/chinook.jpg",
    description: "A heavy-lift helicopter designed to carry cargo, personnel and equipment.",
    facts: ["Uses front and rear rotors.", "Does not need a conventional tail rotor.", "Supports logistics and humanitarian relief."],
    systems: {
      "Tandem rotors": "Two large rotors generate lift and balance torque.",
      "Cargo cabin": "Carries equipment and personnel.",
      "Turboshaft engines": "Power the rotor systems.",
      "Hook systems": "Some configurations support external cargo lifting."
    }
  },
  {
    id: "mi17", name: "Mi-17 / Mi-17V-5", category: "Helicopter",
    status: "In service; fleet status can change", role: "Utility / transport helicopter",
    manufacturer: "Mil", origin: "Soviet Union / Russia",
    engine: "2 × Klimov TV3-117 family turboshafts on relevant variants",
    crew: "Mission dependent", image: "/images/m17.jpg",
    description: "A medium transport helicopter family used for personnel, logistics and support missions.",
    facts: ["Uses a main rotor and tail rotor.", "Supports transport and relief missions.", "Specifications depend on variant."],
    systems: {
      "Main rotor": "Generates lift and helps control flight.",
      "Tail rotor": "Counteracts main-rotor torque on conventional versions.",
      "Cabin": "Carries personnel and cargo.",
      "Turboshaft engines": "Provide power for the rotor system."
    }
  },
  {
    id: "dhruv", name: "HAL Dhruv (ALH)", category: "Helicopter",
    status: "In service; variants differ", role: "Utility helicopter",
    manufacturer: "Hindustan Aeronautics Limited", origin: "India",
    engine: "Two turboshaft engines; version dependent",
    crew: "Mission dependent", image: "/images/haldhruv.jpg",
    description: "An Indian-developed Advanced Light Helicopter family designed for utility and support operations.",
    facts: ["Designed and manufactured in India.", "Available in different configurations.", "Can support transport and utility duties."],
    systems: {
      "Main rotor": "Generates lift.",
      "Tail rotor": "Provides anti-torque control on conventional configurations.",
      "Cabin": "Supports transport and mission equipment.",
      "Engine system": "Supplies power to the rotor transmission."
    }
  },
  {
    id: "chetak", name: "Chetak", category: "Helicopter",
    status: "In service; fleet status can change", role: "Light utility helicopter",
    manufacturer: "HAL production of the Alouette III family", origin: "France / India",
    engine: "Single Turbomeca Artouste series turboshaft",
    crew: "Mission dependent", image: "/images/chetak.jpg",
    description: "A light utility helicopter used for a range of transport and support duties.",
    facts: ["Based on the Alouette III design.", "Has a main rotor and tail rotor.", "Used in utility and support roles."],
    systems: {
      "Main rotor": "Provides lift.",
      "Tail rotor": "Counteracts torque and assists directional control.",
      "Cabin": "Provides space for personnel or equipment.",
      "Turboshaft": "Provides power for the rotor system."
    }
  },
  {
    id: "tejas-trainer", name: "HAL Tejas Trainer", category: "Trainer",
    status: "Variants and fleet status differ", role: "Pilot training",
    manufacturer: "Hindustan Aeronautics Limited", origin: "India",
    engine: "Single turbofan, variant dependent", crew: "2",
    image: "/images/tejas.jpg",
    description: "A two-seat trainer version of the Tejas family designed for instruction and training.",
    facts: ["Has two seats for training.", "Shares its aircraft family with the Tejas fighter.", "Helps pilots learn aircraft-specific procedures."],
    systems: {
      "Two-seat cockpit": "Supports instruction and trainee supervision.",
      "Flight controls": "Control aircraft attitude and direction.",
      "Engine": "Provides thrust.",
      "Training displays": "Help the crew monitor aircraft operation."
    }
  },
  {
    id: "netra", name: "Netra AEW&C", category: "Special Mission",
    status: "In service; programme details may change", role: "Airborne early warning and control",
    manufacturer: "DRDO / Embraer platform integration", origin: "Brazilian platform / Indian systems",
    engine: "2 × turbofans on the Embraer ERJ-145 platform",
    crew: "Mission dependent", image: "/images/netra.jpg",
    description: "An airborne early warning and control system using a modified aircraft for surveillance and command functions.",
    facts: ["Based on a modified Embraer ERJ-145.", "Carries airborne surveillance mission systems.", "Airborne surveillance extends situational awareness."],
    systems: {
      "Radar system": "Supports airborne detection and surveillance.",
      "Mission consoles": "Help operators manage mission information.",
      "Aircraft platform": "Provides altitude, endurance and mobility.",
      "Communications": "Support coordination with aircraft and ground stations."
    }
  },
  {
    id: "aew", name: "A-50 Phalcon", category: "Special Mission",
    status: "Fleet status and configuration may change", role: "Airborne early warning and control",
    manufacturer: "Ilyushin platform with Israeli radar integration",
    origin: "Russia / Israel integration",
    engine: "4 × turbofans on the Il-76 platform",
    crew: "Mission dependent", image: "/images/awe50.jpg",
    description: "An airborne early warning platform used to support surveillance and air command functions.",
    facts: ["Uses an Il-76 aircraft platform.", "Carries specialised surveillance equipment.", "Mission crews include operators as well as flight crew."],
    systems: {
      "Surveillance radar": "Provides airborne detection capability.",
      "Mission consoles": "Display surveillance and coordination information.",
      "Aircraft platform": "Carries mission equipment.",
      "Communications": "Enable coordination with other units."
    }
  }
];

// ================= MISSIONS =================

const missions = [
  {
  name: "Establishment of the Indian Air Force",
  year: "1932",
  description: "The Indian Air Force was officially established on 8 October 1932.",
  detail: "The IAF began its journey as a small force under British rule and later developed into a modern air force.",
  aircraft: "Early biplanes"
},
{
  name: "First Operational Flight",
  year: "1933",
  description: "The IAF's first operational flight took place on 1 April 1933.",
  detail: "The first squadron began operations with Westland Wapiti biplanes and trained Indian personnel.",
  aircraft: "Westland Wapiti"
},
{
  name: "North Waziristan Operations",
  year: "1936–1937",
  description: "The IAF supported ground forces during operations in the North Waziristan region.",
  detail: "These early operations helped develop the force's operational experience.",
  aircraft: "Westland Wapiti"
},
{
  name: "World War II",
  year: "1939–1945",
  description: "The IAF expanded its operational role during the Second World War.",
  detail: "Indian airmen and squadrons supported Allied operations in the Burma theatre.",
  aircraft: "Various wartime aircraft"
},
  {
    name: "Operation Safed Sagar", year: "1999",
    description: "IAF air operations during the Kargil conflict supported Indian forces in difficult high-altitude terrain.",
    detail: "The campaign involved carefully planned air operations in demanding mountain conditions.",
    aircraft: "Multiple fighter types were involved, including MiG-21, MiG-27 and MiG-29 aircraft."
  },
  {
    name: "Operation Meghdoot", year: "1984 onwards",
    description: "Indian military operations to secure and sustain positions in the Siachen Glacier region.",
    detail: "Air support and logistics in high-altitude areas are challenging because of terrain, weather and reduced aircraft performance.",
    aircraft: "Helicopters and transport aircraft have supported high-altitude logistics."
  },
  {
    name: "Operation Rahat", year: "2013",
    description: "Relief and evacuation work following severe flooding in Uttarakhand.",
    detail: "Military aviation supported movement of stranded people, rescue teams and essential supplies.",
    aircraft: "Transport aircraft and helicopters supported relief tasks."
  },
  {
    name: "Operation Raahat", year: "2015",
    description: "Evacuation of Indian citizens and other people from Yemen during the conflict there.",
    detail: "The evacuation involved coordination between government agencies and military and civilian transport assets.",
    aircraft: "Transport assets supported evacuation and logistics."
  },
  {
    name: "Operation Vijay", year: "1999",
    description: "The Indian military operation to regain positions occupied during the Kargil conflict.",
    detail: "The IAF's Operation Safed Sagar formed the air campaign associated with the Kargil conflict.",
    aircraft: "Various IAF aircraft supported the campaign."
  },
  {
    name: "Humanitarian Airlift", year: "Ongoing role",
    description: "Air transport and helicopter support during natural disasters, emergencies and relief operations.",
    detail: "Aviation helps move rescue teams, medical supplies and essential equipment where surface transport is disrupted.",
    aircraft: "Transport aircraft and helicopters selected for the task."
  }
];

// ================= AIR WARRIORS =================

const people = [
  {
    name: "Marshal of the IAF Arjan Singh",
    category: "Air Chief / Leader",
    years: "Chief of the Air Staff: 1964–1969",
    award: "Marshal of the Indian Air Force",
    description: "Led the IAF during the 1965 war and became the first and only officer to hold the five-star rank of Marshal of the Indian Air Force.",
    facts: ["Led the IAF during a major period in its development.", "Was awarded the five-star rank of Marshal of the Indian Air Force."]
  },
  {
    name: "Flying Officer Nirmal Jit Singh Sekhon",
    category: "Gallantry Award Recipient",
    years: "1971",
    award: "Param Vir Chakra, posthumously",
    description: "Remembered for his actions while defending Srinagar airfield during the 1971 war.",
    facts: ["Received India's highest wartime gallantry award.", "His actions remain an important part of IAF history."]
  },
  {
    name: "Air Chief Marshal P. C. Lal",
    category: "Air Chief / Leader",
    years: "Chief of the Air Staff: 1969–1973",
    award: "Senior Air Force Leadership",
    description: "Served as Chief of the Air Staff during the 1971 war.",
    facts: ["Led the IAF during the 1971 war.", "His tenure included a major period of operational activity."]
  },
  {
    name: "Air Chief Marshal Lakshman Madhav Katre",
    category: "Air Chief / Leader",
    years: "Chief of the Air Staff: 1984–1985",
    award: "Senior Air Force Leadership",
    description: "Senior IAF leader who served as Chief of the Air Staff in the mid-1980s.",
    facts: ["Held the office of Chief of the Air Staff.", "Consult official records for detailed service history."]
  },
  {
    name: "Air Chief Marshal Denis La Fontaine",
    category: "Air Chief / Leader",
    years: "Chief of the Air Staff: 1985–1988",
    award: "Senior Air Force Leadership",
    description: "Served as Chief of the Air Staff during the 1980s.",
    facts: ["Led the IAF during his tenure.", "Consult official records for detailed service history."]
  },
  {
    name: "Air Chief Marshal Birender Singh Dhanoa",
    category: "Air Chief / Leader",
    years: "Chief of the Air Staff: 2017–2019",
    award: "Senior Air Force Leadership",
    description: "Served as Chief of the Air Staff from 2017 to 2019.",
    facts: ["Held the senior leadership position of Chief of the Air Staff.", "His tenure included operational and modernisation activity."]
  },
  {
    name: "Air Chief Marshal Rakesh Kumar Singh Bhadauria",
    category: "Air Chief / Leader",
    years: "Chief of the Air Staff: 2019–2021",
    award: "Senior Air Force Leadership",
    description: "Served as Chief of the Air Staff from 2019 to 2021.",
    facts: ["Held the senior leadership position of Chief of the Air Staff.", "His tenure included modernisation and capability development."]
  },
  {
    name: "Air Chief Marshal Vivek Ram Chaudhari",
    category: "Air Chief / Leader",
    years: "Chief of the Air Staff: 2021–2024",
    award: "Senior Air Force Leadership",
    description: "Led the IAF during his tenure from 2021 to 2024.",
    facts: ["Held the senior leadership position of Chief of the Air Staff.", "Consult official records for detailed service history."]
  }
];

// ================= SHARED HELPERS =================

const $ = selector => document.querySelector(selector);

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function imageHTML(src, alt) {
  const safeAlt = escapeHTML(alt);

  if (!src) {
    return `<div class="image-placeholder">✈<br>${safeAlt}<br><small>IMAGE NOT ADDED</small></div>`;
  }

  return `
    <img src="${escapeHTML(src)}" alt="${safeAlt}" loading="lazy"
      onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">
    <div class="image-placeholder">✈<br>${safeAlt}<br><small>IMAGE NOT ADDED</small></div>
  `;
}

// ================= AIRCRAFT DIRECTORY =================

const aircraftGrid = $("#aircraftGrid");
const aircraftSearch = $("#aircraftSearch");
const aircraftFilters = $("#aircraftFilters");
const aircraftCount = $("#aircraftCount");
const missionTimeline = $("#missionTimeline");
const peopleGrid = $("#peopleGrid");
const peopleSearch = $("#peopleSearch");
const dialog = $("#detailsDialog");
const dialogContent = $("#dialogContent");

let activeCategory = "All";

function renderAircraft() {
  const term = aircraftSearch.value.trim().toLowerCase();

  const results = aircraft.filter(item => {
    const matchesCategory =
      activeCategory === "All" ||
      item.category === activeCategory ||
      (activeCategory === "Historical" &&
       item.status.toLowerCase().includes("retired"));

    const searchable = [
      item.name, item.category, item.role, item.manufacturer,
      item.origin, item.engine, item.status, item.description
    ].join(" ").toLowerCase();

    return matchesCategory && searchable.includes(term);
  });

  aircraftCount.textContent = `${results.length} aircraft`;

  if (!results.length) {
    aircraftGrid.innerHTML =
      `<p class="empty-state">No aircraft found. Try another search or category.</p>`;
    return;
  }

  aircraftGrid.innerHTML = results.map(item => `
    <article class="aircraft-card">
      <div class="aircraft-image">
        ${imageHTML(item.image, item.name)}
        <span class="category-tag">${escapeHTML(item.category)}</span>
      </div>
      <div class="card-content">
        <p class="eyebrow">${escapeHTML(item.role)}</p>
        <h3>${escapeHTML(item.name)}</h3>
        <p>${escapeHTML(item.description)}</p>
        <div class="card-meta">${escapeHTML(item.status)}</div>
        <button class="text-btn" data-aircraft="${escapeHTML(item.id)}">
          View full profile ↗
        </button>
      </div>
    </article>
  `).join("");
}
const missionImages = {
  
"Establishment of the Indian Air Force": "/images/iaf-1932.jpg",
"First Operational Flight": "/images/iaf-first-flight-1933.jpg",
"North Waziristan Operations": "/images/iaf-north-waziristan-1936.jpg",
"World War II": "/images/iaf-ww2-burma.jpg",

  "Operation Safed Sagar": "/images/operation-safed-sagar.jpg",
  "Operation Meghdoot": "/images/operation-meghdoot.jpg",
  "Operation Rahat": "/images/operation-rahat-uttarakhand.jpg",
  "Operation Raahat": "/images/operation-raahat-yemen.jpg",
  "Operation Vijay": "/images/operation-vijay-kargil.jpg",
  "Humanitarian Airlift": "/images/humanitarian-airlift.jpg"
};


function renderMissions() {
  missionTimeline.innerHTML = missions.map((mission, index) => `
    <article class="timeline-item ${index % 2 === 0 ? "left" : "right"}">
      <div class="timeline-marker">
        <span>${escapeHTML(mission.year || "IAF")}</span>
      </div>

      <div class="timeline-card">
        <div class="timeline-photo">
          <img
            src="${missionImages[mission.name] || ""}"
            alt="${escapeHTML(mission.name)}"
            loading="lazy"
            onerror="this.parentElement.style.display='none'"
          >
        </div>

        <div class="timeline-content">
          <span class="timeline-label">INDIAN AIR FORCE HISTORY</span>

          <h3>${escapeHTML(mission.name)}</h3>

          <p class="mission-description">
            ${escapeHTML(mission.description || "")}
          </p>

          <div class="mission-extra">
            <p>${escapeHTML(mission.detail || "Explore this important chapter in Indian Air Force history.")}</p>
            ${mission.aircraft ? `
              <div class="mission-aircraft">
                <strong>Aircraft / Equipment:</strong>
                ${escapeHTML(mission.aircraft)}
              </div>
            ` : ""}
          </div>

          <div class="mission-actions">
            <button class="timeline-more" type="button"
              data-mission-index="${index}">
              Read full history →
            </button>

            <button class="mission-ask-ai" type="button"
              data-ask-mission="${index}">
              ✦ Ask IAF AI
            </button>
          </div>
        </div>
      </div>
    </article>
  `).join("");

  missionTimeline.querySelectorAll(".timeline-more").forEach(button => {
    button.addEventListener("click", () => {
      const mission = missions[Number(button.dataset.missionIndex)];
      if (!mission) return;

      dialogContent.innerHTML = `
        <h2>${escapeHTML(mission.name)}</h2>
        <p><strong>Year:</strong> ${escapeHTML(mission.year || "Historical milestone")}</p>
        <p>${escapeHTML(mission.description || "")}</p>
        <p>${escapeHTML(mission.detail || "")}</p>
        ${mission.aircraft ? `
          <p><strong>Aircraft / Equipment:</strong>
          ${escapeHTML(mission.aircraft)}</p>
        ` : ""}
      `;

      dialog.showModal();
    });
  });

  missionTimeline.querySelectorAll(".mission-ask-ai").forEach(button => {
    button.addEventListener("click", () => {
      const mission = missions[Number(button.dataset.askMission)];
      if (!mission) return;

      const chatbotButton = [...document.querySelectorAll("button")]
        .find(el => el.textContent.includes("Ask IAF AI"));

      if (chatbotButton && chatbotButton !== button) {
        chatbotButton.click();
      } else {
        alert("Please open the main Ask IAF AI chatbot to learn more about this mission.");
      }
    });
  });
}


const warriorImages = {
  "Marshal of the IAF Arjan Singh":
    "/images/arjan-singh.jpg",

  "Flying Officer Nirmal Jit Singh Sekhon":
    "/images/nirmal-jit-singh-sekhon.jpg",

  "Air Chief Marshal P. C. Lal":
    "/images/pc-lal.jpg",

  "Air Chief Marshal Lakshman Madhav Katre":
    "/images/lm-katre.jpg",

  "Air Chief Marshal Denis La Fontaine":
    "/images/denis-la-fontaine.jpg",

  "Air Chief Marshal Birender Singh Dhanoa":
    "/images/bs-dhanoa.jpg",

  "Air Chief Marshal Rakesh Kumar Singh Bhadauria":
    "/images/rks-bhadauria.jpg",

  "Air Chief Marshal Vivek Ram Chaudhari":
    "/images/vivek-ram-chaudhari.jpg"
};

function renderPeople() {
  const term = peopleSearch.value.trim().toLowerCase();

  const filtered = people.filter(person =>
    `${person.name} ${person.category} ${person.years} ${person.award}`
      .toLowerCase().includes(term)
  );

  if (!filtered.length) {
    peopleGrid.innerHTML =
      `<p class="empty-state">No people found. Try another search.</p>`;
    return;
  }

  peopleGrid.innerHTML = filtered.map(person => `
    <article class="person-card">
      <div class="warrior-photo">
  <img
    src="${warriorImages[person.name] || ''}"
    alt="${escapeHTML(person.name)}"
    loading="lazy"
    onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"
  >
  <div class="warrior-photo-fallback" style="display:none">
    ${escapeHTML(person.name.charAt(0))}
  </div>
</div>
      <p class="eyebrow">${escapeHTML(person.category)}</p>
      <h3>${escapeHTML(person.name)}</h3>
      <p class="person-years">${escapeHTML(person.years)}</p>
      <p class="person-award">${escapeHTML(person.award)}</p>
      <p>${escapeHTML(person.description)}</p>
      <button class="text-btn" data-person="${people.indexOf(person)}">
        Read biography ↗
      </button>
    </article>
  `).join("");
}

// ================= DETAILS DIALOG =================

function openAircraft(id) {
  const item = aircraft.find(plane => plane.id === id);
  if (!item) return;

  dialogContent.innerHTML = `
    <div class="detail-layout">
      <div class="detail-image">${imageHTML(item.image, item.name)}</div>
      <div>
        <p class="eyebrow">${escapeHTML(item.category)} · ${escapeHTML(item.role)}</p>
        <h2 id="dialogTitle">${escapeHTML(item.name)}</h2>
        <span class="status-pill">${escapeHTML(item.status)}</span>
        <p>${escapeHTML(item.description)}</p>
      </div>
    </div>

    <h3>Aircraft specifications</h3>
    <div class="spec-grid">
      <div><small>Manufacturer</small><strong>${escapeHTML(item.manufacturer)}</strong></div>
      <div><small>Country / origin</small><strong>${escapeHTML(item.origin)}</strong></div>
      <div><small>Engine</small><strong>${escapeHTML(item.engine)}</strong></div>
      <div><small>Crew</small><strong>${escapeHTML(item.crew)}</strong></div>
      <div><small>Category</small><strong>${escapeHTML(item.category)}</strong></div>
      <div><small>Service status</small><strong>${escapeHTML(item.status)}</strong></div>
    </div>

    <h3>Interesting facts</h3>
    <ul class="facts-list">
      ${item.facts.map(fact => `<li>${escapeHTML(fact)}</li>`).join("")}
    </ul>

    <h3>Aircraft components explorer</h3>
    <p class="muted">Select a component to reveal its function.</p>
    <div class="parts-grid">
      ${Object.entries(item.systems).map(([part, description], index) => `
        <button class="part-button" data-part="${index}">${escapeHTML(part)}</button>
        <p class="part-explanation" data-explanation="${index}" hidden>
          ${escapeHTML(description)}
        </p>
      `).join("")}
    </div>

    <div class="detail-note">
      Specifications may vary by variant and configuration. This is an educational overview.
    </div>

    <button class="primary-btn" data-ask="${escapeHTML(item.name)}">
      Ask AI about this aircraft ✦
    </button>
  `;

  dialog.showModal();
}

function openMission(index) {
  const mission = missions[index];
  if (!mission) return;

  dialogContent.innerHTML = `
    <p class="eyebrow">MISSION OVERVIEW · ${escapeHTML(mission.year)}</p>
    <h2 id="dialogTitle">${escapeHTML(mission.name)}</h2>
    <p>${escapeHTML(mission.description)}</p>
    <h3>Historical context</h3>
    <p>${escapeHTML(mission.detail)}</p>
    <h3>Aircraft and support</h3>
    <p>${escapeHTML(mission.aircraft)}</p>
    <div class="detail-note">
      Consult official IAF history and Ministry of Defence releases for authoritative details.
    </div>
    <button class="primary-btn" data-ask="Explain ${escapeHTML(mission.name)} in detail">
      Ask AI about this mission ✦
    </button>
  `;

  dialog.showModal();
}

function openPerson(index) {
  const person = people[index];
  if (!person) return;

  dialogContent.innerHTML = `
    <p class="eyebrow">${escapeHTML(person.category)}</p>
    <h2 id="dialogTitle">${escapeHTML(person.name)}</h2>
    <p class="person-years">${escapeHTML(person.years)}</p>
    <p class="person-award">${escapeHTML(person.award)}</p>
    <p>${escapeHTML(person.description)}</p>
    <h3>Key facts</h3>
    <ul class="facts-list">
      ${person.facts.map(fact => `<li>${escapeHTML(fact)}</li>`).join("")}
    </ul>
    <div class="detail-note">Verify biographies and honours against official records.</div>
    <button class="primary-btn"
      data-ask="Give me a detailed, factual biography of ${escapeHTML(person.name)}">
      Ask AI about this person ✦
    </button>
  `;

  dialog.showModal();
}

// ================= DIRECTORY EVENTS =================

aircraftSearch.addEventListener("input", renderAircraft);
peopleSearch.addEventListener("input", renderPeople);

aircraftFilters.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  activeCategory = button.dataset.category;

  aircraftFilters.querySelectorAll(".filter").forEach(filter => {
    filter.classList.toggle("active", filter === button);
  });

  renderAircraft();
});

aircraftGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-aircraft]");
  if (button) openAircraft(button.dataset.aircraft);
});

missionTimeline.addEventListener("click", event => {
  const button = event.target.closest("[data-mission]");
  if (button) openMission(Number(button.dataset.mission));
});

peopleGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-person]");
  if (button) openPerson(Number(button.dataset.person));
});

dialogContent.addEventListener("click", event => {
  const partButton = event.target.closest("[data-part]");

  if (partButton) {
    const explanation = dialogContent.querySelector(
      `[data-explanation="${partButton.dataset.part}"]`
    );
    if (explanation) explanation.hidden = !explanation.hidden;
  }

  const askButton = event.target.closest("[data-ask]");

  if (askButton) {
    const question = askButton.dataset.ask;
    dialog.close();
    openChat();
    askIafAI(question);
  }
});

$("#dialogClose").addEventListener("click", () => dialog.close());

dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

// Mobile navigation
const menuToggle = $("#menuToggle");
const mainNav = $("#mainNav");

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("nav-open");
});

mainNav.addEventListener("click", event => {
  if (event.target.closest("a")) mainNav.classList.remove("nav-open");
});

// ================= IAF AI QUIZ ARENA =================

const quizRoot = $("#quizRoot");

let currentQuizId = null;
let currentQuestions = [];
let currentAnswers = {};
let quizGenerating = false;
let quizSubmitting = false;

let lastQuizSettings = {
  topic: "General IAF Knowledge",
  difficulty: "Medium",
  count: 10
};

function escapeQuizText(value) {
  return escapeHTML(value ?? "");
}

async function callQuizAPI(endpoint, payload) {
  const response = await fetch(`${QUIZ_API}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("The backend returned an unreadable response.");
  }

  if (!response.ok) {
    throw new Error(data.detail || "Quiz request failed.");
  }

  return data;
}

function showQuizSetup() {
  quizRoot.innerHTML = `
    <div class="quiz-card">
      <p class="eyebrow">GEMINI AI CHALLENGE</p>
      <h3>Generate your next quiz</h3>
      <p class="muted">Choose your topic and difficulty.</p>

      <form id="aiQuizSetup" class="ai-quiz-setup">
        <label for="quizTopic">Topic</label>
        <select id="quizTopic" class="search">
          <option value="General IAF Knowledge">General IAF Knowledge</option>
          <option value="Indian Air Force fighter aircraft">Fighter Aircraft</option>
          <option value="Indian Air Force transport aircraft">Transport Aircraft</option>
          <option value="Indian Air Force helicopters">Helicopters</option>
          <option value="Indian Air Force history and missions">History and Missions</option>
          <option value="Indian Air Force Chiefs and notable air warriors">Air Chiefs and Air Warriors</option>
          <option value="Aircraft engines and aviation science">Aviation Science</option>
          <option value="Military aviation and aerospace technology">Aerospace Technology</option>
        </select>

        <label for="quizDifficulty">Difficulty</label>
        <select id="quizDifficulty" class="search">
          <option>Easy</option>
          <option selected>Medium</option>
          <option>Hard</option>
        </select>

        <label for="quizCount">Number of questions</label>
        <select id="quizCount" class="search">
          <option value="5">5 Questions</option>
          <option value="10" selected>10 Questions</option>
          <option value="15">15 Questions</option>
        </select>

        <button class="primary-btn" type="submit">Generate AI Quiz</button>
      </form>

      <p id="quizStatus" class="quiz-feedback" aria-live="polite"></p>
    </div>
  `;

  $("#aiQuizSetup").addEventListener("submit", event => {
    event.preventDefault();

    lastQuizSettings = {
      topic: $("#quizTopic").value,
      difficulty: $("#quizDifficulty").value,
      count: Number($("#quizCount").value)
    };

    generateQuiz();
  });
}

async function generateQuiz() {
  if (quizGenerating) return;

  quizGenerating = true;

  quizRoot.innerHTML = `
    <div class="quiz-card">
      <p class="eyebrow">PREPARING YOUR QUIZ</p>
      <h3>System is generating fresh questions...</h3>
      <p class="muted">Please wait a few seconds.</p>
    </div>
  `;

  try {
    const data = await callQuizAPI("generate", lastQuizSettings);

    if (!data.quiz_id || !Array.isArray(data.questions) || !data.questions.length) {
      throw new Error("The server returned an invalid quiz.");
    }

    currentQuizId = data.quiz_id;
    currentQuestions = data.questions;
    currentAnswers = {};

    renderQuestions();
  } catch (error) {
    quizRoot.innerHTML = `
      <div class="quiz-card">
        <h3>Quiz generation failed</h3>
        <p class="quiz-feedback">${escapeQuizText(error.message)}</p>
        <button class="primary-btn" id="retryQuiz">Try Again</button>
        <button class="secondary-btn" id="quizSettings">Quiz Settings</button>
      </div>
    `;

    $("#retryQuiz").addEventListener("click", generateQuiz);
    $("#quizSettings").addEventListener("click", showQuizSetup);
  } finally {
    quizGenerating = false;
  }
}

function renderQuestions() {
  quizRoot.innerHTML = `
    <div class="quiz-card">
      <p class="eyebrow">YOUR AI-GENERATED QUIZ</p>
      <h3>${escapeQuizText(lastQuizSettings.topic)}</h3>
      <p class="muted">
        Difficulty: ${escapeQuizText(lastQuizSettings.difficulty)}
        · ${currentQuestions.length} questions
      </p>

      <form id="generatedQuizForm">
        ${currentQuestions.map((q, i) => `
          <fieldset class="generated-question">
            <legend>
              <span class="question-number">Q${i + 1}.</span>
              ${escapeQuizText(q.question)}
            </legend>

            <div class="generated-options">
              ${q.options.map((option, j) => `
                <label class="generated-option">
                  <input type="radio" name="${escapeQuizText(q.id)}" value="${j}">
                  <span>${escapeQuizText(option)}</span>
                </label>
              `).join("")}
            </div>
          </fieldset>
        `).join("")}

        <p id="quizAnswerStatus" class="quiz-feedback" aria-live="polite"></p>
        <button class="primary-btn" id="submitQuiz" type="submit">
          Submit & Calculate Score
        </button>
        <button class="secondary-btn" id="cancelQuiz" type="button">
          Cancel Quiz
        </button>
      </form>
    </div>
  `;

  const form = $("#generatedQuizForm");

  form.addEventListener("change", event => {
    if (event.target.matches('input[type="radio"]')) {
      currentAnswers[event.target.name] = Number(event.target.value);
    }
  });

  form.addEventListener("submit", async event => {
    event.preventDefault();

    if (quizSubmitting) return;

    const unanswered = currentQuestions.filter(q =>
      !Number.isInteger(currentAnswers[q.id])
    );

    const status = $("#quizAnswerStatus");

    if (unanswered.length) {
      status.textContent = `${unanswered.length} question(s) still need an answer.`;
      return;
    }

    quizSubmitting = true;

    const submitButton = $("#submitQuiz");
    submitButton.disabled = true;
    submitButton.textContent = "Calculating...";

    try {
      const result = await callQuizAPI("submit", {
        quiz_id: currentQuizId,
        answers: currentAnswers
      });

      renderResults(result);
    } catch (error) {
      status.textContent = error.message;
      quizSubmitting = false;
      submitButton.disabled = false;
      submitButton.textContent = "Retry Submission";
    }
  });

  $("#cancelQuiz").addEventListener("click", () => {
    currentQuizId = null;
    currentQuestions = [];
    currentAnswers = {};
    quizSubmitting = false;
    showQuizSetup();
  });
}

function renderResults(result) {
  quizSubmitting = false;

  const percentage = Number(result.percentage);

  const feedback =
    percentage >= 80 ? "Excellent performance!" :
    percentage >= 60 ? "Good work! Keep improving." :
    percentage >= 40 ? "Good attempt. Review the answers below." :
    "Keep practising. Every attempt helps you improve.";

  quizRoot.innerHTML = `
    <div class="quiz-card quiz-results">
      <p class="eyebrow">YOUR RESULTS</p>
      <h3>Quiz completed</h3>

      <div class="score-circle">
        <strong>${result.score}/${result.total}</strong>
        <span>${percentage.toFixed(1)}%</span>
      </div>

      <p>${escapeQuizText(feedback)}</p>

      <div class="score-stats">
        <div><strong>${result.score}</strong><span>Correct</span></div>
        <div><strong>${result.total - result.score}</strong><span>Incorrect</span></div>
        <div><strong>${result.total}</strong><span>Total</span></div>
      </div>

      <h3>Review your answers</h3>

      <div class="answer-review">
        ${result.results.map((r, i) => `
          <article class="review-item ${r.is_correct ? "review-correct" : "review-incorrect"}">
            <p class="eyebrow">QUESTION ${i + 1}</p>
            <h4>${escapeQuizText(r.question)}</h4>
            <p><strong>Your answer:</strong>
              ${Number.isInteger(r.selected_index)
                ? escapeQuizText(r.options[r.selected_index])
                : "Not answered"}
            </p>
            <p><strong>Correct answer:</strong>
              ${escapeQuizText(r.options[r.correct_index])}
            </p>
            <p class="review-explanation">
              <strong>Explanation:</strong> ${escapeQuizText(r.explanation)}
            </p>
          </article>
        `).join("")}
      </div>

      <button class="primary-btn" id="anotherQuiz">Generate Another Quiz</button>
      <button class="secondary-btn" id="changeQuizSettings">Change Settings</button>
    </div>
  `;

  $("#anotherQuiz").addEventListener("click", generateQuiz);
  $("#changeQuizSettings").addEventListener("click", showQuizSetup);
}

if (quizRoot) showQuizSetup();

// ================= GEMINI AI CHATBOT =================

const chatLauncher = $("#chatLauncher");
const chatPanel = $("#chatPanel");
const chatClose = $("#chatClose");
const chatNew = $("#chatNew");
const chatMessages = $("#chatMessages");
const chatForm = $("#chatForm");
const chatInput = $("#chatInput");
const chatSend = $("#chatSend");
const chatSuggestions = $("#chatSuggestions");

let conversationHistory = [];
let requestInProgress = false;

function addMessage(text, role) {
  const bubble = document.createElement("div");
  bubble.className = `chat-message ${role}-message`;
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return bubble;
}

function openChat() {
  chatPanel.hidden = false;
  chatLauncher.setAttribute("aria-expanded", "true");
  chatInput.focus();
}

function closeChat() {
  chatPanel.hidden = true;
  chatLauncher.setAttribute("aria-expanded", "false");
}

chatLauncher.addEventListener("click", () => {
  if (chatPanel.hidden) openChat();
  else closeChat();
});

$("#heroAskAI").addEventListener("click", openChat);
$("#bannerAskAI").addEventListener("click", openChat);
chatClose.addEventListener("click", closeChat);

chatNew.addEventListener("click", () => {
  conversationHistory = [];
  chatMessages.replaceChildren();

  addMessage(
    "New conversation started! Ask me about aircraft, aviation science, IAF history or air warriors.",
    "assistant"
  );
});

async function askIafAI(rawQuestion) {
  const question = rawQuestion.trim();

  if (!question || requestInProgress) return;

  openChat();
  addMessage(question, "user");

  const thinking = addMessage("Thinking... ✈", "assistant");

  requestInProgress = true;
  chatInput.disabled = true;
  chatSend.disabled = true;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: question,
        history: conversationHistory.slice(-12)
      })
    });

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error("The backend returned an unreadable response.");
    }

    if (!response.ok) {
      throw new Error(
        typeof data.detail === "string"
          ? data.detail
          : `Request failed with status ${response.status}.`
      );
    }

    if (!data.answer) {
      throw new Error("The AI returned an empty answer. Please retry.");
    }

    thinking.textContent = data.answer;

    conversationHistory.push(
      { role: "user", content: question },
      { role: "model", content: data.answer }
    );

    conversationHistory = conversationHistory.slice(-12);
  } catch (error) {
    thinking.textContent =
      `I couldn't get an answer. ${error.message}\n\n` +
      "Check that the backend is running at http://127.0.0.1:8000 and your Gemini API key is configured.";
  } finally {
    requestInProgress = false;
    chatInput.disabled = false;
    chatSend.disabled = false;
    chatInput.focus();
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

chatForm.addEventListener("submit", event => {
  event.preventDefault();

  const question = chatInput.value;
  chatInput.value = "";

  askIafAI(question);
});

chatSuggestions.addEventListener("click", event => {
  const button = event.target.closest("[data-question]");
  if (button) askIafAI(button.dataset.question);
});

chatInput.addEventListener("keydown", event => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatForm.requestSubmit();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    if (!chatPanel.hidden) closeChat();
    if (dialog.open) dialog.close();
  }
});

// ================= INITIAL RENDER =================

renderAircraft();
renderMissions();
renderPeople();

const comparisonAircraft = {
  rafale: {
    name: "Dassault Rafale",
    type: "Multirole Fighter",
    speed: "Mach 1.8",
    engines: "2",
    ceiling: "50,000 ft",
    range: "Approx. 3,700 km (ferry range)"
  },
  tejas: {
    name: "HAL Tejas",
    type: "Light Combat Aircraft",
    speed: "Mach 1.6",
    engines: "1",
    ceiling: "50,000 ft",
    range: "Approx. 1,850 km (ferry range)"
  },
  su30: {
    name: "Sukhoi Su-30MKI",
    type: "Multirole Fighter",
    speed: "Approx. Mach 2",
    engines: "2",
    ceiling: "Approx. 56,800 ft",
    range: "Approx. 3,000 km (ferry range)"
  },
  apache: {
  name: "AH-64E Apache",
  type: "Attack Helicopter",
  manufacturer: "Boeing",
  origin: "United States",
  role: "Ground attack and close air support",
  status: "In service",
  speed: "Approx. 293 km/h",
  engines: "2 × turboshaft engines",
  crew: "2",
  ceiling: "Approx. 20,000 ft",
  range: "Approx. 476 km (mission-dependent)",
  avionics: "Target acquisition and designation systems; radar fit varies by variant",
  refuelling: "Not generally listed as an in-flight refuelling capability",
  strength: "Armoured design, advanced targeting and anti-armour capability"
},
  c17: {
  name: "C-17 Globemaster III",
  type: "Heavy Strategic Transport Aircraft",
  manufacturer: "Boeing",
  origin: "United States",
  role: "Strategic airlift and heavy cargo transport",
  status: "In service",
  speed: "Approx. 830 km/h",
  engines: "4 × Pratt & Whitney F117 turbofan engines",
  crew: "3",
  ceiling: "Approx. 45,000 ft",
  range: "Approx. 4,480 km with a substantial payload; configuration-dependent",
  avionics: "Integrated flight management, navigation and cargo systems",
  refuelling: "Air-to-air refuelling capable",
  strength: "Heavy cargo capacity and operation from relatively short runways"
},
  chinook: {
  name: "CH-47F(I) Chinook",
  type: "Heavy-Lift Transport Helicopter",
  manufacturer: "Boeing",
  origin: "United States",
  role: "Heavy cargo transport and troop movement",
  status: "In service",
  speed: "Approx. 302 km/h",
  engines: "2 × Honeywell T55 turboshaft engines",
  crew: "3",
  ceiling: "Approx. 20,000 ft",
  range: "Approx. 740 km (mission-dependent)",
  avionics: "Digital cockpit and advanced navigation systems",
  refuelling: "Not generally listed as an in-flight refuelling capability",
  strength: "Heavy payload capacity and tandem-rotor stability"
},
  jaguar: {
    name: "SEPECAT Jaguar",
    type: "Strike Aircraft",
    speed: "Approx. Mach 1.6",
    engines: "2",
    ceiling: "Approx. 45,000 ft",
    range: "Mission-dependent"
  },
  mi17: {
  name: "Mi-17V-5",
  type: "Medium-Lift Transport Helicopter",
  manufacturer: "Kazan Helicopters / Russian Helicopters",
  origin: "Russia",
  role: "Troop transport, logistics and rescue",
  status: "In service",
  speed: "Approx. 250 km/h",
  engines: "2 × Klimov TV3-117VM-series turboshaft engines",
  crew: "Typically 3",
  ceiling: "Approx. 19,700 ft",
  range: "Approx. 580 km (mission-dependent)",
  avionics: "Navigation and communication systems vary by configuration",
  refuelling: "Not generally listed as an in-flight refuelling capability",
  strength: "Versatile transport, high-altitude operations and utility missions"
},
  mig21: {
    name: "MiG-21 Bison",
    type: "Interceptor / Fighter",
    speed: "Approx. Mach 2",
    engines: "1",
    ceiling: "Approx. 57,400 ft",
    range: "Mission-dependent"
  },
  mig29: {
    name: "MiG-29",
    type: "Multirole Fighter",
    speed: "Approx. Mach 2.25",
    engines: "2",
    ceiling: "Approx. 59,000 ft",
    range: "Variant and mission-dependent"
  },
  mirage2000: {
    name: "Dassault Mirage 2000",
    type: "Multirole Fighter",
    speed: "Approx. Mach 2.2",
    engines: "1",
    ceiling: "Approx. 55,000 ft",
    range: "Variant and mission-dependent"
  },
  hawk: {
  name: "Hawk Mk132",
  type: "Advanced Jet Trainer",
  manufacturer: "BAE Systems / HAL",
  origin: "United Kingdom / India",
  role: "Advanced pilot training and weapons training",
  status: "In service",
  speed: "Approx. Mach 0.84",
  engines: "1 × Rolls-Royce Adour turbofan",
  crew: "2",
  ceiling: "Approx. 44,000 ft",
  range: "Approx. 2,500 km (configuration-dependent)",
  avionics: "Training-focused cockpit and navigation systems",
  refuelling: "Not generally listed as an in-flight refuelling capability",
  strength: "Jet pilot training and handling characteristics similar to combat aircraft"
},
};



function getComparisonAircraft(id) {
  const key = String(id).toLowerCase();

  const legacy = comparisonAircraft[key];

  const base = aircraft.find(item =>
    String(item.id || "").toLowerCase() === key ||
    String(item.name || "").toLowerCase() === key ||
    String(item.id || "").toLowerCase() === String(legacy?.id || "").toLowerCase() ||
    String(item.name || "").toLowerCase() === String(legacy?.name || "").toLowerCase()
  );

  if (!base && !legacy) {
    console.warn("Aircraft not found:", id);
    return null;
  }

  const item = { ...(legacy || {}), ...(base || {}) };

  return {
    ...item,
    type: item.category || item.type || "Not available",
    manufacturer: item.manufacturer || "Not available",
    origin: item.origin || "Not available",
    role: item.role || "Not available",
    status: item.status || "Not available",
    speed: item.speed || "Not available",
    engines: item.engines || item.engine || "Not available",
    crew: item.crew || "Not available",
    ceiling: item.ceiling || "Not available",
    range: item.range || "Not available",
    avionics:
  item.avionics ||
  item.systems?.["Radar"] ||
  item.systems?.["Radar & Avionics"] ||
  "Details available in aircraft systems",

refuelling:
  item.refuelling ||
  item.systems?.["Air-to-Air Refuelling"] ||
  "Check aircraft variant specifications",

strength:
  item.strength ||
  (Array.isArray(item.facts) ? item.facts.join(" ") : "") ||
  item.description ||
  "General operational capabilities vary by variant"
  };
}





function renderAircraftComparison() {
  const firstSelect = document.getElementById("compareAircraft1");
  const secondSelect = document.getElementById("compareAircraft2");
  const results = document.getElementById("aircraftComparisonResults");

  if (!firstSelect || !secondSelect || !results) return;

  const first = getComparisonAircraft(firstSelect.value);
  const second = getComparisonAircraft(secondSelect.value);

  if (!first || !second) {
    results.innerHTML = "<p>Select two valid aircraft to compare.</p>";
    return;
  }

  const specs = [
    ["Aircraft Type", "type"],
    ["Manufacturer", "manufacturer"],
    ["Country of Origin", "origin"],
    ["Operational Role", "role"],
    ["Service Status", "status"],
    ["Maximum Speed", "speed"],
    ["Engine Configuration", "engines"],
    ["Crew", "crew"],
    ["Service Ceiling", "ceiling"],
    ["Range", "range"],
    ["Radar & Avionics", "avionics"],
    ["Air-to-Air Refuelling", "refuelling"],
    ["Key Strength", "strength"]
  ];

  function cardHTML(item, number, viewerId, titleId) {
    return `
      <article class="comparison-card">
        <p class="eyebrow">AIRCRAFT ${number}</p>
        <h3 id="${titleId}">${escapeHTML(item.name)}</h3>

        <div class="comparison-3d-viewer" id="${viewerId}"></div>

        ${specs.map(([label, key]) => `
          <div class="comparison-spec">
            <span>${label}</span>
            <strong>${escapeHTML(item[key] || "Not available")}</strong>
          </div>
        `).join("")}
      </article>
    `;
  }

  results.innerHTML = `
    <div class="comparison-grid">
      ${cardHTML(first, "01", "compareViewer1", "compareTitle1")}
      ${cardHTML(second, "02", "compareViewer2", "compareTitle2")}
    </div>

    <p class="comparison-note">
      Specifications are approximate and may vary by aircraft variant,
      configuration and mission. Range figures are not always directly
      comparable. Verify values against official sources.
    </p>
  `;

  if (window.updateAircraftComparisonImages) {
    window.updateAircraftComparisonImages();
  }
}



document.getElementById("compareAircraft1")
  ?.addEventListener("change", renderAircraftComparison);

document.getElementById("compareAircraft2")
  ?.addEventListener("change", renderAircraftComparison);

renderAircraftComparison();

/* 3D Aircraft Comparison Preview */

/* Animated Aircraft Image Comparison */
(() => {
  

/* Aircraft Comparison Images ONLY */
const images = {
  rafale: {
    name: "Dassault Rafale",
    image: "/images/rafale.png"
  },
  tejas: {
    name: "HAL Tejas",
    image: "/images/tejas.png"
  },
  su30: {
    name: "Sukhoi Su-30MKI",
    image: "/images/sukhoi_su30mki.png"
  },
  apache: {
    name: "AH-64 Apache",
    image: "/images/apache.png"
  },
  c17: {
    name: "C-17 Globemaster III",
    image: "/images/c17_globemaster.png"
  },
  chinook: {
    name: "CH-47 Chinook",
    image: "/images/chinook.png"
  },
  jaguar: {
    name: "SEPECAT Jaguar",
    image: "/images/jaguar.png"
  },
  mi17: {
    name: "Mi-17 V5",
    image: "/images/mi17.png"
  },
  mig29: {
    name: "MiG-29",
    image: "/images/mig29.png"
  },
  mirage2000: {
    name: "Dassault Mirage 2000",
    image: "/images/stealth_fighter.png"
  },

  // Additional aircraft from your screenshot
  awacs: {
    name: "AWACS Aircraft",
    image: "/images/awacs.png"
  },
  lightAttack: {
    name: "Light Attack Helicopter",
    image: "/images/light_attack_helicopter.png"
  },
  maritimePatrol: {
    name: "Maritime Patrol Aircraft",
    image: "/images/maritime_patrol.png"
  },
  navyTrainer: {
    name: "Navy Trainer",
    image: "/images/navy_trainer.png"
  },
  reconUav: {
    name: "Reconnaissance UAV",
    image: "/images/recon_uav.png"
  },
  trainerJet: {
    name: "Trainer Jet",
    image: "/images/trainer_jet.png"
  },
  mig21: {
  name: "MiG-21 Bison",
  image: "/images/mig21i.png"
 }
};


  function setup(selectId, viewerId, titleId) {
    const select = document.getElementById(selectId);
    const viewer = document.getElementById(viewerId);
    const title = document.getElementById(titleId);

    if (!select || !viewer) return;

    const img = document.createElement("img");
    img.className = "comparison-aircraft-image";
    img.alt = "Aircraft preview";
    viewer.replaceChildren(img);

    function update() {
      const item = images[select.value];
      if (!item) return;

      img.src = item.image;
      img.alt = item.name;
      if (title) title.textContent = item.name;
    }

    select.addEventListener("change", update);
    update();
  }

  window.updateAircraftComparisonImages = function () {
  setup("compareAircraft1", "compareViewer1", "compareTitle1");
  setup("compareAircraft2", "compareViewer2", "compareTitle2");
};

window.updateAircraftComparisonImages();
})();
