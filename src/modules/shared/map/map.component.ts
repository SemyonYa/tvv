import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Coordinates, MapCameraPosition, MapObject, MapService, Region } from '../../../services/map.service';

@Component({
  selector: 'tvv-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @Output() onClick = new EventEmitter<Coordinates>();
  @Output() onRegionClick = new EventEmitter<Region>();
  @ViewChild('map') map: ElementRef<SVGElement>;

  renderedObjects: any[];

  viewboxWidth: number;
  viewboxHeight: number;
  realWidth: number;
  realHeight: number;

  constructor(
    private renderer: Renderer2,
    private mapService: MapService
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    console.log(this.map.nativeElement);
    const rect = (this.map.nativeElement['viewBox'] as SVGAnimatedRect).animVal;
    this.viewboxWidth = rect.width;
    this.viewboxHeight = rect.height;
    this.realWidth = this.map.nativeElement['clientWidth']
    this.realHeight = this.map.nativeElement['clientHeight']

    this.mapService.objects$
      .subscribe(
        items => {
          if (this.renderedObjects) {
            this.clear();
          }
          if (items) {
            setTimeout(() => {
              items.forEach(o => {
                this.renderObject(o);
              });
            }, 2000);
          }
        }
      );

    this.mapService.cameraPosition$
      .subscribe(
        item => {
          if (item)
            this.renderer.setStyle(this.map.nativeElement, 'transform', `scale(${item.scale}) translateX(${item.xPercent}%) translateY(${item.yPercent}%)`);
        }
      );

    document.querySelectorAll('g.group').forEach(g => {
      g.addEventListener('click', () => {
        this.onRegionClick.emit(g['dataset'].id as Region);
      });
    })
  }

  mapClick(e: PointerEvent) {
    let { offsetX, offsetY } = e;
    const coords: Coordinates = { x: offsetX * this.viewboxWidth / this.realWidth, y: offsetY * this.viewboxHeight / this.realHeight };
    this.onClick.emit(coords);

    // this.renderObject({ id: 12, title: 'On click object', coords, type: 'capital' });
  }

  renderObject(obj: MapObject): any {
    const gElem = this.renderer.createElement('g', 'svg');
    const textElem = this.renderer.createElement('text', 'svg');
    const innerText = this.renderer.createText(obj.title);
    this.renderer.appendChild(textElem, innerText);
    this.renderer.appendChild(gElem, textElem);

    switch (obj.type) {
      case 'capital':

        break;

      case 'city':

        break;

      case 'place':

        break;

      case 'object':

        break;

      default:
        break;
    }

    this.renderer.setAttribute(gElem, 'transform', `matrix(1 0 0 1 ${obj.coords.x} ${obj.coords.y})`);
    this.renderer.appendChild(this.map.nativeElement, gElem);
  }

  clear() {
    this.renderedObjects.forEach(o => {
      this.renderer.removeChild(this.map.nativeElement, o);
    })
  }
}


