// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const { engine } = require('express-handlebars');

const { JSDOM } = require('jsdom');
const THREE = require('three');
// const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader');
// const { DRACOLoader } = require('three/examples/jsm/loaders/DRACOLoader');
const app = express();
const PORT = 5000;
app.use(cors());



// Required to simulate a browser-like environment in Node
const dom = new JSDOM();
global.window = dom.window;
global.document = dom.window.document;
global.THREE = THREE;

// Serve the 3D model file
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/models', express.static(path.join(__dirname, 'models')));


// Set up Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routes
// app.get('/', (req, res) => {
// //   res.render('home', { modelUrl: '/models/mac-draco.glb' });
//   res.render('home', { layout: false, modelUrl: '/models/mac-draco.glb' });
// });

// app.get('/', (req, res) => {
//   res.send('3D Model Server Running');
// });


app.get('/load-model', async (req, res) => {
  try {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/'); // CDN path for Draco

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    const filePath = path.join(__dirname, 'models', 'model.glb'); // Path to your GLB file
    const arrayBuffer = fs.readFileSync(filePath);

    // Parse the GLB model file with Draco decompression
    loader.parse(arrayBuffer.buffer, '', (gltf) => {
      res.json(gltf); // Send the parsed GLTF data as JSON
    }, (error) => {
      console.error('Error loading GLTF model:', error);
      res.status(500).send('Failed to load model');
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send('An error occurred');
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
