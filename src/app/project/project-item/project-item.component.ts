import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
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
