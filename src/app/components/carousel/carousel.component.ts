import { Component, Input, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from "@angular/animations";
import { AnimationType, fadeIn, fadeOut, } from "./carousel.animations";
import { Slide } from './carousel.interface';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger("slideAnimation", [
      
      // fade in, fade out transistions
      transition("void => fade", [
        useAnimation(fadeIn, { params: { time: "500ms" } })
      ]),
      transition("fade => void", [
        useAnimation(fadeOut, { params: { time: "500ms" } })
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit {

  @Input() slides: Slide[];
  @Input() animationType = AnimationType.Fade;
  currentSlide = 0;

  // Implementation - on Previous button click
  onPreviousClick() {

    // calculate previous
    const previous = this.currentSlide - 1;

    // set current slide 
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;

  }

  // Implementation - on Next button click
  onNextClick() {

    // calculate next
    const next = this.currentSlide + 1;

    // set current slide
    this.currentSlide = next === this.slides.length ? 0 : next;
  }

  // Constructor
  constructor() {}

  // Lifecycle - OnInit
  ngOnInit(): void {
  }

}
