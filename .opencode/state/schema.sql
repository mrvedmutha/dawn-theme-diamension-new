-- Projects table: Tracks each section being built
CREATE TABLE projects (
  id INTEGER PRIMARY KEY,
  section_name TEXT UNIQUE NOT NULL,
  figma_url TEXT,
  current_phase TEXT CHECK (current_phase IN ('planning', 'awaiting-assets', 'development', 'testing', 'manual-review', 'integration', 'deployed')) DEFAULT 'planning',
  status TEXT CHECK (status IN ('in-progress', 'halted', 'failed', 'passed', 'approved')) DEFAULT 'in-progress',
  git_tag TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Phases table: Logs each phase completion
CREATE TABLE phases (
  id INTEGER PRIMARY KEY,
  project_id INTEGER,
  phase_name TEXT,
  agent_used TEXT,
  model_used TEXT,
  input_file TEXT,
  output_file TEXT,
  result TEXT CHECK (result IN ('success', 'failure', 'halted')),
  error_message TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Assets table: Tracks required and provided assets
CREATE TABLE assets (
  id INTEGER PRIMARY KEY,
  project_id INTEGER,
  asset_type TEXT CHECK (asset_type IN ('image', 'font', 'video', 'icon')),
  asset_name TEXT NOT NULL,
  required BOOLEAN DEFAULT true,
  provided BOOLEAN DEFAULT false,
  location TEXT,
  request_file TEXT,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Test Results table: Stores test outcomes
CREATE TABLE test_results (
  id INTEGER PRIMARY KEY,
  project_id INTEGER,
  test_file TEXT,
  visual_tests_passed BOOLEAN,
  functional_tests_passed BOOLEAN,
  css_standards_passed BOOLEAN,
  js_standards_passed BOOLEAN,
  screenshot_diffs TEXT,
  console_errors TEXT,
  test_report_path TEXT,
  result TEXT CHECK (result IN ('passed', 'failed')),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Approvals table: Manual approval tracking
CREATE TABLE approvals (
  id INTEGER PRIMARY KEY,
  project_id INTEGER,
  approval_type TEXT CHECK (approval_type IN ('assets-provided', 'manual-testing', 'deployment')),
  approved_by TEXT,
  approval_command TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Deployment table: Tracks deployments
CREATE TABLE deployments (
  id INTEGER PRIMARY KEY,
  project_id INTEGER,
  theme_type TEXT CHECK (theme_type IN ('unpublished', 'live')),
  theme_id TEXT,
  deployment_url TEXT,
  deployed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Indexes for performance
CREATE INDEX idx_projects_section ON projects(section_name);
CREATE INDEX idx_assets_project ON assets(project_id);
CREATE INDEX idx_phases_project ON phases(project_id);
CREATE INDEX idx_test_results_project ON test_results(project_id);
CREATE INDEX idx_approvals_project ON approvals(project_id);
CREATE INDEX idx_deployments_project ON deployments(project_id);