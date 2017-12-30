import { Component, OnInit, Input, EventEmitter, Output, HostBinding, HostListener } from '@angular/core';
import { cardAnim } from '../../anims/card.anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [
    cardAnim
  ]
})
export class ProjectItemComponent implements OnInit {

  @Input()
  item;

  @Output()
  invite = new EventEmitter<void>();
  @Output()
  edit = new EventEmitter<void>();
  @Output()
  delete = new EventEmitter<void>();

  @HostBinding('@card')
  cardState = 'out';
  @HostListener('mouseenter')
  onMouseEnter() {
    this.cardState = 'hover';
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardState = 'out';
  }

  constructor() { }

  ngOnInit() {
  }

  inviteClick() {
    this.invite.emit();
  }

  editClick() {
    this.edit.emit();
  }

  deleteClick() {
    this.delete.emit();
  }

}
