import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { MapCameraPosition, MapService, Region } from '../../../../services/map.service';
import { Coordinates, MapObject } from '../../../../models/MapObject';

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

  private colorForProjectType: { [key: string]: string } = {
    'Школа': 'green',
    'Дом культуры': 'blue',
    'Детский сад': 'yellow',
    'Больница': 'purple',
    'Коммуникации': 'purple',
  };

  constructor(
    private renderer: Renderer2,
    private mapService: MapService
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    const rect = (this.map.nativeElement['viewBox'] as SVGAnimatedRect).animVal;
    this.viewboxWidth = rect.width;
    this.viewboxHeight = rect.height;
    this.realWidth = this.map.nativeElement['clientWidth']
    this.realHeight = this.map.nativeElement['clientHeight']

    this.mapService.objects$
      .subscribe(
        items => {
          console.log("🚀 ~ file: map.component.ts ~ line 41 ~ MapComponent ~ ngAfterViewInit ~ this.renderedObjects", this.renderedObjects)
          if (this.renderedObjects) {
            this.clear();
          }
          if (items) {
            items.forEach(o => {
              this.renderObject(o);
            });
          }
        }
      );

    this.mapService.selectedRegion$
      .subscribe(
        item => {
          if (item) {
            this.renderer.setStyle(this.map.nativeElement, 'transform', `scale(${item.cameraPosition.scale}) translateX(${item.cameraPosition.xPercent}%) translateY(${item.cameraPosition.yPercent}%)`);
          }
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
    const coordinates: Coordinates = { x: offsetX * this.viewboxWidth / this.realWidth, y: offsetY * this.viewboxHeight / this.realHeight };
    this.onClick.emit(coordinates);

    // this.renderObject({ id: 12, title: 'On click object', coordinates, type: 'capital' });
  }

  private renderObject(obj: MapObject): any {
    const gElem = this.renderer.createElement('g', 'svg');
    const textElem = this.renderer.createElement('text', 'svg');
    this.renderer.setStyle(textElem, 'font-size', '10px')
    const innerText = this.renderer.createText(obj.title);
    this.renderer.appendChild(textElem, innerText);
    this.renderer.appendChild(gElem, textElem);

    switch (obj.type) {
      case 'capital':

        break;

      case 'city':

        break;

      case 'place':
        let circlePlaceElem = this.renderer.createElement('circle', 'svg');
        this.renderer.setAttribute(circlePlaceElem, 'cx', '-3');
        this.renderer.setAttribute(circlePlaceElem, 'cy', '3');
        this.renderer.setAttribute(circlePlaceElem, 'r', '3');
        this.renderer.appendChild(gElem, circlePlaceElem);
        break;

      case 'project':
        let circleProjectElem = this.renderer.createElement('circle', 'svg');
        this.renderer.setAttribute(circleProjectElem, 'cx', '-3');
        this.renderer.setAttribute(circleProjectElem, 'cy', '3');
        this.renderer.setAttribute(circleProjectElem, 'r', '3');
        this.renderer.setStyle(circleProjectElem, 'fill', this.colorForProjectType[obj.projectType])
        this.renderer.appendChild(gElem, circleProjectElem);
        break;

      default:
        break;
    }

    this.renderer.setAttribute(gElem, 'transform', `matrix(1 0 0 1 ${obj.coordinates.x} ${obj.coordinates.y})`);
    this.renderer.appendChild(this.map.nativeElement, gElem);

    if (!this.renderedObjects) {
      this.renderedObjects = [];
    }
    this.renderedObjects.push(gElem);
  }

  private clear() {
    this.renderedObjects.forEach(o => {
      this.renderer.removeChild(this.map.nativeElement, o);
    });
  }
}


