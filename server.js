<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">

<meta name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

<title>AbujaLifestyle</title>

<style>

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #87ceeb;
  font-family: Arial, sans-serif;
}

#game {
  width: 100%;
  height: 100%;
  display: block;
  touch-action: none;
}

#title {
  position: fixed;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 2px 2px 5px black;
  z-index: 10;
  pointer-events: none;
}

#info {
  position: fixed;
  top: 55px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  text-shadow: 1px 1px 4px black;
  z-index: 10;
  pointer-events: none;
}

#online {
  position: fixed;
  top: 88px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 12px;
  border-radius: 14px;
  background: rgba(0,0,0,0.5);
  color: white;
  font-size: 13px;
  z-index: 20;
  pointer-events: none;
}

#mode {
  position: fixed;
  top: 125px;
  left: 50%;
  transform: translateX(-50%);
  padding: 7px 14px;
  border-radius: 15px;
  background: rgba(0,0,0,0.5);
  color: white;
  z-index: 20;
  pointer-events: none;
}

#controls {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 20;
}

button {
  width: 60px;
  height: 60px;
  margin: 4px;
  border: none;
  border-radius: 50%;
  background: rgba(0,0,0,0.55);
  color: white;
  font-size: 22px;
  touch-action: none;
  user-select: none;
}

#rightControls {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 20;
}

</style>
</head>

<body>

<div id="title">
  AbujaLifestyle
</div>

<div id="info">
  Abuja • Open World
</div>

<div id="online">
  Connecting...
</div>

<div id="mode">
  Driving
</div>

<div id="controls">

  <button id="forward">
    ▲
  </button>

  <br>

  <button id="left">
    ◀
  </button>

  <button id="back">
    ▼
  </button>

  <button id="right">
    ▶
  </button>

</div>

<div id="rightControls">

  <button id="jump">
    ⬆
  </button>

</div>

<canvas id="game"></canvas>

<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>

<script src="car.js"></script>

<script>

/* =========================================================
   SCENE
========================================================= */

const scene =
  new THREE.Scene();

scene.background =
  new THREE.Color(0x87ceeb);


/* =========================================================
   CAMERA
========================================================= */

const camera =
  new THREE.PerspectiveCamera(
    70,
    window.innerWidth /
    window.innerHeight,
    0.1,
    1000
  );

const cameraDistance = 11;

let cameraPitch = 0.45;

let cameraOrbit = 0;

const behindAngle = Math.PI;

const cameraTargetHeight = 1.2;


/* =========================================================
   RENDERER
========================================================= */

const renderer =
  new THREE.WebGLRenderer({
    canvas:
      document.getElementById("game"),
    antialias: true
  });

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  Math.min(
    window.devicePixelRatio,
    2
  )
);


/* =========================================================
   LIGHTING
========================================================= */

const sunlight =
  new THREE.DirectionalLight(
    0xffffff,
    2
  );

sunlight.position.set(
  50,
  100,
  50
);

scene.add(sunlight);


const ambient =
  new THREE.AmbientLight(
    0xffffff,
    0.6
  );

scene.add(ambient);


/* =========================================================
   GROUND
========================================================= */

const groundGeometry =
  new THREE.PlaneGeometry(
    500,
    500
  );

const groundMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x3f7d3a
  });

const ground =
  new THREE.Mesh(
    groundGeometry,
    groundMaterial
  );

ground.rotation.x =
  -Math.PI / 2;

scene.add(ground);


/* =========================================================
   ROADS
========================================================= */

function createRoad(
  x,
  z,
  width,
  depth
) {

  const geometry =
    new THREE.BoxGeometry(
      width,
      0.05,
      depth
    );

  const material =
    new THREE.MeshStandardMaterial({
      color: 0x333333
    });

  const road =
    new THREE.Mesh(
      geometry,
      material
    );

  road.position.set(
    x,
    0.03,
    z
  );

  scene.add(road);
}


createRoad(
  0,
  0,
  500,
  18
);

createRoad(
  0,
  0,
  18,
  500
);


/* =========================================================
   BUILDINGS
========================================================= */

function createBuilding(
  x,
  z,
  width,
  height,
  depth
) {

  const geometry =
    new THREE.BoxGeometry(
      width,
      height,
      depth
    );

  const material =
    new THREE.MeshStandardMaterial({
      color: 0xd0d0d0
    });

  const building =
    new THREE.Mesh(
      geometry,
      material
    );

  building.position.set(
    x,
    height / 2,
    z
  );

  scene.add(building);
}


for (
  let x = -100;
  x <= 100;
  x += 30
) {

  createBuilding(
    x,
    -45,
    18,
    10 + Math.random() * 20,
    18
  );

  createBuilding(
    x,
    45,
    18,
    10 + Math.random() * 20,
    18
  );
}


for (
  let z = -90;
  z <= 90;
  z += 30
) {

  createBuilding(
    -45,
    z,
    18,
    10 + Math.random() * 20,
    18
  );

  createBuilding(
    45,
    z,
    18,
    10 + Math.random() * 20,
    18
  );
}


/* =========================================================
   CONTROLS
========================================================= */

const keys = {};


window.addEventListener(
  "keydown",
  function(event) {

    keys[
      event.key.toLowerCase()
    ] = true;

  }
);


window.addEventListener(
  "keyup",
  function(event) {

    keys[
      event.key.toLowerCase()
    ] = false;

  }
);


function holdButton(
  id,
  key
) {

  const button =
    document.getElementById(id);

  button.addEventListener(
    "touchstart",
    function(event) {

      event.preventDefault();

      keys[key] = true;

    },
    { passive: false }
  );


  button.addEventListener(
    "touchend",
    function(event) {

      event.preventDefault();

      keys[key] = false;

    },
    { passive: false }
  );


  button.addEventListener(
    "touchcancel",
    function(event) {

      event.preventDefault();

      keys[key] = false;

    },
    { passive: false }
  );


  button.addEventListener(
    "mousedown",
    function() {

      keys[key] = true;

    }
  );


  button.addEventListener(
    "mouseup",
    function() {

      keys[key] = false;

    }
  );


  button.addEventListener(
    "mouseleave",
    function() {

      keys[key] = false;

    }
  );
}


holdButton(
  "forward",
  "w"
);

holdButton(
  "back",
  "s"
);

holdButton(
  "left",
  "a"
);

holdButton(
  "right",
  "d"
);


/* =========================================================
   MY CAR
========================================================= */

const car =
  new Car(
    scene,
    0,
    -5
  );


/* =========================================================
   MULTIPLAYER
========================================================= */

const otherPlayers =
  new Map();

let myPlayerId = null;


/*
   Create a simple visible vehicle
   for other online players.
*/
function createOtherPlayer() {

  const group =
    new THREE.Group();


  const body =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        2.2,
        0.7,
        4
      ),
      new THREE.MeshStandardMaterial({
        color: 0x444444,
        metalness: 0.5,
        roughness: 0.3
      })
    );

  body.position.y = 0.65;

  group.add(body);


  const roof =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        1.7,
        0.55,
        2
      ),
      new THREE.MeshStandardMaterial({
        color: 0x222222,
        metalness: 0.4,
        roughness: 0.3
      })
    );

  roof.position.y = 1.15;

  group.add(roof);


  const wheelMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x050505
    });


  const wheelPositions = [
    [-1.05,0.45,-1.35],
    [1.05,0.45,-1.35],
    [-1.05,0.45,1.35],
    [1.05,0.45,1.35]
  ];


  wheelPositions.forEach(
    (position) => {

      const wheel =
        new THREE.Mesh(
          new THREE.CylinderGeometry(
            0.4,
            0.4,
            0.3,
            20
          ),
          wheelMaterial
        );

      wheel.rotation.z =
        Math.PI / 2;

      wheel.position.set(
        position[0],
        position[1],
        position[2]
      );

      group.add(wheel);

    }
  );


  scene.add(group);

  return group;
}


/*
   Connect to the same server
   that is serving the game.
*/
function connectMultiplayer() {

  const protocol =
    location.protocol === "https:"
      ? "wss:"
      : "ws:";


  const socket =
    new WebSocket(
      protocol +
      "//" +
      location.host
    );


  socket.addEventListener(
    "open",
    function() {

      document.getElementById(
        "online"
      ).textContent =
        "🟢 Online";

    }
  );


  socket.addEventListener(
    "close",
    function() {

      document.getElementById(
        "online"
      ).textContent =
        "🔴 Offline";

    }
  );


  socket.addEventListener(
    "error",
    function() {

      document.getElementById(
        "online"
      ).textContent =
        "🔴 Connection error";

    }
  );


  socket.addEventListener(
    "message",
    function(event) {

      try {

        const data =
          JSON.parse(event.data);


        /*
          Server gives us our ID.
        */
        if (
          data.type ===
          "welcome"
        ) {

          myPlayerId =
            data.id;

          return;
        }


        /*
          Server sends every
          connected player.
        */
        if (
          data.type ===
          "players"
        ) {

          updateOtherPlayers(
            data.players
          );

        }

      } catch (error) {

        console.error(
          "Multiplayer message error:",
          error
        );

      }

    }
  );


  /*
    Send our position regularly.
  */
  setInterval(
    function() {

      if (
        socket.readyState !==
        WebSocket.OPEN
      ) {
        return;
      }


      if (!car.group) {
        return;
      }


      socket.send(
        JSON.stringify({
          type: "position",

          x:
            car.group.position.x,

          y:
            car.group.position.y,

          z:
            car.group.position.z,

          rotation:
            car.group.rotation.y
        })
      );

    },
    50
  );
}


function updateOtherPlayers(
  players
) {

  const activeIds =
    new Set();


  Object.entries(
    players
  ).forEach(
    ([id, data]) => {

      /*
        Don't display ourselves.
      */
      if (
        id === myPlayerId
      ) {
        return;
      }


      activeIds.add(id);


      let player =
        otherPlayers.get(id);


      if (!player) {

        player =
          createOtherPlayer();

        otherPlayers.set(
          id,
          player
        );
      }


      /*
        Smooth movement.
      */
      player.position.x +=
        (data.x -
          player.position.x) *
        0.35;

      player.position.y +=
        (data.y -
          player.position.y) *
        0.35;

      player.position.z +=
        (data.z -
          player.position.z) *
        0.35;


      player.rotation.y =
        data.rotation || 0;

    }
  );


  /*
    Remove players who disconnected.
  */
  for (
    const [
      id,
      player
    ] of otherPlayers
  ) {

    if (
      !activeIds.has(id)
    ) {

      scene.remove(
        player
      );

      otherPlayers.delete(
        id
      );
    }
  }


  /*
    Update online count.
  */
  const count =
    Object.keys(players).length;

  document.getElementById(
    "online"
  ).textContent =
    "🟢 Online players: " +
    count;
}


connectMultiplayer();


/* =========================================================
   CAMERA TOUCH CONTROL
========================================================= */

const canvas =
  document.getElementById(
    "game"
  );

let touchingCamera = false;

let lastTouchX = 0;
let lastTouchY = 0;


canvas.addEventListener(
  "touchstart",
  function(event) {

    if (
      event.touches.length !== 1
    ) {
      return;
    }

    touchingCamera = true;

    lastTouchX =
      event.touches[0].clientX;

    lastTouchY =
      event.touches[0].clientY;

  },
  { passive: false }
);


canvas.addEventListener(
  "touchmove",
  function(event) {

    if (!touchingCamera) {
      return;
    }

    if (
      event.touches.length !== 1
    ) {
      return;
    }

    event.preventDefault();

    const touch =
      event.touches[0];


    const deltaX =
      touch.clientX -
      lastTouchX;


    const deltaY =
      touch.clientY -
      lastTouchY;


    cameraOrbit -=
      deltaX * 0.008;


    cameraPitch -=
      deltaY * 0.006;


    cameraPitch =
      Math.max(
        0.12,
        Math.min(
          1.25,
          cameraPitch
        )
      );


    lastTouchX =
      touch.clientX;

    lastTouchY =
      touch.clientY;

  },
  { passive: false }
);


canvas.addEventListener(
  "touchend",
  function() {

    touchingCamera = false;

  }
);


canvas.addEventListener(
  "touchcancel",
  function() {

    touchingCamera = false;

  }
);


/* =========================================================
   CAMERA UPDATE
========================================================= */

function updateCamera() {

  const carPosition =
    car.group.position;


  const carRotation =
    car.group.rotation.y;


  const angle =
    carRotation +
    behindAngle +
    cameraOrbit;


  const horizontalDistance =
    cameraDistance *
    Math.cos(
      cameraPitch
    );


  const verticalDistance =
    cameraDistance *
    Math.sin(
      cameraPitch
    );


  const targetX =
    carPosition.x;


  const targetY =
    carPosition.y +
    cameraTargetHeight;


  const targetZ =
    carPosition.z;


  const desiredX =
    targetX +
    Math.sin(angle) *
    horizontalDistance;


  const desiredZ =
    targetZ +
    Math.cos(angle) *
    horizontalDistance;


  const desiredY =
    targetY +
    verticalDistance;


  camera.position.x +=
    (
      desiredX -
      camera.position.x
    ) * 0.12;


  camera.position.y +=
    (
      desiredY -
      camera.position.y
    ) * 0.12;


  camera.position.z +=
    (
      desiredZ -
      camera.position.z
    ) * 0.12;


  camera.lookAt(
    targetX,
    targetY,
    targetZ
  );
}


/* =========================================================
   GAME LOOP
========================================================= */

const clock =
  new THREE.Clock();


function animate() {

  requestAnimationFrame(
    animate
  );


  const delta =
    clock.getDelta();


  car.update(keys);


  /*
    Update car animations.
  */
  if (car.mixer) {

    car.mixer.update(
      delta
    );
  }


  updateCamera();


  renderer.render(
    scene,
    camera
  );
}


animate();


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
  "resize",
  function() {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

  }
);

</script>

</body>
</html>