## Tests Case Section

**Description**: This folder contains all of tests cases, suites, and unit-tests 

---
## Folder Structure
    .tests
        |- carts  
        |- wms
        - README.md (You are here)
    |- examples
        - demo-test.js
    |- page_objects
        |- carts  
        |- wms
        - README.md 
    |- suites
        |- carts  
        |- wms
        - README.md 
    |- unit 
        |- carts  
        |- wms
        - README.md 

     
## Best Practices for writing automated tests:

1.  Stay within your test scope! In other words, do not "test" your test (or another test).

    A good test assumes that everything worked up until the test begins...and everything works
    after it ends. It only cares about what *it* is testing. For end-to-end and acceptance-based testing, 
    treat every step like a "mini-test" (aka 'module'). This will pay off when introducing new features; 
    as these modules become a library of pre-tested tools to re-use.
  
2. Use the principle [Arrange, Act, Assert](http://wiki.c2.com/?ArrangeActAssert) !

    This principle will help organize your tests, so that they are less error-prone 
    and promotes quick identification of a defect.
   
    **A**rrange -- declare everything your tests will need (URLs, test data, selectors, etc.) at the beginning
    of a test. Or, it can be in a page objects file. Just make sure it is within the testing scope (see #1). 
    For example: 
            - Global variables (used for all tests/suites)
            - Section/Suite variables (used in not all, but multiple tests)
            - Instance/Test instance variables(used only in a single test).
  
    **A**ct -- Keep it simple (but not **too** simple). Note: An action is not Acceptance Criteria. Each test (or step) 
    should have at **minimum** three(3) actions, but no more than five (5). For example, if you are testing
    a Login Page, the minimum (3) amount of actions:
  
            - Identify the target web element (ex. find the web element)
            - Perform the action (type "Enter Username")
            - Wait for it to complete (all the key strokes entered)
            
    A good rule of thumb is to add a small pause after an action, if needed. 10-100 ms is plenty of time for 
    key stokes; form submission, logins, new page navigation, and searches may be longer (use best judgment).
  
    **A**ssert -- Once the AUT (Application Under Test) completes the action, **ALWAYS** check an action 
    completed (`expect`), and then `assert` the action performed as expected (pass/fail). Resist the urge to
    make assumptions about application behavior, especially when dealing with dynamic content.
    
3. Leave the edge cases/checks to the "edge" of your testing. In other words, do not try to cover every possible 
   scenario for test coverage. Catch the 'big' fish (defects that will stop the development progress, or a 
   production release). IF the bug/edge case does occur, then that is the time to test against that bug 
   when it presents itself. 

   This may seem counter-intuitive, but this makes the application *more* robust, in the long run. An end-user
   may consider an unexpected error when submitting a comment to be an annoyance, but will raise the alarm if the report they worked on 
   for a week or month's deletes!