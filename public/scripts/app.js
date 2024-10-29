// public/scripts/app.js
document.addEventListener('DOMContentLoaded', () => {
    const modelUrl = document.querySelector('meta[name="model-url"]').getAttribute('content');
    const modelEntity = document.getElementById('model');
  
    // Load the GLTF model
    const loader = new THREE.GLTFLoader();
    loader.load(
      modelUrl,
      function (gltf) {
        modelEntity.object3D.add(gltf.scene);
        modelEntity.object3D.scale.set(0.5, 0.5, 0.5); // Adjust scale as needed
      },
      undefined,
      function (error) {
        console.error('An error occurred while loading the model:', error);
      }
    );
  });
  