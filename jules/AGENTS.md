# AGENTS.md

## Working Behavior

Google Jules should approach tasks in this repository by following a systematic, multi-step process:

1. **URL Processing**: When receiving a URL, use `goclone` to clone the website first. If `goclone` fails, fall back to `webpage2html`.

2. **User Interaction**: After cloning, prompt the user for specific changes or modifications they want to make to the cloned site. Present a textbox for changes or change files.

3. **Code Generation**: Based on user input, generate modern HTML/CSS/JS code that integrates the requested changes while maintaining the original site's structure and functionality.

4. **Chat Integration**: Maintain chat capabilities throughout the process so users can request additional modifications or improvements.

5. **Endpoint Implementation**: Create endpoints for:
   - URL-based website cloning and processing
   - Helmholtz code model endpoint with alias-large for planning and alias-huge for full codebase context questions

6. **Error Handling**: Implement robust 501 error handling with retry logic:
   - Retry 3 times at 30-second intervals
   - After 5 failed attempts, increase interval to 60 seconds

7. **Deployment Focus**: Always consider the target deployment environment (Hugging Face Space harvesthealth/browser-use-webui) when generating code.

## Prompt Context

Key information Google Jules must keep in mind:

- **Primary Goal**: Adapt the open-lovable project to create a web cloning and modification platform
- **Core Technologies**: 
  - Primary: `goclone-dev/goclone.git`
  - Fallback: `zTrix/webpage2html.git`
  - Modern web development stack for final output
- **Special Endpoints**:
  - Helmholtz code model with two aliases:
    - `alias-large` for high-level planning and architecture decisions
    - `alias-huge` for comprehensive codebase context analysis
- **Error Handling Requirements**: 501 error retry mechanism with exponential backoff
- **Deployment Target**: Hugging Face Space `harvesthealth/browser-use-webui`
- **User Experience**: Maintain chat functionality for iterative improvements
- **Code Quality**: Generate clean, modern, responsive web code that maintains accessibility standards

## Instructions for Following Other Project Files

### Project_Overview Integration
- Refer to `Project_Overview.md` for understanding the overall architecture and design philosophy
- Align all generated code with the project's stated goals and technical constraints
- Ensure compatibility with existing project structures and conventions

### File Structure Considerations
- Follow the established directory structure for new implementations
- Place new endpoint code in appropriate locations (likely `src/endpoints/` or similar)
- Maintain consistency with existing file naming and organization patterns
- Ensure proper documentation generation alongside new features

### Configuration Management
- Check existing configuration files for environment variable requirements
- Respect any existing API key or credential management patterns
- Follow established logging and monitoring practices

### Testing Guidelines
- Write tests for new endpoints and core functionality
- Ensure backward compatibility with existing features
- Test error handling scenarios thoroughly

## Tips for Optimal Results

1. **Prioritize User Experience**: Make the chat interface intuitive and responsive. Users should be able to easily request modifications and see immediate feedback.

2. **Handle Failures Gracefully**: When cloning fails, provide clear error messages and smooth fallback procedures. The retry mechanism should be transparent to the user.

3. **Code Quality Focus**: Generate modern, maintainable code that follows current web standards. Prioritize clean separation of concerns between HTML, CSS, and JavaScript.

4. **Performance Optimization**: Consider loading times and resource usage, especially since this will run in a Hugging Face Space environment with limited resources.

5. **Security First**: Validate all user inputs, especially URLs and modification requests, to prevent injection attacks or unexpected behavior.

6. **Documentation Integration**: Include clear comments in your code and update relevant documentation files to reflect new functionality.

7. **Testing Strategy**: Implement comprehensive testing for both successful cases and edge cases, particularly around error handling and fallback mechanisms.

8. **Deployment Optimization**: Keep the final implementation lightweight and efficient for the Hugging Face Space deployment environment.

9. **Progressive Enhancement**: Build upon existing functionality rather than replacing it entirely, ensuring smooth integration with the open-lovable foundation.

10. **Version Control Best Practices**: Use meaningful commit messages and organize changes logically to facilitate review and future maintenance.