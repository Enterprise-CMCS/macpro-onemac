## Tests Case Section

**Description**: This folder contains all of tests cases, suites, and unit-tests 

---
 
Best Practices for writing automated tests:

1.  Stay within your test scope! In other words, do not "test" your test (or another test).

    A good test assumes that everything worked up until the test begins...and everything works
    after it ends. It only cares about what *it* is testing. For end-to-end and acceptance-based testing, treat every step like a 
    "mini-test" (aka 'module'). This will pay off when introducing new features; as these modules
    become a library of pre-tested tools to re-use.
  
2. Use the principle [Arrange, Act, Assert](http://wiki.c2.com/?ArrangeActAssert) !

    This principle will help organize your tests, so that they are less error-prone 
    and promotes quick identification of a defect.
   
    1. Arrange -- declare everything your tests will need (URLs, test data, selectors, etc.) at the 
    the beginning of a test. Or, it can be in a page objects file. Just make sure it is
    within the testing scope (see #1). For example: 

            - Global variables (used for all tests/suites)
            - Section/Suite variables (used in not all, but multiple tests)
            - Instance/Test instance variables(used only in a single test).
  
    2. Act -- Keep it simple (but not **too** simple). Note: An action is not Acceptance Criteria. Each test (or step) 
    should have at **minimum** three(3) actions, but no more than five (5) actions. For example, if you are testing 
    a Login Page, the minimum (3) amount of actions:
  
            - Identify (or wait for) the target to be ready (ex. wait for page to load or find the web element)
            - Perform the action ("Enter Username")
            - Wait for it to complete (all the key strokes finished)
            
    A good rule of thumb is to add a small pause after an action. 10-100 ms is plenty of time for key stokes;
    submitting forms and logins may be longer (use you judgment).
  
    3. Assert -- Once the AUT (Application Under Test) completes the action, **ALWAYS** check an action 
    completed (`expect`), and then `assert` the action performed as expected (pass/fail). Resist the urge to
    make assumptions about application behavior, especially when dealing with dynamic content.
    
3. Leave the edge cases to the "edge" of your testing. In other words, do not try to cover every possible scenario 
for test coverage. Catch the 'big' fish (defects that will stop the development progress, or a production release)
and IF the bug occurs, then you test against that bug. 

    This may seem counter-intuitive, but this makes the application *more* robust! The end-user can forgive an unexpected error when submitting a comment, but will raise the alarm if the report they 
spent a week or month writing gets deleted! 