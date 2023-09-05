// registration.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  registerUser() {
    // Send a POST request to the backend registration endpoint
    this.http.post('/auth/register', { email: this.email, password: this.password })
      .subscribe(
        (response) => {
          console.log('Registration successful:', response);
          // Handle success, e.g., redirect to login page
        },
        (error) => {
          console.error('Registration failed:', error);
          // Handle error, display validation errors, etc.
        }
      );
  }
}
