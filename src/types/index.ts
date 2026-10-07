export interface ClinicalCase {
  id: string;
  title: string;
  category: string;
  report: string;
  suggestedQuestions: string[];
  goldAnswer: string;
}

export interface NotebookCell {
  id: string;
  type: 'code' | 'markdown';
  task?: number;
  source: string;
  outputs?: {
    type: 'stdout' | 'error' | 'display';
    text: string[];
  }[];
  executionCount?: number | null;
  isRunning?: boolean;
}

export interface SubmissionActivity {
  taskNumber: number;
  title: string;
  points: number;
  requirement: string;
  screenshotTarget: string;
  guideSteps: string[];
  capturedImage?: string;
  status: 'pending' | 'ready' | 'verified';
}

export interface ModelOption {
  id: string;
  name: string;
  provider: string;
  type: string;
  params: string;
  description: string;
  isDefault?: boolean;
}
