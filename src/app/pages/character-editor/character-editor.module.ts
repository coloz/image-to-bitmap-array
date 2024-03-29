import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterEditorComponent } from './character-editor.component';
import { Routes, RouterModule } from '@angular/router';
import { BlockComponent } from './block/block.component'
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

const routes: Routes = [
  { path: '', component: CharacterEditorComponent },
];

@NgModule({
  declarations: [CharacterEditorComponent, BlockComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    CodemirrorModule,
    NzInputNumberModule
  ]
})
export class CharacterEditorModule { }
