import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-face-follower',
  templateUrl: './face-follower.component.html',
  styleUrls: ['./face-follower.component.scss'],
})
export class FaceFollowerComponent {
  leftEyeTransform: string = '';
  rightEyeTransform: string = '';

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const faceCenterX = window.innerWidth / 2;
    const faceCenterY = window.innerHeight / 2;

    const maxOffset = 5; // Distância máxima que as pupilas podem se mover dentro dos olhos

    const leftEyeOffsetX = this.calculateOffset(
      event.clientX,
      faceCenterX,
      maxOffset
    );
    const leftEyeOffsetY = this.calculateOffset(
      event.clientY,
      faceCenterY,
      maxOffset
    );

    const rightEyeOffsetX = this.calculateOffset(
      event.clientX,
      faceCenterX,
      maxOffset
    );
    const rightEyeOffsetY = this.calculateOffset(
      event.clientY,
      faceCenterY,
      maxOffset
    );

    this.leftEyeTransform = `translate(${leftEyeOffsetX}px, ${leftEyeOffsetY}px)`;
    this.rightEyeTransform = `translate(${rightEyeOffsetX}px, ${rightEyeOffsetY}px)`;
  }

  calculateOffset(
    mousePosition: number,
    faceCenter: number,
    maxOffset: number
  ): number {
    const distanceFromCenter = mousePosition - faceCenter;
    const offset = (distanceFromCenter / faceCenter) * maxOffset;
    return Math.min(Math.max(offset, -maxOffset), maxOffset);
  }
}
