import {
  Component,
  ElementRef,
  OnInit,
  HostListener,
  ViewChild,
  AfterViewInit,
  Input,
  SimpleChanges,
  Renderer2,
} from '@angular/core';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { ThreeJsService } from './service/three-js-morph.service';
import { ModelLoaderService } from './service/model-loader.service';

@Component({
  selector: 'app-morph-animation',
  templateUrl: './morph-animation.component.html',
  styleUrls: ['./morph-animation.component.scss'],
})
export class MorphAnimationComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  @Input() movingLeft!: number;
  @Input() movingRight!: number;

  private mixer!: THREE.AnimationMixer;
  private model: THREE.Object3D | null = null;
  private gnflBase: any;

  private canvasWidth = 600;
  private canvasHeight = 400;

  constructor(
    private renderer2: Renderer2,
    private threeJsService: ThreeJsService,
    private modelLoaderService: ModelLoaderService
  ) {}

  ngOnInit(): void {
    // Inicialização que não depende da visualização
  }

  async ngAfterViewInit(): Promise<void> {
    this.initThreeJs();
    await this.loadModel();
    this.animate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movingLeft'] && this.model) {
      this.updateModelRotation();
    }
  }

  private initThreeJs(): void {
    this.threeJsService.initRenderer(
      this.canvasContainer,
      this.canvasWidth,
      this.canvasHeight
    );
    this.threeJsService.initScene();
    this.threeJsService.initCamera(this.canvasWidth, this.canvasHeight);
    this.threeJsService.initLights();
  }

  private async loadModel(): Promise<void> {
    // Remove o modelo existente, se existir
    if (this.model) {
      this.threeJsService.scene.remove(this.model);
      this.model = null;
    }

    try {
      const { scene, animations } = await this.modelLoaderService.loadModel(
        'assets/RobotExpressive.glb'
      );
      this.model = scene;
      this.gnflBase = { animations };
      this.setupModel(this.model, animations);
      this.threeJsService.scene.add(this.model);
    } catch (error) {
      console.error('Erro ao carregar o modelo:', error);
    }
  }

  private setupModel(
    model: THREE.Object3D,
    animations: THREE.AnimationClip[],
    animationIndex: number = 2
  ): void {
    model.scale.set(0.5, 0.5, 0.5);
    this.mixer = new THREE.AnimationMixer(model);
    const action = this.mixer.clipAction(animations[animationIndex]);
    action.timeScale = this.getRandomTimeScale();
    action.play();
  }

  private getRandomTimeScale(): number {
    return 0.5 + Math.random() * 0.5;
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    if (this.mixer) {
      this.mixer.update(0.01);
    }

    this.threeJsService.renderer.render(
      this.threeJsService.scene,
      this.threeJsService.camera
    );
  }

  private updateModelRotation(): void {
    if (this.model) {
      const targetRotation = this.movingLeft === 1 ? Math.PI / 2 : 0;

      gsap.to(this.model.rotation, {
        y: targetRotation,
        duration: 0.5,
        onComplete: () => {
          if (this.model) {
            this.setupModel(this.model, this.gnflBase.animations, 6);
          }
          this.renderer2.addClass(
            this.canvasContainer.nativeElement,
            'move-right'
          );
        },
      });

      setTimeout(() => {
        if (this.model) {
          gsap.to(this.model.rotation, {
            y: 0,
            duration: 0.5,
            onComplete: () => {
              this.loadModel();
            },
          });
        }
      }, 2000);
    }
  }

  @HostListener('window:resize', ['$event'])
  private onWindowResize(): void {
    const { camera, renderer } = this.threeJsService;
    camera.aspect = this.canvasWidth / this.canvasHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(this.canvasWidth, this.canvasHeight);
  }
}
