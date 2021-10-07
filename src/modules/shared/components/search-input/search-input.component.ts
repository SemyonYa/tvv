import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'i-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements AfterViewInit {
  @Output() onChange = new EventEmitter<string>();
  @ViewChild('search') searchElem: ElementRef;

  ngAfterViewInit() {
    fromEvent(this.searchElem.nativeElement, 'input')
      .pipe(
        debounceTime(600)
      )
      .subscribe(
        // TODO: type ?
        (e: any) => {
          const value: string = (e.target['value'] as string).trim();
          this.onChange.emit(value);
        }
      );

  }
}
