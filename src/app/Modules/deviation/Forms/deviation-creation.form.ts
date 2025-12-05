/**
 * Deviation Creation Form
 * 
 * Typed reactive form for creating new deviations.
 */

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviationCreateDto, DeviationPriority } from '../Models/deviation.model';

@Injectable({
  providedIn: 'root',
})
export class DeviationCreationForm {
  constructor(private fb: FormBuilder) {}

  createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      priority: [DeviationPriority.MEDIUM, [Validators.required]],
      category: ['', [Validators.required]],
      assignedTo: [''],
      dueDate: [null],
      tags: [[]],
    });
  }

  getFormValue(form: FormGroup): DeviationCreateDto {
    const value = form.value;
    return {
      title: value.title,
      description: value.description,
      priority: value.priority,
      category: value.category,
      assignedTo: value.assignedTo || undefined,
      dueDate: value.dueDate || undefined,
      tags: value.tags || [],
    };
  }
}

