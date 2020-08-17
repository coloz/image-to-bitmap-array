import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterEditorComponent } from './character-editor.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: CharacterEditorComponent },
];


@NgModule({
  declarations: [CharacterEditorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CharacterEditorModule { }
