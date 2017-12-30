import { Directive, HostListener, Renderer2, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DragDirective {

  private _isDraggble = false;

  @Input('appDraggable')
  set isDraggble(val: boolean) {
    this._isDraggble = val;
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${val}`);
  }
  get isDraggble() {
    return this._isDraggble;
  }

  @Input() draggedClass: string;

  constructor(private el: ElementRef, private rd: Renderer2) { }

  @HostListener('dragstart', ['$event'])
  onDragStart(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el.nativeElement, this.draggedClass);
    }
  }
  @HostListener('dragend', ['$event'])
  onDragEnd(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.draggedClass);
    }
  }
}
