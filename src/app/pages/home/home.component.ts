import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ConverterService } from '../../services/converter.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imageData;
  result: string;
  endian = false;

  threshold = 127;
  color = false;
  width = 0;
  height = 0;
  file;
  size;
  fileFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
  @ViewChild("myCanvas") myCanvas;

  codemirrorOptions = {
    lineNumbers: true,
    theme: '3024-day',
    mode: 'clike',
    lineWrapping: true
  }

  get content() {
    return this.size + this.result
  }

  constructor(
    private sanitizer: DomSanitizer,
    private converter: ConverterService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
  }

  choseImage(event) {
    console.log("chose image");
    this.file = event.currentTarget.files[0];
    if (!this.fileFilter.test(this.file.type)) {
      alert("你上传的不是图片文件");
      return;
    }
    this.imageData = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.file));
    this.convert(event);
  }

  timer;
  convert(event) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      console.log("color=" + this.color.toString() + "  endian=" + this.endian.toString());
      if (typeof (this.file) == "undefined") return;
      let context = this.myCanvas.nativeElement.getContext("2d");
      let image = new Image();
      image.src = window.URL.createObjectURL(this.file);
      image.onload = () => {
        this.size = `// width: ${image.width.toString()}, height: ${image.height.toString()}\n`
        this.result = `const unsigned char col[] U8X8_PROGMEM= {`;
        this.renderer.setAttribute(this.myCanvas.nativeElement, "width", image.width.toString() + 'px')
        this.renderer.setAttribute(this.myCanvas.nativeElement, "height", image.height.toString() + 'px')
        context.clearRect(0, 0, this.width, this.height);
        context.drawImage(image, 0, 0);
        let img = context.getImageData(0, 0, image.width, image.height);
        this.width = image.width;
        this.height = image.height;
        this.converter.img2BitmapArray(context, img, { endian: this.endian, color: this.color, threshold: this.threshold })
          .then((result) => {
            this.result += result;
          });
      }
    }, 500);
  }

}
