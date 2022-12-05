import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageToBitmapArrayComponent } from './image-to-bitmap-array.component';
import { FormsModule } from '@angular/forms';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { Routes, RouterModule } from '@angular/router';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

const routes: Routes = [
  { path: '', component: ImageToBitmapArrayComponent },
];

@NgModule({
  declarations: [
    ImageToBitmapArrayComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    CodemirrorModule,
    NzSliderModule,
    NzSwitchModule
  ],
  exports: [
    ImageToBitmapArrayComponent
  ]
})
export class ImageToBitmapArrayModule { }
