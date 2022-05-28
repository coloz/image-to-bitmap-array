import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {

  @Input() isSelected = false;

  constructor() { }

  ngOnInit(): void {
  }

}
