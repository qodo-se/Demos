# Tushar's Test Scenarios

## Email — 2025-03-19

```md
Hi Noah,
Here’s one more script that I would like to see automated in Qodo.
Note that this is recording for testRigor tool.
open url https://flex-qa-plc.stage.pathlockgrc.com/App/LoginPage.aspx
enter "QA_Admin" into "Username"
enter "Welcome@123" into "Password"
click "Sign In"
click on "Open Menu"
click "Compliance"
click "Campaigns"
hover over "Export"
click "Schedule Report"
enter "Test123" into "ctl00$ctl00$ctl00$ctl00$ProfileTailorHeader1$ProfileTailorMenuPanel1$ReportSchedule1$TabContainer$ScheduleInfo$txtScreenName"
click "Save"
click on "Open Menu"
click "Admin"
click "Scheduled Reports"
click "Reporting"
click "Scheduled Reports"
enter "Test123" into "ctl00$ctl00$ctl00$A$DataControls$DataPlaceHolder$pageTabContainer$TabPanel1$searchBox"
click checkbox "ctl00$ctl00$ctl00$A$DataControls$DataPlaceHolder$pageTabContainer$TabPanel1$GridView1$ctl02$selectCheckBox"
click "Delete selected records"
accept prompt with value "Are you sure you want to delete?"
open url https://flex-qa-plc.stage.pathlockgrc.com/App/LoginPage.aspx
```

## Email — 2025-03-13

```md
Open a browser
Enter the URL 'https://flex-qa-auto-dev.stage.appsiangrc.com/App/LoginPage.aspx' in the address bar
Enter the value 'QAAutoAdmin' into the input field
Input the value 'Admin@123$' into the input field
Validate that the password field is editable
Click on the Hamburger menu.
Navigate to the Admin -> Workflow ->Workflow Types
Click on the New Record tab
Enter the following details
-Workflow Name: AA_AI_Test
-Request Title: AA AI Test Request
Click on the Insert button
Click on the Yes button in the 'Define steps for this workflow now?' pop-up
Click on the New Step tab.
Enter/select following values in the add new record form
-Step Name: AA_AI_Test Step 1
-Parent Step: Select 'Start'
-Step Type: Select 'Approve By Group' from the drop-down.
-Approval Group Type: Select Select 'IT Team' from the drop-down.
Click on '+' near User Input
Check "Enable Role Selection" checkbox.
Click on the insert button
Click on the New Step again
Enter/Select following values in the add new record form
-Step Name: AA_AI_Test Step 2
-Parent Step: Select 'AA_AI_Test Step 1' from the drop-down.
-Step Type: select 'Run actions automatically' from the drop-down.
-Action to Perform: Select "Apply workflow Authorizations" from the drop-down.
Click on the insert button
Click 'Update'
Close the modal window
Click on the flow tab.
Click on the Actions button
Select 'Open Request page' option from drop down
Request for System: Select 'SAP ERP' from the driop down
Username: Enter 'USER25062727'
Click on Next button
Enter a valid comment
Click on the Submit button.
Verify the entered details and click on the submit button
Note the Request ID
Click on the 'All My Requests' link
Find the request with request ID number of 22nd number step expected result.
Click on the Request ID hyperlink
Under 'New Roles to User' enter 'SAP_BC_USER_ADMIN' in the Role field
Click Add
Click Save Changes
Click Ok on the modal window
Click Approve/Decline Request button
In the modal window select the Decision: 'Approved'
In the comment field enter the comment: e.g. 'Approved'
Click OK
Navigate to Home
Navigate to Reports > Approved Requests
Expand Filter
Click Users Filter
Select Username
Select Equals in the adjoining text field
Enter 'USER25062727' in the next field
Scroll to the bottom of the page
Select Apply
Click Display
Click on Username link
Click user profile
Click Workflows
Check for the request
Current step should be 'Finish'
Close the modal window
Navigate to Reports > Access > User > Profile Center > User Profile
In the User field enter 'USER25062727'
Click Display
Click the Request ID for the previously request
A new tab will open
Under Action check Apply authorizations to USER25062727
On the far right you should see a green check mark
Click the user name link on the top and select Sign Out
```
