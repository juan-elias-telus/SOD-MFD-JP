# TODO APP

## Description

This a simple TODO list app that allow you to add/clean items to a list using React, Typescript and MicroFrontend.

You can Add/Clear items to the store by clicking on the `Add` button to add an item or click con the `Add mock data` button to add example data.
Click the `Clear all` button to clear all the items.
A _"Success"_ notification will be displayed if the item was added successfully.

Type definitions are defined in the models folder to keep shared Types in one place (`TodoItem` type, in this case).
Prop types are defined in each file since they are only needed for the component itself.

I'm using the build-in state managers (`useState`) to manage the state of certain components and the data is being stored in the browser's local storage.

In this case, the "Title" of the list is being set in the host app and default data is being sent to MFE to demonstrate `prop/data` communication between host and MFE.

Module Federation is used not only to expose the remotes, but to share dependencies and avoid duplicated library instances.

## Installation steps

There is a small `host` example in this folder to use it and see the integration if needed.

- Run the `npm install` command on both `host` and remote (`todo-mfe`)
- Run the `npm run start` command on both projects.

The `host` can be accessed at `http://localhost:8080` 
You can also access the MFE directly by going to `http://localhost:8081`

## Testing

To run unit test simply run the `npm test` command.

This will run the tests definitions and display the coverage which should be 100%.

To review the test definitions navigate to `src/components/__tests__/`.

The main tests cases are in the `MainView.test.tsx` file, since that's the component where the main logic of the MFE is.

> Note: The `host` app doesn't have any tests 'cause it's only being use as a simple shell to display the MFE in this project

## Edge cases

When adding a new item, different validations are checked:

- Description can not be empty or have spaces only
- Description only accepts alphanumeric characters and spaces.
- If one of those conditions is `true` an alert message will be show to the user
- The message content can vary depending on the error type we receive:
  - If the error is related to the `user input` _"Please check the "Description" field warnings"_ will be displayed
  - If the error is related to `localStorage` _"A problem occurred while trying to access localStorage"_ will be displayed