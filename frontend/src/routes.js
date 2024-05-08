/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/
// @mui icons
import Icon from "@mui/material/Icon";

import SignIn from "layouts/authentication/sign-in";
import CreateQuiz from "layouts/quiz/createQuiz";
import NewQuizList from "layouts/quiz/newQuizList";
import AttemptedQuizList from "layouts/quiz/attemptedQuizes";
import MyQuizes from "layouts/quiz/myQuizes";
import QuizAttempts from "layouts/quiz/quizAttempts";
import AttemptQuiz from "layouts/quiz/attemptQuiz";
import AttemptDetails from "layouts/quiz/attemptDetails";
import SignUp from "layouts/authentication/sign-up";
import Dashboard from "layouts/dashboard";
import CreateWebforum from "layouts/webforum/createWebforum";
import MyForums from "layouts/webforum/myForums";

// Student Routes
const studentRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "New Quiz List",
    key: "newQuizList",
    icon: <Icon fontSize="small">quiz</Icon>,
    route: "/newQuizList",
    collapse: [
      {
        type: "collapse",
        name: "New Quiz List",
        key: "newQuizList",
        icon: <Icon fontSize="small">quiz</Icon>,
        route: "/newQuizList",
        component: <NewQuizList />,
      },
      {
        type: "collapse",
        name: "Attempt Quiz",
        key: "attemptQuiz",
        icon: <Icon fontSize="small">quiz</Icon>,
        route: "/attemptQuiz",
        component: <AttemptQuiz />,
      },
      {
        type: "collapse",
        name: "Attempt Quiz",
        key: "attemptQuiz",
        icon: <Icon fontSize="small">quiz</Icon>,
        route: "/attemptDetails",
        component: <AttemptDetails />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Attempted Quiz List",
    key: "attemptedQuizList",
    icon: <Icon fontSize="small">quiz</Icon>,
    route: "/attemptedQuizList",
    component: <AttemptedQuizList />,
  },
];

// Routes for staff members
const staffRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Create Quiz",
    key: "createQuiz",
    icon: <Icon fontSize="small">quiz</Icon>,
    route: "/createQuiz",
    component: <CreateQuiz />,
  },
  {
    type: "collapse",
    name: "My Quizes",
    key: "myQuizes",
    icon: <Icon fontSize="small">quiz</Icon>,
    route: "/myQuizes",
    collapse: [
      {
        type: "collapse",
        name: "My Quizes",
        key: "myQuizes",
        icon: <Icon fontSize="small">quiz</Icon>,
        route: "/myQuizes",
        component: <MyQuizes />,
      },
      {
        type: "collapse",
        name: "Quiz Attempts",
        key: "quizAttempts",
        icon: <Icon fontSize="small">quiz</Icon>,
        route: "/quizAttempts",
        component: <QuizAttempts />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Create Webforum",
    key: "createWebForum",
    icon: <Icon fontSize="small">forum</Icon>,
    route: "/createWebforum",
    component: <CreateWebforum />,
  },
  {
    type: "collapse",
    name: "My Webforums",
    key: "myWebforums",
    icon: <Icon fontSize="small">forum</Icon>,
    route: "/myWebforums",
    component: <MyForums />,
  },
];

// Routes for default
const defaultRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export { studentRoutes, staffRoutes, defaultRoutes };
