import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccessibleButtonComponent } from './shared/components/accessible-button/accessible-button.component';
import { AccessibleFormComponent } from './shared/components/accessible-form/accessible-form.component';
import { AccessibleModalComponent } from './shared/components/accessible-modal/accessible-modal.component';
import { A11ySkipLinkDirective } from './shared/directives/a11y-skip-link.directive';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AccessibleButtonComponent,
    AccessibleFormComponent,
    AccessibleModalComponent,
    A11ySkipLinkDirective
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Deviation');
  protected showModal = false;

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  handleButtonClick(): void {
    alert('Button clicked! Check console for details.');
    console.log('Accessible button was clicked');
  }
}
