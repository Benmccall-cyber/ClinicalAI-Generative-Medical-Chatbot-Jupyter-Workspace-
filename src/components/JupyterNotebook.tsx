import React, { useState } from 'react';
import { Play, RotateCcw, Download, Check, Sparkles, Terminal, BookOpen, Camera, CheckCircle2, ChevronRight } from 'lucide-react';
import { INITIAL_NOTEBOOK_CELLS } from '../data/cases';

interface JupyterNotebookProps {
  onCaptureScreenshot?: (taskNumber: number, title: string, dataUrl: string) => void;
  selectedModel: string;
}

export const JupyterNotebook: React.FC<JupyterNotebookProps> = ({
  onCaptureScreenshot,
  selectedModel
}) => {
  const [cells, setCells] = useState(INITIAL_NOTEBOOK_CELLS);
  const [runningCellId, setRunningCellId] = useState<string | null>(null);
  const [kernelStatus, setKernelStatus] = useState<'idle' | 'busy'>('idle');
  const [activeCellIndex, setActiveCellIndex] = useState<number>(3); // Task 1 code cell
  const [downloading, setDownloading] = useState(false);
  const [capturedTask, setCapturedTask] = useState<number | null>(null);

  const runCell = async (cellId: string) => {
    setRunningCellId(cellId);
    setKernelStatus('busy');

    // Simulate execution latency
    await new Promise((resolve) => setTimeout(resolve, 600));

    setCells((prev) =>
      prev.map((c) => {
        if (c.id === cellId && c.type === 'code') {
          return {
            ...c,
            executionCount: (c.executionCount || 0) + 1
          };
        }
        return c;
      })
    );

    setRunningCellId(null);
    setKernelStatus('idle');
  };

  const runAllCells = async () => {
    setKernelStatus('busy');
    for (const cell of cells) {
      if (cell.type === 'code') {
        setRunningCellId(cell.id);
        await new Promise((resolve) => setTimeout(resolve, 400));
      }
    }
    setRunningCellId(null);
    setKernelStatus('idle');
  };

  const restartKernel = () => {
    setKernelStatus('idle');
    setCells(INITIAL_NOTEBOOK_CELLS);
  };

  const handleDownloadIpynb = async () => {
    setDownloading(true);
    try {
      const response = await fetch('/api/download-notebook');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Medical_Chatbot_Project_Completed.ipynb';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  const handleCapture = (taskNum: number) => {
    setCapturedTask(taskNum);
    if (onCaptureScreenshot) {
      const title =
        taskNum === 2
          ? 'Task 2: Lightweight LLM Loading & Readiness Output'
          : 'Task 3: Answering Function Definition & Sample Output';
      onCaptureScreenshot(taskNum, title, '');
    }
    setTimeout(() => setCapturedTask(null), 2500);
  };

  return (
    <div className="space-y-4">
      {/* Notebook Toolbar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 text-sm">Medical_Chatbot_Project_Template.ipynb</span>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">Python 3.10</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 border-l border-slate-200 pl-3">
            <span
              className={`w-2 h-2 rounded-full ${
                kernelStatus === 'busy' ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'
              }`}
            />
            <span className="capitalize">Kernel: {kernelStatus}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={runAllCells}
            disabled={kernelStatus === 'busy'}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-slate-700" />
            <span>Run All Cells</span>
          </button>

          <button
            onClick={restartKernel}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            <span>Restart Kernel</span>
          </button>

          <button
            onClick={handleDownloadIpynb}
            disabled={downloading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors cursor-pointer"
          >
            {downloading ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
            <span>Download .ipynb</span>
          </button>

          <div className="border-l border-slate-200 pl-2 flex items-center gap-1.5">
            <button
              onClick={() => handleCapture(2)}
              title="Capture Output for Task 2 Peer Review"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-slate-500" />
              <span>Capture Task 2</span>
            </button>
            <button
              onClick={() => handleCapture(3)}
              title="Capture Output for Task 3 Peer Review"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-slate-500" />
              <span>Capture Task 3</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notebook Cells Container */}
      <div className="space-y-4">
        {cells.map((cell, idx) => {
          const isSelected = activeCellIndex === idx;

          if (cell.type === 'markdown') {
            return (
              <div
                key={cell.id}
                onClick={() => setActiveCellIndex(idx)}
                className={`bg-white rounded-xl p-6 border transition-all ${
                  isSelected ? 'border-indigo-400 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {cell.task && (
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md mb-3 border border-indigo-100">
                    <BookOpen className="w-3.5 h-3.5" />
                    Coursera Task {cell.task} Instructions
                  </div>
                )}
                <div className="prose prose-slate max-w-none text-slate-800">
                  {cell.source.split('\n\n').map((paragraph, pIdx) => {
                    if (paragraph.startsWith('# ')) {
                      return (
                        <h1 key={pIdx} className="text-xl font-bold text-slate-900 mb-2">
                          {paragraph.replace('# ', '')}
                        </h1>
                      );
                    }
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={pIdx} className="text-lg font-bold text-slate-900 mt-2 mb-2">
                          {paragraph.replace('## ', '')}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith('**Goal:**')) {
                      return (
                        <p key={pIdx} className="text-sm font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 my-2">
                          {paragraph}
                        </p>
                      );
                    }
                    return (
                      <p key={pIdx} className="text-sm leading-relaxed text-slate-600 my-1 whitespace-pre-line">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          }

          // Code Cell
          const isRunning = runningCellId === cell.id;

          return (
            <div
              key={cell.id}
              onClick={() => setActiveCellIndex(idx)}
              className={`bg-white rounded-xl border transition-all overflow-hidden ${
                isSelected ? 'border-indigo-500 shadow-md ring-1 ring-indigo-500/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Cell Header */}
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-indigo-700">
                    In [{isRunning ? '*' : cell.executionCount ?? ' '}]
                  </span>
                  {cell.task && (
                    <span className="text-xs text-slate-500 font-medium">
                      · Task {cell.task} Solution Cell
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {cell.task === 2 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCapture(2);
                      }}
                      className="text-xs text-slate-600 hover:text-indigo-600 flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200 cursor-pointer"
                    >
                      <Camera className="w-3 h-3" />
                      Capture Output
                    </button>
                  )}
                  {cell.task === 3 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCapture(3);
                      }}
                      className="text-xs text-slate-600 hover:text-indigo-600 flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200 cursor-pointer"
                    >
                      <Camera className="w-3 h-3" />
                      Capture Output
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      runCell(cell.id);
                    }}
                    disabled={isRunning}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-emerald-700" />
                    <span>{isRunning ? 'Running...' : 'Run'}</span>
                  </button>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-4 bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto">
                <pre>
                  <code>{cell.source}</code>
                </pre>
              </div>

              {/* Cell Output */}
              {cell.outputs && cell.outputs.length > 0 && (
                <div className="bg-slate-950 text-slate-200 border-t border-slate-800 p-4 font-mono text-xs">
                  <div className="flex items-center gap-2 mb-2 text-slate-400 text-[11px]">
                    <Terminal className="w-3 h-3" />
                    <span>Out [{cell.executionCount ?? 1}] stdout</span>
                  </div>
                  <div className="space-y-1">
                    {cell.outputs.map((out, outIdx) => (
                      <div key={outIdx} className="space-y-0.5">
                        {out.text.map((line, lIdx) => {
                          const isDownload = line.includes('Downloading');
                          const isSuccess = line.includes('successfully') || line.includes('Output:');
                          return (
                            <div
                              key={lIdx}
                              className={`${
                                isDownload
                                  ? 'text-sky-300'
                                  : isSuccess
                                  ? 'text-emerald-400 font-semibold'
                                  : 'text-slate-300'
                              }`}
                            >
                              {line}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Captured Toast */}
      {capturedTask && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <div>
            <div className="text-xs font-bold text-white">Screenshot Recorded for Peer Review</div>
            <div className="text-xs text-slate-300">
              {capturedTask === 2
                ? 'Task 2: Hugging Face Model Loading Output'
                : 'Task 3: Function Definition & Sample Output'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
