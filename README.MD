# TODO APP

This is a simple application to manage TODO items

## Installation steps

There is a small `host` example in this folder to use it and see the integration if needed.
You can also access the MFE by accessing to `http://localhost:8081`
An the host can be accesses at `http://localhost:8080` 

- Run the `npm install` command on both host and remote (todo-mfe)
- Run the `npm run start` command

## Description

You can Add/Clear items to the store by clicking on the "Add" button to add an item and the `Clear all` button to clear all the items.

Type definitions are defined in the models folder to keep shared Types in one place.
Prop types are defined in each file since they are only needed for each component.

I'm using the build-in state manager to manage the state of certain components and the data is being stored in the browser's local storage.

In this case, the "Title" of the list is being passed from the host app to demonstrate prop/data communication trough the apps.