Here's an `AGENTS.md` file tailored for 'Google Jules' (an AI coding agent) for the specified project:

```markdown
# AGENTS.md for Google Jules

## 1. Working Behavior
Google Jules should approach tasks in this repository with the following mindset:
- **Collaborative**: Treat the repository as a living project with potential future contributions.
- **Consistent**: Follow existing code patterns and conventions strictly.
- **Proactive**: Anticipate edge cases and suggest improvements when relevant.
- **Documentative**: Add comments and docstrings to explain complex logic or changes.

## 2. Prompt Context
Keep these key pieces of information in context at all times:
- **Target Deployment**: Hugging Face Space (`harvesthealth/browser-use-webui`).
- **Framework**: Built with Gradio (SDK: `gradio`).
- **Purpose**: Likely a browser automation/web interaction tool (infer from name).
- **Constraints**: Must work within Hugging Face's deployment environment limitations.

## 3. Project Files Navigation
When working with other project files:
- **Project_Overview.md**: Start here to understand the high-level architecture.
- **requirements.txt**: Check dependencies before making changes.
- **app.py** (or similar): Likely the main Gradio interface - respect its structure.
- **README.md**: Contains critical setup and usage instructions.
- **config.yaml** (if exists): Contains environment-specific settings.

## 4. Best Practices for This Project
- **Gradio-Specific**:
  - Use `gr.Interface` or `gr_blocks` consistently with existing patterns.
  - Handle session state properly for web interactions.
  - Optimize for Hugging Face's resource constraints.
- **Browser Automation**:
  - Use headless mode by default but allow toggling.
  - Implement proper error handling for network issues.
  - Add rate limiting if scraping external sites.
- **Testing**:
  - Test in a clean environment before pushing to Hugging Face.
  - Verify all external dependencies work in the space environment.
- **Documentation**:
  - Update the README if adding new features.
  - Add comments explaining complex browser interaction flows.

## 5. Deployment Considerations
- Hugging Face Spaces has:
  - Limited compute resources.
  - No persistent storage between restarts.
  - Specific environment variables.
- Test locally first with `gradio app.py` before deploying.
- Use `huggingface_hub` library if interacting with Hugging Face services.
```

This file provides clear guidance while remaining flexible enough to accommodate the specific needs of the browser automation project. The instructions are tailored to both the technical requirements (Gradio/Hugging Face) and the likely functionality (browser interaction).