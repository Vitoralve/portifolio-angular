import {
  Component,
  ElementRef,
  OnInit,
  HostListener,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-morb-animation',
  templateUrl: './morb-animation.component.html',
  styleUrls: ['./morb-animation.component.scss'],
})
export class MorphAnimationComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private mixer!: THREE.AnimationMixer;

  constructor() {}

  ngOnInit(): void {
    // Lógica que não depende de `nativeElement`
  }

  ngAfterViewInit(): void {
    // Lógica que depende do acesso a `nativeElement`
    this.initThreeJs();
    this.animate();
  }

  initThreeJs() {
    // Definir o tamanho personalizado do canvas
    const width = 800; // Largura personalizada do canvas
    const height = 600; // Altura personalizada do canvas

    // Adicionando alpha: true para fundo transparente
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setClearColor(0x000000, 0); // Cor de fundo transparente
    this.renderer.setSize(width, height);
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 1, 5); // Ajuste da câmera para melhor visualização

    // Adicionando luzes à cena
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 10);
    this.scene.add(directionalLight);

    // Adicionando uma luz ambiente para suavizar a iluminação
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Luz ambiente suave
    this.scene.add(ambientLight);

    // Adicionando uma luz pontual para destacar o modelo
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 5, 5);
    this.scene.add(pointLight);

    // Carregando o modelo GLTF
    const loader = new GLTFLoader();
    loader.load('assets/RobotExpressive.glb', (gltf) => {
      const model = gltf.scene;

      // Reduzindo o tamanho do modelo
      model.scale.set(0.5, 0.5, 0.5); // Diminuir o tamanho em 50%

      this.scene.add(model);

      // Configurando o mixer e a animação
      this.mixer = new THREE.AnimationMixer(model);
      const action = this.mixer.clipAction(gltf.animations[2]);

      // Definindo o timeScale de forma randômica
      const randomTimeScale = 0.5 + Math.random() * (1.0 - 0.5);
      action.timeScale = randomTimeScale;

      action.play();

      // // Função para animar a expressão de raiva nas sobrancelhas
      // this.startEyebrowAnimation(model);
    });
  }

  // Função para definir a expressão de raiva nas sobrancelhas
  setAngryEyebrows(model: any) {
    const headMesh = model.getObjectByName('Head_4'); // Focando na malha 'Head_4'

    if (headMesh instanceof THREE.Mesh && headMesh.morphTargetDictionary) {
      const angryIndex = headMesh.morphTargetDictionary['Angry'];

      console.log('angryIndex:', angryIndex);

      if (angryIndex !== undefined) {
        headMesh.updateMorphTargets();

        if (Array.isArray(headMesh.morphTargetInfluences)) {
          headMesh.morphTargetInfluences[angryIndex] = 1.0;
          console.log(`Angry expression set for Head_4`);
        }
      }
    }
  }

  // Função para resetar as sobrancelhas para o estado normal
  resetEyebrows(model: any) {
    const headMesh = model.getObjectByName('Head_4'); // Focando na malha 'Head_4'

    if (headMesh instanceof THREE.Mesh && headMesh.morphTargetDictionary) {
      const angryIndex = headMesh.morphTargetDictionary['Angry'];

      if (angryIndex !== undefined) {
        headMesh.updateMorphTargets();

        if (Array.isArray(headMesh.morphTargetInfluences)) {
          headMesh.morphTargetInfluences[angryIndex] = 0.0;
          console.log(`Angry expression reset for Head_4`);
        }
      }
    }
  }

  // Função para alternar entre as expressões de raiva e normal a cada 0.5 segundos
  startEyebrowAnimation(model: any) {
    let isAngry = true;

    // Alterna a expressão a cada 500ms
    setInterval(() => {
      if (isAngry) {
        this.setAngryEyebrows(model);
      } else {
        this.resetEyebrows(model);
      }

      isAngry = !isAngry;
    }, 500);
  }

  // Função para listar os morph targets de cada malha
  listMorphTargets(model: any) {
    const headMeshes = ['Head_2', 'Head_3', 'Head_4'];

    headMeshes.forEach((headName) => {
      const headMesh = model.getObjectByName(headName);

      if (headMesh instanceof THREE.Mesh) {
        if (headMesh.morphTargetDictionary) {
          console.log(
            `Morph targets for ${headName}:`,
            Object.keys(headMesh.morphTargetDictionary)
          );
        } else {
          console.log(`No morph targets found for ${headName}`);
        }
      } else {
        console.log(`No mesh found for ${headName}`);
      }
    });
  }
  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.mixer) {
      this.mixer.update(0.01);
    }

    this.renderer.render(this.scene, this.camera);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    const width = 800; // Manter o canvas com largura personalizada
    const height = 600; // Manter o canvas com altura personalizada

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}
