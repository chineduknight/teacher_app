# MAX Take Home Test

The test is designed to assess your problem-solving skills and coding abilities based on a given specification. We want to see how you approach real-world challenges and implement solutions.

The purpose of this assessment is to evaluate your coding skills and problem-solving approach. We won't be using your code for anything beyond the hiring process.

## Task

You have been tasked with developing an application that enables teachers to create and assign homework to their students. The application should allow teachers to select specific resources for the students to use during their study. To ensure that the application meets the necessary requirements, please refer to the acceptance criteria document linked [here](acceptance-criteria.md).

When designing the user interface, please follow the visual guidelines provided in the images found under the acceptance criteria section. Although not all pages have corresponding designs, use the available images as a reference for the overall look and feel of the application. You have the option to use styling libraries such as Tailwind or Bootstrap to expedite the development process. However, we strongly recommend that you create your own custom styles, as the projects you will be working on in the future will require custom styling.

Please style the application according to the images found under the acceptance criteria. Not all pages have designs, so just use the images in there for the look and feel. Feel free to use styling libraries (tailwind, bootstrap, etc) for quickness, but we **recommend** you do your own styling as the projects you will be working on is all custom styling.

If time permits, we encourage you to write tests using a testing framework like Jest to verify the correctness and functionality of your application. This will help ensure that the application behaves as expected and meets the specified requirements.

When you have finished, share the GitHub repository containing your solution.

In this take-home exercise, you will demonstrate the following skills:

- Calling APIs and parsing responses
- CSS Styling
- Stateful application design
- Building an application according to acceptance criteria

## Setup

The API is available in the `/backend` folder. It is a Koa.js server that returns static data.

- To retrieve the list of students, you can make a request to `http://localhost:3000/students`
- To retrieve the list of resources, you can make a request to `http://localhost:3000/resources`
- To submit the form for creating a new assignment, you can make a POST request to `http://localhost:3000/assignment`

To run the server run the following commands

```bash
cd backend
npm install
npm start
```

In a new terminal, start the frontend by running the following:

```bash
cd frontend
npm install
npm run dev
```
# teacher_app
