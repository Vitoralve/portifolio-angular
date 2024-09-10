import { Component, ElementRef, OnInit, HostListener } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-face-follower-three',
  templateUrl: './face-follower-three.component.html',
  styleUrls: ['./face-follower-three.component.scss'],
})
export class FaceFollowerThreeComponent implements OnInit {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private face!: THREE.Mesh;
  private leftEyeWhite!: THREE.Mesh;
  private rightEyeWhite!: THREE.Mesh;
  private leftPupil!: THREE.Mesh;
  private rightPupil!: THREE.Mesh;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.initThreeJS();
    this.createFace();
    this.animate();
  }

  private initThreeJS(): void {
    const width = this.elRef.nativeElement.clientWidth;
    const height = this.elRef.nativeElement.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Define alpha para transparência
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 0); // Define o fundo como transparente
    this.renderer.shadowMap.enabled = true;
    this.elRef.nativeElement.appendChild(this.renderer.domElement);

    this.camera.position.z = 5;
  }

  private createFace(): void {
    // Criando a face no estilo de um emoji (amarelo)
    const faceGeometry = new THREE.SphereGeometry(1, 32, 32);
    const faceMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 }); // Amarelo estilo emoji
    this.face = new THREE.Mesh(faceGeometry, faceMaterial);
    this.face.castShadow = true;
    this.scene.add(this.face);

    // Criando a parte branca dos olhos (esclerótica)
    const eyeWhiteGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const eyeWhiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
    });

    this.leftEyeWhite = new THREE.Mesh(eyeWhiteGeometry, eyeWhiteMaterial);
    this.rightEyeWhite = new THREE.Mesh(eyeWhiteGeometry, eyeWhiteMaterial);

    this.leftEyeWhite.position.set(-0.3, 0.4, 1);
    this.rightEyeWhite.position.set(0.3, 0.4, 1);

    this.scene.add(this.leftEyeWhite);
    this.scene.add(this.rightEyeWhite);

    // Criando as pupilas (parte preta que vai se mover)
    const pupilGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const pupilMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      shininess: 100,
    });

    this.leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    this.rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);

    this.leftPupil.position.set(-0.3, 0.4, 1.1); // Pouco à frente da esclerótica
    this.rightPupil.position.set(0.3, 0.4, 1.1);

    this.scene.add(this.leftPupil);
    this.scene.add(this.rightPupil);

    const smileCurve = new THREE.EllipseCurve(
      0,
      0, // ax, aY
      -0.5,
      -0.5, // xRadius, yRadius
      0,
      Math.PI, // aStartAngle, aEndAngle
      false, // aClockwise
      0 // aRotation
    );

    const points = smileCurve.getPoints(50);
    const smileGeometry = new THREE.BufferGeometry().setFromPoints(points);

    // Crie várias linhas levemente deslocadas para simular uma linha mais grossa
    for (let i = -0.02; i <= 0.02; i += 0.01) {
      const smileMaterial = new THREE.LineBasicMaterial({
        color: 0x000000,
      });
      const smile = new THREE.Line(smileGeometry, smileMaterial);
      smile.position.set(0, 0.1 + i, 1.2); // Ajuste a posição verticalmente para criar o efeito de linha grossa
      this.scene.add(smile);
    }

    // Adicionando luzes
    const ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Limitando o movimento das pupilas dentro do olho branco
    const maxMovement = 0.05; // Limita o movimento das pupilas

    const targetLeftPupilPosition = new THREE.Vector3(
      -0.3 + mouseX * maxMovement,
      0.4 + mouseY * maxMovement,
      1.1
    );
    const targetRightPupilPosition = new THREE.Vector3(
      0.3 + mouseX * maxMovement,
      0.4 + mouseY * maxMovement,
      1.1
    );

    this.leftPupil.position.lerp(targetLeftPupilPosition, 0.1); // Suavizando movimento
    this.rightPupil.position.lerp(targetRightPupilPosition, 0.1);
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }
}
