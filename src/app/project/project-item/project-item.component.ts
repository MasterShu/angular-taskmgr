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

  constructor() { }

  ngOnInit() {
  }

  inviteClick() {
    this.invite.emit();
  }

}
