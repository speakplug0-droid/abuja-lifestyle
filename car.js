class Car {
  constructor(scene, x = 0, z = 0) {
    this.scene = scene;

    // Main car group
    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    scene.add(this.group);

    this.speed = 0;
    this.maxSpeed = 0.42;
    this.acceleration = 0.012;
    this.turnSpeed = 0.035;

    this.loaded = false;

    // Temporary loading indicator
    const loadingMaterial = new THREE.MeshStandardMaterial({
      color: 0x777777,
      metalness: 0.8,
      roughness: 0.25
    });

    const loadingBody = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 1, 4.6),
      loadingMaterial
    );

    loadingBody.position.y = 0.8;
    this.group.add(loadingBody);

    this.loadModel();
  }

  async loadModel() {
    try {
      const module =
        await import(
          "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js"
        );

      const GLTFLoader = module.GLTFLoader;

      const loader = new GLTFLoader();

      loader.load(
        "car.glb",

        (gltf) => {
          // Remove temporary car
          while (this.group.children.length > 0) {
            this.group.remove(this.group.children[0]);
          }

          const model = gltf.scene;

          // Scale the downloaded model
          model.scale.set(1, 1, 1);

          // Center model
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());

          model.position.x -= center.x;
          model.position.z -= center.z;

          // Put wheels/body on the ground
          const newBox = new THREE.Box3().setFromObject(model);

          model.position.y -= newBox.min.y;

          // Grey luxury SUV look
          model.traverse((object) => {
            if (object.isMesh) {

              object.castShadow = true;
              object.receiveShadow = true;

              if (object.material) {

                if (Array.isArray(object.material)) {

                  object.material =
                    object.material.map((material) => {

                      const m = material.clone();

                      if (m.color) {
                        m.color.set(0x666666);
                      }

                      if ("metalness" in m) {
                        m.metalness = Math.max(
                          m.metalness,
                          0.55
                        );
                      }

                      if ("roughness" in m) {
                        m.roughness = 0.22;
                      }

                      return m;
                    });

                } else {

                  const material =
                    object.material.clone();

                  /*
                    Only change normal body
                    materials toward grey.

                    Glass, lights and tyres
                    should keep their original
                    appearance when possible.
                  */

                  const name =
                    (
                      object.material.name ||
                      object.name ||
                      ""
                    ).toLowerCase();

                  if (
                    !name.includes("glass") &&
                    !name.includes("window") &&
                    !name.includes("tire") &&
                    !name.includes("tyre") &&
                    !name.includes("wheel") &&
                    !name.includes("light")
                  ) {
                    if (material.color) {
                      material.color.set(0x666666);
                    }

                    if ("metalness" in material) {
                      material.metalness = 0.65;
                    }

                    if ("roughness" in material) {
                      material.roughness = 0.22;
                    }
                  }

                  object.material = material;
                }
              }
            }
          });

          this.group.add(model);

          this.model = model;

          this.loaded = true;

          console.log(
            "AbujaLifestyle 3D car loaded successfully."
          );
        },

        undefined,

        (error) => {
          console.error(
            "Could not load car.glb:",
            error
          );
        }
      );

    } catch (error) {

      console.error(
        "GLTFLoader error:",
        error
      );
    }
  }

  update(keys) {

    if (keys["w"]) {
      this.speed += this.acceleration;
    }

    if (keys["s"]) {
      this.speed -= this.acceleration;
    }

    // Natural slowdown
    this.speed *= 0.96;

    this.speed =
      Math.max(
        -this.maxSpeed,
        Math.min(
          this.maxSpeed,
          this.speed
        )
      );

    // Steering
    if (keys["a"]) {

      this.group.rotation.y +=
        this.turnSpeed *
        (Math.abs(this.speed) + 0.35);
    }

    if (keys["d"]) {

      this.group.rotation.y -=
        this.turnSpeed *
        (Math.abs(this.speed) + 0.35);
    }

    // Move car
    this.group.translateZ(this.speed);

    // Rotate wheels if the model exposes them
    if (this.model) {

      this.model.traverse((object) => {

        if (
          object.isMesh &&
          (
            object.name
              .toLowerCase()
              .includes("wheel") ||
            object.name
              .toLowerCase()
              .includes("tire") ||
            object.name
              .toLowerCase()
              .includes("tyre")
          )
        ) {

          object.rotation.x -=
            this.speed * 2;
        }

      });
    }
  }
}