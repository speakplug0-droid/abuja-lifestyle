class Car {
  constructor(scene, x = 0, z = 0) {
    this.scene = scene;

    this.group = new THREE.Group();

    // Car body
    const bodyGeometry = new THREE.BoxGeometry(2.2, 0.6, 4.5);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.7,
      roughness: 0.25
    });

    const body = new THREE.Mesh(
      bodyGeometry,
      bodyMaterial
    );

    body.position.y = 0.75;
    this.group.add(body);

    // Car roof
    const roofGeometry = new THREE.BoxGeometry(1.7, 0.55, 2.2);
    const roofMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 0.5,
      roughness: 0.3
    });

    const roof = new THREE.Mesh(
      roofGeometry,
      roofMaterial
    );

    roof.position.set(0, 1.25, -0.1);
    this.group.add(roof);

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(
      0.42,
      0.42,
      0.28,
      24
    );

    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: 0x080808,
      roughness: 0.8
    });

    const wheelPositions = [
      [-1.05, 0.45, 1.45],
      [1.05, 0.45, 1.45],
      [-1.05, 0.45, -1.45],
      [1.05, 0.45, -1.45]
    ];

    this.wheels = [];

    wheelPositions.forEach(position => {
      const wheel = new THREE.Mesh(
        wheelGeometry,
        wheelMaterial
      );

      wheel.rotation.z = Math.PI / 2;

      wheel.position.set(
        position[0],
        position[1],
        position[2]
      );

      this.group.add(wheel);
      this.wheels.push(wheel);
    });

    // Headlights
    const lightGeometry =
      new THREE.BoxGeometry(0.45, 0.18, 0.08);

    const lightMaterial =
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff
      });

    const leftLight =
      new THREE.Mesh(lightGeometry, lightMaterial);

    leftLight.position.set(-0.65, 0.85, -2.28);

    const rightLight =
      new THREE.Mesh(lightGeometry, lightMaterial);

    rightLight.position.set(0.65, 0.85, -2.28);

    this.group.add(leftLight);
    this.group.add(rightLight);

    // Position
    this.group.position.set(x, 0, z);

    scene.add(this.group);

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
      Math.min(this.maxSpeed, this.speed)
    );

    if (keys["a"]) {
      this.group.rotation.y += this.turnSpeed;
    }

    if (keys["d"]) {
      this.group.rotation.y -= this.turnSpeed;
    }

    this.group.translateZ(this.speed);

    // Wheel rotation
    this.wheels.forEach(wheel => {
      wheel.rotation.x -= this.speed * 2;
    });
  }
}