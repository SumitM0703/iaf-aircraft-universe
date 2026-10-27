
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "meshoptimizer";

const viewer = document.getElementById("aircraft3dViewer");
const loadingOverlay = viewer?.querySelector(".viewer-loading");

if (viewer) {
  const status = document.getElementById("viewerStatus");
  const title = document.getElementById("partTitle");
  const description = document.getElementById("partDescription");
  const fact = document.getElementById("partFact");
  const partList = document.getElementById("aircraftPartList");

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#081522");

  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100000);
  camera.position.set(8, 5, 10);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  renderer.domElement.style.display = "block";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  viewer.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 2;

  scene.add(new THREE.HemisphereLight(0xffffff, 0x34485a, 2.5));

  const keyLight = new THREE.DirectionalLight(0xffffff, 3);
  keyLight.position.set(8, 12, 10);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x58eaf2, 1.5);
  fillLight.position.set(-8, 4, -8);
  scene.add(fillLight);

  const frontLight = new THREE.DirectionalLight(0xffffff, 1.5);
  frontLight.position.set(0, 5, 12);
  scene.add(frontLight);

  const grid = new THREE.GridHelper(100, 50, 0x285064, 0x142b3b);
  grid.position.y = -2;
  scene.add(grid);

  const aircraftRoot = new THREE.Group();
  scene.add(aircraftRoot);
  
  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  // All 11 aircraft models available in public/models/
  const aircraftModels = {
    rafale: {
      name: "Dassault Rafale",
      path: "/models/rafale.glb"
    },
    tejas: {
      name: "HAL Tejas",
      path: "/models/hal_tejas.glb"
    },
    su30: {
      name: "Sukhoi Su-30MKI",
      path: "/models/Su30-mki.glb"
    },
    apache: {
      name: "AH-64 Apache",
      path: "/models/apache.glb"
    },
    c17: {
      name: "C-17 Globemaster III",
      path: "/models/c17.glb"
    },
    chinook: {
      name: "CH-47 Chinook",
      path: "/models/chinook-optimized.glb"
    },
    jaguar: {
      name: "SEPECAT Jaguar",
      path: "/models/jaguar.glb"
    },
    mi17: {
      name: "Mi-17 V5",
      path: "/models/mi17.glb"
    },
    mig21: {
      name: "MiG-21 Bison",
      path: "/models/mig21.glb"
    },
    mig29: {
      name: "MiG-29",
      path: "/models/mig29.glb"
    },
    mirage2000: {
      name: "Dassault Mirage 2000",
      path: "/models/mirage2000.glb"
    }
  };

  let parts = [];
  let selectedPart = null;
  let exploded = false;
  let loadToken = 0;
  let modelSize = 10;
  let savedCameraPosition = new THREE.Vector3(8, 5, 10);
  let savedTarget = new THREE.Vector3();

  const explanations = {
    fuselage: {
      title: "Fuselage",
      description: "The main body of the aircraft. It connects the wings, tail and other major structures.",
      fact: "The fuselage provides structural support and houses important aircraft systems."
    },
    wing: {
      title: "Wings",
      description: "The wings generate lift and help the aircraft remain airborne.",
      fact: "Wing shape and angle affect lift, drag and flight performance."
    },
    engine: {
      title: "Engine",
      description: "The propulsion system generates thrust to move the aircraft forward.",
      fact: "Jet engines produce thrust by accelerating air backwards."
    },
    cockpit: {
      title: "Cockpit",
      description: "The cockpit contains the pilot's controls and flight information displays.",
      fact: "Modern cockpits use electronic displays and flight-control systems."
    },
    tail: {
      title: "Tail and stabilizers",
      description: "Tail surfaces help stabilize and control the aircraft during flight.",
      fact: "Control surfaces help the aircraft change direction and attitude."
    },
    landing: {
      title: "Landing gear",
      description: "The landing gear supports the aircraft during taxiing, takeoff and landing.",
      fact: "Retractable landing gear can reduce drag during flight."
    },
    default: {
      title: "Aircraft component",
      description: "This component is a separate mesh from the selected 3D aircraft model.",
      fact: "Select different components to explore the aircraft."
    }
  };

  function setStatus(message) {
  if (!status) return;

  status.textContent = message;

  if (message.includes(" loaded — ")) {
    status.style.display = "none";
  } else {
    status.style.display = "block";
  }
}

  function getInfo(name) {
    const n = name.toLowerCase();

    if (/cockpit|canopy|windscreen|glass/.test(n)) return explanations.cockpit;
    if (/engine|nozzle|exhaust|turbine|intake/.test(n)) return explanations.engine;
    if (/wing/.test(n)) return explanations.wing;
    if (/tail|stabilizer|rudder|elevator|fin/.test(n)) return explanations.tail;
    if (/gear|wheel|tyre|tire/.test(n)) return explanations.landing;
    if (/fuselage|body|airframe/.test(n)) return explanations.fuselage;

    return {
      ...explanations.default,
      title: name || "Aircraft component"
    };
  }

  function clearModel() {
    while (aircraftRoot.children.length) {
      aircraftRoot.remove(aircraftRoot.children[0]);
    }

    parts = [];
    selectedPart = null;
    exploded = false;

    if (partList) partList.replaceChildren();

    if (title) title.textContent = "Select a component";
    if (description) {
      description.textContent =
        "Click a component in the 3D model or choose one from the list.";
    }
    if (fact) {
      fact.textContent = "Explore the components of your aircraft.";
    }

    const explodeButton = document.getElementById("explode3dBtn");
    if (explodeButton) explodeButton.textContent = "Exploded View";
  }

  function restoreMaterials() {
    for (const part of parts) {
      for (const mesh of part.meshes) {
        const materials = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];

        for (const material of materials) {
          if (!material) continue;

          if (material.emissive) {
            material.emissive.setRGB(0, 0, 0);
          }
        }
      }
    }
  }

  function renderPartList() {
    if (!partList) return;

    partList.replaceChildren();

    for (const part of parts) {
      const button = document.createElement("button");
      button.type = "button";
      button.className =
        "aircraft-part-button" +
        (selectedPart === part ? " active" : "");

      button.textContent = part.info.title;
      button.addEventListener("click", () => selectPart(part));

      partList.appendChild(button);
    }
  }

  function selectPart(part) {
    if (!part) return;

    restoreMaterials();
    selectedPart = part;

    for (const mesh of part.meshes) {
      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];

      for (const material of materials) {
        if (material?.emissive) {
          material.emissive.set("#ff0000");
        }
      }
    }

    if (title) title.textContent = part.info.title;
    if (description) description.textContent = part.info.description;
    if (fact) fact.textContent = part.info.fact;

    renderPartList();
  }

  function frameModel() {
    const box = new THREE.Box3().setFromObject(aircraftRoot);

    if (box.isEmpty()) return;

    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    modelSize = Math.max(size.x, size.y, size.z, 0.1);

    const distance = modelSize * 1.8;

    camera.position.set(
      center.x + distance,
      center.y + distance * 0.65,
      center.z + distance
    );

    camera.near = Math.max(modelSize / 1000, 0.01);
    camera.far = modelSize * 100;
    camera.updateProjectionMatrix();

    controls.target.copy(center);
    controls.minDistance = modelSize * 0.15;
    controls.maxDistance = modelSize * 10;
    controls.update();

    savedCameraPosition.copy(camera.position);
    savedTarget.copy(controls.target);
  }

  function setExploded() {
    if (!parts.length) return;

    exploded = !exploded;

    for (const part of parts) {
      for (const original of part.originals) {
        if (!exploded) {
          original.mesh.position.copy(original.position);
          continue;
        }

        const direction = original.worldPosition.clone();

        if (direction.lengthSq() < 0.0001) {
          direction.set(
            Math.sin(part.index * 2.4),
            (part.index % 3 - 1) * 0.6,
            Math.cos(part.index * 2.4)
          );
        }

        direction.normalize();

        original.mesh.position
          .copy(original.position)
          .addScaledVector(direction, modelSize * 0.12);
      }
    }

    const button = document.getElementById("explode3dBtn");
    if (button) {
      button.textContent = exploded
        ? "Reassemble Aircraft"
        : "Exploded View";
    }
  }

  function loadGLB(path, aircraftName) {
    const token = ++loadToken;

    clearModel();
    setStatus(`Loading ${aircraftName || "aircraft"}... 0%`);
    if (loadingOverlay) {
  loadingOverlay.style.display = "block";
  loadingOverlay.textContent = `Loading ${aircraftName || "aircraft"}... 0%`;
}

    loader.load(
      path,
      (gltf) => {
        if (token !== loadToken) return;
        if (loadingOverlay) {
  loadingOverlay.style.display = "none";
}
        

        try {
          const model = gltf.scene;
          aircraftRoot.add(model);

          model.updateMatrixWorld(true);

          const initialBox = new THREE.Box3().setFromObject(model);

          if (initialBox.isEmpty()) {
            throw new Error("The GLB contains no visible geometry.");
          }

          const initialCenter = initialBox.getCenter(new THREE.Vector3());
          model.position.sub(initialCenter);
          model.updateMatrixWorld(true);

          const grouped = new Map();

          model.traverse((object) => {
            if (!object.isMesh) return;

            object.castShadow = true;
            object.receiveShadow = true;

            const name = object.name?.trim() || "Unnamed component";

            if (!grouped.has(name)) grouped.set(name, []);
            grouped.get(name).push(object);
          });

          let index = 0;

          for (const [name, meshes] of grouped.entries()) {
            const originals = meshes.map((mesh) => {
              const meshBox = new THREE.Box3().setFromObject(mesh);

              return {
                mesh,
                position: mesh.position.clone(),
                worldPosition: meshBox.getCenter(new THREE.Vector3())
              };
            });

            parts.push({
              name,
              meshes,
              originals,
              info: getInfo(name),
              index: index++
            });
          }

          if (!parts.length) {
            throw new Error("No mesh components found in the GLB model.");
          }

          frameModel();
          renderPartList();
          selectPart(parts[0]);

          setStatus(
            `${aircraftName || "Aircraft"} loaded — ${parts.length} components`
          );

          console.log("Aircraft loaded successfully:", path, parts.length);
        } catch (error) {
          console.error("Aircraft setup failed:", error);
          setStatus("Could not prepare this model. Check the Console.");
        }
      },
      (event) => {
        if (token !== loadToken) return;

        if (event.total > 0) {
          const percent = Math.round((event.loaded / event.total) * 100);
const message = `Loading ${aircraftName || "aircraft"}... ${percent}%`;

setStatus(message);

if (loadingOverlay) {
  loadingOverlay.textContent = message;
  loadingOverlay.style.display = "block";
}
        }
      },
      (error) => {
        if (token !== loadToken) return;

        console.error("Failed to load model:", path, error);
        setStatus(`Failed to load ${aircraftName || "aircraft"}. Check Console.`);
      }
    );
  }

  function switchAircraft(key) {
    const aircraft = aircraftModels[key];

    if (!aircraft) {
      setStatus("Please choose a valid aircraft.");
      return;
    }

    controls.autoRotate = false;

    const rotateButton = document.getElementById("rotate3dBtn");
    if (rotateButton) rotateButton.textContent = "Auto Rotate: Off";

    loadGLB(aircraft.path, aircraft.name);
  }

  document.getElementById("explode3dBtn")?.addEventListener(
    "click",
    setExploded
  );

  document.getElementById("reset3dBtn")?.addEventListener("click", () => {
    for (const part of parts) {
      for (const original of part.originals) {
        original.mesh.position.copy(original.position);
      }
    }

    exploded = false;

    const explodeButton = document.getElementById("explode3dBtn");
    if (explodeButton) explodeButton.textContent = "Exploded View";

    camera.position.copy(savedCameraPosition);
    controls.target.copy(savedTarget);
    controls.autoRotate = false;
    controls.update();

    const rotateButton = document.getElementById("rotate3dBtn");
    if (rotateButton) rotateButton.textContent = "Auto Rotate: Off";
  });

  document.getElementById("rotate3dBtn")?.addEventListener("click", (event) => {
    controls.autoRotate = !controls.autoRotate;

    event.currentTarget.textContent = controls.autoRotate
      ? "Auto Rotate: On"
      : "Auto Rotate: Off";
  });

  // Register the dropdown listener only once.
  const modelSelect = document.getElementById("aircraft3dModel");

  if (modelSelect) {
    const existingValues = new Set(
      Array.from(modelSelect.options).map((option) => option.value)
    );

    for (const [key, aircraft] of Object.entries(aircraftModels)) {
      if (!existingValues.has(key)) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = aircraft.name;
        modelSelect.appendChild(option);
      }
    }

    modelSelect.addEventListener("change", (event) => {
      switchAircraft(event.target.value);
    });
  }

  renderer.domElement.addEventListener("click", (event) => {
    const rect = renderer.domElement.getBoundingClientRect();

    if (!rect.width || !rect.height) return;

    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);

    const meshes = parts.flatMap((part) => part.meshes);
    const hits = raycaster.intersectObjects(meshes, false);

    if (hits.length) {
      const part = parts.find((item) =>
        item.meshes.includes(hits[0].object)
      );

      if (part) selectPart(part);
    }
  });

  function resizeViewer() {
    const width = viewer.clientWidth;
    const height = viewer.clientHeight;

    if (!width || !height) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  const resizeObserver = new ResizeObserver(resizeViewer);
  resizeObserver.observe(viewer);
  window.addEventListener("resize", resizeViewer);
  resizeViewer();

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  if (modelSelect) {
    const initialKey = aircraftModels[modelSelect.value]
      ? modelSelect.value
      : "rafale";

    modelSelect.value = initialKey;
    switchAircraft(initialKey);
  } else {
    switchAircraft("rafale");
  }
}
