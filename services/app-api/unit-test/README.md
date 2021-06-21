## Test Submit Locally

==============
Do This FIRST:
==============

> > > Follow the steps to run serverless Dynamo DB offline - See README in app-api directory

> > > Make sure you have curl installed and it is in your path if on Windows:
> > > See: https://www.youtube.com/watch?v=cl186ePedMg

=====================================
After FIRST: in a new Terminal Window
=====================================

Run the following Command:

. ./testSubmitTest.sh

NOTE: Update the testSubmitData.json file to change the data sent to api submit function.

Example:

=========================================
Run with valid transmittal ID and non Dup
=========================================

Type the following command:

. ./runSubmitTest.sh

Output:

"Submission successfull!"% work:. ./runSubmitTest.sh

=========================================
Run second time same transmittal ID
=========================================

Type the following command:

. ./runSubmitTest.sh

{"error":"Duplicate ID"}%

=========================================
Run with bad Territory/State Code
=========================================

+++++
NOTE: Update the testSubmitData.json file transmittal ID to AX-33-1112
+++++

Type the following command:

. ./runSubmitTest.sh

{"error":"Transmittal ID State/Territory Not Valid"}%
