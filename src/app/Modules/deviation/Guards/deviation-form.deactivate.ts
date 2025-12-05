/**
 * Deviation Form Deactivate Guard
 * 
 * Prevents accidental navigation away from unsaved forms.
 */

import { CanDeactivateFn } from '@angular/router';
import { DeviationFormComponent } from '../Pages/deviation-form/deviation-form.component';

export const canDeactivateDeviationForm: CanDeactivateFn<DeviationFormComponent> = (
  component
) => {
  if (component.form?.dirty) {
    return confirm(
      'You have unsaved changes. Are you sure you want to leave this page?'
    );
  }
  return true;
};

