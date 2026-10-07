class Car {
  constructor(scene, x = 0, z = 0) {
    this.scene = scene;
    this.group = new THREE.Group();

    /* =========================
       MATERIALS
    ========================= */

    const paint = new THREE.MeshStandardMaterial({
      color: 0x101010,
      metalness: 0.85,
      roughness: 0.18
    });

    const darkPaint = new THREE.MeshStandardMaterial({
      color: 0x070707,
      metalness: 0.7,
      roughness: 0.22
    });

    const glass = new THREE.MeshStandardMaterial({
      color: 0x071018,
      metalness: 0.35,
      roughness: 0.12,
      transparent: true,
      opacity: 0.82
    });

    const tire = new THREE.MeshStandardMaterial({
      color: 0x030303,
      roughness: 0.9
    });

    const rim = new THREE.MeshStandardMaterial({
      color: 0x9a9a9a,
      metalness: 1,
      roughness: 0.18
    });

    const chrome = new THREE.MeshStandardMaterial({
      color: 0x777777,
      metalness: 1,
      roughness: 0.15
    });

    const whiteLight = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 2
    });

    const redLight = new THREE.MeshStandardMaterial({
      color: 0x220000,
      emissive: 0xff0000,
      emissiveIntensity: 1.5
    });


    /* =========================
       MAIN SUV BODY
    ========================= */

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(2.55, 0.75, 4.65),
      paint
    );

    body.position.y = 0.82;
    this.group.add(body);


    /* Lower side section */

    const lowerBody = new THREE.Mesh(
      new THREE.BoxGeometry(2.62, 0.35, 4.72),
      darkPaint
    );

    lowerBody.position.y = 0.55;
    this.group.add(lowerBody);


    /* =========================
       BONNET
    ========================= */

    const bonnet = new THREE.Mesh(
      new THREE.BoxGeometry(2.35, 0.18, 1.35),
      paint
    );

    bonnet.position.set(
      0,
      1.18,
      -1.55
    );

    this.group.add(bonnet);


    /* =========================
       ROOF / CABIN
    ========================= */

    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(2.05, 0.62, 2.55),
      paint
    );

    roof.position.set(
      0,
      1.48,
      0.15
    );

    roof.rotation.x = -0.025;

    this.group.add(roof);


    /* =========================
       FRONT WINDSCREEN
    ========================= */

    const windshield = new THREE.Mesh(
      new THREE.BoxGeometry(1.82, 0.48, 0.055),
      glass
    );

    windshield.position.set(
      0,
      1.48,
      -1.16
    );

    windshield.rotation.x = -0.16;

    this.group.add(windshield);


    /* =========================
       REAR GLASS
    ========================= */

    const rearGlass = new THREE.Mesh(
      new THREE.BoxGeometry(1.82, 0.46, 0.055),
      glass
    );

    rearGlass.position.set(
      0,
      1.48,
      1.38
    );

    rearGlass.rotation.x = 0.12;

    this.group.add(rearGlass);


    /* =========================
       SIDE WINDOWS
    ========================= */

    const sideWindowGeometry =
      new THREE.BoxGeometry(
        0.045,
        0.48,
        2.15
      );


    const leftWindow = new THREE.Mesh(
      sideWindowGeometry,
      glass
    );

    leftWindow.position.set(
      -1.035,
      1.48,
      0.12
    );

    this.group.add(leftWindow);


    const rightWindow = new THREE.Mesh(
      sideWindowGeometry,
      glass
    );

    rightWindow.position.set(
      1.035,
      1.48,
      0.12
    );

    this.group.add(rightWindow);


    /* =========================
       BLACK ROOF
    ========================= */

    const roofTop = new THREE.Mesh(
      new THREE.BoxGeometry(
        2.12,
        0.08,
        2.65
      ),
      darkPaint
    );

    roofTop.position.set(
      0,
      1.82,
      0.12
    );

    this.group.add(roofTop);


    /* =========================
       FRONT GRILLE
    ========================= */

    const grille = new THREE.Mesh(
      new THREE.BoxGeometry(
        1.05,
        0.3,
        0.08
      ),
      darkPaint
    );

    grille.position.set(
      0,
      0.84,
      -2.36
    );

    this.group.add(grille);


    /* =========================
       FRONT LIGHTS
    ========================= */

    const headlightGeometry =
      new THREE.BoxGeometry(
        0.78,
        0.12,
        0.07
      );


    const leftHeadlight = new THREE.Mesh(
      headlightGeometry,
      whiteLight
    );

    leftHeadlight.position.set(
      -0.75,
      1.02,
      -2.38
    );

    this.group.add(leftHeadlight);


    const rightHeadlight = new THREE.Mesh(
      headlightGeometry,
      whiteLight
    );

    rightHeadlight.position.set(
      0.75,
      1.02,
      -2.38
    );

    this.group.add(rightHeadlight);


    /* =========================
       REAR LIGHT BAR
    ========================= */

    const rearLight = new THREE.Mesh(
      new THREE.BoxGeometry(
        2.0,
        0.11,
        0.07
      ),
      redLight
    );

    rearLight.position.set(
      0,
      1.0,
      2.36
    );

    this.group.add(rearLight);


    /* =========================
       BUMPERS
    ========================= */

    const frontBumper = new THREE.Mesh(
      new THREE.BoxGeometry(
        2.45,
        0.28,
        0.16
      ),
      darkPaint
    );

    frontBumper.position.set(
      0,
      0.48,
      -2.4
    );

    this.group.add(frontBumper);


    const rearBumper = new THREE.Mesh(
      new THREE.BoxGeometry(
        2.45,
        0.28,
        0.16
      ),
      darkPaint
    );

    rearBumper.position.set(
      0,
      0.48,
      2.4
    );

    this.group.add(rearBumper);


    /* =========================
       SIDE SKIRTS
    ========================= */

    const leftSkirt = new THREE.Mesh(
      new THREE.BoxGeometry(
        0.13,
        0.22,
        3.7
      ),
      darkPaint
    );

    leftSkirt.position.set(
      -1.28,
      0.48,
      0
    );

    this.group.add(leftSkirt);


    const rightSkirt = new THREE.Mesh(
      new THREE.BoxGeometry(
        0.13,
        0.22,
        3.7
      ),
      darkPaint
    );

    rightSkirt.position.set(
      1.28,
      0.48,
      0
    );

    this.group.add(rightSkirt);


    /* =========================
       WHEELS
    ========================= */

    const wheelGeometry =
      new THREE.CylinderGeometry(
        0.52,
        0.52,
        0.34,
        32
      );

    this.wheels = [];

    const wheelPositions = [
      [-1.28, 0.52, -1.55],
      [ 1.28, 0.52, -1.55],
      [-1.28, 0.52,  1.55],
      [ 1.28, 0.52,  1.55]
    ];


    wheelPositions.forEach(pos => {

      const wheel = new THREE.Mesh(
        wheelGeometry,
        tire
      );

      wheel.rotation.z =
        Math.PI / 2;

      wheel.position.set(
        pos[0],
        pos[1],
        pos[2]
      );

      this.group.add(wheel);

      this.wheels.push(wheel);


      /* Rim */

      const rimMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.29,
          0.29,
          0.36,
          24
        ),
        rim
      );

      rimMesh.rotation.z =
        Math.PI / 2;

      rimMesh.position.set(
        pos[0],
        pos[1],
        pos[2]
      );

      this.group.add(rimMesh);


      /* Center cap */

      const center = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.09,
          0.09,
          0.38,
          16
        ),
        chrome
      );

      center.rotation.z =
        Math.PI / 2;

      center.position.set(
        pos[0],
        pos[1],
        pos[2]
      );

      this.group.add(center);
    });


    /* =========================
       SIDE MIRRORS
    ========================= */

    const mirrorGeometry =
      new THREE.BoxGeometry(
        0.18,
        0.16,
        0.28
      );


    const leftMirror = new THREE.Mesh(
      mirrorGeometry,
      darkPaint
    );

    leftMirror.position.set(
      -1.16,
      1.35,
      -0.82
    );

    this.group.add(leftMirror);


    const rightMirror = new THREE.Mesh(
      mirrorGeometry,
      darkPaint
    );

    rightMirror.position.set(
      1.16,
      1.35,
      -0.82
    );

    this.group.add(rightMirror);


    /* =========================
       DOOR HANDLES
    ========================= */

    const handleGeometry =
      new THREE.BoxGeometry(
        0.32,
        0.055,
        0.07
      );


    for (const side of [-1, 1]) {

      const handle1 = new THREE.Mesh(
        handleGeometry,
        chrome
      );

      handle1.position.set(
        side * 1.065,
        1.0,
        -0.35
      );

      this.group.add(handle1);


      const handle2 = new THREE.Mesh(
        handleGeometry,
        chrome
      );

      handle2.position.set(
        side * 1.065,
        1.0,
        0.65
      );

      this.group.add(handle2);
    }


    /* =========================
       EXHAUSTS
    ========================= */

    for (const side of [-0.62, 0.62]) {

      const exhaust = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.09,
          0.09,
          0.28,
          16
        ),
        chrome
      );

      exhaust.rotation.x =
        Math.PI / 2;

      exhaust.position.set(
        side,
        0.42,
        2.5
      );

      this.group.add(exhaust);
    }


    /* =========================
       POSITION
    ========================= */

    this.group.position.set(
      x,
      0,
      z
    );

    scene.add(this.group);


    /* =========================
       DRIVING
    ========================= */

    this.speed = 0;
    this.maxSpeed = 0.35;
    this.acceleration = 0.008;
    this.turnSpeed = 0.035;
  }


  update(keys) {

    if (keys["w"]) {
      this.speed += this.acceleration;
    }

    if (keys["s"]) {
      this.speed -= this.acceleration;
    }

    this.speed *= 0.96;

    this.speed = Math.max(
      -this.maxSpeed,
      Math.min(
        this.maxSpeed,
        this.speed
      )
    );


    if (keys["a"]) {
      this.group.rotation.y +=
        this.turnSpeed;
    }

    if (keys["d"]) {
      this.group.rotation.y -=
        this.turnSpeed;
    }


    this.group.translateZ(
      this.speed
    );


    this.wheels.forEach(wheel => {
      wheel.rotation.x -=
        this.speed * 2;
    });
  }
}