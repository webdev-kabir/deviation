/**
 * Public Deviation View Component
 * 
 * Public-facing view of deviations accessible via link (no authentication required).
 */

import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-deviation-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-deviation-view.component.html',
  styleUrl: './public-deviation-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicDeviationViewComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  deviationId: string | null = null;

  ngOnInit(): void {
    this.deviationId = this.route.snapshot.paramMap.get('id');
  }
}

