import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageToBitmapArrayComponent } from './image-to-bitmap-array.component';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { Routes, RouterModule } from '@angular/router';

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
    NzSliderModule,
    NzGridModule,
    FormsModule,
    CodemirrorModule,
    NzSwitchModule
  ],
  exports: [
    ImageToBitmapArrayComponent
  ]
})
export class ImageToBitmapArrayModule { }
