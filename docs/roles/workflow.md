# role-gated workflow

All work in this project is gated by role checkpoints. A task only moves forward after each role has provided its output or marked it as not applicable.

## checkpoints
1. Owner
2. Analyst
3. Architect
4. Developer
5. Reviewer
6. Tester
7. Documenter

## rule
- No role is skipped unless the Owner marks it N/A with a brief reason.

## usage
- Use the templates in `docs/roles/templates/` for each checkpoint.
