class Car {
  constructor(scene, x = 0, z = 0) {
    this.scene = scene;

    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    scene.add(this.group);

    this.speed = 0;
    this.maxSpeed = 0.42;
    this.acceleration = 0.012;
    this.turnSpeed = 0.035;

    this.model = null;

    this.loadModel();
  }

  async loadModel() {
    try {
      const module = await import(
        "https://esm.sh/three@0.160.0/examples/jsm/loaders/GLTFLoader.js"
      );

      const loader = new module.GLTFLoader();

      loader.load(
        "https://cdn.3dassets.dev/assets/32519/v1/model.glb",

        (gltf) => {

          const model = gltf.scene;

          /* Remove old contents */
          while (this.group.children.length > 0) {
            this.group.remove(
              this.group.children[0]
            );
          }

          /* Calculate original size */
          const box =
            new THREE.Box3().setFromObject(model);

          const size =
            box.getSize(new THREE.Vector3());

          /*
            Make the SUV a realistic
            game size.
          */
          const targetLength = 4.8;

          if (size.z > 0) {

            const scale =
              targetLength / size.z;

            model.scale.setScalar(scale);
          }

          /* Recalculate after scaling */
          const scaledBox =
            new THREE.Box3().setFromObject(model);

          const center =
            scaledBox.getCenter(
              new THREE.Vector3()
            );

          /* Center the vehicle */
          model.position.x -= center.x;
          model.position.z -= center.z;

          /* Put vehicle on ground */
          const groundBox =
            new THREE.Box3().setFromObject(model);

          model.position.y -= groundBox.min.y;

          /*
            Improve every part of the
            vehicle.
          */
          model.traverse((object) => {

            if (!object.isMesh) return;

            object.castShadow = true;
            object.receiveShadow = true;

            if (!object.material) return;

            const materials =
              Array.isArray(object.material)
                ? object.material
                : [object.material];

            materials.forEach((material) => {

              const name = (
                material.name ||
                object.name ||
                ""
              ).toLowerCase();

              /*
                Keep these parts natural.
              */
              const keepOriginal =
                name.includes("glass") ||
                name.includes("window") ||
                name.includes("wheel") ||
                name.includes("tire") ||
                name.includes("tyre") ||
                name.includes("light") ||
                name.includes("lamp");

              /*
                Grey luxury SUV body.
              */
              if (
                !keepOriginal &&
                material.color
              ) {

                material.color.set(
                  0x707070
                );
              }

              if (
                "metalness" in material &&
                !keepOriginal
              ) {

                material.metalness = 0.7;
              }

              if (
                "roughness" in material &&
                !keepOriginal
              ) {

                material.roughness = 0.2;
              }
            });
          });

          this.group.add(model);

          this.model = model;

          console.log(
            "AbujaLifestyle: REAL SUV LOADED"
          );

          /*
            Play model animation if
            the downloaded asset has one.
          */
          if (
            gltf.animations &&
            gltf.animations.length > 0
          ) {

            this.mixer =
              new THREE.AnimationMixer(model);

            this.mixer.clipAction(
              gltf.animations[0]
            ).play();
          }
        },

        (progress) => {

          if (progress.total) {

            const percent =
              (progress.loaded /
                progress.total) *
              100;

            console.log(
              "SUV loading:",
              percent.toFixed(0) + "%"
            );
          }
        },

        (error) => {

          console.error(
            "SUV MODEL ERROR:",
            error
          );
        }
      );

    } catch (error) {

      console.error(
        "GLTF LOADER ERROR:",
        error
      );
    }
  }

  update(keys) {

    /* Forward */
    if (keys["w"]) {

      this.speed +=
        this.acceleration;
    }

    /* Reverse */
    if (keys["s"]) {

      this.speed -=
        this.acceleration;
    }

    /* Natural slowdown */
    this.speed *= 0.96;

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
        this.turnSpeed *
        (Math.abs(this.speed) + 0.3);
    }

    if (keys["d"]) {

      this.group.rotation.y -=
        this.turnSpeed *
        (Math.abs(this.speed) + 0.3);
    }

    /* Move */
    this.group.translateZ(
      this.speed
    );

    /* Model animation */
    if (this.mixer) {

      this.mixer.update(0.016);
    }
  }
}