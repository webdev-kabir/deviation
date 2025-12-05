/**
 * Deviation Form Page Component
 * 
 * Form for creating and editing deviations.
 */

import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviationFacade } from '../../deviation.facade';
import { DeviationCreationForm } from '../../Forms/deviation-creation.form';
import { DeviationPriority } from '../../Models/deviation.model';

@Component({
  selector: 'app-deviation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './deviation-form.component.html',
  styleUrl: './deviation-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviationFormComponent implements OnInit {
  private readonly facade = inject(DeviationFacade);
  private readonly formBuilder = inject(DeviationCreationForm);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  form!: FormGroup;
  readonly loading = this.facade.loading;
  readonly error = this.facade.error;

  readonly priorities = Object.values(DeviationPriority);

  ngOnInit(): void {
    this.form = this.formBuilder.createForm();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.formBuilder.getFormValue(this.form);
      this.facade.createDeviation(formValue).subscribe((deviation) => {
        if (deviation) {
          this.router.navigate(['/deviations']);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/deviations']);
  }

  getFieldError(fieldName: string): string | null {
    const field = this.form.get(fieldName);
    if (field?.invalid && (field.dirty || field.touched)) {
      if (field.errors?.['required']) {
        return 'This field is required';
      }
      if (field.errors?.['minlength']) {
        return `Minimum length is ${field.errors['minlength'].requiredLength}`;
      }
      if (field.errors?.['maxlength']) {
        return `Maximum length is ${field.errors['maxlength'].requiredLength}`;
      }
    }
    return null;
  }
}

