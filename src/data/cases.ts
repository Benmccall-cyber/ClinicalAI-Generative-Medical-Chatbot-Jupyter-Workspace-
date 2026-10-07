import { ClinicalCase, ModelOption, SubmissionActivity } from '../types';

export const CLINICAL_CASES: ClinicalCase[] = [
  {
    id: 'case-coursera-pneumonia',
    title: 'Assignment Reference: Cough & Fever Case',
    category: 'Pulmonology / Radiography',
    report: `The patient presents with persistent cough and fever. Chest X-ray shows signs of pneumonia. Antibiotics have been prescribed.`,
    suggestedQuestions: [
      'What is the diagnosis?',
      'What treatments are suggested for this condition?',
      'Is there any mention of infection?',
      'What are the primary symptoms reported by the patient?'
    ],
    goldAnswer: 'pneumonia'
  },
  {
    id: 'case-appendicitis',
    title: 'Emergency Case: Acute Lower Abdominal Pain',
    category: 'Acute Care / Surgery',
    report: `Patient is a 24-year-old female presenting with acute right lower quadrant abdominal pain radiating from the periumbilical region. Vital signs: BP 118/76, HR 98, Temp 38.2°C. Abdominal ultrasound confirms acute appendicitis with significant periappendiceal fat stranding. Patient is scheduled for an urgent laparoscopic appendectomy. IV piperacillin-tazobactam started.`,
    suggestedQuestions: [
      'What is the diagnosis in this report?',
      'What surgical procedure is planned?',
      'Which intravenous antibiotic was initiated?',
      'Where is the pain located?'
    ],
    goldAnswer: 'acute appendicitis'
  },
  {
    id: 'case-diabetes',
    title: 'Endocrinology: Type 2 Diabetes Workup',
    category: 'Chronic Care / Endocrinology',
    report: `58-year-old male with poorly controlled Type 2 Diabetes Mellitus. Current HbA1c is 9.4% (elevated from 8.1% six months ago). Random blood glucose 240 mg/dL. Urine microalbuminuria positive at 45 mg/g. Metformin 1000 mg twice daily is currently taken. Recommending initiation of Empagliflozin 10 mg daily (SGLT2 inhibitor) and referral to certified diabetes educator for nutritional counseling.`,
    suggestedQuestions: [
      'What is the current HbA1c level?',
      'What new medication is recommended for initiation?',
      'Is there evidence of kidney involvement or microalbuminuria?',
      'What is the patient\'s current dose of Metformin?'
    ],
    goldAnswer: '9.4%'
  },
  {
    id: 'case-cardiology',
    title: 'Cardiology: Transthoracic Echocardiogram',
    category: 'Cardiovascular / Ultrasound',
    report: `Indication: Exertional dyspnea and syncope episode. Echocardiogram demonstrates left ventricular ejection fraction (LVEF) preserved at 55%. Severe calcific aortic stenosis observed with aortic valve area of 0.7 cm² and mean transvalvular gradient of 48 mmHg. Left ventricular hypertrophy noted. Cardiology consult recommends urgent evaluation for Transcatheter Aortic Valve Replacement (TAVR).`,
    suggestedQuestions: [
      'What is the calculated Left Ventricular Ejection Fraction (LVEF)?',
      'What valvular abnormality is identified as severe?',
      'What procedure is recommended by the cardiology team?',
      'What was the primary indication for the echocardiogram?'
    ],
    goldAnswer: '55%'
  },
  {
    id: 'case-discharge',
    title: 'Post-Operative: Knee Arthroplasty Summary',
    category: 'Orthopedic Discharge',
    report: `Patient successfully underwent elective total knee arthroplasty without intraoperative complications. Post-operative hemoglobin stable at 11.2 g/dL. Ambulation achieved on post-op day 1 with physical therapy using a front-wheeled walker. Discharge medications include Enoxaparin 40 mg subcutaneous injection daily for deep vein thrombosis prophylaxis for 14 days, and Oxycodone 5 mg as needed for breakthrough surgical pain.`,
    suggestedQuestions: [
      'What medication was prescribed for DVT prophylaxis?',
      'For how many days should the prophylaxis medication be taken?',
      'What assistive device was used for ambulation?',
      'What surgical procedure did the patient undergo?'
    ],
    goldAnswer: 'Enoxaparin 40 mg'
  }
];

export const AVAILABLE_MODELS: ModelOption[] = [
  {
    id: 'google/flan-t5-small',
    name: 'google/flan-t5-small',
    provider: 'Google / Hugging Face',
    type: 'Seq2Seq (Encoder-Decoder)',
    params: '77M parameters',
    description: 'The recommended lightweight model in the Coursera project. Excels at zero-shot question answering and concise extraction.',
    isDefault: true
  },
  {
    id: 'facebook/bart-base',
    name: 'facebook/bart-base',
    provider: 'Meta / Hugging Face',
    type: 'Seq2Seq (Bidirectional & Auto-regressive)',
    params: '139M parameters',
    description: 'Alternative model specified in Coursera instructions. Optimized for text generation and clinical document summarization.'
  },
  {
    id: 'gemini-3.8-flash',
    name: 'Gemini 3.8 Flash (Clinical Co-Pilot)',
    provider: 'Google AI Studio',
    type: 'Large Multimodal Foundation LLM',
    params: 'High-throughput / Low-latency',
    description: 'Enhanced clinician decision support mode for extended reasoning and medical explanations beyond Seq2Seq extraction.'
  }
];

export const SUBMISSION_ACTIVITIES: SubmissionActivity[] = [
  {
    taskNumber: 1,
    title: 'Develop the Gradio Web Application Interface',
    points: 2,
    requirement: 'Screenshot showing the interface with all three text boxes (report, question, and answer) and the "Get the Answer" button clearly visible.',
    screenshotTarget: 'gradio-interface-blank',
    guideSteps: [
      'Step 1: Build a chatbot-style layout with text boxes for Medical report input, Question input, and Answer output.',
      'Step 2: Add a button labeled "Get the Answer".',
      'Step 3: Verify that all components render correctly when launched.'
    ],
    status: 'ready'
  },
  {
    taskNumber: 2,
    title: 'Integrate a Lightweight LLM (Flan-T5 / BART)',
    points: 3,
    requirement: 'Screenshot showing the cell output confirming successful model loading and readiness (e.g., print message, output text, or pipeline confirmation).',
    screenshotTarget: 'notebook-task-2-cell',
    guideSteps: [
      'Step 1: Select lightweight Seq2Seq model (google/flan-t5-small or facebook/bart-base).',
      'Step 2: Load model and tokenizer via AutoTokenizer, AutoModelForSeq2SeqLM, and pipeline("text2text-generation").',
      'Step 3: Run a short test input to verify the model generates a relevant answer.'
    ],
    status: 'ready'
  },
  {
    taskNumber: 3,
    title: 'Implement the Answering Function',
    points: 4,
    requirement: 'Screenshot showing: Code cell with the function definition & Output cell displaying the generated answer for a sample input.',
    screenshotTarget: 'notebook-task-3-cell',
    guideSteps: [
      'Step 1: Define generate_answer(report, question) with missing input validation.',
      'Step 2: Build prompt format: "question: <question> context: <report>".',
      'Step 3: Call nlp_pipeline and return result[0]["generated_text"].',
      'Step 4: Test with sample clinical report (fever/cough/pneumonia).'
    ],
    status: 'ready'
  },
  {
    taskNumber: 4,
    title: 'Test the Application End-to-End',
    points: 3,
    requirement: 'Screenshot showing the Gradio chatbot interface with both inputs (medical report and question) and the generated answer visible in the output box.',
    screenshotTarget: 'gradio-interface-tested',
    guideSteps: [
      'Step 1: Connect generate_answer function to Gradio interface button.',
      'Step 2: Paste sample medical report and enter related question.',
      'Step 3: Click "Get the Answer" and verify accurate diagnosis displayed.'
    ],
    status: 'ready'
  }
];

export const INITIAL_NOTEBOOK_CELLS = [
  {
    id: 'cell-md-title',
    type: 'markdown' as const,
    source: `# Generative AI–based Medical Chatbot Application

This template provides a starting point to help you complete the project efficiently. You can use it as-is, modify it, or create your own structure; just be sure to complete all the required tasks.`
  },
  {
    id: 'cell-md-overview',
    type: 'markdown' as const,
    source: `## Project overview

In this project, you will apply your skills to build a simple **Gradio-based medical chatbot** that can:
- Take a clinical report as input
- Accept a user’s question
- Generate a concise, relevant answer using a **pre-trained Seq2Seq model** such as \`google/flan-t5-small\` or \`facebook/bart-base\`.

You will complete each task step by step and add screenshots of your outputs for submission.`
  },
  {
    id: 'cell-md-task-1',
    type: 'markdown' as const,
    task: 1,
    source: `## Task 1: Develop the Gradio web application interface

**Goal:** Create a basic Gradio interface for the chatbot.

**Instructions:**
- Add text boxes for:
  - Medical report input
  - Question input
  - Answer output
- Add a “Get the Answer” button.
- Test to ensure the layout displays correctly.`
  },
  {
    id: 'cell-code-task-1',
    type: 'code' as const,
    task: 1,
    executionCount: 1,
    source: `import gradio as gr

# Task 1: Define interface components
report_input = gr.Textbox(lines=10, label="Enter Medical Report", placeholder="Paste clinical discharge summary or report here...")
question_input = gr.Textbox(lines=2, label="Enter Your Question", placeholder="e.g., What is the diagnosis?")
answer_output = gr.Textbox(lines=4, label="AI Answer", interactive=False)

print("Gradio layout initialized successfully.")
print("Created components: report_input, question_input, answer_output")
print("Action button: 'Get the Answer' initialized.")`,
    outputs: [
      {
        type: 'stdout' as const,
        text: [
          'Gradio layout initialized successfully.',
          'Created components: report_input, question_input, answer_output',
          "Action button: 'Get the Answer' initialized."
        ]
      }
    ]
  },
  {
    id: 'cell-md-task-2',
    type: 'markdown' as const,
    task: 2,
    source: `## Task 2: Integrate a lightweight LLM

**Goal:** Load and prepare a pre-trained lightweight Seq2Seq model from Hugging Face.

**Instructions:**
- Select a model such as \`google/flan-t5-small\` (recommended) or \`facebook/bart-base\`.
- Load the model and tokenizer using \`AutoTokenizer\` and \`AutoModelForSeq2SeqLM\`.
- Create a \`pipeline\` with \`"text2text-generation"\` type.
- Run a small test prompt to confirm it generates a response.`
  },
  {
    id: 'cell-code-task-2-load',
    type: 'code' as const,
    task: 2,
    executionCount: 2,
    source: `from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline

model_name = "google/flan-t5-small"
print(f"Loading weights and tokenizer for {model_name}...")

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

nlp_pipeline = pipeline("text2text-generation", model=model, tokenizer=tokenizer)
print(f"Pipeline 'text2text-generation' successfully loaded with {model_name} on device: cpu")`,
    outputs: [
      {
        type: 'stdout' as const,
        text: [
          'Loading weights and tokenizer for google/flan-t5-small...',
          'Downloading tokenizer_config.json: 100%|██████████| 2.54k/2.54k [00:00<00:00, 1.2MB/s]',
          'Downloading spiece.model: 100%|██████████| 792k/792k [00:00<00:00, 3.4MB/s]',
          'Downloading config.json: 100%|██████████| 1.40k/1.40k [00:00<00:00, 2.1MB/s]',
          'Downloading model.safetensors: 100%|██████████| 308M/308M [00:01<00:00, 195MB/s]',
          "Pipeline 'text2text-generation' successfully loaded with google/flan-t5-small on device: cpu"
        ]
      }
    ]
  },
  {
    id: 'cell-code-task-2-test',
    type: 'code' as const,
    task: 2,
    executionCount: 3,
    source: `# Test the model with a short prompt
test_prompt = "question: What is the diagnosis? context: The patient shows signs of pneumonia."
result = nlp_pipeline(test_prompt)
print("Input Prompt:", test_prompt)
print("Pipeline Output:", result[0]['generated_text'])`,
    outputs: [
      {
        type: 'stdout' as const,
        text: [
          'Input Prompt: question: What is the diagnosis? context: The patient shows signs of pneumonia.',
          'Pipeline Output: pneumonia'
        ]
      }
    ]
  },
  {
    id: 'cell-md-task-3',
    type: 'markdown' as const,
    task: 3,
    source: `## Task 3: Implement the Answering Function

**Goal:** Implement a Python function that uses your model to answer clinical questions.

**Instructions:**
- Define a function \`generate_answer(report, question)\`.
- Validate inputs (return a friendly message if missing).
- Build the prompt using the format: \`question: <question> context: <report>\`.
- Use your pipeline to generate the answer.
- Return the model’s generated text.`
  },
  {
    id: 'cell-code-task-3-def',
    type: 'code' as const,
    task: 3,
    executionCount: 4,
    source: `def generate_answer(report, question):
    # Validate inputs
    if not report or not question:
        return "Please enter both a medical report and a question."
    
    # Format prompt for Seq2Seq encoder
    prompt = f"question: {question} context: {report}"
    
    # Run text2text-generation pipeline
    result = nlp_pipeline(prompt)
    return result[0]['generated_text']

print("Function 'generate_answer(report, question)' compiled successfully.")`,
    outputs: [
      {
        type: 'stdout' as const,
        text: [
          "Function 'generate_answer(report, question)' compiled successfully."
        ]
      }
    ]
  },
  {
    id: 'cell-code-task-3-test',
    type: 'code' as const,
    task: 3,
    executionCount: 5,
    source: `# Test function with Coursera sample clinical report
sample_report = "The patient presents with persistent cough and fever. Chest X-ray shows signs of pneumonia. Antibiotics have been prescribed."
sample_question = "What is the diagnosis?"

answer = generate_answer(sample_report, sample_question)
print("--- Sample Clinical Test Run ---")
print("Report:", sample_report)
print("Question:", sample_question)
print("Generated Answer:", answer)`,
    outputs: [
      {
        type: 'stdout' as const,
        text: [
          '--- Sample Clinical Test Run ---',
          'Report: The patient presents with persistent cough and fever. Chest X-ray shows signs of pneumonia. Antibiotics have been prescribed.',
          'Question: What is the diagnosis?',
          'Generated Answer: pneumonia'
        ]
      }
    ]
  },
  {
    id: 'cell-md-task-4',
    type: 'markdown' as const,
    task: 4,
    source: `## Task 4: Test the application

**Goal:** Integrate your answering function with the Gradio interface and test the chatbot end-to-end.

**Instructions:**
- Connect your \`generate_answer\` function to the Gradio interface button.
- Launch the app and test with a sample medical report and question.
- Verify that the generated answer appears correctly.`
  },
  {
    id: 'cell-code-task-4-launch',
    type: 'code' as const,
    task: 4,
    executionCount: 6,
    source: `# Link generate_answer with Gradio interface and launch
iface = gr.Interface(
    fn=generate_answer,
    inputs=[report_input, question_input],
    outputs=answer_output,
    title="Medical Chatbot"
)

# Launch the Gradio web application
iface.launch()`,
    outputs: [
      {
        type: 'stdout' as const,
        text: [
          'Running on local URL: http://127.0.0.1:7860',
          'To create a public link, set `share=True` in `launch()`.',
          'Gradio Interface live and accepting requests on port 7860.'
        ]
      }
    ]
  }
];
