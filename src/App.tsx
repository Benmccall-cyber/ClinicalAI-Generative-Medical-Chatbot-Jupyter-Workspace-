import React, { useState } from 'react';
import {
  Stethoscope,
  Code2,
  FileCheck2,
  LayoutDashboard,
  Cpu,
  GraduationCap,
  Sparkles,
  ExternalLink,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { GradioInterface } from './components/GradioInterface';
import { JupyterNotebook } from './components/JupyterNotebook';
import { SubmissionStudio } from './components/SubmissionStudio';
import { ClinicalResearcherLab } from './components/ClinicalResearcherLab';

type TabType = 'gradio' | 'notebook' | 'submission' | 'research';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('gradio');
  const [selectedModel, setSelectedModel] = useState<string>('google/flan-t5-small');
  const [studentInitials, setStudentInitials] = useState<string>('OB');
  const [capturedScreenshots, setCapturedScreenshots] = useState<Record<number, string>>({});

  const handleCaptureScreenshot = (taskNum: number, title: string, dataUrl: string) => {
    setCapturedScreenshots((prev) => ({
      ...prev,
      [taskNum]: dataUrl || `captured-task-${taskNum}`
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-900 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand / Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-xs">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                    ClinicalAI Chatbot Studio
                  </h1>
                  <span className="text-xs text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full font-medium hidden sm:inline-block">
                    Coursera Capstone
                  </span>
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span>Generative AI Medical Assistant</span>
                  <span aria-hidden="true">·</span>
                  <span>Flan-T5 & BART Seq2Seq</span>
                  <span aria-hidden="true">·</span>
                  <span>Gradio & Jupyter</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('gradio')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'gradio'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-orange-600" />
                <span className="hidden sm:inline">1. Live</span> Gradio Chatbot
              </button>

              <button
                onClick={() => setActiveTab('notebook')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'notebook'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">2. Jupyter</span> Notebook Lab
              </button>

              <button
                onClick={() => setActiveTab('submission')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'submission'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">3. Peer Review &</span> Submission
              </button>

              <button
                onClick={() => setActiveTab('research')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'research'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
                <span className="hidden md:inline">4. Clinical</span> UX Lab
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Assignment Breadcrumb / Banner */}
        <div className="mb-6 bg-white border border-slate-200 rounded-xl px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="font-semibold text-slate-900">Project Goal:</span>
            <span>Clinicians frequently handle lengthy medical reports and need to extract critical information quickly.</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-500">Max Rubric Score:</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              12 / 12 Points
            </span>
          </div>
        </div>

        {/* Tab View Render */}
        {activeTab === 'gradio' && (
          <GradioInterface
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
            onCaptureScreenshot={handleCaptureScreenshot}
          />
        )}

        {activeTab === 'notebook' && (
          <JupyterNotebook
            selectedModel={selectedModel}
            onCaptureScreenshot={handleCaptureScreenshot}
          />
        )}

        {activeTab === 'submission' && (
          <SubmissionStudio
            studentInitials={studentInitials}
            onUpdateInitials={setStudentInitials}
            capturedScreenshots={capturedScreenshots}
            onNavigateTab={(tab) => setActiveTab(tab as TabType)}
          />
        )}

        {activeTab === 'research' && <ClinicalResearcherLab />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            <span>Generative AI-based Medical Chatbot Project</span>
            <span className="mx-2">·</span>
            <span>Hugging Face Transformers</span>
            <span className="mx-2">·</span>
            <span>Gradio Web Framework</span>
          </div>
          <div>
            <span>Task 1: Interface (2pts)</span> · <span>Task 2: Model (3pts)</span> · <span>Task 3: Logic (4pts)</span> · <span>Task 4: Test (3pts)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
