import { Component, ViewChild, Renderer2 } from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';
import { ConverterProvider } from '../../providers/converter/converter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ConverterProvider]
})
export class HomePage {

  imageData;
  result: string;
  endian = 'big';
  fileFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
  @ViewChild("myCanvas") myCanvas;

  constructor(
    // private sanitizer: DomSanitizer,
    private converter: ConverterProvider,
    private renderer: Renderer2,
  ) {
  }

  choseImage(event) {
    console.log("chose image");
    var file = event.currentTarget.files[0];
    if (!this.fileFilter.test(file.type)) {
      alert("你上传的不是图片文件");
      return;
    }
    // this.imageData = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));

    let context = this.myCanvas.nativeElement.getContext("2d");
    let image = new Image();
    this.result = 'const unsigned char arduino[] = {';
    image.src = window.URL.createObjectURL(file);
    image.onload = () => {
      this.renderer.setAttribute(this.myCanvas.nativeElement, "width", image.width.toString() + 'px')
      this.renderer.setAttribute(this.myCanvas.nativeElement, "height", image.height.toString() + 'px')
      context.drawImage(image, 0, 0);
      // console.log(context.getImageData(0, 0, image.width, image.height));
      let img = context.getImageData(0, 0, image.width, image.height);
      this.converter.img2BitmapArray(context, img, { endian: 'big', color: 'inverse' })
        .then((result) => {
          this.result += result;
        });
    }
  }

}
