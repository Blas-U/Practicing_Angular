import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'angular-python-app';
// }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  latitude: number | undefined;
  longitude: number | undefined;

  constructor(private http: HttpClient) {}

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.sendLocation(this.latitude, this.longitude);
          console.log(this.latitude)
        },
        error => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  sendLocation(latitude: number, longitude: number) {
    const data = { latitude, longitude };
    console.log(data)
    const subscription = this.http.post('http://localhost:5000/api/simpler', data).subscribe(
      response => {
        console.log('Location sent successfully:', response);
      },
      error => {
        console.error('Error sending location:', error);
      }
    );
  }
}

