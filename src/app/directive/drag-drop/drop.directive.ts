import { Directive, HostListener, Input, ElementRef, Renderer2 } from '@angular/core';
import { DragDropService } from '../drag-drop.service';

@Directive({
  selector: '[appDroppable]'
})
export class DropDirective {

  @Input() drapEnterClass: string;
  @Input() dropTags: string[] = [];
  private data$;

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private service: DragDropService
  ) {
    this.data$ = this.service.getDragData().take(1);
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el.nativeElement, this.drapEnterClass);
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(ev: Event) {
    if (this.el.nativeElement === ev.target) {
    }
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.drapEnterClass);
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.drapEnterClass);
    }
  }
}
