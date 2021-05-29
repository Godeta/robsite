import React, { Component} from 'react';
/* { useEffect, useState }
import sanityClient from '../client.js';
import backgroundComputerScience from '../img/background_computer_science.jpg';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';*/

// toute la partie pour utiliser three.js
import ReactDOM from "react-dom";
import * as THREE from "three";
// import OrbitControls from 'three-orbitcontrols';
// images ou textures
import backgroundImage from '../img/space_background.jpg';
import characterImage from '../img/portfolio2021.png';
import moonT from '../img/moon.jpg';
import normalMap from '../img/normalMap.jpg';

/**
 * ce que fait mon three.js
 */
class App extends Component {
    
    // animations avec three.js
  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild( renderer.domElement );
    camera.position.z = 30;
    
    // objets à ajouter
    var geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
    var material = new THREE.MeshStandardMaterial( { color: 0xff6347  } );
    var torus = new THREE.Mesh( geometry, material );
    scene.add( torus );
    
    // pour ajouter beaucoup d'étoiles
    function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial( {color: 0xffffff})
    const star = new THREE.Mesh( geometry, material);
    const [x,y,z] = Array(3).fill().map( ()=> THREE.MathUtils.randFloatSpread(100));
    star.position.set(x,y,z);
    scene.add(star);
    }
    Array(200).fill().forEach(addStar);

    // Avatar
    const characterTexture = new THREE.TextureLoader().load(characterImage);
    const characterObject = new THREE.Mesh ( 
        new THREE.BoxGeometry(3,3,3),
        new THREE.MeshBasicMaterial( { map:characterTexture})
    );
    scene.add(characterObject);
    characterObject.position.z = -5;
    characterObject.position.x = 2;
    // Moon

    const moonTexture = new THREE.TextureLoader().load(moonT);
    const normalTexture = new THREE.TextureLoader().load(normalMap);

    const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
    })
    );
    scene.add(moon);
    moon.position.z = 30;
    moon.position.setX(-10);

    // ajouter des textures (image de fond au lieu du vide par exemple)
    const spaceTexture = new THREE.TextureLoader().load(backgroundImage);
    scene.background = spaceTexture;
    
    // lumières
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5,5,5);
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);
    
    // pour m'aider lors du développement à visualiser comment placer mes éléments
    // const lightHelper = new THREE.PointLightHelper(pointLight);
    // const gridHelper = new THREE.GridHelper(200,50);
    // scene.add(lightHelper, gridHelper);
    
    // contrôles
    // const controls = new OrbitControls(camera, renderer.domElement);

    // pour gérer le mouvement en scroll 
    function moveCamera() {
      // pour savoir à qu'elle distance on est du début de la page
      const t = document.body.getBoundingClientRect().top;
      moon.rotation.x += 0.05;
      moon.rotation.y += 0.075;
      moon.rotation.z += 0.05;

      characterObject.rotation.y += 0.01;
      characterObject.rotation.z += 0.01;

      camera.position.z = t* -0.01;
      camera.position.x = t* -0.0002;
      camera.position.y = t* -0.0002;
    }
    document.body.onscroll = moveCamera;
    
    // gère l'animation des objets
    var animate = function () {
      requestAnimationFrame( animate );
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.01;

      // controls.update();
      renderer.render( scene, camera );
    };
    animate();
    // effectué une fois au début pour mettre la camera direct au bon endroit
    moveCamera();
  }
  
  //   ce que l'on va afficher
  render() {
    return (
        <main className="">
          
          <div  ref={ref => (this.mount = ref)} className="fixed"> </div>
          <div id="content" className="z-50 absolute block grid grid-cols-12 gap-4 text-gray-50 mx-0 my-auto px-120 py-0 ">
          <h1 className="font-bold">Jeff Delaney</h1>
          <p>🚀 Welcome to my website!</p>

        <section className="grid col-start-2 col-end-8 bg-gray-800 p-4">
          <h2 className="font-bold">📜 Manifesto</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

        </section>

        <section className="grid col-start-2 col-end-8 bg-gray-800 p-4 light">
          <h2 className="font-bold">👩🏽‍🚀 Projects</h2>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <h2 className="font-bold">🏆 Accomplishments</h2>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

        </section>


        <section className="grid col-start-2 col-end-8 bg-gray-800 p-4 left">
          <h2 className="font-bold">🌮 Work History</h2>

          <h3 className="font-bold">McDonalds</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h3 className="font-bold">Burger King</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h3 className="font-bold">Taco Bell</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

        </section>

        </div>
      </main>
    )
  }
}

const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
/*
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
    return builder.image(source);
}
*/
export default function About() {

    return ReactDOM.render(<App />, rootElement);

    /*const [author, setAuthor] = useState(null);

    useEffect(()=> {
        sanityClient.fetch(`*[_type == "author"] {
            name,
            bio,
            "authorImage": image.asset->url,
        }`).then((data) => setAuthor(data[0])).catch(console.error);
        }, []);
        if(!author) return <div> En cours de chargement...</div>;
        */
        /*return  (
            <main className="relative"> 
                <img src={backgroundComputerScience} alt="setup pour programmer" className="absolute w-full" />
                <div className="p-10 lg:pt-48 container mx-auto relative">
                    <section className="grid col-start-2 col-end-8 bg-gray-800 p-4"className="bg-green-800 rounded-lg shadow-2xl lg:flex p-20">
                        <img src={urlFor(author.authorImage).url()} className="rounded w-32 h-32 lg:w-64 lg:h-64 mr-8" alt= {author.name} />
                        <div className="text-lg flex flex-col justify-center">
                            <h1 className="cursive text-6xl text-green-300 mb-4"> Salut ! Je suis {" "} 
                            <span className="text-green-100"> {author.name} </span></h1>
                            <div className="prose lg:prose-xl text-white">
                                <BlockContent blocks={author.bio} projectId="48fh369m" dataset="production" />
                            </div>
                        </div>
                    </section>
                </div>
            </main> 
        )*/
}