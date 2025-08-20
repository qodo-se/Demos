# Repository Tour

## 🎯 What This Repository Does

**Qodo SE Demos** is a comprehensive collection of demonstration projects and test scenarios designed for Qodo Sales Engineers to showcase AI-powered development tools and testing capabilities across different client accounts and use cases.

**Key responsibilities:**
- Provide ready-to-use demo applications for client presentations
- Demonstrate AI-powered testing and code generation capabilities
- Showcase integration with various technologies and frameworks
- Support compliance and security testing scenarios

---

## 🏗️ Architecture Overview

### System Context
```
[Sales Engineers] → [Demo Repository] → [Client Presentations]
                          ↓
                   [Various Demo Apps & Tests]
                          ↓
                   [AI Tools Integration]
```

### Key Components
- **Account-Specific Demos** - Tailored demonstrations for specific client accounts (Pathlock, Analog, Postman, VegaSecurity)
- **Reference Applications** - Full-stack demo applications (boring-todo) with API and frontend components
- **Compliance Testing** - Security and compliance validation scenarios (SOC2, GDPR, OWASP, HIPAA, PCI-DSS)
- **AI Integration Examples** - Demonstrations of AI-powered code generation, testing, and review capabilities

### Data Flow
1. **Sales Engineers access repository** for client-specific demo materials
2. **Demo applications are launched** using provided scripts and configurations
3. **AI tools are demonstrated** on real codebases with various technologies
4. **Compliance scenarios are executed** to show security and regulatory capabilities
5. **Results are presented** to showcase AI-powered development workflows

---

## 📁 Project Structure [Partial Directory Tree]

```
Demos/
├── Accounts/                    # Client-specific demo materials
│   ├── Analog/                 # CodeFusion Studio package manager tests
│   ├── Pathlock/               # E2E testing scenarios with Playwright
│   ├── Postman/                # API testing demonstrations
│   └── VegaSecurity/           # Security-focused code guidelines
├── Sri/                        # Reference implementations
│   ├── boring-todo/            # Full-stack demo application
│   │   ├── boring-todo-api/    # FastAPI backend
│   │   └── boring-todo-app/    # Next.js frontend
│   └── agents-library/         # AI agent examples
├── Rules/                      # Compliance and governance
│   └── Compliance/             # Compliance testing rules
├── .github/                    # CI/CD workflows
│   └── workflows/              # Automated testing pipelines
├── example.pr_agent.toml       # AI PR agent configuration
└── pr_compliance_checklist.yaml # Compliance validation rules
```

### Key Files to Know

| File | Purpose | When You'd Touch It |
|------|---------|---------------------|
| `Sri/boring-todo/run-app.sh` | Launch Next.js frontend demo | Starting frontend demonstrations |
| `Sri/boring-todo/run-api.sh` | Launch FastAPI backend demo | Starting API demonstrations |
| `Demos.code-workspace` | VS Code workspace configuration | Setting up development environment |
| `example.pr_agent.toml` | AI PR agent configuration | Configuring AI code review demos |
| `pr_compliance_checklist.yaml` | Compliance validation rules | Demonstrating security/compliance features |
| `.github/workflows/ci.yml` | CI/CD pipeline configuration | Showing automated testing workflows |

---

## 🔧 Technology Stack

### Core Technologies
- **Languages:** Python (3.13+), TypeScript/JavaScript, Shell scripting
- **Backend Framework:** FastAPI - Modern, fast Python web framework for APIs
- **Frontend Framework:** Next.js (15.3+) with React (19.0+) - Full-stack React framework
- **Testing Frameworks:** Playwright, pytest, Jest - Comprehensive testing across languages

### Key Libraries
- **FastAPI & Uvicorn** - High-performance async Python web framework and ASGI server
- **Next.js & React** - Modern React framework with server-side rendering capabilities
- **Playwright** - Cross-browser end-to-end testing framework
- **pytest** - Python testing framework with extensive plugin ecosystem

### Development Tools
- **Poetry** - Python dependency management and packaging
- **VS Code Workspace** - Integrated development environment configuration
- **GitHub Actions** - Continuous integration and deployment
- **AI PR Agent** - Automated code review and improvement suggestions

---

## 🌐 External Dependencies

### Required Services
- **GitHub/GitLab/Bitbucket** - Version control and CI/CD integration for PR agent demos
- **Qodo AI Services** - AI-powered code analysis, testing, and review capabilities
- **Package Registries** - npm, PyPI for dependency management in demos

### Optional Integrations
- **Cloudsmith/myAnalog** - Private package repository access for enterprise demos
- **Various Client Systems** - Integration endpoints for account-specific demonstrations

---

## 🔄 Common Workflows

### Demo Application Startup
1. **Navigate to boring-todo directory**
2. **Launch API server:** `./run-api.sh` (FastAPI on port 8000)
3. **Launch frontend:** `./run-app.sh` (Next.js on port 3001)
4. **Run tests:** `./test-api.sh` and `./test-app.sh`

**Code path:** `Scripts` → `Poetry/npm install` → `Server startup` → `Demo ready`

### Client Demo Preparation
1. **Select account-specific directory** (e.g., `Accounts/Pathlock/`)
2. **Review test scenarios and documentation**
3. **Execute setup scripts** for environment preparation
4. **Run demonstration workflows** with AI tools integration

**Code path:** `Account selection` → `Environment setup` → `AI tool integration` → `Live demonstration`

### Compliance Testing Demo
1. **Configure PR agent** with compliance rules from `pr_compliance_checklist.yaml`
2. **Create sample PR** with code changes
3. **Demonstrate AI-powered compliance checking** (SOC2, GDPR, OWASP, etc.)
4. **Show automated security analysis** and recommendations

**Code path:** `PR creation` → `AI analysis` → `Compliance validation` → `Security recommendations`

---

## 📈 Performance & Scale

### Performance Considerations
- **Fast startup times** - Demo applications designed for quick launch during presentations
- **Lightweight dependencies** - Minimal setup requirements for reliable demonstrations
- **Cross-platform compatibility** - Works on macOS, Linux, and Windows environments

### Monitoring
- **CI/CD pipelines** - Automated testing ensures demo reliability
- **Health checks** - Built-in validation for demo application status
- **Error handling** - Graceful degradation for network or dependency issues

---

## 🚨 Things to Be Careful About

### 🔒 Security Considerations
- **No real credentials** - All demo credentials are test/example values only
- **Compliance examples** - Real compliance rules but applied to demo code only
- **AI model access** - Requires proper API keys for AI-powered features

### Demo-Specific Warnings
- **Port conflicts** - API (8000) and App (3001) ports must be available
- **Network dependencies** - Some demos require internet access for AI services
- **Client data** - Never use real client data in demonstrations

---

*Updated at: 2025-01-27 UTC*