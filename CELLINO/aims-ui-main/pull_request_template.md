- **Developer should** submit PR for review only `after the checklist below is completed`
- **Reviewer should** reject the PR if the checklist below is not complete

## PR checklist 

- [ ] The `description` section captures the change details
  - Attach screenshots if needed
  - Basically, make the life of the reviewer a little easier by documenting your PR
 
- [ ] There are `no console.log` statements either in the new code or the existing code base
  - When you run the app, if you see any stuff in the console log then it is your responsibility to fix them even though you might not have added those log statements
  
- [ ] There are `no react warning messages` when you run the application
  - when you run the app, you should not see any warnings or errors in the console log
  - Please fix the warnings even if they are not caused by your code changes
  
- [ ] There are `no warnings or errors when you run the unit test script` (yarn run watch or yarn test or yarn run test: watch)
  - if you see any warnings then the expectation is that you fix it even if your code did not cause them.

- [ ] `New vulnerabilities` from static code analysis discovered, documented and addressed
- [ ] Meets `unit test coverage goal of 90%`
- [ ] Unit test coverage does not drop below existing unit test coverage numbers
  - Developer and Reviewer should check and ensure rules are being changed to exclude files or reduce coverage numbers
 
- [ ] Commit description adheres to conventional change log best practice [link](https://github.com/conventional-changelog/conventional-changelog)

### Description of the changes
`<developer submitting the PR should fill out this section>`

### More info about other checklist items
`<developer submitting the PR should fill out this section>`
