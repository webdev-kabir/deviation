/**
 * Deviation Model
 * 
 * Represents a deviation record in the system.
 */

export interface Deviation {
  id: string;
  title: string;
  description: string;
  status: DeviationStatus;
  priority: DeviationPriority;
  category: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  dueDate?: Date;
  tags?: string[];
}

export enum DeviationStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  UNDER_REVIEW = 'under_review',
  CLOSED = 'closed',
  REJECTED = 'rejected',
}

export enum DeviationPriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export interface DeviationCreateDto {
  title: string;
  description: string;
  priority: DeviationPriority;
  category: string;
  assignedTo?: string;
  dueDate?: Date;
  tags?: string[];
}

export interface DeviationUpdateDto extends Partial<DeviationCreateDto> {
  status?: DeviationStatus;
}

