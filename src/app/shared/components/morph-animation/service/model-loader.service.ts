import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Injectable({
  providedIn: 'root',
})
export class ModelLoaderService {
  private loader = new GLTFLoader();

  loadModel(
    path: string
  ): Promise<{ scene: THREE.Object3D; animations: THREE.AnimationClip[] }> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        path,
        (gltf) => {
          resolve({ scene: gltf.scene, animations: gltf.animations });
        },
        undefined,
        (error) => {
          reject(error);
        }
      );
    });
  }
}
