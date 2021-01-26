import { Component, OnInit } from '@angular/core';

interface Hero {
  id: number;
  name: string;
  emotion?: string;
}

@Component({
  selector: 'app-section-activity',
  templateUrl: './section-activity.component.html',
  styleUrls: ['./section-activity.component.css']
})
export class SectionActivityComponent implements OnInit {
  
  heroes: Hero[] = [
    { id: 1, name: 'Dr Nice',  emotion: 'happy'},
    { id: 2, name: 'Narco',     emotion: 'sad' },
    { id: 3, name: 'Windstorm', emotion: 'confused' },
    { id: 4, name: 'Magneta'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
