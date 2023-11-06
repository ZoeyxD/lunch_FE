import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  changePasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, public router: Router) {
    this.changePasswordForm = this.formBuilder.group({
      username: ['', Validators.required], // Initialize with an empty string, not 'username'
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const username = this.changePasswordForm.get('username')!.value;
      const newPassword = this.changePasswordForm.get('newPassword')!.value;
      const confirmPassword = this.changePasswordForm.get('confirmPassword')!.value;

      if (newPassword === confirmPassword) {
        // Passwords match, proceed with the API request
        this.apiService.changePassword(username, newPassword).subscribe(
          (response) => {
            // Handle success, show a success message or redirect.
            window.alert('Password changed successfully');
          },
          (error) => {
            // Handle errors, show an error message.
            console.error('Error changing password:', error);
          }
        );
      } else {
        // Passwords don't match, show an alert
        window.alert('Passwords do not match. Please enter the same password in both fields.');
      }
    }
  }
}
