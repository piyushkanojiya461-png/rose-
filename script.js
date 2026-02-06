const canvas = document.getElementById('scene');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Bouquet (simple elegant flower group)
const bouquet = new THREE.Group();

for (let i = 0; i < 7; i++) {
  const geometry = new THREE.SphereGeometry(0.25, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0xf2a1b3
  });
  const flower = new THREE.Mesh(geometry, material);
  flower.position.set(
    Math.sin(i) * 0.8,
    Math.cos(i) * 0.8,
    0
  );
  bouquet.add(flower);
}

scene.add(bouquet);

function animate() {
  requestAnimationFrame(animate);
  bouquet.rotation.y += 0.003;
  bouquet.rotation.x += 0.001;
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

