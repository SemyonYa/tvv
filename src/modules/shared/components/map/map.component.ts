import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { MapCameraPosition, MapService, Region } from '../../../../services/map.service';
import { Coordinates, MapObject } from '../../../../models/MapObject';
import { Router } from '@angular/router';

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
    'Школа': '#00AAC6',
    'Дом культуры': '#4a9340',
    'Детский сад': '#B7009D',
    'Больница': '#FFAE0D',
    'Коммуникации': '#d5b17f',
  };

  constructor(
    private renderer: Renderer2,
    private mapService: MapService,
    private router: Router
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
            this.renderer.setStyle(this.map.nativeElement, 'transform', `scale(${item.cameraPosition?.scale ?? 1}) translateX(${item.cameraPosition?.xPercent ?? 0}%) translateY(${item.cameraPosition?.yPercent ?? 0}%)`);
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
    const innerText = this.renderer.createText(obj.title);
    this.renderer.appendChild(textElem, innerText);
    this.renderer.appendChild(gElem, textElem);

    this.renderer.addClass(gElem, 'place');

    if (obj.projects?.length > 0) {
      obj.projects.forEach((project, index) => {
        let circleProjectElem = this.renderer.createElement('circle', 'svg');
        this.renderer.setAttribute(circleProjectElem, 'cx', `${3 * index + 10}`);
        this.renderer.setAttribute(circleProjectElem, 'cy', '3');
        this.renderer.setAttribute(circleProjectElem, 'r', '1.5');
        this.renderer.setAttribute(circleProjectElem, 'title', project.type);
        this.renderer.setStyle(circleProjectElem, 'fill', this.colorForProjectType[project.type])
        this.renderer.appendChild(gElem, circleProjectElem);
      });

      this.renderer.listen(gElem, 'click', () => {
        this.router.navigateByUrl(`/map/${obj.region}/${obj.id}`)
      });
    } else {
      let circlePlaceElem = this.renderer.createElement('circle', 'svg');
      this.renderer.setAttribute(circlePlaceElem, 'cx', '10');
      this.renderer.setAttribute(circlePlaceElem, 'cy', '4');
      this.renderer.setAttribute(circlePlaceElem, 'r', '3');
      this.renderer.appendChild(gElem, circlePlaceElem);
    }

    // switch (obj.type) {
    //   case 'capital':

    //     break;

    //   case 'city':

    //     break;

    //   case 'place':

    //     this.renderer.addClass(gElem, 'place');

    //     if (obj.projects?.length > 0) {
    //       obj.projects.forEach((p, index) => {
    //         let circleProjectElem = this.renderer.createElement('circle', 'svg');
    //         this.renderer.setAttribute(circleProjectElem, 'cx', `${3 * index + 10}`);
    //         this.renderer.setAttribute(circleProjectElem, 'cy', '3');
    //         this.renderer.setAttribute(circleProjectElem, 'r', '2');
    //         this.renderer.setAttribute(circleProjectElem, 'title', p.type);
    //         this.renderer.setStyle(circleProjectElem, 'fill', this.colorForProjectType[p.type])
    //         this.renderer.appendChild(gElem, circleProjectElem);
    //       });

    //       this.renderer.listen(gElem, 'click', () => {
    //         console.log(obj);
    //         this.router.navigateByUrl(`/map/${obj.}`)
    //       });
    //     } else {
    //       let circlePlaceElem = this.renderer.createElement('circle', 'svg');
    //       this.renderer.setAttribute(circlePlaceElem, 'cx', '10');
    //       this.renderer.setAttribute(circlePlaceElem, 'cy', '4');
    //       this.renderer.setAttribute(circlePlaceElem, 'r', '3');
    //       this.renderer.appendChild(gElem, circlePlaceElem);
    //     }
    //     break;

    //   case 'project':
    //     break;

    //   default:
    //     break;
    // }

    this.renderer.setAttribute(gElem, 'transform', `matrix(1 0 0 1 ${obj.coordinates.x - 5} ${obj.coordinates.y - 5})`);
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


