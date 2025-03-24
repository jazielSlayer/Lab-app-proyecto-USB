export type UserRole = 'admin' | 'tecnico' | 'estudiante' | 'docente' | 'mantenimiento' | 'auditor';

export interface User {
  id: string;
  email: string;
  name: string;
  lastName: string;
  role: UserRole;
}

export interface Laboratory {
  id: string;
  name: string;
  manager: string;
  equipment: Equipment[];
}

export interface Equipment {
  id: string;
  name: string;
  status: 'available' | 'in-use' | 'maintenance' | 'damaged';
  assignedTo?: string;
  assignedDate?: Date;
  returnDate?: Date;
}