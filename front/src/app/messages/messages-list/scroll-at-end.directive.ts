import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appScrollAtEnd]',
  standalone: true,
})
export class ScrollAtEndDirective implements OnInit {
  window!: Window;

  @Output() scrollAtEnd = new EventEmitter();
  @Input() threshold = 100;

  ngOnInit(): void {
    this.window = window;
  }

  throttle = (cb: () => void, timeoutMs: number) => {
    let timerId: any;
    return () => {
      if (timerId) return;

      timerId = setTimeout(() => {
        cb.call(this);
        clearTimeout(timerId);
        timerId = null;
      }, timeoutMs);
    };
  };

  @HostListener('window:scroll', ['$event.target'])
  wse = this.throttle(this.windowScrollEvent, 500);
  windowScrollEvent() {
    const elementScrollHeight = this.elRef.nativeElement.scrollHeight;
    const documentScrollHeight =
      this.window.document.documentElement.scrollHeight;
    const bodyScrollHeight = this.window.document.body.scrollHeight;

    const maxScrollHeight = Math.max(
      elementScrollHeight,
      documentScrollHeight,
      bodyScrollHeight
    );

    const scrollYPosition = this.window.scrollY;
    const screenHeight = this.window.innerHeight;

    const position = maxScrollHeight - screenHeight - scrollYPosition;

    if (position <= this.threshold) {
      this.scrollAtEnd.emit();
    }
  }

  constructor(private elRef: ElementRef) {}
}
