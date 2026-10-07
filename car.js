class Car {
  constructor(scene, x = 0, z = 0) {
    this.scene = scene;

    this.group = new THREE.Group();

    /* =========================
       CAR BODY
    ========================= */

    const bodyGeometry =
      new THREE.BoxGeometry(2.4, 0.65, 4.8);

    const bodyMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x151515,
        metalness: 0.8,
        roughness: 0.22
      });

    const body =
      new THREE.Mesh(
        bodyGeometry,
        bodyMaterial
      );

    body.position.y = 0.8;

    this.group.add(body);


    /* =========================
       LOWER BODY
    ========================= */

    const lowerGeometry =
      new THREE.BoxGeometry(2.55, 0.35, 4.9);

    const lowerMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x090909,
        metalness: 0.65,
        roughness: 0.3
      });

    const lowerBody =
      new THREE.Mesh(
        lowerGeometry,
        lowerMaterial
      );

    lowerBody.position.y = 0.55;

    this.group.add(lowerBody);


    /* =========================
       CABIN
    ========================= */

    const cabinGeometry =
      new THREE.BoxGeometry(1.85, 0.8, 2.35);

    const cabinMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x202020,
        metalness: 0.6,
        roughness: 0.2
      });

    const cabin =
      new THREE.Mesh(
        cabinGeometry,
        cabinMaterial
      );

    cabin.position.set(
      0,
      1.35,
      -0.15
    );

    this.group.add(cabin);


    /* =========================
       WINDOWS
    ========================= */

    const windowMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x07131c,
        metalness: 0.5,
        roughness: 0.15,
        transparent: true,
        opacity: 0.82
      });


    /* Front windshield */

    const frontWindow =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          1.65,
          0.5,
          0.04
        ),
        windowMaterial
      );

    frontWindow.position.set(
      0,
      1.48,
      -1.34
    );

    this.group.add(frontWindow);


    /* Rear window */

    const rearWindow =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          1.65,
          0.5,
          0.04
        ),
        windowMaterial
      );

    rearWindow.position.set(
      0,
      1.48,
      1.04
    );

    this.group.add(rearWindow);


    /* Side windows */

    const sideWindowGeometry =
      new THREE.BoxGeometry(
        0.04,
        0.5,
        1.75
      );


    const leftWindow =
      new THREE.Mesh(
        sideWindowGeometry,
        windowMaterial
      );

    leftWindow.position.set(
      -0.94,
      1.48,
      -0.15
    );

    this.group.add(leftWindow);


    const rightWindow =
      new THREE.Mesh(
        sideWindowGeometry,
        windowMaterial
      );

    rightWindow.position.set(
      0.94,
      1.48,
      -0.15
    );

    this.group.add(rightWindow);


    /* =========================
       WHEELS
    ========================= */

    const wheelGeometry =
      new THREE.CylinderGeometry(
        0.48,
        0.48,
        0.32,
        32
      );

    const tireMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x050505,
        roughness: 0.9
      });

    const rimMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x777777,
        metalness: 0.9,
        roughness: 0.2
      });


    this.wheels = [];


    const wheelPositions = [
      [-1.18, 0.48, 1.55],
      [ 1.18, 0.48, 1.55],
      [-1.18, 0.48, -1.55],
      [ 1.18, 0.48, -1.55]
    ];


    wheelPositions.forEach(
      (position) => {

        const wheel =
          new THREE.Mesh(
            wheelGeometry,
            tireMaterial
          );

        wheel.rotation.z =
          Math.PI / 2;

        wheel.position.set(
          position[0],
          position[1],
          position[2]
        );

        this.group.add(wheel);

        this.wheels.push(wheel);


        /* Rim */

        const rim =
          new THREE.Mesh(
            new THREE.CylinderGeometry(
              0.25,
              0.25,
              0.34,
              24
            ),
            rimMaterial
          );

        rim.rotation.z =
          Math.PI / 2;

        rim.position.set(
          position[0],
          position[1],
          position[2]
        );

        this.group.add(rim);
      }
    );


    /* =========================
       HEADLIGHTS
    ========================= */

    const headlightMaterial =
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 2
      });


    const leftHeadlight =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          0.55,
          0.2,
          0.08
        ),
        headlightMaterial
      );

    leftHeadlight.position.set(
      -0.72,
      0.88,
      -2.43
    );

    this.group.add(leftHeadlight);


    const rightHeadlight =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          0.55,
          0.2,
          0.08
        ),
        headlightMaterial
      );

    rightHeadlight.position.set(
      0.72,
      0.88,
      -2.43
    );

    this.group.add(rightHeadlight);


    /* =========================
       REAR LIGHTS
    ========================= */

    const rearLightMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x550000,
        emissive: 0xff0000,
        emissiveIntensity: 1.2
      });


    const leftRearLight =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          0.5,
          0.2,
          0.08
        ),
        rearLightMaterial
      );

    leftRearLight.position.set(
      -0.72,
      0.88,
      2.43
    );

    this.group.add(leftRearLight);


    const rightRearLight =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          0.5,
          0.2,
          0.08
        ),
        rearLightMaterial
      );

    rightRearLight.position.set(
      0.72,
      0.88,
      2.43
    );

    this.group.add(rightRearLight);


    /* =========================
       BUMPERS
    ========================= */

    const bumperMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x080808,
        metalness: 0.7,
        roughness: 0.25
      });


    const frontBumper =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          2.35,
          0.25,
          0.18
        ),
        bumperMaterial
      );

    frontBumper.position.set(
      0,
      0.52,
      -2.45
    );

    this.group.add(frontBumper);


    const rearBumper =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          2.35,
          0.25,
          0.18
        ),
        bumperMaterial
      );

    rearBumper.position.set(
      0,
      0.52,
      2.45
    );

    this.group.add(rearBumper);


    /* =========================
       EXHAUST
    ========================= */

    const exhaustMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x555555,
        metalness: 1,
        roughness: 0.2
      });


    const exhaust1 =
      new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.08,
          0.08,
          0.35,
          16
        ),
        exhaustMaterial
      );

    exhaust1.rotation.x =
      Math.PI / 2;

    exhaust1.position.set(
      -0.65,
      0.45,
      2.52
    );

    this.group.add(exhaust1);


    const exhaust2 =
      exhaust1.clone();

    exhaust2.position.x =
      0.65;

    this.group.add(exhaust2);


    /* =========================
       CAR POSITION
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

    /* Acceleration */

    if (keys["w"]) {
      this.speed +=
        this.acceleration;
    }


    /* Reverse */

    if (keys["s"]) {
      this.speed -=
        this.acceleration;
    }


    /* Friction */

    this.speed *= 0.96;


    /* Speed limit */

    this.speed =
      Math.max(
        -this.maxSpeed,
        Math.min(
          this.maxSpeed,
          this.speed
        )
      );


    /* Steering */

    if (keys["a"]) {

      this.group.rotation.y +=
        this.turnSpeed;
    }


    if (keys["d"]) {

      this.group.rotation.y -=
        this.turnSpeed;
    }


    /* Move car */

    this.group.translateZ(
      this.speed
    );


    /* Rotate wheels */

    this.wheels.forEach(
      (wheel) => {

        wheel.rotation.x -=
          this.speed * 2;

      }
    );
  }
}