import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { titleAnimation } from 'src/animations/title.animation';
import { Project } from 'src/models/Project';
import { DataService } from 'src/services/data.service';
import { Region } from 'src/services/map.service';

@Component({
  selector: 'tvv-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  animations: [titleAnimation]
})
export class ProjectComponent implements OnInit {
  project: Project;
  region: Region;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    // private mapService: MapService
  ) { }

  ngOnInit(): void {
    // this.region = this.activatedRoute.snapshot.params.region;
    // if (this.mapService.selectedRegion$.value?.title != this.region)
    //   this.mapService.selectRegion(this.region);

    const projectId = this.activatedRoute.snapshot.params.projectId;
    this.dataService.getProject(projectId)
      .subscribe(
        item => {
          this.project = item;

        }
      );
  }

  close() {
    const { region, placeId } = this.activatedRoute.snapshot.params;

    // this.router.navigate([region, placeId], { relativeTo: this.activatedRoute.parent });
    window.history.back();
  }

}
