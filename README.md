# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


// ...............Table-page-notes..................
// This is the homepage of the project where the table of products is diplayed. 
// here products is the usestate which is updated with the values taken from api in the app.jsx page. 
// we display the products in the table by mapping inside the table body. 
// In the table we add an extra column with the View,edit and delete buttons for each row in the table. 
// Also we add a button create product below the table to add new products to the table.and link the button to the form page. The form page has the whole logic to add the new product to the table.


// Since we have to use the filtered product based on the one we clicked in both the view and edit in the editform page we create the usestates productId and filteredproduct in the parent page App.jsx and pass it to this page using useContext.

// ...............view button..................
// The whole logic of view button is in this page.
// 1 First create a button with view icon from react icons. 
// 2 Copy paste code of modal component from react bootstrap which also include a usestate show and 2 functions handleClose and handleShow. 
// 3 In the onclick of the button set the function handleshow by passing item.id as a callback so that we can filter the product with the passed id from the products object.
// 4 Inside the handleshow since we passed id as callback we recieve the id in the arguement of the function and we can update the productId with the passed id.
// 5 We apply filter method to the products object by comparing each product's id with the id we passed as productId to find the product we selected to view and assign it to a variable filter.
// here since products is an array and the filter method returns an array with the filtered product, we have to use [0] to access the only first element of the filter array.
// 6 set the filteredproduct usestate as filter because we need the filteredproduct also in the edit page.
// 7 since filteredproduct is an object we dont need mapping and all we can access values from filteredproduct using dot opeerator. 
// 8 in the modal body, add the fields to display in the view of products with values as filteredproduct.value in the products api. 
// here the ? is used to make sure the code after that works only after fetching data to the filteredproduct.
// Also images in api are given as arrays so while using them use images[0]

// ...............edit-page-notes..................
// This form is for adding a new product to the table products. here usenavigate hook is used to navigate to the home page when the form is submitted. 
// ProductData is a usestate variable to store the values submitted from the form as an object.
// Set a unique name for each form control and set a same functionname getinputdata in the onchange of each form control.
// Inside the getinputdata update the ProductData using spread operator with the datas entered in the form by formdata getting method.
// In the form tag set a function submitdata in the onsubmit. 
// Inside submit data :
//    e.preventDefault is used to avoid the automatic refreshing property.
//       create a variable Allproducts and set it with an array spreading elements of products which has values got by the api integration and add the ProductData to theend of Allproducts. Now Allproducts has the array with the newly added product. In the table page we are mapping to the table from the products. therefore we have to update the products with the Allproducts so that the added product get updated in the table.
// here e.target.reset() is used to refresh the form after submission