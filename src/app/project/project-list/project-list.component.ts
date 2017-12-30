import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';

import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    slideToRight,
    listAnimation
  ]
})
export class ProjectListComponent implements OnInit {

  @HostBinding('@routeAnim')
  state;

  projects = [
    {
      id: 1,
      'name': '谢旭鸥 平台',
      'desc': 'thisis username',
      'coverImg': 'assets/img/covers/0.jpg'
    },
    {
      id: 2,
      'name': '谢旭鸥 平台',
      'desc': 'thisis username',
      'coverImg': 'assets/img/covers/1.jpg'
    }
  ];
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '新增项目'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = [...this.projects, { id: 3, name: 'new project', desc: '这个是新增加的', coverImg: 'assets/img/covers/3.jpg' }];
      this.projects = [...this.projects, {id: 4, name: 'new project', desc: '这个是又新增加的', coverImg: 'assets/img/covers/4.jpg'}];
    });
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launchUpdateDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: '编辑项目',  } });
  }

  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: '删除项目', content: '确认删除吗?' } });
    dialogRef.afterClosed().subscribe(result => {
      this.projects = this.projects.filter( p => p.id !== project.id);
      console.log(result);
    });
  }
}
