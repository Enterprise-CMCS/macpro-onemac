## Tests Case Section

**Description**: This folder contains all of tests cases, suites, and unit-tests 

---
## Folder Structure
    . tests
    |- examples
        - demo-test.js
    |- page_objects
        - README.md 
    |- suites
        - README.md 
    |- unit
    - README.md (You are here)

     
## Best Practices: 

#### Stay within your test scope

Do not *"test"* your test (or another test)

A good automated test assumes that everything worked up until the test begins...and everything works after 
it ends. The focus should stay strictly on what is being tested. For end-to-end and acceptance-based testing,  
treat every step like a "mini-test" (aka 'module'). This will pay off when introducing new features;  
as these modules will become the library of pre-tested tools to re-use.

#### Separation of concerns

Good automated tests strive to keep as much extra code out of the test as possible. For example:
      
Say you have trivial function that uses a for-loop through an array of test variables (a good idea), consider  
placing it into a separate utility file (as a module or in a page object), such that can be re-used in the test, 
but not directly in the test itself. Conversely, keep your test assertions (pass/fail) out of the utility 
(or page object) files. This will make it significantly easier to debug and tests will run faster.
    
#### The principle of [Arrange, Act, Assert](http://wiki.c2.com/?ArrangeActAssert)

This principle will help organize your tests, so that they are less error-prone and promotes quick identification 
of a defect.
    
**A**rrange -- declare everything your tests will need (URLs, test data, selectors, etc.) at the beginning
of a test. Or, it can be in a page objects file. Just make sure it is within the testing scope (see #1). 

  For example: 
    - Global variables which will be used for all tests/suites. Keep these to a minimum.
    - Section/Suite variables (used in not all, but multiple tests)
    - Instance/Test instance variables(used only in a single test).
  
**A**ct -- Perform the action(s). An action is defined as a three (3) to five (5) -part series that is part of 
a test step. Now, one test step may have one or more actions, but each action will have (at least) 3-5 parts.

Example Test Step: A user logs into the application. 

This story consists of four actions: 
    - user enters a username, 
    - user enters a password,
    - user accepts the terms and conditions
    - user clicks the Login Button.

For End-to-End Tests, each action will: 

    - Identify the target web element (Locate the web element) 
    - Perform the user interaction (type "Enter Username")
    - Wait for completion (all input entered)
            
    Note: A good rule of thumb is to add a small pause after an action, if needed. 10-100 ms is plenty of time for 
    key stokes. Form submissions, logins, new page navigation, and searches may take 3, 5, 10 seconds or more. Use best
    judgment.
   
For unit-tests, the action will: 

**A**ssert -- For every action, **ALWAYS** `expect` (something should happen), `assert` (must be true to continue), 
or `verify` (failed but test can continue). Resist the urge to make assumptions about a behavior.
    

#### Leave the edge cases to the "edge" of your tests

In other words, do not try to cover every possibility or scenario in one test/suite. Prioritize testing to capture 
the most important, then work you way down.

This may seem counter-intuitive, but this makes the application *more* robust, in the long run. 
An end-user may consider an unexpected error when submitting a comment to be an annoyance, but will raise the alarm 
if the report they worked on for a week or month's deletes!