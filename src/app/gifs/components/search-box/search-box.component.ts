import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  constructor(private giftService: GifsService){}
  @ViewChild('txtTagInput') //Referencia local hacia un Input
  tagInput!: ElementRef<HTMLInputElement>; //Not Null Operator !
  searchTag():void{
    const newTag = this.tagInput.nativeElement.value;
    this.giftService.searchTag(newTag)
    this.tagInput.nativeElement.value = '';
  }
}
