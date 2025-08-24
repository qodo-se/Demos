# Qodo SE :: Demos

Demos for Qodo SEs

## Agent Execution

1. E2E & API Test Gen

```bash
qodo --agent-file=./Sri/agents-library/01_demo_e2e_tests.toml --yes
```

1. Compliance

```bash
# All
qodo --agent-file=./Sri/agents-library/01_demo_pr_compliance_toml --yes

# GPDR
qodo --agent-file=./Sri/agents-library/01_demo_pr_compliance_gdpr.toml --yes

# HIPAA
qodo --agent-file=./Sri/agents-library/01_demo_pr_compliance_hipaa.toml --yes

# OWASP
qodo --agent-file=./Sri/agents-library/01_demo_pr_compliance_owasp.toml --yes

# PCI-DSS
qodo --agent-file=./Sri/agents-library/01_demo_pr_compliance_pcidss.toml --yes

# SOC2 Type 2
qodo --agent-file=./Sri/agents-library/01_demo_pr_compliance_soc2type2.toml --yes
```
