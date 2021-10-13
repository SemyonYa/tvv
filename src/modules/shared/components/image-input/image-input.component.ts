import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Image, ImagePeriod } from 'src/models/Image';
import { FileLoadingService } from '../../../../services/api/file-loading.service';

@Component({
  selector: 'i-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss']
})
export class FileInputComponent implements OnInit {
  fileNames: string;
  // images: Image[];
  libraryShown: boolean = false;
  selectedImage: Image;

  @Input() projectId: number;
  @Input() period: ImagePeriod;
  @Output() onSelect = new EventEmitter<Image>();

  constructor(private fileLoadingService: FileLoadingService) { }

  ngOnInit(): void { }

  onChange(e: Event) {
    const selectedFiles: File[] = Array.from((e.target as HTMLInputElement).files);

    let formData = new FormData();
    for (let index = 0; index < selectedFiles.length; index++) {
      formData.append(`files[]`, selectedFiles[index], `file${selectedFiles[index].name}`);
    }
    if (this.projectId) {
      formData.append('project_id', this.projectId.toString());
    }
    if (this.period) {
      formData.append('period', this.period);
    }

    this.fileLoadingService.upload(formData)
      .subscribe(
        images => {
          if (this.libraryShown) {
            this.hideLibrary();
            setTimeout(() => {
              this.showLibrary();
            }, 100);
          } else {
            this.showLibrary();
          }
          // this.images = images; 
        },
        (err) => {
          console.log(err);
        }
      );
  }

  // closeUploaded() {
  //   this.images = null;
  // }

  showLibrary() {
    this.libraryShown = true;
  }

  hideLibrary() {
    this.libraryShown = false;
  }

  selectImage(image: Image) {
    this.selectedImage = image;
    this.onSelect.emit(image);
  }
}