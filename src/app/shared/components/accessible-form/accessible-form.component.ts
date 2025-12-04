import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccessibleButtonComponent } from '../accessible-button/accessible-button.component';

/**
 * Accessible Form Component
 * 
 * Demonstrates accessible form practices:
 * - Proper label associations
 * - Error messages with aria-describedby
 * - Required field indicators
 * - Validation feedback
 * - Keyboard navigation
 * 
 * Usage:
 * ```html
 * <app-accessible-form></app-accessible-form>
 * ```
 */
@Component({
  selector: 'app-accessible-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AccessibleButtonComponent],
  templateUrl: './accessible-form.component.html',
  styleUrls: ['./accessible-form.component.css']
})
export class AccessibleFormComponent {
  public contactForm: FormGroup;
  public submitted = false;
  public isLoading = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      agreeTerms: [false, [Validators.requiredTrue]]
    });
  }

  /**
   * Get form control for easy access in template
   */
  public get f() {
    return this.contactForm.controls;
  }

  /**
   * Check if a field is invalid and touched
   */
  public isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submitted));
  }

  /**
   * Get error message for a field
   */
  public getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    
    if (!field || !field.errors) {
      return '';
    }

    if (field.errors['required']) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }

    if (field.errors['email']) {
      return 'Please enter a valid email address';
    }

    if (field.errors['minlength']) {
      const minLength = field.errors['minlength'].requiredLength;
      return `${this.getFieldLabel(fieldName)} must be at least ${minLength} characters`;
    }

    return 'Invalid input';
  }

  /**
   * Get field label for error messages
   */
  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'name': 'Name',
      'email': 'Email',
      'subject': 'Subject',
      'message': 'Message',
      'agreeTerms': 'Terms agreement'
    };
    return labels[fieldName] || fieldName;
  }

  /**
   * Handle form submission
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      // Focus on the first invalid field
      this.focusFirstInvalidField();
      return;
    }

    this.isLoading = true;

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', this.contactForm.value);
      alert('Form submitted successfully!');
      this.isLoading = false;
      this.resetForm();
    }, 2000);
  }

  /**
   * Reset form
   */
  public resetForm(): void {
    this.submitted = false;
    this.contactForm.reset();
  }

  /**
   * Focus on the first invalid field
   */
  private focusFirstInvalidField(): void {
    const firstInvalidControl = Object.keys(this.contactForm.controls).find(key => {
      return this.contactForm.get(key)?.invalid;
    });

    if (firstInvalidControl) {
      const element = document.getElementById(firstInvalidControl);
      element?.focus();
    }
  }
}


