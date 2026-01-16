# AGENTS.md

## Working Behavior

Google Jules should approach tasks in this repository by following a systematic process:

1. **URL Processing**: When given a URL, Jules should first attempt to clone the website using `goclone-dev/goclone.git`
2. **Fallback Strategy**: If goclone fails, automatically switch to `zTrix/webpage2html.git` as alternative
3. **Change Integration**: After cloning, Jules should prompt the user for specific changes or accept a change file input
4. **Modern Website Generation**: Convert the cloned HTML into a modern website incorporating all requested changes
5. **Interactive Development**: Maintain chat capability for ongoing modifications and improvements
6. **Error Handling**: Implement robust 501 error handling with exponential backoff (30s → 60s after 5 retries)

## Prompt Context

Key information Jules must keep in mind:

- **Primary Cloning Tool**: `goclone-dev/goclone.git` for website cloning
- **Fallback Tool**: `zTrix/webpage2html.git` for alternative cloning
- **Modernization Target**: Transform cloned content into contemporary web standards
- **LLM Integration**: 
  - `alias-code` for coding tasks
  - `alias-large` for planning
  - `alias-huge` for full codebase context questions
- **Endpoint**: Helmholtz API at `https://api.helmholtz-blablador.fz-juelich.de/v1`
- **Deployment**: Hugging Face Space `harvesthealth/browser-use-webui` using Gradio SDK
- **Error Management**: 501 errors retry with exponential backoff (30s → 60s)
- **User Interaction**: Maintain chat interface for continuous feedback and modifications

## Project Integration Guidelines

Jules should follow these project files and conventions:

### Project Structure
```
project-root/
├── main.py                 # Main application entry point
├── requirements.txt        # Dependencies
├── README.md               # Project documentation
├── AGENTS.md               # This file
├── config.json             # Configuration settings
├── src/
│   ├── clone_engine.py     # Cloning logic implementation
│   ├── transform_engine.py # HTML to modern website conversion
│   ├── chat_engine.py      # Interactive chat functionality
│   └── api_client.py       # Helmholtz API integration
└── templates/
    └── modern_template.html # Modern website template
```

### Implementation Requirements
1. **URL Endpoint**: Create `/clone-and-modernize` endpoint that accepts URL parameter
2. **Error Handling**: Implement comprehensive error handling for both cloning tools
3. **Change Processing**: Parse user-provided changes and integrate them properly
4. **API Integration**: Connect to Helmholtz API with proper model selection based on task type
5. **Gradio Integration**: Ensure compatibility with Hugging Face Space deployment

## Implementation Instructions

### Cloning Process
1. First attempt: Use `goclone-dev/goclone.git` with timeout protection
2. Fallback: If failure occurs, use `zTrix/webpage2html.git` with same timeout
3. Error Handling: Implement 501 error retry logic with exponential backoff

### Change Application
1. Prompt user for specific changes or accept change file input
2. Parse changes into structured format
3. Apply changes to cloned HTML while maintaining functionality
4. Validate changes against original site structure

### Modernization Process
1. Convert legacy HTML/CSS/JS to modern web standards
2. Implement responsive design principles
3. Ensure accessibility compliance
4. Optimize performance and loading times

### LLM Integration
```python
def get_llm_model(task_type):
    if task_type == "coding":
        return "alias-code"
    elif task_type == "planning":
        return "alias-large"
    elif task_type == "context":
        return "alias-huge"
    else:
        return "alias-code"  # default
```

## Best Practices for Results

1. **Robust Error Handling**: Always implement fallback strategies and retry mechanisms
2. **User Experience**: Maintain clear communication throughout the process
3. **Code Quality**: Follow modern Python standards and clean architecture
4. **Performance**: Optimize both cloning and transformation processes
5. **Compatibility**: Ensure all generated sites work across different browsers
6. **Security**: Sanitize inputs and validate all user-provided data
7. **Testing**: Include unit tests for critical components like error handling and change application
8. **Documentation**: Keep inline comments and docstrings up to date
9. **Modularity**: Design components to be easily testable and maintainable
10. **Scalability**: Consider resource usage when processing large websites

## Technical Specifications

### Required Libraries
- `requests` for HTTP operations
- `