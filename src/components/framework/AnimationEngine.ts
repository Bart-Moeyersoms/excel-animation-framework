import { AnimationStep, AnimationAction } from '../../types';

export class AnimationEngine {
  private steps: AnimationStep[];
  private currentStep: number = 0;
  private isPlaying: boolean = false;
  private timers: NodeJS.Timeout[] = [];
  private onStepChange: (step: AnimationStep, index: number) => void;
  private onComplete: () => void;
  private onAction: (action: AnimationAction) => void;

  constructor(
    steps: AnimationStep[], 
    onStepChange: (step: AnimationStep, index: number) => void,
    onComplete: () => void,
    onAction: (action: AnimationAction) => void
  ) {
    this.steps = steps;
    this.onStepChange = onStepChange;
    this.onComplete = onComplete;
    this.onAction = onAction;
  }

  start(): void {
    this.reset();
    this.isPlaying = true;
    this.executeStep(0);
  }

  next(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.executeStep(this.currentStep);
    } else {
      this.complete();
    }
  }

  previous(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.executeStep(this.currentStep);
    }
  }

  goToStep(stepIndex: number): void {
    if (stepIndex >= 0 && stepIndex < this.steps.length) {
      this.currentStep = stepIndex;
      this.executeStep(stepIndex);
    }
  }

  executeStep(stepIndex: number): void {
    const step = this.steps[stepIndex];
    this.onStepChange(step, stepIndex);
    
    // Execute actions with delays
    step.actions.forEach((action, actionIndex) => {
      const delay = actionIndex * (action.duration || 500);
      const timer = setTimeout(() => {
        this.onAction(action);
      }, delay);
      this.timers.push(timer);
    });

    // Auto-advance if specified
    if (step.autoNext && this.currentStep < this.steps.length - 1) {
      const timer = setTimeout(() => {
        this.next();
      }, step.duration || 3000);
      this.timers.push(timer);
    }
  }

  reset(): void {
    this.clearTimers();
    this.currentStep = 0;
    this.isPlaying = false;
  }

  complete(): void {
    this.isPlaying = false;
    this.clearTimers();
    this.onComplete();
  }

  pause(): void {
    this.isPlaying = false;
    this.clearTimers();
  }

  resume(): void {
    this.isPlaying = true;
    this.executeStep(this.currentStep);
  }

  private clearTimers(): void {
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers = [];
  }

  typeText(text: string, callback: (text: string) => void, speed: number = 100): void {
    let i = 0;
    const timer = setInterval(() => {
      callback(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
      }
    }, speed);
    this.timers.push(timer as any);
  }

  // Getters
  getCurrentStep(): number {
    return this.currentStep;
  }

  getTotalSteps(): number {
    return this.steps.length;
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  getSteps(): AnimationStep[] {
    return this.steps;
  }

  updateSteps(newSteps: AnimationStep[]): void {
    this.steps = newSteps;
    this.reset();
  }
}