# Tushar's Requirements

## Test Cases

### Email — 2025-03-13

Steps:

1. Open a browser
1. Enter the URL `https://flex-qa-auto-dev.stage.appsiangrc.com/App/LoginPage.aspx` in the address bar
1. Enter the value 'QAAutoAdmin' into the input field
1. Input the value 'Admin@123$' into the input field
1. Validate that the password field is editable
1. Click on the Hamburger menu.
1. Navigate to the Admin -> Workflow -> Workflow Types
1. Click on the New Record tab
1. Enter the following details
    - Workflow Name: AA_AI_Test
    - Request Title: AA AI Test Request
1. Click on the Insert button
1. Click on the Yes button in the 'Define steps for this workflow now?' pop-up
1. Click on the New Step tab.
1. Enter/select following values in the add new record form
    - Step Name: AA_AI_Test Step 1
    - Parent Step: Select 'Start'
    - Step Type: Select 'Approve By Group' from the drop-down.
    - Approval Group Type: Select Select 'IT Team' from the drop-down.
1. Click on '+' near User Input
1. Check "Enable Role Selection" checkbox.
1. Click on the insert button
1. Click on the New Step again
1. Enter/Select following values in the add new record form
    - Step Name: AA_AI_Test Step 2
    - Parent Step: Select 'AA_AI_Test Step 1' from the drop-down.
    - Step Type: select 'Run actions automatically' from the drop-down.
    - Action to Perform: Select "Apply workflow Authorizations" from the drop-down.
1. Click on the insert button
1. Click 'Update'
1. Close the modal window
1. Click on the flow tab.
1. Click on the Actions button
1. Select 'Open Request page' option from drop down
1. Request for System: Select 'SAP ERP' from the drop down
    - Username: Enter 'USER25062727'
1. Click on Next button
1. Enter a valid comment
1. Click on the Submit button.
1. Verify the entered details and click on the submit button
1. Note the Request ID
1. Click on the 'All My Requests' link
1. Find the request with request ID number of 22nd number step expected result.
1. Click on the Request ID hyperlink
1. Under 'New Roles to User' enter 'SAP_BC_USER_ADMIN' in the Role field
1. Click Add
1. Click Save Changes
1. Click Ok on the modal window
1. Click Approve/Decline Request button
1. In the modal window select the Decision: 'Approved'
1. In the comment field enter the comment: e.g. 'Approved'
1. Click OK
1. Navigate to Home
1. Navigate to Reports > Approved Requests
1. Expand Filter
1. Click Users Filter
1. Select Username
1. Select Equals in the adjoining text field
1. Enter 'USER25062727' in the next field
1. Scroll to the bottom of the page
1. Select Apply
1. Click Display
1. Click on Username link
1. Click user profile
1. Click Workflows
1. Check for the request
1. Current step should be 'Finish'
1. Close the modal window
1. Navigate to Reports > Access > User > Profile Center > User Profile
1. In the User field enter 'USER25062727'
1. Click Display
1. Click the Request ID for the previously request
1. A new tab will open
1. Under Action check Apply authorizations to USER25062727
1. On the far right you should see a green check mark
1. Click the user name link on the top and select Sign Out
