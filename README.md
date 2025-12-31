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

# Resources used in this repository
## ReactJS
- https://reactnative.dev/

## Controls: MUI
- https://mui.com/material-ui/

## Bootstrap 
- (CSS used in Component "About.js")
- https://getbootstrap.com/

## General Overview
- https://www.w3schools.com/

## other stuff for relaxing
- https://www.cifraclub.com.br/
- https://www.tamiya.com/english/index.html

# Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

## deployment from the IDE / workbench
1) (workbench cli) npm run build
2) (workbench) firebase config object used in Main-Component (Home.js)?
3) (firebase console) create firebase project (Projektübersicht -> Hosting, firebase hosting einrichten)
4) (firebase console) create app link (type WEB) to the development project, add an app to this project
    -- creating an app-alias
    -- "Firebase zu meiner Web-App hinzufügen"
    -- check link https://cra.link/deployment
5) (workbench cli) firebase use --add
    --? project alias 
    -- firebase deploy --only hosting:prj-minnav-269ed-d0109

# to-dos
- Verwendung von JSX-components mit Dateityp .jsx unklar
- framer-motion@12.23.24 verwenden? component Carousel

- fuer bootstrap-css-verwendung (view About.js) 
<a href="#" class="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2" style="--bs-focus-ring-color: rgba(var(--bs-success-rgb), .25)">
  Green focus ring
</a>

# Hauptprogramm:
- index.js, "hydriert" das <div>-tag im /public/index.html (-> Client Side Rendering)

## Routing
- uses "react-router-dom" 
-- Parent ( createBrowserRouter(), routes are used in: createRoutesFromElements() ) 
    |--> Child-component ( useNavigate(); fnNavigate = useNavigate(); fnNavigate(<Route>) ) 
      |--> Parent
-- 

## Theming
- currently none

## i18n
-- currently none

## about the Author
Xing : https://www.xing.com/profile/Andreas_Rother21?sc_o=mxb_p
LinkedIn: https://www.linkedin.com/in/andreas-rother-623a0930

## special thanks to
- JS guru: https://netninja.dev/

- icons8.de
<a target="_blank" href="https://icons8.com/icon/95u9Z6qJ2Ipg/joker">Joker</a> Icon von <a target="_blank" href="https://icons8.com">Icons8</a>

## drag&drop
<DndContext
  onDragStart={handleDragStart}
  onDragMove={handleDragMove}
  onDragOver={handleDragOver}
  onDragEnd={handleDragEnd}
  onDragCancel={handleDragCancel}
>
  {children}
</DndContext>
