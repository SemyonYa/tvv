import { Component, Input, OnInit } from '@angular/core';

import SwiperCore, { SwiperOptions, Navigation, Pagination } from 'swiper';

SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'tvv-project-galery',
  templateUrl: './project-galery.component.html',
  styleUrls: ['./project-galery.component.scss']
})
export class ProjectGaleryComponent implements OnInit {
  @Input() currentImage: any[];
  @Input() images: any[] = [1, 2, 3, 4, 5, 6, 7].map(i => ({ large: `/assets/fake/category${i}.jpg` }));

  config: SwiperOptions = {
    slidesPerView: 1,
    // spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true, dynamicBullets: true },
    scrollbar: { draggable: true },
  };

  constructor() { }

  ngOnInit(): void {
  }

}
