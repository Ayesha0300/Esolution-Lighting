declare module 'crewai' {
  export class Agent {
    constructor(options: any);
  }
  export class Crew {
    constructor(options: any);
    sequential_process(): Promise<any>;
  }
  export class Task {
    constructor(options: any);
  }
} 