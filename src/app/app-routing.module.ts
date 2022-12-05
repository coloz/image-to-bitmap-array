import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'image-to-bitmap-array', loadChildren: () => import('./pages/image-to-bitmap-array/image-to-bitmap-array.module').then(m => m.ImageToBitmapArrayModule) },
  { path: 'character-editor', loadChildren: () => import('./pages/character-editor/character-editor.module').then(m => m.CharacterEditorModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
