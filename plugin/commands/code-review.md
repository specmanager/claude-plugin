---
description: Perform comprehensive code review with quality and security analysis
argument-hint: [review-type] [focus-area]
---

# Code Review Command

Perform comprehensive code review with quality, security, and best practices analysis.

## Context
- Review type: $1 (security|performance|quality|all - default: all)
- Focus area: $2 (specific module or component)
- Recent changes: !`git diff HEAD~1`
- Code metrics: !`find . -name "*.js" -o -name "*.ts" -o -name "*.py" | wc -l`

## Code Review Process

### 1. **Code Quality Analysis**
- Code structure and organization
- Design patterns and best practices
- Code readability and maintainability
- Documentation and comments quality

### 2. **Security Review**
- Vulnerability assessment
- Input validation and sanitization
- Authentication and authorization
- Data protection and privacy

### 3. **Performance Analysis**
- Algorithm efficiency
- Resource utilization
- Database query optimization
- Caching strategies

### 4. **Best Practices Validation**
- Coding standards compliance
- Error handling patterns
- Testing coverage and quality
- Version control practices

## Review Criteria
- **Security**: OWASP guidelines, secure coding practices
- **Performance**: Efficiency, scalability, resource usage
- **Quality**: Maintainability, readability, documentation
- **Standards**: Team coding standards, industry best practices

## Expected Outcome
- Comprehensive code review report
- Prioritized improvement recommendations
- Security vulnerability assessment
- Performance optimization suggestions

## Review Feedback
- **Critical Issues**: Immediate attention required
- **High Priority**: Should be addressed before merge
- **Medium Priority**: Address in next iteration
- **Low Priority**: Future improvement opportunities

## Approval Criteria
Code approved when:
- No critical security vulnerabilities
- Performance benchmarks met
- Code quality standards satisfied
- All tests passing
- Documentation complete
