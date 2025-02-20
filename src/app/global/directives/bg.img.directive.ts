import { Directive, Input, ElementRef, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[bgImage]',
  standalone: true // Marking it as a standalone directive
})
export class BgImageDirective {
  
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  @Input() altImage: string | null = null;
  @Input() size?: number;
  @Input() test = false;
  @Input() default: string | null = null;

  @Input('bgImage') set url(path: string | any) {
    
    if (path) {
      const encodedPath = encodeURI(path);
      const finalPath = this.size ? `${encodedPath}/${this.size}/${this.size}/false` : encodedPath;
      this.setBackgroundImage(finalPath);
    } else {
      this.setBackgroundImage(this.altImage ?? this.default ?? '/assets/images/bgImg.svg');
    }
  }

  private setBackgroundImage(path: string): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-image', `url("${path}")`);
  }
}
