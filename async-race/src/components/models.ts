export interface Car {
  id?: number;
  color: string;
  name: string;
}

export interface Winner {
  id?: number;
  wins: number;
  time: number;
}

export type EngineMode = 'started' | 'stopped';

export type ActionBtn = 'create' | 'update';
