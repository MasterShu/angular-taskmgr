import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {
  lists = [
    {
      id: 1,
      name: '待办',
      tasks: [
        {
          id: 1,
          desc: '任务一: 开始你的表演',
          completed: true,
          priority: 3,
          owner: {
            id: 1,
            name: 'tom',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date(),
          reminder: new Date()
        },
        {
          id: 2,
          desc: '任务二: 开始你的表演',
          completed: false,
          priority: 2,
          owner: {
            id: 2,
            name: 'Jerry',
            avatar: 'avatars:svg-15'
          },
          dueDate: new Date(),
        },
      ]
    },
    {
      id: 1,
      name: '待办',
      tasks: [
        {
          id: 1,
          desc: '任务一: 开始你的表演',
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: 'tom',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date(),
        },
        {
          id: 2,
          desc: '任务二: 开始你的表演',
          completed: false,
          priority: 2,
          owner: {
            id: 2,
            name: 'Jerry',
            avatar: 'avatars:svg-15'
          },
          dueDate: new Date(),
        },
      ]
    }
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  launchNewTaskDialog() {
    this.dialog.open(NewTaskComponent);
  }

  launchCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, {data: {lists: this.lists}});
  }
}
