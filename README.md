# Organization Chart App

The Organization Chart App is a web application designed to visualize the hierarchy of an organization. It provides a clear view of the relationships between employees in a company, their roles, and their reporting structure. 

## Features

- **Interactive Visualization**: The app provides an interactive organization chart that allows users to understand the structure of the organization at a glance. It will display the total number of direct and undirect reports for each employee and their respective roles.

- **Filter Search Functionality**: Users can search for individuals in the organization chart by name or role, making it easy to find specific employees. When a user selects an individual, the app will display the manager until the top of the organization is reached.

- **Dynamic Data**: The app is designed to be dynamic and can be updated with new employees and roles. The organization chart will automatically update to reflect any changes in the organization. When the datsource is invalid, the app will display an error message. Currently, we have implemented the validation for the following:
  - The employee have more than one manager.
  - The employee doesnt have a hierarchy (manager and direct reports).

## Usage

To use the Organization Chart App, simply navigate to [this web page](https://org-chart-gray.vercel.app/) and the organization chart will be displayed. You can interact with the chart by clicking on individuals to see more information or using the search bar to find specific employees.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Running the App

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running the Tests

To run the tests, run the following command:

```bash
npm run test
# or
yarn test
# or
pnpm test
# or
bun test
```

This will start the test runner in the interactive watch mode. You can also see the test results in your terminal or you can open it from `./coverage/index.html` to see the coverage report.

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Next.js](https://nextjs.org/) - The React framework for production
- [Jest](https://jestjs.io/) - A delightful JavaScript Testing Framework with a focus on simplicity
- [shadecn/ui](https://ui.shadcn.com/) - A UI library for React that is built using Tailwind CSS
- [tailwindcss](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs

## Screenshots

### Image
<img width="1507" alt="Screenshot 2024-02-18 at 20 59 04" src="https://github.com/AdityaPut/org-chart/assets/53312721/e27c98d1-dc67-4094-8577-a3cf2d7959b9">
<img width="1512" alt="Screenshot 2024-02-18 at 16 27 44" src="https://github.com/AdityaPut/org-chart/assets/53312721/1b41ece6-2f2f-4480-9c3d-9b04c423f52f">
<img width="1509" alt="Screenshot 2024-02-18 at 16 28 02" src="https://github.com/AdityaPut/org-chart/assets/53312721/5f6bb0d3-5c3a-46e1-a923-163eb230212c">

### Video

https://github.com/AdityaPut/org-chart/assets/53312721/2f0b736e-2986-430d-8cf2-54e67cedd7cd


## Unit Test Coverage

<img width="1510" alt="Screenshot 2024-02-18 at 22 23 40" src="https://github.com/AdityaPut/org-chart/assets/53312721/9c85e2e0-c2e2-49fd-b2fe-7a5910bdef23">
